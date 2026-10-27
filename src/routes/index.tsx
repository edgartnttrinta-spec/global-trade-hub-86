import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Search, ShieldCheck, Globe2, Boxes, Mail, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companies, solutions } from "@/lib/site-data";
import hero from "@/assets/global-trade-hero.jpg";
import agriculture from "@/assets/agriculture.jpg";
import technology from "@/assets/technology.jpg";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Global Trade & Services, Lda | Comércio e fornecimento em Moçambique" },
    { name: "description", content: "Empresa moçambicana de comércio, importação e fornecimento de produtos, equipamentos e soluções empresariais em Maputo." },
    { name: "author", content: "Global Trade & Services, Lda" },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Global Trade & Services, Lda" },
    { property: "og:description", content: "Movimentamos negócios, conectamos soluções." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.globaltrade.co.mz/" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const sectors = [
  { image: technology, title: "Tecnologia e informática", copy: "Computadores, equipamentos electrónicos, impressão e acessórios.", alt: "Equipamentos tecnológicos" },
  { image: agriculture, title: "Agricultura e mecanização", copy: "Tractores, implementos, máquinas agrícolas e peças.", alt: "Equipamentos agrícolas" },
  { image: logistics, title: "Logística e mobilidade", copy: "Consultas sobre transporte, entregas, viaturas e soluções de mobilidade.", alt: "Logística e transporte" },
];

