import { NextResponse, type NextRequest } from "next/server";
import { requireAdminUser } from "../../../../lib/session";
import { authFail } from "../../../../lib/api";
import { parseRange } from "../../../../lib/analytics-policy";
import { analyticsEnabled, analyticsPool, analyticsReport } from "../../../../lib/analytics-store";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try { const user = await requireAdminUser(); if (user.status !== "ACTIVE") return NextResponse.json({ error: "Admin access required" }, { status: 403, headers: { "Cache-Control": "private, no-store" } }); }
  catch (error) { const response = authFail(error); response.headers.set("Cache-Control", "private, no-store"); return response; }
  const headers = { "Cache-Control": "private, no-store", "Vary": "Cookie" };
  if (!analyticsEnabled()) return NextResponse.json({ enabled: false }, { headers });
  let range;
  try { range = parseRange(request.nextUrl.searchParams.get("from"), request.nextUrl.searchParams.get("to")); }
  catch { return NextResponse.json({ error: "Choose up to 31 days within the last 90 days." }, { status: 400, headers }); }
  try { return NextResponse.json({ enabled: true, report: await analyticsReport(analyticsPool(), range) }, { headers }); }
  catch { return NextResponse.json({ error: "Analytics is unavailable. Check the database migration and configuration." }, { status: 503, headers }); }
}
