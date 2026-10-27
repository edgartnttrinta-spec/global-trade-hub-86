import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Search, ShieldCheck, Globe2, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companies, solutions } from "@/lib/site-data";
import hero from "@/assets/global-trade-hero.jpg";
import agriculture from "@/assets/agriculture.jpg";
import technology from "@/assets/technology.jpg";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Global Trade Group | Soluções empresariais em Moçambique" },
    { name: "description", content: "Conheça as empresas, produtos e soluções do Global Trade Group. Comércio, tecnologia, agricultura, segurança, logística e mobilidade em Moçambique." },
    { property: "og:title", content: "Global Trade Group — Soluções que conectam oportunidades" },
    { property: "og:description", content: "Produtos, equipamentos e soluções empresariais para Moçambique e além-fronteiras." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const sectors = [
  { image: technology, title: "Tecnologia profissional", copy: "Equipamentos, infraestrutura e soluções tecnológicas para organizações modernas.", alt: "Equipamentos tecnológicos profissionais" },
  { image: agriculture, title: "Agricultura e produção", copy: "Máquinas, implementos e equipamentos para apoiar operações agrícolas.", alt: "Equipamentos agrícolas" },
  { image: logistics, title: "Logística e mobilidade", copy: "Soluções de transporte, distribuição e mobilidade para empresas e projectos.", alt: "Operações de logística e transporte" },
];

function Index() {
  return <>
    <section className="relative isolate min-h-[640px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[700px]">
      <img src={hero} alt="Operações de comércio e logística do Global Trade Group" width={1920} height={1080} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.17_0.06_252/0.98)_0%,oklch(0.19_0.07_252/0.88)_42%,oklch(0.19_0.07_252/0.28)_100%)]" />
      <div className="section-shell flex min-h-[640px] items-center py-20 sm:min-h-[700px]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/90 backdrop-blur-sm"><span className="size-2 rounded-full bg-accent" /> Parceiro para negócios em Moçambique</div>
          <p className="eyebrow mt-8 text-accent">Comércio · Tecnologia · Agricultura · Logística</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Soluções integradas para <span className="text-accent">fazer avançar</span> o seu negócio.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">Ligamos empresas a produtos, equipamentos e serviços de diferentes sectores, com uma abordagem comercial orientada para as necessidades de cada cliente.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"><Link to="/solicitar-cotacao" search={{ empresa: undefined }}>Solicitar cotação <ArrowRight className="ml-1 size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/35 bg-primary-foreground/5 px-6 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/empresas">Explorar empresas</Link></Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-primary-foreground/20 pt-5 text-xs font-medium text-primary-foreground/75 sm:text-sm"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-accent"/> Atendimento comercial</span><span className="inline-flex items-center gap-2"><Globe2 className="size-4 text-accent"/> Moçambique e além-fronteiras</span><span className="inline-flex items-center gap-2"><Boxes className="size-4 text-accent"/> Múltiplas áreas de fornecimento</span></div>
        </div>
      </div>
    </section>
    <section className="relative z-10 -mt-7"><div className="section-shell"><form action="/produtos" className="grid gap-3 border border-border bg-background p-3 shadow-2xl shadow-primary/10 sm:p-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"><Search className="ml-2 hidden size-5 text-primary md:block"/><Input name="q" aria-label="Pesquisar produtos" className="h-12 border-0 bg-surface px-4 shadow-none" placeholder="O que procura? Produtos, equipamentos ou soluções..."/><Button size="lg" type="submit" className="h-12 px-7">Pesquisar <ArrowRight className="ml-2 size-4"/></Button></form></div></section>
    <section className="section-shell py-20 sm:py-24">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-primary">Um grupo, várias especialidades</p><h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">O parceiro certo para diferentes necessidades.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">As nossas empresas reúnem áreas complementares para ajudar clientes e organizações a encontrar soluções num único ponto de contacto.</p></div><Link to="/empresas" className="inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-bold text-primary">Conhecer o grupo <ArrowRight className="size-4"/></Link></div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{companies.map((company) => { const Icon = company.icon; return <Link key={company.slug} to="/empresas/$empresa" params={{ empresa: company.slug }} className="group flex min-h-[230px] flex-col border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5"/></span><span className="font-display text-xs font-semibold tracking-widest text-muted-foreground">{company.number}</span></div><h3 className="mt-7 font-display text-lg font-semibold leading-snug">{company.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{company.area}</p><span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-wider text-primary">Ver empresa <ChevronRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>; })}</div>
    </section>
    <section className="bg-surface py-20 sm:py-24"><div className="section-shell"><div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-primary">Áreas de actuação</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Competências que criam possibilidades.</h2></div><p className="max-w-xl text-base leading-7 text-ink-soft lg:justify-self-end">Apoiamos necessidades de fornecimento e projectos em diferentes sectores, procurando alinhar cada pedido com a solução mais adequada.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{solutions.map((solution, i) => <Link key={solution} to="/solucoes" className="group flex min-h-28 items-end justify-between border border-border/80 bg-background p-5 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:p-6"><span className="max-w-[80%] font-display text-base font-semibold">{solution}</span><span className="text-xs font-bold text-muted-foreground group-hover:text-accent">{String(i+1).padStart(2,"0")}</span></Link>)}</div></div></section>
    <section className="grid md:grid-cols-3">{sectors.map((sector) => <article key={sector.title} className="group relative min-h-[360px] overflow-hidden sm:min-h-[420px]"><img src={sector.image} alt={sector.alt} loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-primary/5"/><div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground sm:p-9"><span className="eyebrow text-accent">Global Trade Group</span><h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{sector.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/80">{sector.copy}</p><Link to="/solucoes" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Explorar soluções <ArrowRight className="size-4"/></Link></div></article>)}</section>
    <section className="section-shell py-20 sm:py-24"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="eyebrow text-primary">Uma abordagem clara</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">Do primeiro contacto à solução.</h2><p className="mt-5 max-w-md text-base leading-7 text-ink-soft">Um processo comercial organizado para compreender o pedido e orientar os próximos passos com clareza.</p><Button asChild className="mt-7"><Link to="/contactos">Fale connosco <ArrowRight className="ml-2 size-4"/></Link></Button></div><ol className="border-t border-border">{["Compreendemos a sua necessidade","Identificamos opções de fornecimento","Preparamos a proposta comercial","Coordenamos os próximos passos"].map((step,i)=><li key={step} className="grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-border py-5 sm:py-6"><span className="font-display text-sm font-bold text-primary">0{i+1}</span><strong className="font-display text-base font-semibold">{step}</strong><Check className="size-4 text-accent"/></li>)}</ol></div></section>
    <section className="bg-primary text-primary-foreground"><div className="section-shell flex flex-col justify-between gap-7 py-14 sm:py-16 md:flex-row md:items-center"><div><p className="eyebrow text-accent">Vamos conversar</p><h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-4xl">Tem um projecto ou precisa de um fornecimento?</h2><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75 sm:text-base">Partilhe o que procura e entre em contacto com a nossa equipa comercial.</p></div><Button asChild size="lg" className="h-12 shrink-0 bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"><Link to="/solicitar-cotacao" search={{ empresa: undefined }}>Pedir uma cotação <ArrowRight className="ml-2 size-4"/></Link></Button></div></section>
  </>;
}
