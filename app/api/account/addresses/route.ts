import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { requireCurrentUser } from "../../../../lib/session";
import { checkoutAddressSchema } from "../../../../lib/validation";
import { requireSameOrigin } from "../../../../lib/security";

const addressSchema = checkoutAddressSchema.extend({
  id: z.string().optional(),
  label: z.string().trim().max(80).optional().or(z.literal("")),
  isDefault: z.boolean().optional()
});

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const addresses = await getPrisma().customerAddress.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }]
    });
    return NextResponse.json({ ok: true, addresses });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const user = await requireCurrentUser();
    const payload = addressSchema.parse(await request.json());
    const prisma = getPrisma();
    const address = await prisma.$transaction(async (tx) => {
      if (payload.isDefault) {
        await tx.customerAddress.updateMany({ where: { userId: user.id }, data: { isDefault: false } });
      }
      return tx.customerAddress.upsert({
        where: { id: payload.id ?? "" },
        update: { ...payload, userId: user.id, label: payload.label || "Default" },
        create: { ...payload, userId: user.id, label: payload.label || "Default" }
      });
    });
    return NextResponse.json({ ok: true, address });
  } catch (error) {
    return fail(error);
  }
}
