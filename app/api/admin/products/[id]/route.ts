import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../../lib/db";
import { authFail } from "../../../../../lib/api";
import { requireAdminUser } from "../../../../../lib/session";
import { adminProductSchema, requireSameOrigin } from "../../../../../lib/security";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    requireSameOrigin(request);
    const actor = await requireAdminUser();
    const { id } = await params;
    const body = adminProductSchema.parse(await request.json());
    const prisma = getPrisma();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        shortName: body.shortName,
        description: body.description,
        size: body.size,
        category: body.category,
        status: body.status,
        priceCents: body.priceCents,
        discountCents: body.discountCents,
        stockQuantity: body.stockQuantity,
        lowStockThreshold: body.lowStockThreshold,
        sku: body.sku,
        barcode: body.barcode,
        barcodePlaceholder: body.barcodePlaceholder,
        ingredientsPlaceholder: body.ingredientsPlaceholder,
        directions: body.directions,
        features: body.features,
        gallery: body.gallery,
        imageUrl: body.imageUrl,
        imageAlt: body.imageAlt,
        isFeatured: body.isFeatured
      }
    });

    await prisma.adminActivityLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "Product", entityId: product.id, summary: `Updated product ${product.name}` } });
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    return authFail(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    requireSameOrigin(request);
    const actor = await requireAdminUser();
    const { id } = await params;
    const prisma = getPrisma();
    const product = await prisma.product.update({ where: { id }, data: { status: "ARCHIVED" } });
    await prisma.adminActivityLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "Product", entityId: product.id, summary: `Archived product ${product.name}` } });
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    return authFail(error);
  }
}