import { NextResponse } from "next/server";
import { AffiliatePersistenceService } from "../../../../lib/affiliate-persistence";
import { affiliateErrorStatus, publicAffiliateAccount } from "../../../../lib/affiliate-api";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { requireCurrentUser } from "../../../../lib/session";

export async function GET() {
  let user;
  try {
    user = await requireCurrentUser();
  } catch (error) {
    return authFail(error);
  }
  try {
    const snapshot = await new AffiliatePersistenceService(getPrisma()).getAccountSnapshot(user.id);
    return NextResponse.json({ ok: true, ...publicAffiliateAccount(snapshot) });
  } catch (error) {
    return fail(error, affiliateErrorStatus(error));
  }
}
