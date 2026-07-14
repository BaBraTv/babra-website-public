import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { authFail } from "../../../../lib/api";
import { requireAdminUser } from "../../../../lib/session";
import { editableCosmeticsProducts } from "../../../data/cosmetics-catalog";

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
    const actor = await requireAdminUser();
    const body = await request.json();
    const prisma = getPrisma();
    const product = await prisma.product.create({
      data: {
        slug: String(body.slug),
        name: String(body.name),
        shortName: body.shortName ? String(body.shortName) : null,
        description: body.description ? String(body.description) : null,
        size: body.size ? String(body.size) : null,
        category: String(body.category ?? "Cosmetics"),
        priceCents: typeof body.priceCents === "number" ? body.priceCents : null,
        discountCents: typeof body.discountCents === "number" ? body.discountCents : null,
        stockQuantity: typeof body.stockQuantity === "number" ? body.stockQuantity : 0,
        sku: body.sku ? String(body.sku) : null,
        barcodePlaceholder: body.barcodePlaceholder ? String(body.barcodePlaceholder) : null,
        ingredientsPlaceholder: body.ingredientsPlaceholder ? String(body.ingredientsPlaceholder) : null,
        directions: body.directions ? String(body.directions) : null,
        features: Array.isArray(body.features) ? body.features : undefined,
        gallery: Array.isArray(body.gallery) ? body.gallery : undefined,
        imageUrl: body.imageUrl ? String(body.imageUrl) : null,
        imageAlt: body.imageAlt ? String(body.imageAlt) : null,
        isEditable: true,
        isFeatured: Boolean(body.isFeatured)
      }
    });

    await prisma.adminActivityLog.create({
      data: {
        actorId: actor.id,
        action: "CREATE",
        entityType: "Product",
        entityId: product.id,
        summary: `Created product ${product.name}`
      }
    });

    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    return authFail(error);
  }
}