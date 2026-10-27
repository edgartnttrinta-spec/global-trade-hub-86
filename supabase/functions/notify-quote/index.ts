import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function corsHeaders(origin: string | null) {
  const configured = Deno.env.get("ALLOWED_ORIGIN") ?? "https://www.globaltrade.co.mz";
  const configuredOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  const allowed = new Set([configured, "https://www.globaltrade.co.mz", "https://globaltrade.co.mz", "http://localhost:5173", ...configuredOrigins]);
  return {
    "Access-Control-Allow-Origin": origin && allowed.has(origin) ? origin : configured,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

function response(body: Record<string, unknown>, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405, origin);

  const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "https://www.globaltrade.co.mz";
  const allowedOrigins = new Set([allowedOrigin, "https://www.globaltrade.co.mz", "https://globaltrade.co.mz", "http://localhost:5173", ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((item) => item.trim()).filter(Boolean)]);
  if (origin && !allowedOrigins.has(origin)) {
    return response({ error: "Origin not allowed" }, 403, origin);
  }

  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return response({ error: "Invalid JSON body" }, 400, origin);
  }

  const reference_code = clean(input.reference_code, 40);
  const contact_name = clean(input.contact_name, 120);
  const company_name = clean(input.company_name, 200);
  const email = clean(input.email, 254);
  const phone = clean(input.phone, 40);
  const country = clean(input.country, 100) || "Moçambique";
  const brand_slug = clean(input.brand_slug, 100) || "global-trade-services";
  const product_name = clean(input.product_name, 240);
  const manufacturer = clean(input.manufacturer, 200);
  const model_reference = clean(input.model_reference, 200);
  const quantity = Number.isInteger(input.quantity) && Number(input.quantity) > 0 ? Number(input.quantity) : null;
  const desired_date = clean(input.desired_date, 10);
  const details = clean(input.details, 10000);

  if (!reference_code || contact_name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 3 || product_name.length < 2) {
    return response({ error: "Please provide a valid contact name, email, phone and product." }, 400, origin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return response({ error: "Server database configuration is missing." }, 500, origin);

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data: saved, error: dbError } = await admin.from("quote_requests").insert({
    reference_code, contact_name, company_name: company_name || null, email, phone, country,
    brand_slug, product_name, manufacturer: manufacturer || null, model_reference: model_reference || null,
    quantity, desired_date: desired_date || null, details: details || null,
  }).select("id, reference_code, created_at").single();

  if (dbError) {
    if (dbError.code === "23505") return response({ error: "Este pedido já foi registado. Se já submeteu, não precisa de o repetir." }, 409, origin);
    console.error("quote insert failed", dbError.code, dbError.message);
    return response({ error: "Não foi possível guardar o pedido. Tente novamente mais tarde." }, 500, origin);
  }

  const notificationEmail = Deno.env.get("QUOTE_NOTIFICATION_EMAIL") ?? "comercial@globaltrade.co.mz";
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const brandNames: Record<string, string> = {
    "global-trade-services": "Global Trade & Services, Lda",
    "globaltech-supplies": "GlobalTech Supplies",
    "global-agro-tractor-supplies": "Global Agro Tractor Supplies",
    "global-safety": "Global Safety",
    "global-express-go": "Global Express GO",
    "crystal-ice": "Crystal Ice",
    "ponto-das-aves": "Ponto das Aves",
    "global-auto-mobility": "Global Auto Mobility",
  };
  const brandName = brandNames[brand_slug] ?? brand_slug;
  const lines = [
    "NOVO PEDIDO DE COTAÇÃO — GLOBAL TRADE & SERVICES",
    "",
    `Referência: ${reference_code}`,
    `Marca: ${brandName}`,
    `Contacto: ${contact_name}`,
    `Empresa: ${company_name || "Não indicada"}`,
    `E-mail do cliente: ${email}`,
    `Telefone: ${phone}`,
    `País: ${country}`,
    `Produto/serviço: ${product_name}`,
    `Fabricante: ${manufacturer || "Não indicado"}`,
    `Modelo/referência: ${model_reference || "Não indicado"}`,
    `Quantidade: ${quantity ?? "Não indicada"}`,
    `Prazo pretendido: ${desired_date || "Não indicado"}`,
    "",
    "Detalhes:",
    details || "Sem detalhes adicionais.",
  ];
  const messageText = lines.join("\n");

  let emailSent = false;
  let whatsappSent = false;
  const notificationErrors: string[] = [];

  if (resendKey && fromEmail) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          subject: `Nova cotação ${reference_code} — ${product_name}`,
          text: messageText,
          reply_to: email,
        }),
      });
      emailSent = emailRes.ok;
      if (!emailRes.ok) {
        const errorText = await emailRes.text();
        console.error("email provider error", emailRes.status, errorText.slice(0, 500));
        notificationErrors.push("email");
      }
    } catch (err) {
      console.error("email notification error", String(err));
      notificationErrors.push("email");
    }
  } else {
    notificationErrors.push("email_not_configured");
  }

  const waToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
  const waPhoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  const waTo = Deno.env.get("WHATSAPP_TO_NUMBER");
  const waTemplate = Deno.env.get("WHATSAPP_TEMPLATE_NAME");
  const waLanguage = Deno.env.get("WHATSAPP_TEMPLATE_LANGUAGE") ?? "pt_BR";

  if (waToken && waPhoneId && waTo && waTemplate) {
    try {
      const waRes = await fetch(`https://graph.facebook.com/v23.0/${waPhoneId}/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${waToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: waTo,
          type: "template",
          template: {
            name: waTemplate,
            language: { code: waLanguage },
            components: [{
              type: "body",
              parameters: [
                { type: "text", text: reference_code },
                { type: "text", text: contact_name },
                { type: "text", text: product_name },
                { type: "text", text: phone },
                { type: "text", text: email },
              ],
            }],
          },
        }),
      });
      whatsappSent = waRes.ok;
      if (!waRes.ok) {
        const errorText = await waRes.text();
        console.error("WhatsApp provider error", waRes.status, errorText.slice(0, 500));
        notificationErrors.push("whatsapp");
      }
    } catch (err) {
      console.error("WhatsApp notification error", String(err));
      notificationErrors.push("whatsapp");
    }
  } else {
    notificationErrors.push("whatsapp_not_configured");
  }

  return response({
    ok: true,
    reference_code: saved.reference_code,
    saved: true,
    notifications: { email: emailSent, whatsapp: whatsappSent },
    notification_pending_setup: notificationErrors,
  }, 201, origin);
});
