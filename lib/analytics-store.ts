import { createHmac } from "node:crypto";
import { Pool } from "pg";
import type { PoolClient } from "pg";
import { coarseDevice, kigaliDay } from "./analytics-policy.ts";
import type { AnalyticsPayload } from "./analytics-policy.ts";

const globalAnalytics = globalThis as unknown as { analyticsPool?: Pool };
export function analyticsPool() {
  if (!process.env.DATABASE_URL) throw new Error("Analytics database unavailable");
  return globalAnalytics.analyticsPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 2, idleTimeoutMillis: 1000, connectionTimeoutMillis: 3000, statement_timeout: 5000,
    ...(process.env.DATABASE_SSL_CA ? { ssl: { ca: process.env.DATABASE_SSL_CA.replace(/\\n/g, "\n"), rejectUnauthorized: true } } : {}) });
}
export function analyticsEnabled() { return process.env.ANALYTICS_ENABLED === "true" && (process.env.ANALYTICS_HASH_SECRET?.length ?? 0) >= 32; }
export function analyticsHash(value: string, secret = process.env.ANALYTICS_HASH_SECRET || "") { if (secret.length < 32) throw new Error("Analytics secret unavailable"); return createHmac("sha256", secret).update(value).digest("hex"); }

// Bounded opportunistic deletion; scheduled cleanup provides full physical retention enforcement.
export async function cleanupAnalytics(db: Pick<PoolClient, "query">, batch = 2000) {
  for (const [table, column, days] of [["AnalyticsVisit", "day", 90], ["AnalyticsReceipt", "createdAt", 1], ["AnalyticsRate", "updatedAt", 1]] as const) {
    await db.query(`DELETE FROM "${table}" WHERE "id" IN (SELECT "id" FROM "${table}" WHERE "${column}" < NOW() - INTERVAL '${days} days' LIMIT $1)`, [batch]);
  }
}

export async function recordAnalytics(pool: Pool, p: AnalyticsPayload, context: { ua: string; ip: string; country: string; now?: Date; secret?: string }) {
  const now = context.now || new Date();
  const day = kigaliDay(now);
  const hash = (v: string) => analyticsHash(v, context.secret);
  const visit = hash(`visit:${day}:${p.visit}`), visitor = hash(`visitor:${p.visitor}`);
  const receipt = hash(`event:${p.id}`), rate = hash(`rate:${day}:${context.ip}`);
  const { device, browser, os } = coarseDevice(context.ua);
  const db = await pool.connect();
  try {
    await db.query("BEGIN");
    const limit = await db.query(`INSERT INTO "AnalyticsRate" ("id", "count", "updatedAt") VALUES ($1,1,$2)
      ON CONFLICT ("id") DO UPDATE SET "count" = CASE WHEN "AnalyticsRate"."updatedAt" < $2::timestamptz - INTERVAL '1 minute' THEN 1 ELSE "AnalyticsRate"."count" + 1 END,
      "updatedAt" = CASE WHEN "AnalyticsRate"."updatedAt" < $2::timestamptz - INTERVAL '1 minute' THEN $2 ELSE "AnalyticsRate"."updatedAt" END RETURNING "count"`, [rate, now]);
    if (limit.rows[0].count > 120) { await db.query("COMMIT"); return "limited"; }
    const inserted = await db.query(`INSERT INTO "AnalyticsReceipt" ("id", "createdAt") VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING "id"`, [receipt, now]);
    if (!inserted.rowCount) { await db.query("COMMIT"); return "duplicate"; }
    await db.query(`INSERT INTO "AnalyticsVisit" ("id","visitor","day","startedAt","lastSeen","source","campaign","country","device","browser","os","lastPath")
      VALUES ($1,$2,$3,$4,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT DO NOTHING`, [visit, visitor, day, now, p.source, p.campaign, context.country, device, browser, os, p.path]);
    // Row locking and updates are in one transaction: retries cannot double-count or lose increments.
    const result = await db.query(`UPDATE "AnalyticsVisit" SET
      "pageViews" = "pageViews" + $3,
      "pages" = CASE WHEN $3 = 1 THEN jsonb_set("pages", ARRAY[$4], to_jsonb(COALESCE(("pages"->>$4)::int,0)+1)) ELSE "pages" END,
      "events" = jsonb_set("events", ARRAY[$5], to_jsonb(COALESCE(("events"->>$5)::int,0)+1)),
      "engagementSeconds" = "engagementSeconds" + CASE WHEN $5='engagement' THEN LEAST(15,GREATEST(0,EXTRACT(EPOCH FROM ($2::timestamptz - "lastSeen"))::int)) ELSE 0 END,
      "lastSeen" = $2, "lastPath" = $4, "eventCount" = "eventCount" + 1
      WHERE "id"=$1 AND "eventCount" < 1000 RETURNING "id"`, [visit, now, p.event === "page_view" ? 1 : 0, p.path, p.event]);
    await db.query("COMMIT");
    return result.rowCount ? "recorded" : "limited";
  } catch (error) { await db.query("ROLLBACK"); throw error; } finally { db.release(); }
}

