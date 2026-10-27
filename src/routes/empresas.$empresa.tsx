import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companies, companyCategories } from "@/lib/site-data";
import agriculture from "@/assets/agriculture.jpg";
import technology from "@/assets/technology.jpg";
import logistics from "@/assets/logistics.jpg";

const images = { agriculture, technology, logistics };
export const Route = createFileRoute("/empresas/$empresa")({
  loader: ({ params }) => { const company = companies.find(c => c.slug === params.empresa); if (!company) throw notFound(); return { slug: company.slug, name: company.name, area: company.area, slogan: company.slogan, email: company.email }; },
  head: ({ loaderData }) => { const name = loaderData?.name ?? "Marca"; return { meta: [
    { title: name + " | Global Trade & Services, Lda" },
    { name: "description", content: loaderData?.area ?? "Marca comercial da Global Trade & Services, Lda." },
    { property: "og:title", content: name + " | Global Trade & Services, Lda" },
    { property: "og:description", content: loaderData?.area ?? "Portefólio comercial Global Trade & Services." },
    { name: "robots", content: "index,follow" },
  ] }; },
  component: CompanyPage,
});

function CompanyPage() {
  const { slug } = Route.useLoaderData();
  const company = companies.find(c => c.slug === slug);
  if (!company) return null;
  const categories = companyCategories[company.slug] ?? [];
  const contactEmail = company.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : company.email;
  return <>
    <section className="relative min-h-[520px] overflow-hidden bg-primary text-primary-foreground"><img src={images[company.image]} alt={"Imagem ilustrativa: " + company.name} width={1200} height={900} className="absolute inset-0 size-full object-cover"/><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_88%,transparent)_52%,color-mix(in_oklab,var(--primary)_18%,transparent)_100%)]"/><div className="section-shell relative flex min-h-[520px] items-center py-20"><div className="max-w-2xl"><p className="eyebrow text-accent">Portefólio · {company.category}</p><div className="mt-5 flex items-center gap-4"><span className="flex min-h-14 items-center border border-dashed border-primary-foreground/40 bg-primary-foreground/5 px-4 text-[10px] font-bold uppercase tracking-wider text-primary-foreground/70">Área para logótipo oficial</span><h1 className="font-display text-4xl font-semibold sm:text-6xl">{company.name}</h1></div><p className="mt-4 text-sm font-bold uppercase tracking-wider text-accent">{company.slogan}</p><p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/80">{company.area}</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground"><Link to="/solicitar-cotacao" search={{empresa:company.slug}}>Solicitar informação <ArrowRight className="ml-1 size-4"/></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/35 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href={"mailto:" + contactEmail}><Mail className="mr-1 size-4"/> Contacto directo</a></Button></div></div></div></section>
    <section className="section-shell py-20 sm:py-24"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow text-primary">Áreas de negócio</p><h2 className="mt-4 font-display text-3xl font-semibold">Categorias para consulta</h2><p className="mt-4 text-sm leading-7 text-ink-soft">As categorias indicam áreas de consulta comercial. Não confirmam stock, representação oficial de fabricantes, preços ou disponibilidade imediata.</p><a href={"mailto:" + contactEmail} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">{contactEmail} <ArrowRight className="size-4"/></a></div><div className="grid gap-px bg-border sm:grid-cols-2">{categories.map(c=><div key={c} className="flex min-h-24 items-center gap-4 bg-background p-5"><CheckCircle2 className="size-5 shrink-0 text-primary"/><span className="font-display font-semibold">{c}</span></div>)}</div></div></section>
    <section className="bg-surface py-16"><div className="section-shell grid gap-7 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-primary">Consulta comercial</p><h2 className="mt-3 font-display text-3xl font-semibold">Procura um produto ou serviço específico?</h2><p className="mt-4 max-w-2xl leading-7 text-ink-soft">Envie a marca, o modelo, a referência técnica e a quantidade pretendida. A equipa comercial poderá confirmar os próximos passos.</p></div><Button asChild size="lg"><Link to="/solicitar-cotacao" search={{empresa:company.slug}}>Pedir cotação <ArrowRight className="ml-1 size-4"/></Link></Button></div></section>
  </>;
}
