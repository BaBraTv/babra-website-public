import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/session";
import { savedCartSchema } from "../../../../lib/validation";
import { fail } from "../../../../lib/api";
import { assertRateLimit } from "../../../../lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const sessionId = request.nextUrl.searchParams.get("sessionId") ?? undefined;
    const cart = await getPrisma().savedCart.findFirst({
      where: user ? { userId: user.id } : { sessionId },
      orderBy: { updatedAt: "desc" }
    });
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return fail(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await assertRateLimit(request, "account:cart", 40, 60_000);
    const user = await getCurrentUser();
    const payload = savedCartSchema.parse(await request.json());
    if (!user && !payload.sessionId) throw new Error("Session id is required for guest cart persistence");
    const prisma = getPrisma();
    const cart = await prisma.savedCart.upsert({
      where: user ? { id: (await prisma.savedCart.findFirst({ where: { userId: user.id }, select: { id: true } }))?.id ?? "" } : { id: (await prisma.savedCart.findFirst({ where: { sessionId: payload.sessionId || undefined }, select: { id: true } }))?.id ?? "" },
      update: { items: payload.items, coupon: payload.coupon || null, giftNote: payload.giftNote || null },
      create: { userId: user?.id, sessionId: payload.sessionId || null, items: payload.items, coupon: payload.coupon || null, giftNote: payload.giftNote || null }
    });
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return fail(error);
  }
}
