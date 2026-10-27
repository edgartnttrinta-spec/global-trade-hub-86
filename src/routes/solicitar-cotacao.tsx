import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, Paperclip } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companies } from "@/lib/site-data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/solicitar-cotacao")({
  validateSearch: (s: Record<string, unknown>) => ({ empresa: typeof s.empresa === "string" ? s.empresa : undefined }),
  head: () => ({ meta: [
    { title: "Solicitar cotação | Global Trade & Services, Lda" },
    { name: "description", content: "Solicite informações e cotações de produtos, equipamentos e soluções comerciais em Moçambique." },
  ] }),
  component: QuotePage,
});

function QuotePage() {
  const { empresa } = Route.useSearch();
  const [reference, setReference] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setErrorMessage("");
    setNotice("");

    if (!supabase) {
      setErrorMessage("O formulário ainda não está ligado ao Supabase neste ambiente. Contacte comercial@globaltrade.co.mz ou tente novamente mais tarde.");
      return;
    }

    const data = new FormData(form);
    const selectedSlug = String(data.get("empresaMarca") || empresa || "global-trade-services");
    const selected = companies.find(c => c.slug === selectedSlug) ?? companies.find(c => c.slug === "global-trade-services")!;
    const ref = "GT-" + new Date().toISOString().slice(0, 10).replaceAll("-", "") + "-" + crypto.randomUUID().slice(0, 5).toUpperCase();
    const rawQuantity = String(data.get("quantidade") || "");
    const rawDate = String(data.get("prazo") || "");

    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("notify-quote", {
        body: {
          reference_code: ref,
          contact_name: String(data.get("nome") || "").trim(),
          company_name: String(data.get("empresaCliente") || "").trim() || null,
          email: String(data.get("email") || "").trim(),
          phone: String(data.get("telefone") || "").trim(),
          country: String(data.get("pais") || "Moçambique").trim() || "Moçambique",
          brand_slug: selected.slug,
          product_name: String(data.get("produto") || "").trim(),
          manufacturer: String(data.get("fabricante") || "").trim() || null,
          model_reference: String(data.get("modelo") || "").trim() || null,
          quantity: rawQuantity ? Number(rawQuantity) : null,
          desired_date: rawDate || null,
          details: String(data.get("detalhes") || "").trim() || null,
        },
      });

      if (error || !result?.saved) throw error ?? new Error("Pedido não confirmado");
      setReference(result.reference_code || ref);
      const sent = result.notifications ?? {};
      const pending = result.notification_pending_setup ?? [];
      if (sent.email && sent.whatsapp) {
        setNotice("Pedido registado. As notificações por e-mail e WhatsApp foram enviadas.");
      } else {
        const missing = [
          !sent.email ? "e-mail" : "",
          !sent.whatsapp ? "WhatsApp" : "",
        ].filter(Boolean).join(" e ");
        setNotice("Pedido registado com sucesso. A notificação para " + missing + " ainda não está configurada ou não foi confirmada. A equipa técnica deverá concluir a configuração dos serviços de envio.");
        console.warn("Quote notification setup pending:", pending);
      }
      form.reset();
    } catch {
      setErrorMessage("Não foi possível registar o pedido neste momento. Verifique a ligação à internet e tente novamente ou contacte comercial@globaltrade.co.mz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <>
    <PageHero eyebrow="Pedido comercial" title="Solicitar cotação">Partilhe os detalhes do produto ou serviço pretendido. A disponibilidade, as especificações e os prazos serão confirmados pela equipa comercial.</PageHero>
    <section className="section-shell py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {reference && <div role="status" className="mb-7 border border-border bg-surface p-5"><div className="flex items-start gap-3"><CheckCircle2 className="mt-1 size-5 shrink-0 text-primary"/><div><h2 className="font-semibold">Pedido registado: {reference}</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{notice}</p></div></div></div>}
        {errorMessage && <div role="alert" className="mb-7 border border-destructive/40 bg-destructive/5 p-4 text-sm leading-6">{errorMessage}</div>}
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Nome do contacto *<Input name="nome" autoComplete="name" required minLength={2} maxLength={120} className="mt-2"/></label>
          <label className="text-sm font-semibold">Nome da empresa<Input name="empresaCliente" autoComplete="organization" maxLength={200} className="mt-2"/></label>
          <label className="text-sm font-semibold">E-mail *<Input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2"/></label>
          <label className="text-sm font-semibold">Telefone *<Input name="telefone" type="tel" autoComplete="tel" required minLength={3} maxLength={40} className="mt-2"/></label>
          <label className="text-sm font-semibold">País<Input name="pais" defaultValue="Moçambique" maxLength={100} className="mt-2"/></label>
          <label className="text-sm font-semibold">Marca pretendida *<select name="empresaMarca" defaultValue={empresa ?? "global-trade-services"} className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{companies.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
          <label className="text-sm font-semibold">Produto ou serviço pretendido *<Input name="produto" required minLength={2} maxLength={240} className="mt-2"/></label>
          <label className="text-sm font-semibold">Fabricante / marca do produto<Input name="fabricante" maxLength={200} className="mt-2"/></label>
          <label className="text-sm font-semibold">Modelo ou referência<Input name="modelo" maxLength={200} className="mt-2"/></label>
          <label className="text-sm font-semibold">Quantidade<Input name="quantidade" type="number" min="1" step="1" className="mt-2"/></label>
          <label className="text-sm font-semibold">Prazo pretendido<Input name="prazo" type="date" className="mt-2"/></label>
          <label className="text-sm font-semibold sm:col-span-2">Especificações técnicas e observações<Textarea name="detalhes" maxLength={10000} className="mt-2 min-h-36" placeholder="Descreva requisitos, dimensões, compatibilidade ou outros detalhes relevantes."/></label>
          <div className="sm:col-span-2 flex gap-3 border border-dashed border-border bg-surface p-4 text-sm leading-6 text-muted-foreground"><Paperclip className="mt-1 size-4 shrink-0"/><p><strong className="text-foreground">Anexos:</strong> o carregamento seguro de ficheiros será ligado à área autenticada. Por agora, não envie ficheiros por este formulário; se necessário, contacte comercial@globaltrade.co.mz.</p></div>
          <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">Os campos assinalados com * são obrigatórios. O pedido é guardado no Supabase e o sistema tenta enviar notificações por e-mail e WhatsApp.</p>
          <Button type="submit" size="lg" disabled={isSubmitting || !isSupabaseConfigured} className="sm:col-span-2 sm:justify-self-start"><Mail className="size-4"/>{isSubmitting ? "A registar pedido..." : "Enviar pedido de cotação"}</Button>
          {!isSupabaseConfigured && <p className="sm:col-span-2 text-sm text-muted-foreground">A ligação ao Supabase precisa de ser configurada no ambiente de publicação.</p>}
        </form>
      </div>
    </section>
  </>;
}
