import { createHmac, timingSafeEqual, createHash } from "node:crypto";

export function validSignature(raw: Buffer, signature: string | null, secret: string) {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(raw).digest();
  return timingSafeEqual(expected, Buffer.from(signature.slice(7), "hex"));
}
export function eventKey(messageId: string) {
  return createHash("sha256").update(messageId).digest("hex").slice(0, 32);
}
export const orderFormat = `Ohereza commande mu butumwa bumwe ukoresheje iyi format / Send your order in one message:\nORDER\nName: amazina yawe / your name\nProduct: For Her\nQuantity: 1\nLocation: igihugu, umujyi, aderesi / country, city, address\n\nProduct: For Her, For Him cyangwa For Kids. Ni ubusabe bw'igiciro; umukozi azemeza stock, igiciro na delivery mbere yo kwishyura. / This is a quote request; staff confirm stock, price and delivery before payment. Amakuru yawe akoreshwa mu gutunganya commande. https://www.babra.store/privacy`;
export type Quote = { name: string; slug: "women" | "men" | "babies"; product: string; quantity: number; location: string };
export function parseQuote(text: string): Quote | null {
  if (!/^ORDER\s*\n/i.test(text.trim())) return null;
  const fields = new Map<string, string>();
  for (const line of text.trim().split(/\r?\n/).slice(1)) {
    const match = /^(Name|Product|Quantity|Location):\s*(.+)$/i.exec(line.trim());
    if (!match || fields.has(match[1].toLowerCase())) return null;
    fields.set(match[1].toLowerCase(), match[2].trim());
  }
  const name = fields.get("name") || "";
  const product = (fields.get("product") || "").toLowerCase();
  const qty = fields.get("quantity") || "";
  const location = fields.get("location") || "";
  const slug = ({ "for her": "women", "for him": "men", "for kids": "babies" } as const)[product as "for her"];
  if (!slug || name.length < 2 || name.length > 120 || location.length < 3 || location.length > 500 || !/^\d{1,4}$/.test(qty)) return null;
  const quantity = Number(qty);
  if (quantity < 1 || quantity > 1000) return null;
  return { name, slug, product: ({ women: "BaBra Lotion For Her", men: "BaBra Lotion For Him", babies: "BaBra Lotion For Kids" })[slug], quantity, location };
}
export function replyFor(text: string) {
  const t = text.trim().toLowerCase();
  if (/^order\b|commande|kugura|^2$/.test(t)) return orderFormat;
  if (/^3$|delivery|kohereza|livraison/.test(t)) return "Delivery: tubwire igihugu, umujyi n'aderesi. Umukozi azemeza ikiguzi n'igihe cyo kugezaho commande. / Tell us your country, city and address; staff will confirm delivery cost and timing.\n\n" + orderFormat;
  if (/^4$|umukozi|human|agent|staff/.test(t)) return "Ubusabe bwawe bwo kuvugana n'umukozi bwabitswe. / Your request for a staff member has been recorded.\nBaBra: +250 788 351 482\nRwanda orders — VIDAPHARMA: +250 734 299 777";
  if (/^1$|product|ibicuruzwa|lotion|igiciro|price/.test(t)) return "BaBra Lotion: For Her, For Him na For Kids — 500 mL. Umukozi azemeza igiciro na stock. / Staff will confirm current pricing and availability.\nhttps://www.babra.store\n\n" + orderFormat;
  return "Murakaza neza kuri BaBra Cosmetics Ltd. Ndi umufasha wikora. / Welcome! I am BaBra's automated assistant.\n\n1 — Ibicuruzwa / Products\n2 — Commande / Place an order\n3 — Delivery\n4 — Umukozi / Human assistance\n\nLuxury in Every Touch.\nhttps://www.babra.store";
}
