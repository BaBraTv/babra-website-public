import { NextResponse, type NextRequest } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus, withdrawalPolicyFromEnvironment, withdrawalRequestSchema } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireCurrentUser } from "../../../../lib/session";

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireCurrentUser();
  } catch (error) {
    return authFail(error);
  }
  if (process.env.AFFILIATE_WITHDRAWALS_ENABLED === "false") {
    return NextResponse.json({ ok: false, error: "Affiliate withdrawal requests are not available yet." }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
  try {
    await enforceRateLimit(request, { route: "affiliate.withdrawals.create", limit: 10, windowMs: 60 * 60_000 });
    const payload = withdrawalRequestSchema.parse(await request.json());
    const prisma = getPrisma();
    const affiliate = await prisma.affiliate.findUnique({ where: { userId: user.id }, select: { id: true } });
    if (!affiliate) return fail(new Error("Affiliate not found"), 404);
    const withdrawal = await new AffiliatePersistenceService(prisma).createWithdrawal({
      affiliateId: affiliate.id,
      idempotencyKey: payload.idempotencyKey,
      amountMinor: payload.amountMinor,
      currency: payload.currency,
      policy: withdrawalPolicyFromEnvironment()
    });
    return NextResponse.json({ ok: true, withdrawal });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}
