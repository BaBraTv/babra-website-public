import type { Prisma, PrismaClient } from "@prisma/client";
import { catalogName, catalogPriceCents, ensureCatalogProduct } from "./catalog";

export type CheckoutItemInput = {
  productSlug: string;
  quantity: number;
};

export type CheckoutPricingInput = {
  items: CheckoutItemInput[];
  couponCode?: string | null;
  deliveryOption?: string | null;
};

const deliveryFees: Record<string, number> = {
  PICKUP: 0,
  KIGALI_DELIVERY: 1500 * 100,
  RWANDA_DELIVERY: 3000 * 100,
  INTERNATIONAL_QUOTE: 0
};

export async function enrichCheckoutItems(items: CheckoutItemInput[]) {
  return Promise.all(
    items.map(async (item) => {
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
}

export async function priceCheckout(prisma: PrismaClient | Prisma.TransactionClient, input: CheckoutPricingInput) {
  const enrichedItems = await enrichCheckoutItems(input.items);
  const subtotalCents = enrichedItems.reduce((sum, item) => sum + item.totalCents, 0);
  const deliveryCents = deliveryFees[input.deliveryOption ?? "KIGALI_DELIVERY"] ?? deliveryFees.KIGALI_DELIVERY;
  const taxCents = 0;
  const couponCode = input.couponCode?.trim().toUpperCase() || null;
  const coupon = couponCode
    ? await prisma.coupon.findFirst({
        where: {
          code: couponCode,
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
        }
      })
    : null;
  const couponAvailable = coupon && (!coupon.maxRedemptions || coupon.redemptionCount < coupon.maxRedemptions);
  const discountCents = couponAvailable
    ? Math.min(subtotalCents, coupon.discountCents ?? Math.floor((subtotalCents * (coupon.discountPercent ?? 0)) / 100))
    : 0;
  const totalCents = Math.max(0, subtotalCents + deliveryCents + taxCents - discountCents);

  return { enrichedItems, subtotalCents, deliveryCents, taxCents, discountCents, totalCents, coupon };
}

export async function reserveInventoryForOrder(
  prisma: PrismaClient | Prisma.TransactionClient,
  items: Array<{ productId?: string | null; productName: string; quantity: number }>,
  reference: string
) {
  for (const item of items) {
    if (!item.productId) continue;
    const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { stockQuantity: true, name: true } });
    if (!product) continue;
    if (product.stockQuantity < item.quantity) {
      throw new Error(`${product.name} does not have enough stock for this order`);
    }
    await prisma.product.update({ where: { id: item.productId }, data: { stockQuantity: { decrement: item.quantity } } });
    await prisma.inventoryMovement.create({
      data: {
        productId: item.productId,
        quantity: -item.quantity,
        reason: "ORDER_RESERVATION",
        reference
      }
    });
  }
}

export function mapOrderLifecycle(status: string) {
  const labels: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PAID: "Paid",
    PACKED: "Packed",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    REFUND_REQUESTED: "Refund Requested",
    REFUNDED: "Refunded"
  };
  return labels[status] ?? status;
}
