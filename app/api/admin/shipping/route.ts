import { NextRequest, NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { recordAdminAction } from "../../../../lib/audit";
import { getPrisma } from "../../../../lib/db";
import { requireSameOrigin } from "../../../../lib/security";
import { requireAdminUser } from "../../../../lib/session";
import { shippingMethodSchema, shippingZoneSchema } from "../../../../lib/validation";

export async function GET() {
  try {
    await requireAdminUser();
    const zones = await getPrisma().shippingZone.findMany({ include: { methods: true }, orderBy: { name: "asc" } });
    return NextResponse.json({ ok: true, zones });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdminUser();
    const body = await request.json();
    const prisma = getPrisma();
    if (body.type === "method") {
      const payload = shippingMethodSchema.parse(body);
      const method = await prisma.shippingMethod.upsert({
        where: { zoneId_code: { zoneId: payload.zoneId, code: payload.code } },
        update: payload,
        create: payload
      });
      await recordAdminAction({ actorId: admin.id, action: "UPDATE", entityType: "ShippingMethod", entityId: method.id, summary: `Saved shipping method ${method.name}` });
      return NextResponse.json({ ok: true, method });
    }

    const payload = shippingZoneSchema.parse(body);
    const zone = await prisma.shippingZone.upsert({ where: { code: payload.code }, update: payload, create: payload });
    await recordAdminAction({ actorId: admin.id, action: "UPDATE", entityType: "ShippingZone", entityId: zone.id, summary: `Saved shipping zone ${zone.name}` });
    return NextResponse.json({ ok: true, zone });
  } catch (error) {
    return authFail(error);
  }
}
