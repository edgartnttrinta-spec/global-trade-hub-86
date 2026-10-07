import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Eye, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre-nos")({
  head: () => ({ meta: [
    { title: "Sobre Nós — Global Trade Group" },
    { name: "description", content: "Conheça a estrutura e os princípios do Global Trade Group em Moçambique." },
    { property: "og:title", content: "Sobre Nós — Global Trade Group" },
    { property: "og:description", content: "Um grupo moçambicano com competências em comércio, tecnologia, agricultura, segurança, logística e mobilidade." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: AboutPage,
});

const values = ["Integridade", "Excelência", "Compromisso", "Inovação", "Responsabilidade", "Confiança", "Foco no Cliente", "Profissionalismo"];

function AboutPage() {
  return <><PageHero eyebrow="Sobre nós" title="Competências distintas. Uma visão comum.">O Global Trade Group reúne oito empresas que atuam em diferentes setores, com uma estrutura preparada para servir empresas, instituições e projetos.</PageHero>
    <section className="section-shell py-24"><div className="grid gap-14 lg:grid-cols-2"><div><p className="eyebrow text-primary">Quem somos</p><h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">Um grupo orientado para soluções</h2></div><div className="space-y-5 text-base leading-8 text-ink-soft"><p>A Global Trade & Services, Lda é a empresa principal do Global Trade Group. Através das empresas do grupo, a organização atua em áreas complementares de fornecimento, tecnologia, agricultura, segurança, logística, produção, avicultura e mobilidade.</p><p>Os conteúdos sobre a história e marcos institucionais serão publicados após validação pela administração.</p></div></div></section>
    <section className="bg-surface py-20"><div className="section-shell grid gap-px bg-border md:grid-cols-3">{[[Compass,"Missão","Fornecer produtos, serviços e soluções com foco na qualidade, confiança e desenvolvimento de relações duradouras."],[Eye,"Visão","Crescer de forma sustentável, expandir regionalmente e afirmar excelência e inovação nos mercados de atuação."],[ShieldCheck,"Compromisso","Responder às necessidades de cada cliente com profissionalismo, responsabilidade e clareza comercial."]].map(([Icon,title,copy]) => { const I=Icon as typeof Compass; return <article key={String(title)} className="bg-background p-8"><I className="size-7 text-accent"/><h3 className="mt-8 font-display text-xl font-semibold">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-ink-soft">{String(copy)}</p></article>})}</div></section>
    <section className="section-shell py-24"><p className="eyebrow text-primary">Os nossos valores</p><h2 className="mt-4 font-display text-3xl font-semibold">Princípios que orientam o grupo</h2><div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-4">{values.map((v,i)=><div key={v} className="bg-background p-6"><span className="text-xs text-muted-foreground">0{i+1}</span><h3 className="mt-8 font-display font-semibold">{v}</h3></div>)}</div><Button asChild className="mt-10"><Link to="/empresas">Conheça as empresas <ArrowRight/></Link></Button></section>
  </>;
}