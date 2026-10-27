import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { companies } from "@/lib/site-data";
import agriculture from "@/assets/agriculture.jpg";
import technology from "@/assets/technology.jpg";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/empresas")({ head: () => ({ meta: [
  { title: "Empresas — Global Trade Group" }, { name: "description", content: "Explore as oito empresas do Global Trade Group e as suas áreas de atuação." },
  { property: "og:title", content: "As 8 empresas do Global Trade Group" }, { property: "og:description", content: "Comércio, tecnologia, agricultura, segurança, logística, gelo, avicultura e automóveis." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: CompaniesPage });

const images = { agriculture, technology, logistics };
function CompaniesPage() { return <><PageHero eyebrow="O grupo" title="Oito empresas. Uma plataforma integrada.">Explore cada área de negócio e encontre o produto, serviço ou competência que responde às suas necessidades.</PageHero><section className="section-shell py-20"><div className="grid gap-6 md:grid-cols-2">{companies.map(c=><Link key={c.slug} to="/empresas/$empresa" params={{empresa:c.slug}} className="group grid min-h-72 overflow-hidden border border-border sm:grid-cols-[0.88fr_1.12fr]"><div className="relative min-h-52 overflow-hidden"><img src={images[c.image]} alt={c.category} loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="flex flex-col p-7"><div className="flex items-center justify-between"><span className="eyebrow text-primary">{c.category}</span><span className="text-xs text-muted-foreground">{c.number}</span></div><div className="mt-6 inline-flex self-start border border-dashed border-border px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Área para logótipo oficial</div><h2 className="mt-4 font-display text-xl font-semibold">{c.name}</h2><p className="mt-3 text-sm leading-6 text-ink-soft">{c.area}</p><span className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase text-primary">Ver empresa <ArrowRight className="size-4"/></span></div></Link>)}</div></section></> }