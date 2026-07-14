import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";
import { adminTaxonomySchema, requireSameOrigin } from "../../../../lib/security";

export async function GET() {
  try {
    await requireAdminUser();
    const categories = await getPrisma().productCategory.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
    return NextResponse.json({ ok: true, categories });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const actor = await requireAdminUser();
    const body = adminTaxonomySchema.parse(await request.json());
    const category = await getPrisma().productCategory.upsert({ where: { slug: body.slug }, update: body, create: body });
    await getPrisma().adminActivityLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "ProductCategory", entityId: category.id, summary: `Saved category ${category.name}` } });
    return NextResponse.json({ ok: true, category });
  } catch (error) {
    return authFail(error);
  }
}