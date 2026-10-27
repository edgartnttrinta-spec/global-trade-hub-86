import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { companies } from "@/lib/site-data";

export const Route = createFileRoute("/contactos")({
  head: () => ({ meta: [
    { title: "Contactos | Global Trade & Services, Lda" },
    { name: "description", content: "Contacte a Global Trade & Services, Lda em Maputo, Moçambique, para informações e pedidos de cotação." },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return <>
    <PageHero eyebrow="Contactos oficiais" title="Vamos conversar sobre a sua necessidade">Para informações institucionais, pedidos de cotação e consultas comerciais, utilize os canais oficiais abaixo ou contacte directamente a marca relevante.</PageHero>
    <section className="section-shell py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-primary">Global Trade & Services, Lda</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Contacto institucional e comercial</h2>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4 border-b border-border pb-5"><MapPin className="mt-1 size-5 text-primary"/><div><p className="font-semibold">Localização</p><p className="mt-1 text-sm text-muted-foreground">Maputo, Moçambique</p></div></div>
            <a href="tel:+258868855435" className="flex items-start gap-4 border-b border-border pb-5"><Phone className="mt-1 size-5 text-primary"/><div><p className="font-semibold">Telefone oficial</p><p className="mt-1 text-sm text-muted-foreground">+258 86 885 5435</p></div></a>
            <a href="mailto:geral@globaltrade.co.mz" className="flex items-start gap-4 border-b border-border pb-5"><Mail className="mt-1 size-5 text-primary"/><div><p className="font-semibold">E-mail geral</p><p className="mt-1 text-sm text-muted-foreground">geral@globaltrade.co.mz</p></div></a>
            <a href="mailto:comercial@globaltrade.co.mz" className="flex items-start gap-4 border-b border-border pb-5"><Mail className="mt-1 size-5 text-primary"/><div><p className="font-semibold">Cotações e contacto comercial</p><p className="mt-1 text-sm text-muted-foreground">comercial@globaltrade.co.mz</p></div></a>
            <a href="https://www.globaltrade.co.mz" className="flex items-start gap-4 border-b border-border pb-5"><Globe2 className="mt-1 size-5 text-primary"/><div><p className="font-semibold">Website oficial</p><p className="mt-1 text-sm text-muted-foreground">www.globaltrade.co.mz</p></div></a>
          </div>
        </div>
        <div className="border border-border bg-surface p-6 sm:p-8">
          <p className="eyebrow text-primary">Contacto directo</p><h2 className="mt-3 font-display text-2xl font-semibold">Escolha a área de negócio</h2><p className="mt-3 text-sm leading-6 text-ink-soft">Os e-mails abaixo encaminham o visitante para o programa de e-mail. A mensagem só será enviada após confirmação pelo próprio utilizador.</p>
          <div className="mt-6 divide-y divide-border">{companies.map(c=><a key={c.slug} href={"mailto:" + (c.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : c.email) + "?subject=" + encodeURIComponent("Consulta comercial — " + c.name)} className="flex items-center justify-between gap-4 py-4"><span><strong className="block text-sm">{c.name}</strong><span className="mt-1 block text-xs text-muted-foreground">{c.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : c.email}</span></span><ArrowUpRight className="size-4 shrink-0 text-primary"/></a>)}</div>
        </div>
      </div>
    </section>
  </>;
}
