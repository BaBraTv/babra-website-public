import { NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { eventKey, parseQuote, replyFor, validSignature } from "../../../../lib/whatsapp/bot";

export const runtime = "nodejs";
export const maxDuration = 60;
const headers = { "Cache-Control": "no-store" };
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!token) return new Response("Not configured", { status: 503, headers });
  if (p.get("hub.mode") !== "subscribe" || p.get("hub.verify_token") !== token || !p.get("hub.challenge")) {
    return new Response("Forbidden", { status: 403, headers });
  }
  return new Response(p.get("hub.challenge"), { headers });
}

type Message = { id?: string; from?: string; timestamp?: string; type?: string; text?: { body?: string }; interactive?: { button_reply?: { id?: string }; list_reply?: { id?: string } } };
type Payload = { object?: string; entry?: { changes?: { field?: string; value?: { metadata?: { phone_number_id?: string }; messages?: Message[] } }[] }[] };
export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length")) > 262144) return new Response("Too large", { status: 413 });
  // Bound streamed bodies as well as Content-Length; verify the original bytes before JSON parsing.
  const reader = request.body?.getReader();
  if (!reader) return new Response("Bad request", { status: 400 });
  const chunks: Uint8Array[] = []; let bytes = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    bytes += value.length;
    if (bytes > 262144) { await reader.cancel(); return new Response("Too large", { status: 413 }); }
    chunks.push(value);
  }
  const raw = Buffer.concat(chunks);
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return new Response("Not configured", { status: 503 });
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"), secret)) return new Response("Forbidden", { status: 403 });
  let payload: Payload;
  try { payload = JSON.parse(raw.toString("utf8")); } catch { return new Response("Bad JSON", { status: 400 }); }
  if (payload.object !== "whatsapp_business_account") return new Response("OK");
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const version = process.env.WHATSAPP_GRAPH_VERSION;
  if (!phoneId || !accessToken || !version || !/^v\d+\.0$/.test(version)) return new Response("Not configured", { status: 503 });
  let stage: "processing" | "database" | "whatsapp_send" = "processing";
  try {
    for (const entry of payload.entry || []) for (const change of entry.changes || []) {
      if (change.field !== "messages" || change.value?.metadata?.phone_number_id !== phoneId) continue;
      for (const message of change.value.messages || []) {
        if (!message.id || !message.from || !/^\d{6,15}$/.test(message.from)) continue;
        const timestamp = Number(message.timestamp) * 1000;
        if (!Number.isFinite(timestamp) || Date.now() - timestamp > 23 * 3600_000 || timestamp > Date.now() + 300_000) continue;
        const messageId = message.id;
        const sender = message.from;
        const text = (message.text?.body || message.interactive?.button_reply?.id || message.interactive?.list_reply?.id || "").slice(0, 4000);
        const id = `wa_${eventKey(messageId)}`;
        const prisma = getPrisma();
        // One durable inbox receipt and quote per Meta message. No schema migration required.
        stage = "database";
        const receipt = await prisma.$transaction(async (tx) => {
          await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${id})::bigint)`;
          const existing = await tx.contactMessage.findUnique({ where: { id } });
          if (existing) return existing;
          const quote = parseQuote(text);
          let reply = message.type === "text" || message.type === "interactive" ? replyFor(text) : "Ubu nakira ubutumwa bwanditse gusa. / Please send a text message, or contact staff: +250 788 351 482.";
          if (quote) {
            const order = await tx.order.create({ data: {
              orderNumber: `WA-${eventKey(messageId).toUpperCase()}`,
              customerName: quote.name, customerPhone: `+${sender}`, status: "QUOTE_REQUESTED",
              deliveryNotes: `WhatsApp quote request. Delivery: ${quote.location}`,
              items: { create: { productSlug: quote.slug, productName: `${quote.product} — 500 mL`, quantity: quote.quantity } }
            } });
            reply = `Twakiriye ubusabe bwawe / Quote request received: ${order.orderNumber}\n${quote.product} — ${quote.quantity}\nUmukozi azemeza stock, igiciro na delivery mbere yo kwishyura. / Staff will confirm availability, price and delivery before payment.`;
          }
          return tx.contactMessage.create({ data: { id, fullName: quote?.name || "WhatsApp customer", phone: `+${sender}`, subject: quote ? "WhatsApp order request" : "WhatsApp enquiry", sourcePage: "whatsapp", message: JSON.stringify({ incoming: text, reply, metaMessageId: messageId }), status: "NEW" } });
        });
        if ((JSON.parse(receipt.message) as { sent?: boolean }).sent) continue;
        // Serialize sends too, including overlapping Meta retries. On an ambiguous network
        // failure a reply can repeat, but the durable order remains unique.
        await prisma.$transaction(async (tx) => {
          await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${id})::bigint)`;
          const current = await tx.contactMessage.findUniqueOrThrow({ where: { id } });
          if ((JSON.parse(current.message) as { sent?: boolean }).sent) return;
          const { reply } = JSON.parse(current.message) as { reply: string };
          stage = "whatsapp_send";
          const response = await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`, {
            method: "POST", signal: AbortSignal.timeout(8000),
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to: sender, type: "text", text: { preview_url: false, body: reply } })
          });
          if (!response.ok) {
            // Meta error codes are numeric identifiers, not sensitive payloads.
            // Never log response messages/details or raw response bodies.
            const body: unknown = await response.json().catch(() => null);
            const e = body && typeof body === "object" && "error" in body
              ? (body as { error?: unknown }).error : null;
            const meta = e && typeof e === "object" ? e as { code?: unknown; error_subcode?: unknown } : null;
            const code = Number.isSafeInteger(meta?.code) ? Number(meta?.code) : 0;
            const subcode = Number.isSafeInteger(meta?.error_subcode) ? Number(meta?.error_subcode) : 0;
            console.error("WhatsApp send rejected", {
              httpStatus: response.status,
              ...(code ? { metaCode: code } : {}),
              ...(subcode ? { metaSubcode: subcode } : {})
            });
            throw new Error(`WhatsApp send failed: ${response.status}`);
          }
          stage = "database";
          await tx.contactMessage.update({ where: { id }, data: { status: "IN_REVIEW", message: JSON.stringify({ ...JSON.parse(current.message), sent: true }) } });
        }, { timeout: 12000 });
      }
    }
    return new Response("OK", { headers });
  } catch (error) {
    // Only emit a fixed stage and an allowlisted HTTP status. Never log customer data,
    // Meta response bodies, phone numbers, access tokens or raw exception messages.
    const httpStatus = error instanceof Error && /^WhatsApp send failed: [45]\d\d$/.test(error.message)
      ? Number(error.message.slice(-3)) : undefined;
    console.error("WhatsApp webhook processing failed; Meta may retry", { stage, ...(httpStatus ? { httpStatus } : {}) });
    return new Response("Retry later", { status: 503, headers });
  }
}
