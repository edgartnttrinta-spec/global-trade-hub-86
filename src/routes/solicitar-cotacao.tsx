import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, Paperclip } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companies } from "@/lib/site-data";

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
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const selectedSlug = String(data.get("empresaMarca") || empresa || "global-trade-services");
    const selected = companies.find(c => c.slug === selectedSlug) ?? companies.find(c => c.slug === "global-trade-services")!;
    const ref = "GT-" + new Date().toISOString().slice(0,10).replaceAll("-","") + "-" + Math.random().toString(36).slice(2,7).toUpperCase();
    const fields = [
      "Referência do pedido: " + ref,
      "Nome: " + data.get("nome"),
      "Empresa: " + (data.get("empresaCliente") || "Não indicado"),
      "E-mail: " + data.get("email"),
      "Telefone: " + data.get("telefone"),
      "País: " + (data.get("pais") || "Não indicado"),
      "Marca: " + selected.name,
      "Produto pretendido: " + data.get("produto"),
      "Fabricante: " + (data.get("fabricante") || "Não indicado"),
      "Modelo/referência: " + (data.get("modelo") || "Não indicado"),
      "Quantidade: " + (data.get("quantidade") || "A confirmar"),
      "Prazo pretendido: " + (data.get("prazo") || "A confirmar"),
      "Especificações e observações: " + (data.get("detalhes") || "Não indicadas"),
    ];
    setReference(ref);
    setNotice("O pedido foi preparado. O envio só será concluído quando confirmar a mensagem no seu programa de e-mail; o website ainda não tem um serviço de envio automático configurado.");
    const subject = encodeURIComponent("Pedido de cotação " + ref + " — " + selected.name);
    const body = encodeURIComponent(fields.join("\n"));
    window.location.href = "mailto:" + (selected.slug === "global-trade-services" ? "comercial@globaltrade.co.mz" : selected.email) + "?subject=" + subject + "&body=" + body;
  };
  return <>
    <PageHero eyebrow="Pedido comercial" title="Solicitar cotação">Partilhe os detalhes do produto ou serviço pretendido. A disponibilidade, as especificações e os prazos serão confirmados pela equipa comercial.</PageHero>
    <section className="section-shell py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {reference && <div role="status" className="mb-7 border border-border bg-surface p-5"><div className="flex items-start gap-3"><CheckCircle2 className="mt-1 size-5 shrink-0 text-primary"/><div><h2 className="font-semibold">Referência preparada: {reference}</h2><p className="mt-2 text-sm leading-6 text-ink-soft">{notice}</p></div></div></div>}
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Nome do contacto *<Input name="nome" autoComplete="name" required className="mt-2"/></label>
          <label className="text-sm font-semibold">Nome da empresa<Input name="empresaCliente" autoComplete="organization" className="mt-2"/></label>
          <label className="text-sm font-semibold">E-mail *<Input name="email" type="email" autoComplete="email" required className="mt-2"/></label>
          <label className="text-sm font-semibold">Telefone *<Input name="telefone" type="tel" autoComplete="tel" required className="mt-2"/></label>
          <label className="text-sm font-semibold">País<Input name="pais" defaultValue="Moçambique" className="mt-2"/></label>
          <label className="text-sm font-semibold">Marca pretendida *<select name="empresaMarca" defaultValue={empresa ?? "global-trade-services"} className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{companies.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
          <label className="text-sm font-semibold">Produto ou serviço pretendido *<Input name="produto" required className="mt-2"/></label>
          <label className="text-sm font-semibold">Fabricante / marca do produto<Input name="fabricante" className="mt-2"/></label>
          <label className="text-sm font-semibold">Modelo ou referência<Input name="modelo" className="mt-2"/></label>
          <label className="text-sm font-semibold">Quantidade<Input name="quantidade" type="number" min="1" step="1" className="mt-2"/></label>
          <label className="text-sm font-semibold">Prazo pretendido<Input name="prazo" type="date" className="mt-2"/></label>
          <label className="text-sm font-semibold sm:col-span-2">Especificações técnicas e observações<Textarea name="detalhes" className="mt-2 min-h-36" placeholder="Descreva requisitos, dimensões, compatibilidade ou outros detalhes relevantes."/></label>
          <div className="sm:col-span-2 flex gap-3 border border-dashed border-border bg-surface p-4 text-sm leading-6 text-muted-foreground"><Paperclip className="mt-1 size-4 shrink-0"/><p><strong className="text-foreground">Anexos:</strong> o carregamento seguro de ficheiros ainda não está configurado. Para enviar listas de materiais, fotografias ou fichas técnicas, anexe-os manualmente à mensagem de e-mail que será aberta.</p></div>
          <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">Os campos assinalados com * são obrigatórios. Este formulário prepara uma mensagem de e-mail; não armazena nem transmite dados automaticamente.</p>
          <Button type="submit" size="lg" className="sm:col-span-2 sm:justify-self-start"><Mail className="size-4"/> Preparar pedido por e-mail</Button>
        </form>
      </div>
    </section>
  </>;
}