export async function analyticsReport(pool: Pool, range: { from: string; to: string }, now = new Date()) {
  const today = kigaliDay(now), yesterday = kigaliDay(new Date(now.getTime() - 86400000));
  const weekday = new Date(today).getUTCDay() || 7;
  const week = new Date(Date.parse(today) - (weekday - 1) * 86400000).toISOString().slice(0, 10);
  const month = today.slice(0, 8) + "01";
  const db = await pool.connect();
  try {
    await db.query("BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY");
    const overview = (await db.query(`SELECT COUNT(DISTINCT "visitor") FILTER (WHERE "day"=$1::date)::int AS today,
      COUNT(DISTINCT "visitor") FILTER (WHERE "day"=$2::date)::int AS yesterday,
      COUNT(DISTINCT "visitor") FILTER (WHERE "day">=$3::date)::int AS week,
      COUNT(DISTINCT "visitor") FILTER (WHERE "day">=$4::date)::int AS month,
      COUNT(*)::int AS "totalVisits" FROM "AnalyticsVisit" WHERE "day">=$1::date - 89 AND "day"<=$1::date`, [today,yesterday,week,month])).rows[0];
    const values = [range.from, range.to];
    const where = `"day" BETWEEN $1::date AND $2::date AND "day">=($3::date - 89)`;
    const args = [...values, today];
    const summary = (await db.query(`SELECT COUNT(*)::int AS visits, COUNT(DISTINCT "visitor")::int AS visitors, COALESCE(SUM("pageViews"),0)::int AS "pageViews", COALESCE(ROUND(AVG("engagementSeconds")),0)::int AS "engagementSeconds" FROM "AnalyticsVisit" WHERE ${where}`, args)).rows[0];
    const orders = (await db.query(`SELECT COUNT(*)::int AS completed FROM "Order" WHERE "status"='COMPLETED' AND "completedAt">=($1::date::timestamp - INTERVAL '2 hours') AND "completedAt"<($2::date::timestamp + INTERVAL '22 hours')`, values)).rows[0];
    const daily = (await db.query(`SELECT to_char("day",'YYYY-MM-DD') AS day, COUNT(*)::int AS visits, COUNT(DISTINCT "visitor")::int AS visitors, SUM("pageViews")::int AS views FROM "AnalyticsVisit" WHERE ${where} GROUP BY "day" ORDER BY "day"`, args)).rows;
    const pages = (await db.query(`SELECT p.key AS name, SUM(p.value::int)::int AS views, COUNT(DISTINCT v."visitor")::int AS visitors FROM "AnalyticsVisit" v CROSS JOIN LATERAL jsonb_each_text(v.pages) p WHERE ${where} GROUP BY p.key ORDER BY views DESC LIMIT 50`, args)).rows;
    const events = (await db.query(`SELECT e.key AS name, SUM(e.value::int)::int AS count, COUNT(*)::int AS visits FROM "AnalyticsVisit" v CROSS JOIN LATERAL jsonb_each_text(v.events) e WHERE ${where} GROUP BY e.key ORDER BY count DESC`, args)).rows;
    const breakdowns: Record<string, { name: string; count: number }[]> = {};
    for (const column of ["source", "campaign", "country", "device", "browser", "os"]) {
      // Column is a hard-coded allowlist, never a request parameter.
      breakdowns[column] = (await db.query(`SELECT "${column}" AS name, COUNT(*)::int AS count FROM "AnalyticsVisit" WHERE ${where} GROUP BY "${column}" ORDER BY count DESC LIMIT 30`, args)).rows;
    }
    const funnel = (await db.query(`SELECT
      COUNT(*) FILTER (WHERE events ? 'product_view')::int AS product,
      COUNT(*) FILTER (WHERE events ? 'product_view' AND events ? 'add_to_cart')::int AS cart,
      COUNT(*) FILTER (WHERE events ? 'product_view' AND events ? 'add_to_cart' AND events ? 'checkout_started')::int AS checkout,
      COUNT(*) FILTER (WHERE events ? 'product_view' AND events ? 'add_to_cart' AND events ? 'checkout_started' AND events ? 'order_requested')::int AS requested,
      COUNT(*) FILTER (WHERE events ? 'whatsapp_click')::int AS whatsapp
      FROM "AnalyticsVisit" WHERE ${where}`, args)).rows[0];
    const recent = (await db.query(`SELECT "lastPath" AS page,"country","device",COUNT(*)::int AS visits FROM "AnalyticsVisit" WHERE "lastSeen">=$1::timestamptz - INTERVAL '15 minutes' GROUP BY "lastPath","country","device" HAVING COUNT(*) >= 5 ORDER BY visits DESC LIMIT 10`, [now])).rows;
    await db.query("COMMIT");
    return { range, overview, summary, orders, daily, pages, events, breakdowns, funnel, recent, generatedAt: now.toISOString() };
  } catch (error) { await db.query("ROLLBACK"); throw error; } finally { db.release(); }
}
