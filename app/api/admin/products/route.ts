import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/session";
import { ensureCatalogProduct } from "../../../../lib/catalog";
import { authFail, fail } from "../../../../lib/api";

const productSlug = z.enum(["women", "men", "babies"]);

const updateSchema = z.object({
  products: z.array(z.object({
    slug: productSlug,
    priceRwf: z.number().int().min(0).max(10_000_000),
    stockQuantity: z.number().int().min(0).max(10_000_000).optional()
  })).min(1).max(3)
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();
    const prisma = getPrisma();
    await Promise.all(["women", "men", "babies"].map((slug) => ensureCatalogProduct(slug)));
    const rows = await prisma.product.findMany({
      where: { slug: { in: ["women", "men", "babies"] } },
      orderBy: { publicSortOrder: "asc" },
      select: {
        slug: true,
        name: true,
        priceCents: true,
        currency: true,
        stockQuantity: true,
        status: true
      }
    });

    return NextResponse.json(
      {
        ok: true,
        products: rows.map((row) => ({
          ...row,
          priceRwf: Math.round((row.priceCents ?? 0) / 100)
        }))
      },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    return authFail(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdminUser();
    const payload = updateSchema.parse(await request.json());
    const prisma = getPrisma();

    const updated = await prisma.$transaction(async (tx) => {
      const results = [];
      for (const item of payload.products) {
        await ensureCatalogProduct(item.slug);
        const product = await tx.product.update({
          where: { slug: item.slug },
          data: {
            priceCents: item.priceRwf * 100,
            ...(item.stockQuantity === undefined ? {} : { stockQuantity: item.stockQuantity })
          },
          select: {
            slug: true,
            name: true,
            priceCents: true,
            currency: true,
            stockQuantity: true,
            status: true
          }
        });
        results.push(product);
      }

      await tx.adminActivityLog.create({
        data: {
          actorId: admin.id,
          action: "UPDATE",
          entityType: "ProductPricing",
          summary: "Updated production product pricing",
          metadata: {
            products: payload.products.map((item) => ({ slug: item.slug, priceRwf: item.priceRwf }))
          }
        }
      });

      return results;
    });

    return NextResponse.json({
      ok: true,
      products: updated.map((row) => ({
        ...row,
        priceRwf: Math.round((row.priceCents ?? 0) / 100)
      }))
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("Authentication") || message.includes("Admin")) return authFail(error);
    return fail(error);
  }
}
