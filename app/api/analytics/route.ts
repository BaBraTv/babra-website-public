import { NextResponse, type NextRequest } from "next/server";
import { excludedAgent, parseAnalyticsPayload } from "../../../lib/analytics-policy";
import { analyticsEnabled, analyticsPool, cleanupAnalytics, recordAnalytics } from "../../../lib/analytics-store";
import { getCurrentUser, isAdminRole, sessionCookieName } from "../../../lib/session";

export const runtime = "nodejs";
const quiet = () => new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
export async function POST(request: NextRequest) {
  if (!analyticsEnabled() || request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1" || excludedAgent(request.headers.get("user-agent") || "")) return quiet();
  // Fixed configured origin, not a caller-controlled forwarded host.
  const origins = (process.env.ANALYTICS_ALLOWED_ORIGINS || "https://www.babra.store,https://babra.store").split(",");
  if (!origins.includes(request.headers.get("origin") || "")) return new NextResponse(null, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new NextResponse(null, { status: 415 });
  try {
    // Stream bound prevents chunked requests bypassing Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return new NextResponse(null, { status: 400 });
    let bytes = 0, body = ""; const decoder = new TextDecoder();
    while (true) { const { done, value } = await reader.read(); if (done) break; bytes += value.length; if (bytes > 2048) { await reader.cancel(); return new NextResponse(null, { status: 413 }); } body += decoder.decode(value, { stream: true }); }
    body += decoder.decode();
    const payload = parseAnalyticsPayload(JSON.parse(body), (process.env.ANALYTICS_CAMPAIGNS || "").split(",").filter(Boolean));
    if (!payload) return new NextResponse(null, { status: 400 });
    if (request.cookies.has(sessionCookieName)) {
      const user = await getCurrentUser();
      if (user && isAdminRole(user.role)) return quiet();
    }
    const trustedCountry = process.env.VERCEL === "1" && process.env.ANALYTICS_TRUST_VERCEL_GEO === "true" ? request.headers.get("x-vercel-ip-country") : null;
    const country = trustedCountry && /^[A-Z]{2}$/.test(trustedCountry) ? trustedCountry : "Unknown";
    const pool = analyticsPool();
    const result = await recordAnalytics(pool, payload, { ua: request.headers.get("user-agent") || "", ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown", country });
    // Indexed, bounded cleanup also runs on collection, even when admins never open the dashboard.
    await cleanupAnalytics(pool, 100);
    return result === "limited" ? new NextResponse(null, { status: 429 }) : quiet();
  } catch { return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
