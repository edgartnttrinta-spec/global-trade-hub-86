import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe2, Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companies } from "@/lib/site-data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contactos")({
  head: () => ({ meta: [
    { title: "Contactos | Global Trade & Services, Lda" },
    { name: "description", content: "Contacte a Global Trade & Services, Lda em Maputo, Moçambique, para informações e pedidos de cotação." },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const [reference, setReference] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setReference("");
    setNotice("");
    setErrorMessage("");

    if (!supabase) {
      setErrorMessage("O formulário não está ligado ao Supabase neste ambiente. Escreva para geral@globaltrade.co.mz.");
      return;
    }

    const data = new FormData(form);
    const ref = "GTC-" + new Date().toISOString().slice(0, 10).replaceAll("-", "") + "-" + crypto.randomUUID().slice(0, 5).toUpperCase();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        reference_code: ref,
        name: String(data.get("nome") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("telefone") || "").trim(),
        subject: String(data.get("assunto") || "").trim(),
        message: String(data.get("mensagem") || "").trim(),
      });
      if (error) throw error;
      setReference(ref);
      setNotice("A sua mensagem foi registada. Guarde a referência para acompanhamento. A notificação automática por e-mail ainda será configurada.");
      form.reset();
    } catch {
      setErrorMessage("Não foi possível registar a mensagem neste momento. Tente novamente ou escreva para geral@globaltrade.co.mz.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="space-y-10">
          <div className="border border-border bg-surface p-6 sm:p-8">
            <p className="eyebrow text-primary">Mensagem institucional</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Envie-nos uma mensagem</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">A mensagem será guardada na base de dados da empresa. Não inclua palavras-passe, dados bancários ou informação confidencial.</p>
            {reference && <div role="status" className="mt-5 flex gap-3 border border-border p-4"><CheckCircle2 className="mt-1 size-5 shrink-0 text-primary"/><div><p className="font-semibold">Mensagem registada: {reference}</p><p className="mt-1 text-sm leading-6 text-ink-soft">{notice}</p></div></div>}
            {errorMessage && <div role="alert" className="mt-5 border border-destructive/40 bg-destructive/5 p-4 text-sm leading-6">{errorMessage}</div>}
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Nome *<Input name="nome" required minLength={2} maxLength={120} autoComplete="name" className="mt-2"/></label>
              <label className="text-sm font-semibold">E-mail *<Input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2"/></label>
              <label className="text-sm font-semibold">Telefone *<Input name="telefone" type="tel" required minLength={3} maxLength={40} autoComplete="tel" className="mt-2"/></label>
              <label className="text-sm font-semibold">Assunto *<Input name="assunto" required minLength={2} maxLength={180} className="mt-2"/></label>
              <label className="text-sm font-semibold sm:col-span-2">Mensagem *<Textarea name="mensagem" required minLength={5} maxLength={5000} className="mt-2 min-h-32"/></label>
              <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">Ao enviar, concorda que os dados sejam utilizados para responder ao seu pedido, conforme a política de privacidade. O envio automático de notificações por e-mail ainda não está configurado.</p>
              <Button type="submit" disabled={isSubmitting || !isSupabaseConfigured} className="sm:col-span-2 sm:justify-self-start">{isSubmitting ? "A registar mensagem..." : "Enviar mensagem"}</Button>
              {!isSupabaseConfigured && <p className="text-sm text-muted-foreground sm:col-span-2">A ligação ao Supabase precisa de ser configurada no ambiente de publicação.</p>}
            </form>
          </div>
          <div className="border border-border bg-surface p-6 sm:p-8">
            <p className="eyebrow text-primary">Contacto directo</p><h2 className="mt-3 font-display text-2xl font-semibold">Escolha a área de negócio</h2><p className="mt-3 text-sm leading-6 text-ink-soft">Para contactar directamente uma marca, utilize o e-mail correspondente.</p>
            <div className="mt-6 divide-y divide-border">{companies.map(c=><a key={c.slug} href={"mailto:" + (c.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : c.email) + "?subject=" + encodeURIComponent("Consulta comercial — " + c.name)} className="flex items-center justify-between gap-4 py-4"><span><strong className="block text-sm">{c.name}</strong><span className="mt-1 block text-xs text-muted-foreground">{c.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : c.email}</span></span><ArrowUpRight className="size-4 shrink-0 text-primary"/></a>)}</div>
          </div>
        </div>
      </div>
    </section>
  </>;
}
