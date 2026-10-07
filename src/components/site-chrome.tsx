import { Link } from "@tanstack/react-router";
import { Globe2, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["/", "Início"], ["/sobre-nos", "Sobre nós"], ["/empresas", "Empresas"],
  ["/solucoes", "Soluções"], ["/produtos", "Produtos"], ["/contactos", "Contactos"],
] as const;

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" aria-label="Global Trade Group — início" className="flex shrink-0 items-center gap-3">
    <span className={`grid size-10 place-items-center border-2 font-display text-sm font-bold ${inverse ? "border-primary-foreground text-primary-foreground" : "border-primary text-primary"}`}>GT</span>
    <span className="leading-none"><strong className="block font-display text-[15px] font-bold">GLOBAL TRADE</strong><span className={`mt-1 block text-[10px] font-semibold tracking-[0.24em] ${inverse ? "text-primary-foreground/60" : "text-muted-foreground"}`}>GROUP</span></span>
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
    <div className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-5 text-[11px] font-medium sm:px-8">
        <span>MOÇAMBIQUE · SOLUÇÕES PARA NEGÓCIOS</span>
        <div className="flex items-center gap-4"><a href="tel:+258868855435">+258 86 885 5435</a><span className="hidden sm:inline">PT&nbsp; / &nbsp;EN</span></div>
      </div>
    </div>
    <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:flex">
      <Brand />
      <nav className="ml-auto hidden items-center gap-6 lg:flex">{nav.map(([to,label]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="text-[12px] font-bold uppercase text-foreground/72 transition-colors hover:text-primary" activeProps={{className:"text-primary"}}>{label}</Link>)}</nav>
      <div className="hidden items-center gap-2 lg:flex"><Button size="icon" variant="ghost" aria-label="Pesquisar"><Search /></Button><Button asChild><Link to="/solicitar-cotacao">Solicitar cotação</Link></Button></div>
      <Button className="lg:hidden" size="icon" variant="ghost" aria-label="Abrir menu" onClick={() => setOpen(true)}><Menu /></Button>
    </div>
    {open && <div className="fixed inset-0 z-50 min-h-screen bg-primary p-6 text-primary-foreground lg:hidden"><div className="flex items-center justify-between"><Brand inverse/><Button size="icon" variant="ghost" className="text-primary-foreground" onClick={() => setOpen(false)}><X/></Button></div><nav className="mt-16 flex flex-col">{nav.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b border-primary-foreground/15 py-5 font-display text-2xl">{label}</Link>)}</nav><Button asChild className="mt-8 w-full bg-accent text-accent-foreground"><Link to="/solicitar-cotacao" onClick={() => setOpen(false)}>Solicitar cotação</Link></Button></div>}
  </header>;
}

export function Footer() {
  return <footer className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4"><div><Brand inverse/><p className="mt-6 max-w-xs text-sm leading-6 text-primary-foreground/65">Diferentes áreas de negócio, uma mesma visão: criar valor e impulsionar o desenvolvimento.</p></div><div><h3 className="footer-title">Global Trade Group</h3><div className="footer-links"><Link to="/sobre-nos">Sobre nós</Link><Link to="/empresas">Empresas</Link><Link to="/solucoes">Soluções</Link><Link to="/produtos">Produtos</Link></div></div><div><h3 className="footer-title">Clientes</h3><div className="footer-links"><Link to="/solicitar-cotacao">Solicitar cotação</Link><Link to="/produtos">Catálogo</Link><Link to="/contactos">Contactos</Link></div></div><div><h3 className="footer-title">Contacto</h3><div className="footer-links"><a href="tel:+258868855435">+258 86 885 5435</a><a href="https://www.globaltrade.co.mz">www.globaltrade.co.mz</a><span className="mt-3 inline-flex items-center gap-2 text-primary-foreground/60"><Globe2 className="size-4"/> Moçambique</span></div></div></div><div className="border-t border-primary-foreground/15"><div className="mx-auto max-w-7xl px-5 py-6 text-xs text-primary-foreground/55 sm:px-8">© 2026 Global Trade Group. Todos os direitos reservados.</div></div></footer>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow text-accent">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/70 sm:text-lg">{children}</p></div></section>;
}