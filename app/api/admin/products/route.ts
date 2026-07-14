import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";
import { editableCosmeticsProducts } from "../../../data/cosmetics-catalog";
import { adminProductCreateSchema, requireSameOrigin } from "../../../../lib/security";

export async function GET() {
  try {
    await requireAdminUser();
    const prisma = getPrisma();
    const [products, categories, brands] = await Promise.all([
      prisma.product.findMany({ orderBy: [{ publicSortOrder: "asc" }, { createdAt: "desc" }], include: { images: true, categoryRecord: true, brand: true } }),
      prisma.productCategory.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
      prisma.productBrand.findMany({ orderBy: { name: "asc" } })
    ]);

    return NextResponse.json({ ok: true, products, categories, brands, editableDefaults: editableCosmeticsProducts });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const actor = await requireAdminUser();
    const body = adminProductCreateSchema.parse(await request.json());
    const prisma = getPrisma();
    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        shortName: body.shortName ?? null,
        description: body.description ?? null,
        size: body.size ?? null,
        category: body.category,
        priceCents: body.priceCents ?? null,
        discountCents: body.discountCents ?? null,
        stockQuantity: body.stockQuantity ?? 0,
        sku: body.sku ?? null,
        barcodePlaceholder: body.barcodePlaceholder ?? null,
        ingredientsPlaceholder: body.ingredientsPlaceholder ?? null,
        directions: body.directions ?? null,
        features: body.features,
        gallery: body.gallery,
        imageUrl: body.imageUrl ?? null,
        imageAlt: body.imageAlt ?? null,
        isEditable: true,
        isFeatured: body.isFeatured ?? false
      }
    });

    await prisma.adminActivityLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "Product", entityId: product.id, summary: `Created product ${product.name}` } });
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    return authFail(error);
  }
}