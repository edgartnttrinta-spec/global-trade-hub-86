import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companies, companyCategories } from "@/lib/site-data";
import agriculture from "@/assets/agriculture.jpg";
import technology from "@/assets/technology.jpg";
import logistics from "@/assets/logistics.jpg";

const images = { agriculture, technology, logistics };
export const Route = createFileRoute("/empresas/$empresa")({
  loader: ({ params }) => { const company=companies.find(c=>c.slug===params.empresa); if(!company) throw notFound(); return { company }; },
  head: ({ loaderData }) => { const name=loaderData?.company.name ?? "Empresa"; return { meta: [
    { title: `${name} — Global Trade Group` }, { name: "description", content: loaderData?.company.area ?? "Empresa do Global Trade Group." },
    { property: "og:title", content: `${name} — Global Trade Group` }, { property: "og:description", content: loaderData?.company.area ?? "Empresa do Global Trade Group." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}}, component: CompanyPage,
});

function CompanyPage() { const {company}=Route.useLoaderData(); const categories=companyCategories[company.slug] ?? [];
  return <><section className="relative min-h-[560px] overflow-hidden bg-primary text-primary-foreground"><img src={images[company.image]} alt={company.name} width={1200} height={900} className="absolute inset-0 size-full object-cover"/><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_82%,transparent)_45%,color-mix(in_oklab,var(--primary)_15%,transparent)_100%)]"/><div className="section-shell relative flex min-h-[560px] items-center py-20"><div className="max-w-2xl"><p className="eyebrow text-accent">Empresa {company.number} · {company.category}</p><h1 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">{company.name}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">{company.area}</p><Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground"><Link to="/solicitar-cotacao" search={{empresa:company.slug}}>Solicitar cotação <ArrowRight/></Link></Button></div></div></section>
  <section className="section-shell py-24"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow text-primary">Áreas de atuação</p><h2 className="mt-4 font-display text-3xl font-semibold">Competências e categorias</h2></div><div className="grid gap-px bg-border sm:grid-cols-2">{categories.map(c=><div key={c} className="flex min-h-28 items-center gap-4 bg-background p-6"><CheckCircle2 className="size-5 shrink-0 text-accent"/><span className="font-display font-semibold">{c}</span></div>)}</div></div></section>
  <section className="bg-surface py-20"><div className="section-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-primary">Catálogo comercial</p><h2 className="mt-3 font-display text-3xl font-semibold">Produtos e serviços em preparação</h2><p className="mt-4 max-w-2xl leading-7 text-ink-soft">O catálogo oficial desta empresa será publicado à medida que os produtos, especificações e documentos forem validados pela administração.</p></div><Button asChild variant="outline" size="lg"><Link to="/solicitar-cotacao" search={{empresa:company.slug}}>Pedir informação <ArrowRight/></Link></Button></div></section></>;
}