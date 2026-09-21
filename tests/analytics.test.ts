import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { safePath, parseAnalyticsPayload, trafficSource, excludedAgent, coarseDevice, parseRange, kigaliDay } from "../lib/analytics-policy.ts";
import { analyticsHash, recordAnalytics, analyticsReport, cleanupAnalytics } from "../lib/analytics-store.ts";
import type { AnalyticsPayload } from "../lib/analytics-policy.ts";
const payload = (): AnalyticsPayload => ({ id:randomUUID(), visit:randomUUID(), visitor:randomUUID(), consent:true, path:"/cosmetics",event:"page_view",source:"Facebook",campaign:"launch" });
test("paths and payload reject private routes and arbitrary data",()=>{
  assert.equal(safePath("/cosmetics?email=private@example.com#name"),"/cosmetics");
  for(const p of ["/admin/analytics","/api/admin/analytics","/orders/123","/profile","/unknown/person"]) assert.equal(safePath(p),null);
  assert.equal(parseAnalyticsPayload({...payload(),email:"private@example.com"}),null);
  assert.equal(parseAnalyticsPayload({...payload(),consent:false}),null);
  assert.equal(parseAnalyticsPayload({...payload(),event:"order_completed"}),null);
  assert.equal(parseAnalyticsPayload({...payload(),event:"product_view"}),null);
  assert.equal(parseAnalyticsPayload(payload())?.campaign,"None / unrecognized");
  assert.equal(parseAnalyticsPayload(payload(),["launch"])?.campaign,"launch");
});
test("sources never persist full referrers; suffix matching cannot spoof social sites",()=>{
  assert.equal(trafficSource("https://facebook.com.evil.test/private"),"Other referral");
  assert.equal(trafficSource("https://l.facebook.com/link?secret=hidden"),"Facebook");
  assert.equal(trafficSource("","whatsapp"),"WhatsApp");
  assert.equal(trafficSource("https://www.babra.store/products"),"Direct / unknown");
  assert.equal(trafficSource("https://private.example/person"),"Other referral");
});
test("bots filtered and device data is coarse",()=>{
  for(const ua of ["Googlebot","curl/8","HeadlessChrome","UptimeRobot",""]) assert.equal(excludedAgent(ua),true);
  assert.equal(excludedAgent("Mozilla/5.0 Safari"),false);
  assert.deepEqual(coarseDevice("Mozilla Android Mobile Chrome/130"),{device:"Mobile",browser:"Chrome",os:"Android"});
});
test("Kigali midnight, month boundaries and date caps",()=>{
  assert.equal(kigaliDay(new Date("2026-09-20T22:01:00Z")),"2026-09-21");
  assert.throws(()=>parseRange("2026-02-30","2026-03-01",new Date("2026-03-02")));
  assert.throws(()=>parseRange("2026-08-01","2026-09-21",new Date("2026-09-21")));
  assert.throws(()=>parseRange("2026-09-22","2026-09-22",new Date("2026-09-21")));
});
test("daily rate identifiers are keyed and unlinkable without secret",()=>{
  assert.notEqual(analyticsHash("rate:2026-09-20:1.2.3.4","a".repeat(32)),analyticsHash("rate:2026-09-21:1.2.3.4","a".repeat(32)));
  assert.throws(()=>analyticsHash("anything","short"));
});
const url = process.env.ANALYTICS_TEST_DATABASE_URL;
test("PostgreSQL: atomic duplicates, concurrent increments, aggregates, privacy and retention",{skip:!url},async()=>{
  const parsed = new URL(url!); assert.ok(["localhost","127.0.0.1"].includes(parsed.hostname),"Tests require a disposable local database");
  const pool = new Pool({connectionString:url,max:6});
  try {
    await pool.query('TRUNCATE "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate"');
    const now = new Date(), day=kigaliDay(now), p=payload();
    const context={now,ua:"Mozilla/5.0 Chrome",ip:"192.0.2.1",country:"RW",secret:"test-only-secret-never-production-123"};
    const duplicate=await Promise.all(Array.from({length:8},()=>recordAnalytics(pool,p,context)));
    assert.equal(duplicate.filter(s=>s==="recorded").length,1);
    await Promise.all(Array.from({length:12},()=>recordAnalytics(pool,{...p,id:randomUUID()},context)));
    await recordAnalytics(pool,{...p,id:randomUUID(),event:"whatsapp_click"},context);
    await recordAnalytics(pool,{...p,id:randomUUID(),event:"engagement"},{...context,now:new Date(now.getTime()+15000)});
    let report=await analyticsReport(pool,{from:day,to:day},now);
    assert.equal(report.summary.visits,1); assert.equal(report.summary.visitors,1); assert.equal(report.summary.pageViews,13);
    assert.equal(report.pages[0].views,13); assert.equal(report.events.find(e=>e.name==="whatsapp_click")?.count,1);
    assert.equal(report.recent.length,0); assert.equal(report.summary.engagementSeconds,15);
    const serialized=JSON.stringify(report);
    for(const secret of [p.id,p.visit,p.visitor,"192.0.2.1","visitor\":","lastSeen"]) assert.equal(serialized.includes(secret),false);
    await recordAnalytics(pool,{...p,id:randomUUID(),visit:randomUUID()},context);
    report=await analyticsReport(pool,{from:day,to:day},now);
    assert.equal(report.summary.visits,2); assert.equal(report.summary.visitors,1);
    await pool.query('UPDATE "AnalyticsVisit" SET "eventCount"=1000');
    assert.equal(await recordAnalytics(pool,{...p,id:randomUUID()},context),"limited");
    await pool.query('UPDATE "AnalyticsVisit" SET "day"=CURRENT_DATE - 100');
    await pool.query('UPDATE "AnalyticsReceipt" SET "createdAt"=NOW()-INTERVAL \'2 days\'');
    await pool.query('UPDATE "AnalyticsRate" SET "updatedAt"=NOW()-INTERVAL \'2 days\'');
    await cleanupAnalytics(pool);
    for(const table of ["AnalyticsVisit","AnalyticsReceipt","AnalyticsRate"]) assert.equal((await pool.query(`SELECT COUNT(*)::int n FROM "${table}"`)).rows[0].n,0);
  } finally { await pool.end(); }
});
