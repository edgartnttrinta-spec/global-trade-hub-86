CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
CREATE TYPE public.quote_status AS ENUM ('novo', 'em_analise', 'em_negociacao', 'cotacao_enviada', 'concluido', 'cancelado');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  short_name text NOT NULL,
  description_pt text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  area_pt text NOT NULL DEFAULT '',
  area_en text NOT NULL DEFAULT '',
  logo_url text,
  banner_url text,
  phone text,
  email text,
  accent text NOT NULL DEFAULT 'blue',
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.companies TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published companies" ON public.companies FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage companies" ON public.companies FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name_pt text NOT NULL,
  name_en text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  UNIQUE(company_id, slug)
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published categories" ON public.categories FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  slug text UNIQUE NOT NULL,
  name_pt text NOT NULL,
  name_en text NOT NULL DEFAULT '',
  description_pt text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  brand text,
  model text,
  sku text,
  type text,
  availability text,
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published products" ON public.products FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX products_company_idx ON public.products(company_id);
CREATE INDEX products_category_idx ON public.products(category_id);
CREATE INDEX products_search_idx ON public.products USING gin (to_tsvector('simple', coalesce(name_pt,'') || ' ' || coalesce(description_pt,'') || ' ' || coalesce(brand,'') || ' ' || coalesce(model,'')));

CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL, alt_text text NOT NULL DEFAULT '', sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads product images" ON public.product_images FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published OR public.has_role(auth.uid(), 'admin'))));
CREATE POLICY "Admins manage product images" ON public.product_images FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.product_specifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label_pt text NOT NULL, label_en text NOT NULL DEFAULT '', value text NOT NULL, sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.product_specifications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_specifications TO authenticated;
GRANT ALL ON public.product_specifications TO service_role;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads specifications" ON public.product_specifications FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published OR public.has_role(auth.uid(), 'admin'))));
CREATE POLICY "Admins manage specifications" ON public.product_specifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name text NOT NULL, type text NOT NULL, url text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documents TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads documents" ON public.documents FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND (p.is_published OR public.has_role(auth.uid(), 'admin'))));
CREATE POLICY "Admins manage documents" ON public.documents FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  full_name text NOT NULL,
  company_name text,
  job_title text,
  phone text NOT NULL,
  email text NOT NULL,
  country text,
  group_company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  requested_date date,
  message text,
  attachment_url text,
  status public.quote_status NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.quotes TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.quotes TO authenticated;
GRANT ALL ON public.quotes TO service_role;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors create quote requests" ON public.quotes FOR INSERT TO anon, authenticated WITH CHECK (status = 'novo');
CREATE POLICY "Admins manage quotes" ON public.quotes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX quotes_created_idx ON public.quotes(created_at DESC);

CREATE TABLE public.quote_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  item_name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1 CHECK (quantity > 0)
);
GRANT INSERT ON public.quote_items TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.quote_items TO authenticated;
GRANT ALL ON public.quote_items TO service_role;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors add quote items" ON public.quote_items FOR INSERT TO anon, authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.quotes q WHERE q.id = quote_id));
CREATE POLICY "Admins manage quote items" ON public.quote_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), full_name text NOT NULL, company_name text, email text NOT NULL,
  phone text, subject text NOT NULL, message text NOT NULL, is_read boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (is_read = false);
CREATE POLICY "Admins manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), key text UNIQUE NOT NULL, value jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));