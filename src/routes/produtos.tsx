import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageSearch, Search, ArrowRight, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companies, companyCategories } from "@/lib/site-data";

export const Route = createFileRoute("/produtos")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [
    { title: "Produtos e categorias | Global Trade & Services, Lda" },
    { name: "description", content: "Explore categorias de tecnologia, agricultura, segurança, logística, gelo, avicultura e mobilidade em Moçambique." },
    { name: "robots", content: "index,follow" },
  ] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q: initialQuery } = Route.useSearch();
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState("todas");
  const [category, setCategory] = useState("todas");
  const categories = useMemo(() => [...new Set(companies.flatMap(c => companyCategories[c.slug] ?? []))].sort((a,b) => a.localeCompare(b, "pt")), []);
  const entries = useMemo(() => companies.flatMap(c => (companyCategories[c.slug] ?? []).map(name => ({ name, company: c })))
    .filter(item => (brand === "todas" || item.company.slug === brand) && (category === "todas" || item.name === category) && (!query.trim() || (item.name + " " + item.company.name + " " + item.company.area).toLocaleLowerCase("pt").includes(query.trim().toLocaleLowerCase("pt")))), [brand, category, query]);
  return <>
    <PageHero eyebrow="Catálogo comercial" title="Produtos, equipamentos e soluções">Explore as categorias por área de negócio. Esta página não apresenta anúncios como disponíveis: cada produto, especificação, preço e prazo deverá ser confirmado pela equipa comercial.</PageHero>
    <section className="section-shell py-14 sm:py-20">
      <div className="grid gap-3 border border-border bg-background p-4 md:grid-cols-[1fr_220px_220px_auto] md:items-center">
        <label className="relative"><span className="sr-only">Pesquisar produtos ou categorias</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="h-11 pl-9" placeholder="Pesquisar categoria, marca..." /></label>
        <label className="text-xs font-semibold text-muted-foreground">Marca<select value={brand} onChange={e=>setBrand(e.target.value)} className="mt-1 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="todas">Todas as marcas</option>{companies.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <label className="text-xs font-semibold text-muted-foreground">Categoria<select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="todas">Todas as categorias</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
        <Button variant="outline" type="button" onClick={()=>{setQuery("");setBrand("todas");setCategory("todas");}}><Filter className="size-4"/> Limpar</Button>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground"><span>{entries.length} categorias encontradas</span><span>Preços sob consulta</span></div>
      {entries.length ? <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{entries.map((entry,i)=><article key={entry.company.slug + entry.name} className="flex min-h-56 flex-col border border-border bg-background p-6 transition-colors hover:border-primary/40"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center bg-surface text-primary"><PackageSearch className="size-5"/></span><span className="text-xs text-muted-foreground">{String(i+1).padStart(2,"0")}</span></div><p className="eyebrow mt-5 text-primary">{entry.company.short}</p><h2 className="mt-2 font-display text-lg font-semibold">{entry.name}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Categoria para consulta comercial. Disponibilidade e especificações sujeitas a confirmação.</p><div className="mt-auto flex flex-wrap gap-3 pt-5"><Button asChild size="sm"><Link to="/solicitar-cotacao" search={{empresa:entry.company.slug}}>Pedir cotação <ArrowRight className="size-4"/></Link></Button><Button asChild size="sm" variant="outline"><Link to="/empresas/$empresa" params={{empresa:entry.company.slug}}>Ver marca</Link></Button></div></article>)}</div> : <div className="mt-8 border border-dashed border-border bg-surface px-6 py-16 text-center"><PackageSearch className="mx-auto size-10 text-primary"/><h2 className="mt-4 font-display text-xl font-semibold">Não foram encontradas categorias</h2><p className="mt-2 text-sm text-ink-soft">Altere os filtros ou solicite ajuda à equipa comercial.</p><Button asChild className="mt-5"><Link to="/contactos">Contactar a equipa</Link></Button></div>}
      <p className="mt-8 text-xs leading-5 text-muted-foreground">Nota: as categorias representam áreas de consulta comercial, não confirmam stock, preços ou disponibilidade imediata.</p>
    </section>
  </>;
}
