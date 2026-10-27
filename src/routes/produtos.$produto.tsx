import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, ClipboardList, PackageSearch } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { getCatalogProduct, catalogProducts } from "@/lib/catalog-products";

export const Route = createFileRoute("/produtos/$produto")({
  head: ({ params }) => {
    const product = getCatalogProduct(params.produto);
    return { meta: [
      { title: product ? product.name + " | Catálogo Global Trade & Services" : "Produto | Global Trade & Services" },
      { name: "description", content: product ? product.description : "Consulte o catálogo comercial da Global Trade & Services." },
      { name: "robots", content: "index,follow" },
    ] };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { produto } = Route.useParams();
  const product = getCatalogProduct(produto);
  if (!product) return <section className="section-shell py-20"><PackageSearch className="size-10 text-primary"/><h1 className="mt-5 font-display text-3xl font-semibold">Produto não encontrado</h1><p className="mt-3 text-ink-soft">O endereço pode estar incorrecto ou a categoria já não estar disponível.</p><Button asChild className="mt-6"><Link to="/produtos">Voltar ao catálogo</Link></Button></section>;
  const related = catalogProducts.filter((item) => item.companySlug === product.companySlug && item.slug !== product.slug).slice(0, 3);
  return <>
    <PageHero eyebrow="Catálogo comercial" title={product.name}>{product.companyName} · Consulte os detalhes e envie os requisitos à equipa comercial.</PageHero>
    <section className="section-shell py-12 sm:py-16">
      <Link to="/produtos" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4"/> Voltar ao catálogo</Link>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex min-h-[300px] items-center justify-center border border-border bg-surface p-10 sm:min-h-[440px]"><div className="text-center"><span className="mx-auto grid size-24 place-items-center rounded-full bg-background text-primary shadow-sm"><PackageSearch className="size-12"/></span><p className="mt-5 font-display text-xl font-semibold">{product.imageLabel}</p><p className="mt-2 text-sm text-muted-foreground">Imagem e modelo específicos a confirmar</p></div></div>
        <div className="border border-border p-6 sm:p-8"><p className="eyebrow text-primary">Detalhes do produto</p><h2 className="mt-3 font-display text-3xl font-semibold">{product.name}</h2><p className="mt-4 leading-7 text-ink-soft">{product.description}</p>
          <div className="mt-7 space-y-4 border-y border-border py-5 text-sm"><div className="flex gap-3"><Building2 className="mt-0.5 size-5 shrink-0 text-primary"/><div><p className="font-semibold">Empresa responsável</p><p className="mt-1 text-muted-foreground">{product.companyName}</p></div></div><div className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary"/><div><p className="font-semibold">Disponibilidade</p><p className="mt-1 text-muted-foreground">Confirmada individualmente mediante consulta.</p></div></div><div className="flex gap-3"><ClipboardList className="mt-0.5 size-5 shrink-0 text-primary"/><div><p className="font-semibold">Preço e especificações</p><p className="mt-1 text-muted-foreground">Sob consulta. Não indicamos stock ou preços não confirmados.</p></div></div></div>
          <Button asChild size="lg" className="mt-7 w-full"><Link to="/solicitar-cotacao" search={{ empresa: product.companySlug }}>Solicitar cotação <ArrowRight className="ml-2 size-4"/></Link></Button>
          <Button asChild size="lg" variant="outline" className="mt-3 w-full"><Link to="/empresas/$empresa" params={{ empresa: product.companySlug }}>Conhecer a empresa</Link></Button>
        </div>
      </div>
      {related.length > 0 && <div className="mt-16"><h2 className="font-display text-2xl font-semibold">Outras categorias desta marca</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{related.map((item)=><Link key={item.slug} to="/produtos/$produto" params={{produto:item.slug}} className="border border-border p-5 transition-colors hover:border-primary/40"><p className="text-xs font-bold uppercase tracking-wider text-primary">{item.companyShort}</p><h3 className="mt-3 font-display font-semibold">{item.name}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver detalhes <ArrowRight className="size-4"/></span></Link>)}</div></div>}
    </section>
  </>;
}
