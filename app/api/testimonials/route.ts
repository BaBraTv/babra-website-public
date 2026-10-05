import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../lib/db";
import { testimonialSubmissionSchema } from "../../../lib/validation";
import { divisionEmailRoutes, tryDeliverInternalNotification } from "../../../lib/email-routing";
import { enforceRateLimit } from "../../../lib/rate-limit";
import { fail } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stories = await getPrisma().testimonial.findMany({
      where: {
        status: "APPROVED",
        permissionToPublish: true,
        publishedAt: { not: null }
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 50,
      select: {
        id: true,
        publicName: true,
        country: true,
        city: true,
        productSlug: true,
        story: true,
        rating: true,
        purchaseVerified: true,
        publishedAt: true
      }
    });

    return NextResponse.json(
      { ok: true, stories },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch (error) {
    return fail(error, 503);
  }
}

export async function POST(request: NextRequest) {
  try {
    await enforceRateLimit(request, { route: "testimonials.submit", limit: 3, windowMs: 60 * 60_000 });
    const payload = testimonialSubmissionSchema.parse(await request.json());

    const prisma = getPrisma();
    const { testimonial, notification } = await prisma.$transaction(async (tx) => {
      const created = await tx.testimonial.create({
        data: {
          fullName: payload.fullName,
          publicName: payload.publicName,
          email: payload.email || null,
          phone: payload.phone || null,
          country: payload.country || null,
          city: payload.city || null,
          productSlug: payload.productSlug,
          story: payload.story,
          rating: payload.rating,
          permissionToPublish: true,
          status: "PENDING"
        },
        select: { id: true, status: true, createdAt: true }
      });

      const notification = await tx.emailNotification.create({
        data: {
          recipient: divisionEmailRoutes.testimonials,
          subject: "New BaBra customer story awaiting review",
          templateKey: "testimonials.submitted",
          payload: { testimonialId: created.id }
        }
      });

      return { testimonial: created, notification };
    });

    await tryDeliverInternalNotification(notification);
    return NextResponse.json({ ok: true, submission: testimonial }, { status: 201 });
  } catch (error) {
    return fail(error);
  }
}
