import { NextResponse, type NextRequest } from "next/server";
import { authFail, fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { requireCurrentUser } from "../../../../lib/session";
import { ensureCatalogProduct } from "../../../../lib/catalog";
import { wishlistSchema } from "../../../../lib/validation";
import { requireSameOrigin } from "../../../../lib/security";

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const wishlist = await getPrisma().wishlistItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { product: true }
    });
    return NextResponse.json({ ok: true, wishlist });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const user = await requireCurrentUser();
    const payload = wishlistSchema.parse(await request.json());
    const product = await ensureCatalogProduct(payload.productSlug);
    if (!product) throw new Error("Product is not available");
    const item = await getPrisma().wishlistItem.upsert({
      where: { userId_productId: { userId: user.id, productId: product.id } },
      update: {},
      create: { userId: user.id, productId: product.id }
    });
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return fail(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const user = await requireCurrentUser();
    const payload = wishlistSchema.parse(await request.json());
    const product = await ensureCatalogProduct(payload.productSlug);
    if (product) {
      await getPrisma().wishlistItem.deleteMany({ where: { userId: user.id, productId: product.id } });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
