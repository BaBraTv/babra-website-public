import { NextRequest, NextResponse } from "next/server";
import { authFail, fail } from "../../../lib/api";
import { recordAdminAction } from "../../../lib/audit";
import { getPrisma } from "../../../lib/db";
import { requireSameOrigin } from "../../../lib/security";
import { getCurrentUser, requireAdminUser, requireCurrentUser } from "../../../lib/session";
import { refundRequestSchema, refundReviewSchema } from "../../../lib/validation";

export async function GET(request: NextRequest) {
  try {
    const user = request.nextUrl.searchParams.get("scope") === "admin" ? await requireAdminUser() : await requireCurrentUser();
    const refunds = await getPrisma().refundRequest.findMany({
      where: user.role === "ADMIN" || user.role === "MANAGER" || user.role === "STAFF" ? undefined : { requestedById: user.id },
      orderBy: { createdAt: "desc" },
      include: { order: true }
    });
    return NextResponse.json({ ok: true, refunds });
  } catch (error) {
    return authFail(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const user = await getCurrentUser();
    const payload = refundRequestSchema.parse(await request.json());
    const order = await getPrisma().order.findUnique({ where: { id: payload.orderId }, include: { payments: true } });
    if (!order) throw new Error("Order not found");
    if (user && order.customerId && order.customerId !== user.id && !["ADMIN", "MANAGER", "STAFF"].includes(user.role)) {
      throw new Error("You cannot request a refund for this order");
    }
    const refund = await getPrisma().refundRequest.create({
      data: {
        orderId: payload.orderId,
        paymentId: payload.paymentId || null,
        requestedById: user?.id,
        reason: payload.reason,
        amountCents: payload.amountCents,
        currency: order.currency,
        customerNotes: payload.customerNotes || null
      }
    });
    await getPrisma().order.update({ where: { id: order.id }, data: { status: "REFUND_REQUESTED" } });
    return NextResponse.json({ ok: true, refund }, { status: 201 });
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const admin = await requireAdminUser();
    const payload = refundReviewSchema.parse(await request.json());
    const refund = await getPrisma().refundRequest.update({
      where: { id: payload.refundId },
      data: {
        status: payload.status,
        reviewedById: admin.id,
        adminNotes: payload.adminNotes || undefined,
        reviewedAt: ["APPROVED", "REJECTED", "PROCESSING", "REFUNDED", "CANCELLED"].includes(payload.status) ? new Date() : undefined,
        completedAt: payload.status === "REFUNDED" ? new Date() : undefined
      }
    });
    await recordAdminAction({ actorId: admin.id, action: "PAYMENT_REVIEW", entityType: "RefundRequest", entityId: refund.id, summary: `Refund request moved to ${refund.status}` });
    return NextResponse.json({ ok: true, refund });
  } catch (error) {
    return authFail(error);
  }
}
