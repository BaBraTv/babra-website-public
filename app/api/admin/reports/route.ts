import { NextResponse } from "next/server";
import { authFail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/session";

export async function GET() {
  try {
    await requireAdminUser();
    const prisma = getPrisma();
    const [orders, payments, inventory, customers, products] = await Promise.all([
      prisma.order.groupBy({
        by: ["status"],
        _count: { _all: true },
        _sum: { totalCents: true }
      }),
      prisma.payment.groupBy({
        by: ["provider", "status"],
        _count: { _all: true },
        _sum: { amountCents: true }
      }),
      prisma.product.findMany({
        orderBy: { stockQuantity: "asc" },
        take: 50,
        select: { id: true, name: true, sku: true, stockQuantity: true, lowStockThreshold: true, status: true }
      }),
      prisma.user.groupBy({
        by: ["role", "status"],
        _count: { _all: true }
      }),
      prisma.orderItem.groupBy({
        by: ["productSlug", "productName"],
        _sum: { quantity: true, totalCents: true },
        _count: { _all: true },
        orderBy: { _sum: { totalCents: "desc" } },
        take: 20
      })
    ]);

    return NextResponse.json({
      ok: true,
      reports: {
        sales: orders,
        revenue: payments,
        inventory,
        customers,
        products
      }
    });
  } catch (error) {
    return authFail(error);
  }
}
