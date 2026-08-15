import { NextResponse, type NextRequest } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus, affiliateReviewSchema } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireAdminUser } from "../../../../lib/session";

export async function GET() {
  try {
    await requireAdminUser();
    const affiliates = await getPrisma().affiliate.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: { select: { id: true, fullName: true, email: true, phone: true, status: true } } } });
    return NextResponse.json({ ok: true, affiliates });
  } catch (error) { return authFail(error); }
}

export async function PATCH(request: NextRequest) {
  let admin;
  try { admin = await requireAdminUser(); } catch (error) { return authFail(error); }
  try {
    await enforceRateLimit(request, { route: "admin.affiliates.review", limit: 100, windowMs: 60 * 60_000 });
    const payload = affiliateReviewSchema.parse(await request.json());
    const affiliate = await new AffiliatePersistenceService(getPrisma()).reviewAffiliate({ ...payload, actorId: admin.id });
    return NextResponse.json({ ok: true, affiliate });
  } catch (error) { return fail(error, affiliateErrorStatus(error)); }
}
