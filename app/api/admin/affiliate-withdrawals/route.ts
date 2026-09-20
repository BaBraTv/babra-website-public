import { NextResponse, type NextRequest } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus, withdrawalTransitionSchema } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireAdminUser } from "../../../../lib/session";

export async function PATCH(request: NextRequest) {
  let admin;
  try {
    admin = await requireAdminUser();
  } catch (error) {
    return authFail(error);
  }
  try {
    await enforceRateLimit(request, { route: "admin.affiliate-withdrawals.transition", limit: 100, windowMs: 60 * 60_000 });
    const payload = withdrawalTransitionSchema.parse(await request.json());
    const withdrawal = await new AffiliatePersistenceService(getPrisma()).transitionWithdrawal({
      withdrawalId: payload.withdrawalId,
      affiliateId: payload.affiliateId,
      to: payload.status,
      adminReason: payload.adminReason,
      payoutReference: payload.payoutReference,
      actorId: admin.id
    });
    return NextResponse.json({ ok: true, withdrawal });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}