function Index() {
  return <>
    <section className="relative isolate min-h-[620px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[700px]">
      <img src={hero} alt="Contexto ilustrativo de comércio e logística" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-center"/>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.17_0.06_252/0.98)_0%,oklch(0.19_0.07_252/0.88)_48%,oklch(0.19_0.07_252/0.25)_100%)]"/>
      <div className="section-shell flex min-h-[620px] items-center py-20 sm:min-h-[700px]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/90 backdrop-blur-sm"><span className="size-2 rounded-full bg-accent"/> Empresa moçambicana · Maputo</div>
          <p className="eyebrow mt-8 text-accent">Comércio · Importação · Fornecimento</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">GLOBAL TRADE <span className="text-accent">& SERVICES</span></h1>
          <p className="mt-4 font-display text-xl font-semibold leading-8 sm:text-2xl">MOVIMENTAMOS NEGÓCIOS, CONECTAMOS SOLUÇÕES</p>
          <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">A Global Trade & Services, Lda é uma empresa moçambicana orientada para o comércio, a importação e o fornecimento de produtos, equipamentos e soluções para diferentes sectores de actividade. Através de um portefólio diversificado de marcas comerciais, procuramos responder às necessidades de clientes particulares, empresas e organizações.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"><Link to="/empresas">Explorar as nossas marcas <ArrowRight className="ml-1 size-4"/></Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/35 bg-primary-foreground/5 px-6 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/contactos">Contactar a equipa</Link></Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-primary-foreground/20 pt-5 text-xs font-medium text-primary-foreground/75 sm:text-sm"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-accent"/> Consultas comerciais</span><span className="inline-flex items-center gap-2"><Globe2 className="size-4 text-accent"/> Base em Maputo, Moçambique</span><span className="inline-flex items-center gap-2"><Boxes className="size-4 text-accent"/> Oito marcas no portefólio</span></div>
        </div>
      </div>
    </section>
    <section className="relative z-10 -mt-7"><div className="section-shell"><form action="/produtos" className="grid gap-3 border border-border bg-background p-3 shadow-2xl shadow-primary/10 sm:p-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"><Search className="ml-2 hidden size-5 text-primary md:block"/><Input name="q" aria-label="Pesquisar categorias" className="h-12 border-0 bg-surface px-4 shadow-none" placeholder="Pesquisar categorias, equipamentos ou áreas de negócio..."/><Button size="lg" type="submit" className="h-12 px-7">Consultar catálogo <ArrowRight className="ml-2 size-4"/></Button></form></div></section>
    <section className="section-shell py-20 sm:py-24">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-primary">O nosso portefólio</p><h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Oito marcas comerciais. Diferentes áreas de negócio.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">Cada marca concentra-se numa área específica, com contactos directos para consultas e pedidos de informação.</p></div><Link to="/empresas" className="inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-bold text-primary">Ver portefólio completo <ArrowRight className="size-4"/></Link></div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{companies.map(company => { return <Link key={company.slug} to="/empresas/$empresa" params={{empresa:company.slug}} className="group flex min-h-[235px] flex-col border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7"><div className="flex items-center justify-between"><span className="flex min-h-11 items-center border border-dashed border-border px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:border-primary-foreground/40 group-hover:text-primary">Logótipo oficial</span><span className="font-display text-xs font-semibold tracking-widest text-muted-foreground">{company.number}</span></div><h3 className="mt-7 font-display text-lg font-semibold leading-snug">{company.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{company.area}</p><span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-wider text-primary">Conhecer marca <ChevronRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>; })}</div>
    </section>
    <section className="bg-surface py-20 sm:py-24"><div className="section-shell"><div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-primary">Áreas de negócio</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Soluções comerciais para diferentes sectores.</h2></div><p className="max-w-xl text-base leading-7 text-ink-soft lg:justify-self-end">Explore as áreas de actuação e envie a sua consulta. Produtos, disponibilidade, especificações e prazos serão confirmados individualmente.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{solutions.map((solution,i)=><Link key={solution} to="/solucoes" className="group flex min-h-28 items-end justify-between border border-border/80 bg-background p-5 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:p-6"><span className="max-w-[80%] font-display text-base font-semibold">{solution}</span><span className="text-xs font-bold text-muted-foreground group-hover:text-accent">{String(i+1).padStart(2,"0")}</span></Link>)}</div></div></section>
    <section className="grid md:grid-cols-3">{sectors.map(sector=><article key={sector.title} className="group relative min-h-[360px] overflow-hidden sm:min-h-[420px]"><img src={sector.image} alt={sector.alt} loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-primary/5"/><div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground sm:p-9"><span className="eyebrow text-accent">Global Trade & Services</span><h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{sector.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/80">{sector.copy}</p><Link to="/produtos" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Explorar categorias <ArrowRight className="size-4"/></Link></div></article>)}</section>
    <section className="section-shell py-20 sm:py-24"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="eyebrow text-primary">Importação e fornecimento</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Tem uma lista de materiais ou um equipamento específico?</h2><p className="mt-5 max-w-md text-base leading-7 text-ink-soft">Envie os requisitos, referências técnicas e quantidades pretendidas. A equipa poderá analisar o pedido e confirmar as opções comerciais disponíveis.</p><Button asChild className="mt-7"><Link to="/solicitar-cotacao" search={{empresa:undefined}}>Solicitar cotação <ArrowRight className="ml-2 size-4"/></Link></Button></div><div className="border-t border-border">{["Partilhe a sua necessidade e as especificações disponíveis","Identificaremos a marca comercial mais adequada","A proposta, o preço e o prazo serão confirmados comercialmente"].map((step,i)=><div key={step} className="grid grid-cols-[auto_1fr] gap-5 border-b border-border py-6"><span className="font-display text-sm font-bold text-primary">0{i+1}</span><p className="font-display text-lg font-semibold">{step}</p></div>)}</div></div></section>
    <section className="bg-primary py-16 text-primary-foreground"><div className="section-shell flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><p className="eyebrow text-accent">Contacto comercial</p><h2 className="mt-3 font-display text-3xl font-semibold">Vamos analisar o seu pedido.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/70">Maputo, Moçambique · +258 86 885 5435 · comercial@globaltrade.co.mz</p></div><div className="flex flex-wrap gap-3"><Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/solicitar-cotacao" search={{empresa:undefined}}>Solicitar cotação</Link></Button><Button asChild variant="outline" className="border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="mailto:comercial@globaltrade.co.mz"><Mail className="mr-2 size-4"/> E-mail comercial</a></Button></div></div></section>
  </>;
}
