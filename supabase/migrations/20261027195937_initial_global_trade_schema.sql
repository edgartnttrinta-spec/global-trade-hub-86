-- Initial schema for Global Trade & Services. This migration was applied to the connected Supabase project.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "Admins can read their own admin membership" on public.admin_users;
create policy "Admins can read their own admin membership" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) between 3 and 40),
  subject text not null check (char_length(subject) between 2 and 180),
  message text not null check (char_length(message) between 5 and 5000),
  status text not null default 'new' check (status in ('new','in_review','answered','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update on public.contact_messages to authenticated;
drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages" on public.contact_messages for insert to anon, authenticated with check (status = 'new');
drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages" on public.contact_messages for select to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can update contact messages" on public.contact_messages;
create policy "Admins can update contact messages" on public.contact_messages for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  company_name text,
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) between 3 and 40),
  country text not null default 'Moçambique',
  brand_slug text not null default 'global-trade-services',
  product_name text not null check (char_length(product_name) between 2 and 240),
  manufacturer text,
  model_reference text,
  quantity integer check (quantity is null or quantity > 0),
  desired_date date,
  details text check (details is null or char_length(details) <= 10000),
  attachment_paths text[] not null default '{}',
  status text not null default 'new' check (status in ('new','in_review','quoted','won','lost','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.quote_requests enable row level security;
revoke all on public.quote_requests from anon, authenticated;
grant insert on public.quote_requests to anon, authenticated;
grant select, update on public.quote_requests to authenticated;
drop policy if exists "Public can submit quote requests" on public.quote_requests;
create policy "Public can submit quote requests" on public.quote_requests for insert to anon, authenticated with check (status = 'new');
drop policy if exists "Admins can read quote requests" on public.quote_requests;
create policy "Admins can read quote requests" on public.quote_requests for select to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can update quote requests" on public.quote_requests;
create policy "Admins can update quote requests" on public.quote_requests for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand_slug text not null default 'global-trade-services',
  category text not null,
  description text,
  manufacturer text,
  model_reference text,
  image_url text,
  price numeric(14,2) check (price is null or price >= 0),
  currency text not null default 'MZN' check (currency in ('MZN','USD','ZAR','EUR','CNY')),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
drop policy if exists "Visitors can read published products" on public.products;
create policy "Visitors can read published products" on public.products for select to anon, authenticated using (is_published = true);
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products" on public.products for all to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx on public.quote_requests (status);
create index if not exists products_brand_slug_idx on public.products (brand_slug);
create index if not exists products_category_idx on public.products (category);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quote-attachments', 'quote-attachments', false, 10485760, array['application/pdf','image/jpeg','image/png','image/webp','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do nothing;
drop policy if exists "Admins can read quote attachments" on storage.objects;
create policy "Admins can read quote attachments" on storage.objects for select to authenticated using (bucket_id = 'quote-attachments' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can upload quote attachments" on storage.objects;
create policy "Admins can upload quote attachments" on storage.objects for insert to authenticated with check (bucket_id = 'quote-attachments' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can update quote attachments" on storage.objects;
create policy "Admins can update quote attachments" on storage.objects for update to authenticated using (bucket_id = 'quote-attachments' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (bucket_id = 'quote-attachments' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
drop policy if exists "Admins can delete quote attachments" on storage.objects;
create policy "Admins can delete quote attachments" on storage.objects for delete to authenticated using (bucket_id = 'quote-attachments' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_updated_at() from public, anon, authenticated;
drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at before update on public.quote_requests for each row execute function public.set_updated_at();
drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();