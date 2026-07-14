import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../lib/db";
import { orderSubmissionSchema } from "../../../lib/validation";
import { getCurrentUser, requireAdminUser } from "../../../lib/session";
import { priceCheckout, reserveInventoryForOrder } from "../../../lib/commerce";
import { commerceEmailTemplates, queueCustomerNotification, queueNotification } from "../../../lib/email-routing";
import { authFail, fail } from "../../../lib/api";
import { z } from "zod";
import { createPaymentIntent } from "../../../lib/payments";
import { assertRateLimit } from "../../../lib/rate-limit";
import { requireSameOrigin } from "../../../lib/security";

const paymentProviderMap = {
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
  MTN_MOMO: "MTN_MOMO",
  AIRTEL_MONEY: "AIRTEL_MONEY",
  BANK_TRANSFER: "BANK_TRANSFER",
  CARD: "CARD",
  USDT: "USDT",
  MANUAL: "MANUAL"
} as const;

function orderNumber() {
  return `BABRA-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

export async function GET(request: NextRequest) {
  try {
    const user = request.nextUrl.searchParams.get("scope") === "admin" ? await requireAdminUser() : await getCurrentUser();
    if (!user) throw new Error("Authentication required");

    const orders = await getPrisma().order.findMany({
      where: user.role === "ADMIN" || user.role === "MANAGER" || user.role === "STAFF" ? undefined : { customerId: user.id },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { items: true, payments: true }
    });

    return NextResponse.json({ ok: true, orders });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await assertRateLimit(request, "orders:create", 10, 60_000);
    const payload = orderSubmissionSchema.parse(await request.json());
    const user = await getCurrentUser();
    const prisma = getPrisma();

    const order = await prisma.$transaction(async (tx) => {
      const pricing = await priceCheckout(tx, {
        items: payload.items,
        couponCode: payload.couponCode,
        deliveryOption: payload.deliveryOption
      });
      const provider = paymentProviderMap[payload.paymentProvider];
      const nextOrderNumber = orderNumber();
      const paymentIntent = createPaymentIntent(provider, {
        orderId: "pending",
        orderNumber: nextOrderNumber,
        amountCents: pricing.totalCents,
        currency: "RWF",
        customerPhone: payload.customerPhone
      });
      const created = await tx.order.create({
        data: {
          orderNumber: nextOrderNumber,
          customerId: user?.id,
          customerName: payload.customerName,
          customerEmail: payload.customerEmail || null,
          customerPhone: payload.customerPhone,
          status: provider === "CASH_ON_DELIVERY" ? "CONFIRMED" : "PENDING_PAYMENT",
          subtotalCents: pricing.subtotalCents,
          deliveryCents: pricing.deliveryCents,
          taxCents: pricing.taxCents,
          discountCents: pricing.discountCents,
          totalCents: pricing.totalCents,
          billingAddress: payload.billingAddress,
          shippingAddress: payload.shippingAddress,
          deliveryOption: payload.deliveryOption,
          couponCode: payload.couponCode || null,
          giftNote: payload.giftNote || null,
          province: payload.province,
          district: payload.district,
          sector: payload.sector,
          cell: payload.cell,
          village: payload.village,
          landmark: payload.landmark,
          deliveryNotes: payload.deliveryNotes,
          items: { create: pricing.enrichedItems },
          payments: {
            create: {
              provider,
              status: paymentIntent.status,
              amountCents: pricing.totalCents,
              currency: "RWF",
              customerPhone: payload.customerPhone,
              providerReference: paymentIntent.providerReference,
              callbackUrl: paymentIntent.callbackUrl,
              manualReviewNotes: paymentIntent.instructions,
              internalReference: `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
            }
          }
        }
      });
      await reserveInventoryForOrder(tx, pricing.enrichedItems, created.orderNumber);
      if (pricing.coupon) {
        await tx.coupon.update({ where: { id: pricing.coupon.id }, data: { redemptionCount: { increment: 1 } } });
      }
      return tx.order.findUniqueOrThrow({ where: { id: created.id }, include: { items: true, payments: true } });
    });

    await queueNotification({
      route: "orders",
      subject: `New BaBra order ${order.orderNumber}`,
      templateKey: "orders.created",
      payload: { orderId: order.id, orderNumber: order.orderNumber, customerPhone: order.customerPhone }
    });
    if (order.customerEmail) {
      await queueCustomerNotification({
        channel: "EMAIL",
        recipient: order.customerEmail,
        subject: `BaBra order ${order.orderNumber}`,
        templateKey: commerceEmailTemplates.orderConfirmation,
        payload: { orderId: order.id, orderNumber: order.orderNumber, status: order.status }
      });
    }

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return fail(error);
  }
}

const orderStatusUpdateSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["PENDING", "CONFIRMED", "PENDING_PAYMENT", "PAID", "PAYMENT_RECEIVED", "PROCESSING", "PACKED", "PACKING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED", "CANCELLED", "REFUND_REQUESTED", "REJECTED", "REFUNDED"]),
  adminNotes: z.string().trim().max(1000).optional().or(z.literal(""))
});

export async function PATCH(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdminUser();
    const payload = orderStatusUpdateSchema.parse(await request.json());
    const order = await getPrisma().order.update({
      where: { id: payload.orderId },
      data: {
        status: payload.status,
        adminNotes: payload.adminNotes || undefined,
        completedAt: payload.status === "COMPLETED" ? new Date() : undefined
      },
      include: { items: true, payments: true }
    });

    await getPrisma().adminActivityLog.create({
      data: {
        actorId: admin.id,
        action: "STATUS_CHANGE",
        entityType: "Order",
        entityId: order.id,
        summary: `Order ${order.orderNumber} moved to ${payload.status}`
      }
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return authFail(error);
  }
}
