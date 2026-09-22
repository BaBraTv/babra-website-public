import { timingSafeEqual } from "node:crypto";
import { analyticsPool, cleanupAnalytics } from "../../../../lib/analytics-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store" };
  const secret = process.env.CRON_SECRET || "";
  const expected = Buffer.from(`Bearer ${secret}`);
  const provided = Buffer.from(request.headers.get("authorization") || "");
  if (secret.length < 32 || expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  try {
    // Retention must continue even after visitor collection is disabled.
    await cleanupAnalytics(analyticsPool(), 100000);
    return Response.json({ ok: true }, { headers });
  } catch {
    return Response.json({ error: "Analytics retention cleanup failed" }, { status: 503, headers });
  }
}
