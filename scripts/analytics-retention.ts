// Run daily from an approved scheduler. Does not apply migrations.
import "./load-production-env.mjs";
import { analyticsPool, cleanupAnalytics } from "../lib/analytics-store.ts";
const pool = analyticsPool();
try {
  await cleanupAnalytics(pool, 1000000);
  console.log("Analytics retention cleanup completed (90-day visits, 24-hour receipts/rate keys).");
} finally { await pool.end(); }
