import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { requireAdminUser } from "../../../../lib/session";
import { authFail, fail } from "../../../../lib/api";
import { decodeGalleryPhoto, galleryPostInput } from "../../../../lib/gallery";
export const dynamic = "force-dynamic";
async function adminUser() {
  const user = await requireAdminUser();
  if (user.status !== "ACTIVE") throw new Error("Admin access required");
  return user;
}
function handleError(error: unknown) {
  const m = error instanceof Error ? error.message : "";
  return m.includes("Authentication") || m.includes("Admin") ? authFail(error) : fail(error);
}
export async function GET() {
  try {
    await adminUser();
    const prisma = getPrisma();
    const [posts, comments] = await Promise.all([
      prisma.galleryPost.findMany({ orderBy: [{ activityDate: "desc" }, { id: "desc" }], take: 100, include: { images: { orderBy: { position: "asc" }, select: { id: true, alt: true, src: true } }, _count: { select: { comments: true } } } }),
      prisma.galleryComment.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" }, take: 200, include: { post: { select: { title: true } } } })
    ]);
    return NextResponse.json({ ok: true, posts, comments }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return handleError(error); }
}
export async function POST(request: NextRequest) {
  try {
    const admin = await adminUser();
    const text = await request.text();
    if (Buffer.byteLength(text) > 3400000) return NextResponse.json({ ok: false, error: "Choose up to four smaller photos" }, { status: 413 });
    const payload = galleryPostInput.parse(JSON.parse(text));
    if (!payload.photos.length) return NextResponse.json({ ok: false, error: "Add at least one photo" }, { status: 400 });
    const photos = payload.photos.map(decodeGalleryPhoto);
    const post = await getPrisma().$transaction(async tx => {
      const post = await tx.galleryPost.create({ data: { title: payload.title, description: payload.description, division: payload.division, activityDate: new Date(`${payload.activityDate}T00:00:00.000Z`), status: payload.status, images: { create: photos.map((photo, position) => ({ ...photo, position })) } }, select: { id: true } });
      await tx.adminActivityLog.create({ data: { actorId: admin.id, action: "CREATE", entityType: "GalleryPost", entityId: post.id, summary: "Created dated gallery activity" } });
      return post;
    });
    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (error) { return handleError(error); }
}
const update = galleryPostInput.omit({ photos: true }).extend({ id: z.string().min(1) });
const moderation = z.object({ commentId: z.string().min(1), status: z.enum(["APPROVED", "REJECTED"]) });
export async function PATCH(request: NextRequest) {
  try {
    const admin = await adminUser();
    const body = await request.json();
    await getPrisma().$transaction(async tx => {
      if (body.commentId) {
        const payload = moderation.parse(body);
        await tx.galleryComment.update({ where: { id: payload.commentId }, data: { status: payload.status } });
        await tx.adminActivityLog.create({ data: { actorId: admin.id, action: "STATUS_CHANGE", entityType: "GalleryComment", entityId: payload.commentId, summary: `Gallery comment ${payload.status.toLowerCase()}` } });
      } else {
        const { id, ...payload } = update.parse(body);
        await tx.galleryPost.update({ where: { id }, data: { ...payload, activityDate: new Date(`${payload.activityDate}T00:00:00.000Z`) } });
        await tx.adminActivityLog.create({ data: { actorId: admin.id, action: "UPDATE", entityType: "GalleryPost", entityId: id, summary: "Updated gallery activity" } });
      }
    });
    return NextResponse.json({ ok: true });
  } catch (error) { return handleError(error); }
}
