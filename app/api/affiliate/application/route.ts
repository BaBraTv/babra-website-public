import { NextResponse, type NextRequest } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireCurrentUser } from "../../../../lib/session";

export async function POST(request: NextRequest) {
  let user;
  try { user = await requireCurrentUser(); } catch (error) { return authFail(error); }
  try {
    await enforceRateLimit(request, { route: "affiliate.application", limit: 3, windowMs: 24 * 60 * 60_000 });
    const affiliate = await new AffiliatePersistenceService(getPrisma()).createAffiliateApplication({ userId: user.id });
    return NextResponse.json({ ok: true, affiliate: { id: affiliate.id, code: affiliate.code, status: affiliate.status, createdAt: affiliate.createdAt } });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}
