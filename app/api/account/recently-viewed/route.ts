import { NextResponse, type NextRequest } from "next/server";
import { fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/session";
import { ensureCatalogProduct } from "../../../../lib/catalog";
import { recentlyViewedSchema } from "../../../../lib/validation";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const sessionId = request.nextUrl.searchParams.get("sessionId") ?? undefined;
    const recentlyViewed = await getPrisma().recentlyViewedProduct.findMany({
      where: user ? { userId: user.id } : { sessionId },
      orderBy: { viewedAt: "desc" },
      take: 12,
      include: { product: true }
    });
    return NextResponse.json({ ok: true, recentlyViewed });
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const payload = recentlyViewedSchema.parse(await request.json());
    if (!user && !payload.sessionId) throw new Error("Session id is required for guest recently viewed");
    const product = await ensureCatalogProduct(payload.productSlug);
    if (!product) throw new Error("Product is not available");
    const prisma = getPrisma();
    const existing = await prisma.recentlyViewedProduct.findFirst({
      where: user ? { userId: user.id, productId: product.id } : { sessionId: payload.sessionId || undefined, productId: product.id },
      select: { id: true }
    });
    const viewed = await prisma.recentlyViewedProduct.upsert({
      where: { id: existing?.id ?? "" },
      update: { viewedAt: new Date() },
      create: { userId: user?.id, sessionId: payload.sessionId || null, productId: product.id }
    });
    return NextResponse.json({ ok: true, viewed });
  } catch (error) {
    return fail(error);
  }
}
