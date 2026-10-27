import { Link } from "@tanstack/react-router";
import { Globe2, Menu, X, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { companies } from "@/lib/site-data";

const nav = [
  ["/", "Início"], ["/sobre-nos", "Sobre nós"], ["/empresas", "Portefólio"], ["/solucoes", "Soluções"],
  ["/produtos", "Produtos"], ["/contactos", "Contactos"],
] as const;

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" aria-label="Global Trade & Services, Lda — início" className="flex max-w-[280px] shrink-0 items-center gap-3">
    
    <span className="leading-tight"><strong className="block font-display text-[13px] font-extrabold sm:text-[14px]">GLOBAL TRADE & SERVICES</strong><span className={"mt-1 block text-[10px] font-semibold tracking-[0.16em] " + (inverse ? "text-primary-foreground/65" : "text-muted-foreground")}>LDA · MOÇAMBIQUE</span></span>
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
    <div className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto flex min-h-9 max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-1 text-[11px] font-medium sm:px-8">
        <span>Maputo, Moçambique · MOVIMENTAMOS NEGÓCIOS, CONECTAMOS SOLUÇÕES</span>
        <div className="flex items-center gap-4"><a href="tel:+258868855435" className="inline-flex items-center gap-1"><Phone className="size-3" /> +258 86 885 5435</a><a href="mailto:comercial@globaltrade.co.mz" className="hidden items-center gap-1 sm:inline-flex"><Mail className="size-3" /> E-mail comercial</a></div>
      </div>
    </div>
    <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
      <Brand />
      <nav aria-label="Navegação principal" className="ml-auto hidden items-center gap-5 xl:flex">{nav.map(([to,label]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="text-[12px] font-bold uppercase text-foreground/72 transition-colors hover:text-primary" activeProps={{className:"text-primary"}}>{label}</Link>)}</nav>
      <div className="hidden items-center gap-2 xl:flex"><Button asChild><Link to="/solicitar-cotacao" search={{ empresa: undefined }}>Solicitar cotação <ArrowRight className="ml-1 size-4" /></Link></Button></div>
      <Button type="button" size="icon" variant="ghost" className="xl:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <div className="fixed inset-x-0 bottom-0 top-0 z-50 overflow-y-auto bg-primary p-6 text-primary-foreground xl:hidden"><div className="flex items-center justify-between"><Brand inverse/><Button size="icon" variant="ghost" className="text-primary-foreground" aria-label="Fechar menu" onClick={() => setOpen(false)}><X/></Button></div><nav aria-label="Navegação móvel" className="mt-10 flex flex-col">{nav.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b border-primary-foreground/15 py-4 font-display text-xl">{label}</Link>)}</nav><Button asChild className="mt-7 w-full bg-accent text-accent-foreground"><Link to="/solicitar-cotacao" search={{ empresa: undefined }} onClick={() => setOpen(false)}>Solicitar cotação</Link></Button></div>}
  </header>;
}

export function Footer() {
  return <footer className="bg-primary text-primary-foreground">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
      <div><Brand inverse/><p className="mt-6 max-w-xs text-sm font-semibold leading-6 text-primary-foreground/80">MOVIMENTAMOS NEGÓCIOS, CONECTAMOS SOLUÇÕES</p><p className="mt-3 max-w-xs text-sm leading-6 text-primary-foreground/65">Empresa moçambicana orientada para comércio, importação e fornecimento de produtos, equipamentos e soluções empresariais.</p></div>
      <div><h3 className="footer-title">Institucional</h3><div className="footer-links"><Link to="/sobre-nos">Sobre nós</Link><Link to="/empresas">O nosso portefólio</Link><Link to="/solucoes">Soluções</Link><Link to="/produtos">Produtos e categorias</Link><Link to="/solicitar-cotacao" search={{ empresa: undefined }}>Solicitar cotação</Link><Link to="/contactos">Contactos</Link></div></div>
      <div><h3 className="footer-title">Marcas comerciais</h3><div className="footer-links">{companies.filter(c => c.slug !== "global-trade-services").map(c => <a key={c.slug} href={"mailto:" + c.email}>{c.name}</a>)}</div></div>
      <div><h3 className="footer-title">Contactos oficiais</h3><div className="footer-links"><span className="inline-flex items-center gap-2"><Globe2 className="size-4"/> Maputo, Moçambique</span><a href="tel:+258868855435">+258 86 885 5435</a><a href="mailto:geral@globaltrade.co.mz">geral@globaltrade.co.mz</a><a href="mailto:comercial@globaltrade.co.mz">comercial@globaltrade.co.mz</a><a href="https://www.globaltrade.co.mz">www.globaltrade.co.mz</a></div></div>
    </div>
    <div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-primary-foreground/55 sm:px-8 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Global Trade & Services, Lda. Todos os direitos reservados.</span><span>Preços e disponibilidade sujeitos a confirmação comercial.</span></div></div>
  </footer>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow text-accent">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/70 sm:text-lg">{children}</p></div></section>;
}
