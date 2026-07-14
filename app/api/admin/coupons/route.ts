import { NextRequest, NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { recordAdminAction } from "../../../../lib/audit";
import { getPrisma } from "../../../../lib/db";
import { requireSameOrigin } from "../../../../lib/security";
import { requireAdminUser } from "../../../../lib/session";
import { couponSchema } from "../../../../lib/validation";

export async function GET() {
  try {
    await requireAdminUser();
    const coupons = await getPrisma().coupon.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json({ ok: true, coupons });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdminUser();
    const payload = couponSchema.parse(await request.json());
    const coupon = await getPrisma().coupon.upsert({
      where: { code: payload.code },
      update: {
        ...payload,
        startsAt: payload.startsAt ? new Date(payload.startsAt) : null,
        expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null
      },
      create: {
        ...payload,
        startsAt: payload.startsAt ? new Date(payload.startsAt) : null,
        expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null
      }
    });
    await recordAdminAction({ actorId: admin.id, action: "UPDATE", entityType: "Coupon", entityId: coupon.id, summary: `Saved coupon ${coupon.code}` });
    return NextResponse.json({ ok: true, coupon });
  } catch (error) {
    return authFail(error);
  }
}
