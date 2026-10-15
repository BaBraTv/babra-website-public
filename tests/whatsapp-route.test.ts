import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";
const { db, rows, orders } = vi.hoisted(() => {
 const rows = new Map<string, any>(); const orders: any[] = [];
 const db: any = { $executeRaw: vi.fn(async () => 1), contactMessage: {
  findUnique: vi.fn(async ({where}: any) => rows.get(where.id) || null),
  findUniqueOrThrow: vi.fn(async ({where}: any) => rows.get(where.id)),
  create: vi.fn(async ({data}: any) => { rows.set(data.id, {...data}); return rows.get(data.id); }),
  update: vi.fn(async ({where,data}: any) => { Object.assign(rows.get(where.id),data); return rows.get(where.id); })
 }, order: { create: vi.fn(async ({data}: any) => { orders.push(data); return data; }) } };
 db.$transaction = vi.fn(async (fn: any) => fn(db));
 return { db, rows, orders };
});
vi.mock("../lib/db", () => ({ getPrisma: () => db }));
import { GET, POST } from "../app/api/whatsapp/webhook/route";
function request(text = "hello", phone = "phone-id", id = "wamid.test") {
 const body = JSON.stringify({object:"whatsapp_business_account",entry:[{changes:[{field:"messages",value:{metadata:{phone_number_id:phone},messages:[{id,from:"250788000001",timestamp:String(Math.floor(Date.now()/1000)),type:"text",text:{body:text}}]}}]}]});
 return new NextRequest("https://www.babra.store/api/whatsapp/webhook", {method:"POST",headers:{"content-type":"application/json","x-hub-signature-256":`sha256=${createHmac("sha256","app-secret").update(body).digest("hex")}`},body});
}
beforeEach(() => {
 rows.clear(); orders.length = 0; vi.clearAllMocks();
 vi.stubEnv("WHATSAPP_APP_SECRET","app-secret"); vi.stubEnv("WHATSAPP_ACCESS_TOKEN","access");
 vi.stubEnv("WHATSAPP_VERIFY_TOKEN","verify"); vi.stubEnv("WHATSAPP_PHONE_NUMBER_ID","phone-id"); vi.stubEnv("WHATSAPP_GRAPH_VERSION","v24.0");
 vi.stubGlobal("fetch",vi.fn(async () => new Response('{}',{status:200})));
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("WhatsApp webhook", () => {
 it("echoes a valid challenge and rejects wrong tokens",async()=>{
  expect(await (await GET(new NextRequest("https://www.babra.store/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=verify&hub.challenge=123"))).text()).toBe("123");
  expect((await GET(new NextRequest("https://www.babra.store/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123"))).status).toBe(403);
 });
 it("rejects unsigned deliveries before accessing customer storage",async()=>{
  const req=request(); req.headers.delete("x-hub-signature-256");
  expect((await POST(req)).status).toBe(403); expect(db.$transaction).not.toHaveBeenCalled();
 });
 it("ignores events for a different business number",async()=>{
  expect((await POST(request("hello","other"))).status).toBe(200);
  expect(db.$transaction).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
 });
 it("persists a quote once and suppresses successful delivery retries",async()=>{
  const order="ORDER\nName: Alice\nProduct: For Her\nQuantity: 2\nLocation: Kigali, Rwanda";
  expect((await POST(request(order))).status).toBe(200);
  expect((await POST(request(order))).status).toBe(200);
  expect(orders).toHaveLength(1); expect(fetch).toHaveBeenCalledTimes(1);
  expect(orders[0].status).toBe("QUOTE_REQUESTED");
  expect([...rows.values()][0].status).toBe("IN_REVIEW");
 });
 it("retries failed sends without duplicating the persisted order",async()=>{
  vi.mocked(fetch).mockResolvedValueOnce(new Response('{}',{status:503}));
  const text="ORDER\nName: Alice\nProduct: For Kids\nQuantity: 1\nLocation: Kigali";
  expect((await POST(request(text))).status).toBe(503);
  expect((await POST(request(text))).status).toBe(200);
  expect(orders).toHaveLength(1); expect(fetch).toHaveBeenCalledTimes(2);
 });
});
