import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../../lib/db";
import { authFail } from "../../../../../lib/api";
import { requireAdminUser } from "../../../../../lib/session";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const actor = await requireAdminUser();
    const { id } = await params;
    const body = await request.json();
    const prisma = getPrisma();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name === undefined ? undefined : String(body.name),
        shortName: body.shortName === undefined ? undefined : body.shortName ? String(body.shortName) : null,
        description: body.description === undefined ? undefined : body.description ? String(body.description) : null,
        size: body.size === undefined ? undefined : body.size ? String(body.size) : null,
        category: body.category === undefined ? undefined : String(body.category),
        status: body.status,
        priceCents: body.priceCents === undefined ? undefined : typeof body.priceCents === "number" ? body.priceCents : null,
        discountCents: body.discountCents === undefined ? undefined : typeof body.discountCents === "number" ? body.discountCents : null,
        stockQuantity: body.stockQuantity === undefined ? undefined : Number(body.stockQuantity),
        lowStockThreshold: body.lowStockThreshold === undefined ? undefined : body.lowStockThreshold === null ? null : Number(body.lowStockThreshold),
        sku: body.sku === undefined ? undefined : body.sku ? String(body.sku) : null,
        barcode: body.barcode === undefined ? undefined : body.barcode ? String(body.barcode) : null,
        barcodePlaceholder: body.barcodePlaceholder === undefined ? undefined : body.barcodePlaceholder ? String(body.barcodePlaceholder) : null,
        ingredientsPlaceholder: body.ingredientsPlaceholder === undefined ? undefined : body.ingredientsPlaceholder ? String(body.ingredientsPlaceholder) : null,
        directions: body.directions === undefined ? undefined : body.directions ? String(body.directions) : null,
        features: body.features === undefined ? undefined : Array.isArray(body.features) ? body.features : undefined,
        gallery: body.gallery === undefined ? undefined : Array.isArray(body.gallery) ? body.gallery : undefined,
        imageUrl: body.imageUrl === undefined ? undefined : body.imageUrl ? String(body.imageUrl) : null,
        imageAlt: body.imageAlt === undefined ? undefined : body.imageAlt ? String(body.imageAlt) : null,
        isFeatured: body.isFeatured === undefined ? undefined : Boolean(body.isFeatured)
      }
    });

    await prisma.adminActivityLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "Product", entityId: product.id, summary: `Updated product ${product.name}` } });
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    return authFail(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
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