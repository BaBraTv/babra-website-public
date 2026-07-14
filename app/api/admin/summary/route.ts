import { NextResponse } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/session";
import { authFail } from "../../../../lib/api";

export async function GET() {
  try {
    await requireAdminUser();
    const prisma = getPrisma();
    const [users, orders, payments, contactMessages, jobApplications, lostFoundReports, investorRequests, products, categories, brands, stockAlerts] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { profile: true } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { items: true, payments: true } }),
      prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.lostFoundReport.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.investorAccessRequest.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.product.findMany({ orderBy: { updatedAt: "desc" }, take: 50, include: { images: true, categoryRecord: true, brand: true } }),
      prisma.productCategory.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
      prisma.productBrand.findMany({ orderBy: { name: "asc" } }),
      prisma.product.findMany({ where: { lowStockThreshold: { not: null }, stockQuantity: { lte: 10 } }, orderBy: { stockQuantity: "asc" }, take: 25 })
    ]);

    return NextResponse.json({
      ok: true,
      counts: {
        users: users.length,
        orders: orders.length,
        payments: payments.length,
        contactMessages: contactMessages.length,
        jobApplications: jobApplications.length,
        lostFoundReports: lostFoundReports.length,
        investorRequests: investorRequests.length,
        products: products.length,
        categories: categories.length,
        brands: brands.length,
        stockAlerts: stockAlerts.length
      },
      users,
      orders,
      payments,
      contactMessages,
      jobApplications,
      lostFoundReports,
      investorRequests,
      products,
      categories,
      brands,
      stockAlerts
    });
  } catch (error) {
    return authFail(error);
  }
}
