import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { requireCurrentUser } from "../../../../lib/session";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

const manualPaymentSchema = z.object({
  orderId: z.string().min(1),
  provider: z.enum(["CASH_ON_DELIVERY", "MTN_MOMO", "AIRTEL_MONEY", "BANK_TRANSFER"]),
  providerReference: z.string().trim().max(160).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal(""))
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    const payload = manualPaymentSchema.parse(await request.json());
    const prisma = getPrisma();
    const order = await prisma.order.findFirst({
      where: { id: payload.orderId, OR: [{ customerId: user.id }, ...(user.role === "ADMIN" || user.role === "STAFF" ? [{}] : [])] },
      include: { payments: true }
    });

    if (!order) throw new Error("Order not found");

    const payment = await prisma.payment.upsert({
      where: { internalReference: order.payments[0]?.internalReference ?? `missing-${order.id}` },
      update: {
        provider: payload.provider,
        status: "MANUAL_REVIEW",
        providerReference: payload.providerReference || null,
        manualReviewNotes: payload.notes || null
      },
      create: {
        orderId: order.id,
        provider: payload.provider,
        status: "MANUAL_REVIEW",
        amountCents: order.totalCents,
        currency: order.currency,
        customerPhone: order.customerPhone,
        providerReference: payload.providerReference || null,
        manualReviewNotes: payload.notes || null,
        internalReference: `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      }
    });

    await prisma.order.update({ where: { id: order.id }, data: { status: "PENDING_PAYMENT" } });
    await queueNotification({
      route: "payments",
      subject: `Manual payment review for ${order.orderNumber}`,
      templateKey: "payments.manual_review",
      payload: { orderId: order.id, paymentId: payment.id, provider: payload.provider }
    });

    return NextResponse.json({ ok: true, payment });
  } catch (error) {
    return fail(error);
  }
}
