import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { fail } from "../../../../lib/api";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { decodeGalleryPhoto, galleryPostInput } from "../../../../lib/gallery";

export const dynamic = "force-dynamic";

/** Customer photographs are private until a BaBra administrator explicitly publishes them. */
export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 850000) {
      return NextResponse.json({ ok: false, error: "Photo is too large. Please select a smaller image." }, { status: 413 });
    }
    const body = JSON.parse(raw);
    if (typeof body !== "object" || !body || body.website) {
      return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json({ ok: false, error: "Please confirm you own the photo and agree to review." }, { status: 400 });
    }
    const payload = galleryPostInput.parse({
      title: body.title,
      description: body.description,
      division: "BaBra Cosmetics",
      activityDate: new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Kigali", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()),
      status: "HIDDEN",
      photos: [body.photo],
    });
    if (payload.photos.length !== 1) {
      return NextResponse.json({ ok: false, error: "Exactly one photo is required" }, { status: 400 });
    }
    const photo = decodeGalleryPhoto(payload.photos[0]);
    await enforceRateLimit(request, { route: "gallery.guest-photo", limit: 3, windowMs: 3600000 });
    await getPrisma().galleryPost.create({
      data: {
        title: payload.title,
        description: payload.description,
        division: payload.division,
        activityDate: new Date(`${payload.activityDate}T00:00:00.000Z`),
        status: "HIDDEN",
        images: { create: [{ ...photo, position: 0 }] },
      },
      select: { id: true },
    });
    return NextResponse.json({ ok: true, message: "Your photo was received. BaBra will review it before publication." }, { status: 201 });
  } catch (error) {
    return fail(error, error instanceof Error && error.message === "Rate limit exceeded" ? 429 : 400);
  }
}
