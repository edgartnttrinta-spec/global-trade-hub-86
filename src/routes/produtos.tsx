import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageSearch, Search, ArrowRight, Filter, Building2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companies } from "@/lib/site-data";
import { catalogProducts } from "@/lib/catalog-products";

export const Route = createFileRoute("/produtos")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({ meta: [
    { title: "Catálogo de produtos | Global Trade & Services, Lda" },
    { name: "description", content: "Pesquise o catálogo comercial e filtre produtos por empresa, marca ou categoria." },
    { name: "robots", content: "index,follow" },
  ] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q: initialQuery } = Route.useSearch();
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState("todas");
  const [category, setCategory] = useState("todas");
  const categories = useMemo(() => [...new Set(catalogProducts.map((product) => product.category))].sort((a,b) => a.localeCompare(b, "pt")), []);
  const entries = useMemo(() => catalogProducts.filter((item) =>
    (brand === "todas" || item.companySlug === brand) &&
    (category === "todas" || item.category === category) &&
    (!query.trim() || (item.name + " " + item.companyName + " " + item.description).toLocaleLowerCase("pt").includes(query.trim().toLocaleLowerCase("pt")))
  ), [brand, category, query]);
  return <>
    <PageHero eyebrow="Catálogo comercial" title="Produtos, equipamentos e soluções">Explore o catálogo por empresa, marca ou categoria. Os detalhes, preços e prazos são confirmados pela equipa comercial mediante consulta.</PageHero>
    <section className="section-shell py-14 sm:py-20">
      <div className="grid gap-3 border border-border bg-background p-4 md:grid-cols-[1fr_240px_220px_auto] md:items-center">
        <label className="relative"><span className="sr-only">Pesquisar produtos ou categorias</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="h-11 pl-9" placeholder="Pesquisar produto, equipamento ou marca..."/></label>
        <label className="text-xs font-semibold text-muted-foreground">Empresa / marca<select value={brand} onChange={e=>setBrand(e.target.value)} className="mt-1 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="todas">Todas as empresas</option>{companies.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <label className="text-xs font-semibold text-muted-foreground">Categoria<select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="todas">Todas as categorias</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
        <Button variant="outline" type="button" onClick={()=>{setQuery("");setBrand("todas");setCategory("todas");}}><Filter className="size-4"/> Limpar</Button>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground"><span>{entries.length} itens no catálogo</span><span>Preços sob consulta</span></div>
      {entries.length ? <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{entries.map((entry,i)=><article key={entry.slug} className="group flex min-h-64 flex-col border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"><div className="flex items-center justify-between"><span className="grid size-12 place-items-center bg-surface text-primary"><PackageSearch className="size-6"/></span><span className="text-xs text-muted-foreground">{String(i+1).padStart(2,"0")}</span></div><p className="eyebrow mt-5 text-primary">{entry.companyShort}</p><h2 className="mt-2 font-display text-lg font-semibold">{entry.name}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{entry.description}</p><div className="mt-auto flex flex-wrap gap-2 pt-5"><Button asChild size="sm"><Link to="/produtos/$produto" params={{produto:entry.slug}}>Ver detalhes <ArrowRight className="size-4"/></Link></Button><Button asChild size="sm" variant="outline"><Link to="/solicitar-cotacao" search={{empresa:entry.companySlug}}>Cotação</Link></Button></div><p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground"><Building2 className="size-3.5"/>{entry.companyName}</p></article>)}</div> : <div className="mt-8 border border-dashed border-border bg-surface px-6 py-16 text-center"><PackageSearch className="mx-auto size-10 text-primary"/><h2 className="mt-4 font-display text-xl font-semibold">Não foram encontrados produtos</h2><p className="mt-2 text-sm text-ink-soft">Altere os filtros ou solicite ajuda à equipa comercial.</p><Button asChild className="mt-5"><Link to="/contactos">Contactar a equipa</Link></Button></div>}
      <p className="mt-8 text-xs leading-5 text-muted-foreground">Nota: este catálogo apresenta categorias para consulta comercial; não confirma stock, preços ou disponibilidade imediata.</p>
    </section>
  </>;
}
