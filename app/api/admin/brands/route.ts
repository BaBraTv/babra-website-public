import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";
import { adminBrandSchema, requireSameOrigin } from "../../../../lib/security";

export async function GET() {
  try {
    await requireAdminUser();
    const brands = await getPrisma().productBrand.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json({ ok: true, brands });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const actor = await requireAdminUser();
    const body = adminBrandSchema.parse(await request.json());
    const brand = await getPrisma().productBrand.upsert({ where: { slug: body.slug }, update: body, create: body });
    await getPrisma().adminActivityLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "ProductBrand", entityId: brand.id, summary: `Saved brand ${brand.name}` } });
    return NextResponse.json({ ok: true, brand });
  } catch (error) {
    return authFail(error);
  }
}