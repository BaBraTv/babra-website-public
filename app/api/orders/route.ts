import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../lib/db";
import { orderSubmissionSchema } from "../../../lib/validation";
import { getCurrentUser, requireAdminUser } from "../../../lib/session";
import { catalogName, catalogPriceCents, ensureCatalogProduct } from "../../../lib/catalog";
import { queueNotification } from "../../../lib/email-routing";
import { authFail, fail } from "../../../lib/api";
import { z } from "zod";

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
      where: user.role === "ADMIN" || user.role === "STAFF" ? undefined : { customerId: user.id },
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
    const payload = orderSubmissionSchema.parse(await request.json());
    const user = await getCurrentUser();
    const prisma = getPrisma();
    const enrichedItems = await Promise.all(
      payload.items.map(async (item) => {
        const product = await ensureCatalogProduct(item.productSlug);
        const unitPriceCents = product?.priceCents ?? catalogPriceCents(item.productSlug);
        return {
          productId: product?.id,
          productSlug: item.productSlug,
          productName: product?.name ?? catalogName(item.productSlug),
          quantity: item.quantity,
          unitPriceCents,
          totalCents: unitPriceCents * item.quantity
        };
      })
    );
    const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.totalCents, 0);
    const deliveryCents = subtotalCents > 0 ? 1500 * 100 : 0;
    const totalCents = subtotalCents + deliveryCents;
    const provider = paymentProviderMap[payload.paymentProvider];

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        customerId: user?.id,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail || null,
        customerPhone: payload.customerPhone,
        status: provider === "CASH_ON_DELIVERY" ? "PENDING_PAYMENT" : "PENDING_PAYMENT",
        subtotalCents,
        deliveryCents,
        totalCents,
        province: payload.province,
        district: payload.district,
        sector: payload.sector,
        cell: payload.cell,
        village: payload.village,
        landmark: payload.landmark,
        deliveryNotes: payload.deliveryNotes,
        items: { create: enrichedItems },
        payments: {
          create: {
            provider,
            status: "PENDING",
            amountCents: totalCents,
            currency: "RWF",
            customerPhone: payload.customerPhone,
            internalReference: `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          }
        }
      },
      include: { items: true, payments: true }
    });

    await queueNotification({
      route: "orders",
      subject: `New BaBra order ${order.orderNumber}`,
      templateKey: "orders.created",
      payload: { orderId: order.id, orderNumber: order.orderNumber, customerPhone: order.customerPhone }
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return fail(error);
  }
}

const orderStatusUpdateSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["QUOTE_REQUESTED", "PENDING_PAYMENT", "PAYMENT_RECEIVED", "PROCESSING", "PACKING", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED", "CANCELLED", "REJECTED", "REFUNDED"]),
  adminNotes: z.string().trim().max(1000).optional().or(z.literal(""))
});

export async function PATCH(request: NextRequest) {
  try {
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
