import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { validSignature, parseQuote, replyFor, eventKey } from "../lib/whatsapp/bot.ts";
test("signed raw bytes authenticate; altered, missing and malformed signatures fail", () => {
 const raw = Buffer.from('{"message":"Muraho é"}');
 const sig = `sha256=${createHmac("sha256", "secret").update(raw).digest("hex")}`;
 assert.equal(validSignature(raw, sig, "secret"), true);
 assert.equal(validSignature(Buffer.from("changed"), sig, "secret"), false);
 for (const invalid of [null, "sha256=aa", "", "sha256=" + "z".repeat(64)]) assert.equal(validSignature(raw, invalid, "secret"), false);
});
test("quotes require explicit complete bounded order; never guess products or quantities", () => {
 const input = "ORDER\nName: Alice\nProduct: For Her\nQuantity: 2\nLocation: Kigali, Rwanda";
 assert.equal(parseQuote(input)?.slug, "women");
 assert.equal(parseQuote(input)?.quantity, 2);
 for (const invalid of [input.replace("For Her", "unknown"), input.replace("2", "0"), input.replace("2", "1001"), input.replace("2", "2 bottles"), input.replace("ORDER\n", ""), input + "\nQuantity: 3", input.replace("Location: Kigali, Rwanda", "")]) assert.equal(parseQuote(invalid), null);
 assert.equal(parseQuote(input.replace("For Her", "For Kids"))?.slug, "babies");
 assert.equal(parseQuote(input.replace("For Her", "For Him"))?.slug, "men");
});
test("menu, handoff, quote instructions and stable event identifiers", () => {
 assert.match(replyFor("hello"), /automated assistant/);
 assert.match(replyFor("4"), /788 351 482/);
 assert.match(replyFor("2"), /ORDER/);
 assert.match(replyFor("price"), /confirm/);
 assert.equal(eventKey("wamid.1"), eventKey("wamid.1"));
 assert.notEqual(eventKey("wamid.1"), eventKey("wamid.2"));
});
