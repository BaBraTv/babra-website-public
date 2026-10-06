import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../lib/db";
import { orderSubmissionSchema } from "../../../lib/validation";
import { getCurrentUser, requireAdminUser } from "../../../lib/session";
import { catalogName, catalogPriceCents, ensureCatalogProduct } from "../../../lib/catalog";
import { queueNotification } from "../../../lib/email-routing";
import { authFail, fail, redactOrder, redactOrderForCustomer } from "../../../lib/api";
import { z } from "zod";
import { enforceRateLimit } from "../../../lib/rate-limit";
import { AffiliatePersistenceService, AffiliatePersistenceError } from "../../../lib/affiliate-persistence";

const paymentProviderMap = {
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
  MTN_MOMO: "MTN_MOMO",
  AIRTEL_MONEY: "AIRTEL_MONEY",
  BANK_TRANSFER: "BANK_TRANSFER",
  CARD: "CARD",
  USDT: "USDT",
  MANUAL: "MANUAL"
} as const;

const MAX_ORDER_CENTS = 2_147_483_647;

function assertSafeOrderAmount(...amounts: number[]) {
  if (amounts.some((amount) => !Number.isSafeInteger(amount) || amount < 0 || amount > MAX_ORDER_CENTS)) {
    throw new Error("Order amount exceeds the supported limit.");
  }
}

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

    return NextResponse.json({ ok: true, orders: orders.map((order) => user.role === "ADMIN" || user.role === "STAFF" ? redactOrder(order) : redactOrderForCustomer(order)) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("Authentication") || message.includes("Admin")) return authFail(error);
    return fail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await enforceRateLimit(request, { route: "orders.create", limit: 20, windowMs: 10 * 60_000 });
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
    for (const item of enrichedItems) assertSafeOrderAmount(item.unitPriceCents, item.totalCents);
    const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.totalCents, 0);
    const hasUnpricedItems = enrichedItems.some((item) => item.unitPriceCents <= 0);
    const deliveryCents = !hasUnpricedItems && subtotalCents > 0 ? 1500 * 100 : 0;
    const totalCents = hasUnpricedItems ? 0 : subtotalCents + deliveryCents;
    assertSafeOrderAmount(subtotalCents, deliveryCents, totalCents);
    const provider = paymentProviderMap[payload.paymentProvider];
    const isQuoteOnly = payload.quoteOnly || hasUnpricedItems || totalCents <= 0;

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        customerId: user?.id,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail || null,
        customerPhone: payload.customerPhone,
        status: isQuoteOnly ? "QUOTE_REQUESTED" : "PENDING_PAYMENT",
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

    let affiliateAttributed = false;
    if (payload.affiliateCode) {
      try {
        await new AffiliatePersistenceService(prisma).createReferral({
          affiliateCode: payload.affiliateCode,
          orderId: order.id,
          customerUserId: user?.id,
          landingPath: "/checkout"
        });
        affiliateAttributed = true;
      } catch (error) {
        if (!(error instanceof AffiliatePersistenceError)) throw error;
      }
    }

    await queueNotification({
      route: "orders",
      subject: `${isQuoteOnly ? "New BaBra quote request" : "New BaBra order"} ${order.orderNumber}`,
      templateKey: isQuoteOnly ? "orders.quote_requested" : "orders.created",
      payload: { orderId: order.id, orderNumber: order.orderNumber, customerPhone: order.customerPhone, quoteOnly: isQuoteOnly }
    });

    return NextResponse.json({ ok: true, order: redactOrderForCustomer(order), affiliateAttribution: { attributed: affiliateAttributed } });
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
    const prisma = getPrisma();
    const postQuoteStatuses = new Set([
      "PENDING_PAYMENT", "PAYMENT_RECEIVED", "PROCESSING", "PACKING",
      "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"
    ]);

    const order = await prisma.$transaction(async (tx) => {
      const existing = await tx.order.findUnique({
        where: { id: payload.orderId },
        include: { items: true, payments: true }
      });
      if (!existing) throw new Error("Order not found");

      if (existing.status === "QUOTE_REQUESTED" && payload.status === "PENDING_PAYMENT") {
        const productRows = await tx.product.findMany({
          where: { slug: { in: existing.items.map((item) => item.productSlug) } },
          select: { slug: true, priceCents: true }
        });
        const priceBySlug = new Map(productRows.map((product) => [product.slug, product.priceCents ?? 0]));
        const pricedItems = existing.items.map((item) => {
          const unitPriceCents = priceBySlug.get(item.productSlug) ?? 0;
          if (unitPriceCents <= 0) throw new Error("Set production pricing before requesting payment.");
          const totalCents = unitPriceCents * item.quantity;
          assertSafeOrderAmount(unitPriceCents, totalCents);
          return { id: item.id, unitPriceCents, totalCents };
        });
        const subtotalCents = pricedItems.reduce((sum, item) => sum + item.totalCents, 0);
        const deliveryCents = subtotalCents > 0 ? 1500 * 100 : 0;
        const totalCents = subtotalCents + deliveryCents;
        assertSafeOrderAmount(subtotalCents, deliveryCents, totalCents);

        for (const item of pricedItems) {
          await tx.orderItem.update({
            where: { id: item.id },
            data: { unitPriceCents: item.unitPriceCents, totalCents: item.totalCents }
          });
        }

        if (existing.payments[0]) {
          await tx.payment.update({
            where: { id: existing.payments[0].id },
            data: { amountCents: totalCents, status: "PENDING" }
          });
        } else {
          await tx.payment.create({
            data: {
              orderId: existing.id,
              provider: "CASH_ON_DELIVERY",
              status: "PENDING",
              amountCents: totalCents,
              currency: existing.currency,
              customerPhone: existing.customerPhone,
              internalReference: `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
            }
          });
        }

        return tx.order.update({
          where: { id: existing.id },
          data: {
            status: "PENDING_PAYMENT",
            subtotalCents,
            deliveryCents,
            totalCents,
            adminNotes: payload.adminNotes || undefined
          },
          include: { items: true, payments: true }
        });
      }

      if ((existing.status === "QUOTE_REQUESTED" || existing.totalCents <= 0) && postQuoteStatuses.has(payload.status)) {
        throw new Error("Confirm production pricing before moving this quote into payment or fulfilment.");
      }

      return tx.order.update({
        where: { id: payload.orderId },
        data: {
          status: payload.status,
          adminNotes: payload.adminNotes || undefined,
          completedAt: payload.status === "COMPLETED" ? new Date() : undefined
        },
        include: { items: true, payments: true }
      });
    }, { isolationLevel: "Serializable" });

    await prisma.adminActivityLog.create({
      data: {
        actorId: admin.id,
        action: "STATUS_CHANGE",
        entityType: "Order",
        entityId: order.id,
        summary: `Order ${order.orderNumber} moved to ${payload.status}`
      }
    });

    return NextResponse.json({ ok: true, order: redactOrder(order) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("Authentication") || message.includes("Admin")) return authFail(error);
    return fail(error);
  }
}
