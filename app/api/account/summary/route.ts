import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { requireCurrentUser, publicUser } from "../../../../lib/session";
import { rwandaAddressSchema } from "../../../../lib/validation";
import { fail, authFail } from "../../../../lib/api";

export async function GET() {
  try {
    const user = await requireCurrentUser();
    const prisma = getPrisma();
    const [orders, jobApplications, lostFoundReports, investorRequests, addresses, wishlistItems, savedCarts, recentlyViewed] = await Promise.all([
      prisma.order.findMany({ where: { customerId: user.id }, orderBy: { createdAt: "desc" }, include: { items: true, payments: true } }),
      prisma.jobApplication.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
      prisma.lostFoundReport.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
      prisma.investorAccessRequest.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
      prisma.customerAddress.findMany({ where: { userId: user.id }, orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }] }),
      prisma.wishlistItem.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, include: { product: true } }),
      prisma.savedCart.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" }, take: 1 }),
      prisma.recentlyViewedProduct.findMany({ where: { userId: user.id }, orderBy: { viewedAt: "desc" }, take: 12, include: { product: true } })
    ]);

    return NextResponse.json({
      ok: true,
      user: publicUser(user),
      orders,
      jobApplications,
      lostFoundReports,
      investorRequests,
      addresses,
      wishlistItems,
      savedCart: savedCarts[0] ?? null,
      recentlyViewed,
      payments: orders.flatMap((order) => order.payments)
    });
  } catch (error) {
    return authFail(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireCurrentUser();
    const payload = rwandaAddressSchema
      .extend({
        fullName: rwandaAddressSchema.shape.landmark.optional(),
        preferredLocale: rwandaAddressSchema.shape.landmark.optional(),
        customerType: rwandaAddressSchema.shape.landmark.optional()
      })
      .parse(await request.json());

    const updated = await getPrisma().user.update({
      where: { id: user.id },
      data: {
        fullName: payload.fullName || user.fullName,
        preferredLocale: payload.preferredLocale || user.preferredLocale,
        profile: {
          upsert: {
            create: {
              customerType: payload.customerType || "Retail",
              province: payload.province,
              district: payload.district,
              sector: payload.sector,
              cell: payload.cell,
              village: payload.village,
              landmark: payload.landmark,
              deliveryNotes: payload.deliveryNotes
            },
            update: {
              customerType: payload.customerType,
              province: payload.province,
              district: payload.district,
              sector: payload.sector,
              cell: payload.cell,
              village: payload.village,
              landmark: payload.landmark,
              deliveryNotes: payload.deliveryNotes
            }
          }
        }
      },
      include: { profile: true }
    });

    return NextResponse.json({ ok: true, user: publicUser(updated) });
  } catch (error) {
    return fail(error);
  }
}
