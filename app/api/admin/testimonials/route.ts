import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/session";
import { testimonialModerationSchema } from "../../../../lib/validation";
import { authFail, fail } from "../../../../lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();
    const testimonials = await getPrisma().testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
    return NextResponse.json(
      { ok: true, testimonials },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    return authFail(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdminUser();
    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) return fail(new Error("Missing testimonial id"));

    const payload = testimonialModerationSchema.parse(body);
    const existing = await getPrisma().testimonial.findUnique({ where: { id } });
    if (!existing) return fail(new Error("Testimonial not found"), 404);

    if (payload.status === "APPROVED" && !existing.permissionToPublish) {
      return fail(new Error("Publication permission is required"), 400);
    }

    const now = new Date();
    const testimonial = await getPrisma().$transaction(async (tx) => {
      const updated = await tx.testimonial.update({
        where: { id },
        data: {
          status: payload.status,
          purchaseVerified: payload.purchaseVerified ?? existing.purchaseVerified,
          adminNotes: payload.adminNotes ?? existing.adminNotes,
          approvedAt: payload.status === "APPROVED" ? existing.approvedAt ?? now : existing.approvedAt,
          publishedAt: payload.status === "APPROVED" ? now : null
        }
      });

      await tx.adminActivityLog.create({
        data: {
          actorId: admin.id,
          action: "STATUS_CHANGE",
          entityType: "Testimonial",
          entityId: id,
          summary: `Testimonial status changed to ${payload.status}`,
          metadata: {
            previousStatus: existing.status,
            purchaseVerified: updated.purchaseVerified
          }
        }
      });

      return updated;
    });

    return NextResponse.json(
      { ok: true, testimonial },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("Authentication") || message.includes("Admin")) return authFail(error);
    return fail(error);
  }
}
