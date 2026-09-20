import { NextResponse, type NextRequest } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus, commissionCreateSchema, commissionTransitionSchema } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireAdminUser } from "../../../../lib/session";

async function adminOrResponse() {
  try {
    return { admin: await requireAdminUser() } as const;
  } catch (error) {
    return { response: authFail(error) } as const;
  }
}

export async function POST(request: NextRequest) {
  const authorization = await adminOrResponse();
  if ("response" in authorization) return authorization.response;
  try {
    await enforceRateLimit(request, { route: "admin.affiliate-commissions.create", limit: 100, windowMs: 60 * 60_000 });
    const payload = commissionCreateSchema.parse(await request.json());
    const commission = await new AffiliatePersistenceService(getPrisma()).createCommission({ ...payload, actorId: authorization.admin.id });
    return NextResponse.json({ ok: true, commission });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}

export async function PATCH(request: NextRequest) {
  const authorization = await adminOrResponse();
  if ("response" in authorization) return authorization.response;
  try {
    await enforceRateLimit(request, { route: "admin.affiliate-commissions.transition", limit: 100, windowMs: 60 * 60_000 });
    const payload = commissionTransitionSchema.parse(await request.json());
    const commission = await new AffiliatePersistenceService(getPrisma()).transitionCommission({
      commissionId: payload.commissionId,
      affiliateId: payload.affiliateId,
      to: payload.status,
      reason: payload.reason,
      actorId: authorization.admin.id
    });
    return NextResponse.json({ ok: true, commission });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}
