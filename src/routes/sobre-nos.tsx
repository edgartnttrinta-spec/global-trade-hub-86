import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Eye, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({ meta: [
    { title: "Sobre nós | Global Trade & Services, Lda" },
    { name: "description", content: "Conheça a Global Trade & Services, Lda, empresa moçambicana de comércio, importação e fornecimento sediada em Maputo." },
    { property: "og:title", content: "Sobre nós | Global Trade & Services, Lda" },
    { property: "og:description", content: "Movimentamos negócios, conectamos soluções." },
  ] }),
  component: AboutPage,
});

const values = ["Integridade", "Profissionalismo", "Responsabilidade", "Inovação", "Compromisso com o cliente", "Excelência empresarial"];

function AboutPage() {
  return <>
    <PageHero eyebrow="Sobre a empresa" title="Movimentamos negócios, conectamos soluções.">A Global Trade & Services, Lda é uma empresa moçambicana sediada em Maputo, orientada para o comércio, a importação e o fornecimento de produtos, equipamentos e soluções para diferentes sectores de actividade.</PageHero>
    <section className="section-shell py-20 sm:py-24"><div className="grid gap-14 lg:grid-cols-2"><div><p className="eyebrow text-primary">Quem somos</p><h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">Uma estrutura comercial com áreas especializadas</h2></div><div className="space-y-5 text-base leading-8 text-ink-soft"><p>A empresa coordena um portefólio de marcas comerciais que cobre tecnologia, agricultura, segurança, logística, gelo, avicultura e mobilidade, além das actividades de comércio e fornecimento da empresa principal.</p><p>O modelo de negócio inclui consultas comerciais, sourcing, importação e fornecimento de produtos e equipamentos. A disponibilidade, os prazos, os preços e as especificações são confirmados caso a caso.</p><p>Os conteúdos institucionais desta página são editáveis e poderão ser complementados pela administração com informação corporativa validada.</p></div></div></section>
    <section className="bg-surface py-20"><div className="section-shell grid gap-px bg-border md:grid-cols-3">{[[Compass,"Missão","Disponibilizar produtos, equipamentos e soluções comerciais que respondam às necessidades dos nossos clientes, promovendo relações profissionais, eficiência e oportunidades de negócio."],[Eye,"Visão","Consolidar a Global Trade & Services como uma referência empresarial em Moçambique, desenvolvendo um portefólio diversificado de soluções e relações comerciais sustentáveis."],[ShieldCheck,"Compromisso","Actuar com integridade, profissionalismo, responsabilidade e clareza na análise dos pedidos e na comunicação com os clientes."]].map(([Icon,title,copy])=>{const I=Icon as typeof Compass;return <article key={String(title)} className="bg-background p-8"><I className="size-7 text-primary"/><h3 className="mt-8 font-display text-xl font-semibold">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-ink-soft">{String(copy)}</p></article>})}</div></section>
    <section className="section-shell py-20 sm:py-24"><p className="eyebrow text-primary">Os nossos valores</p><h2 className="mt-4 font-display text-3xl font-semibold">Princípios que orientam a nossa actividade</h2><div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-3">{values.map((v,i)=><div key={v} className="bg-background p-6"><span className="text-xs text-muted-foreground">{String(i+1).padStart(2,"0")}</span><h3 className="mt-8 font-display font-semibold">{v}</h3></div>)}</div><Button asChild className="mt-10"><Link to="/empresas">Conheça o portefólio <ArrowRight className="ml-2 size-4"/></Link></Button></section>
  </>;
}
