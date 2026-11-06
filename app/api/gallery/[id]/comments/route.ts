import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../../lib/db";
import { fail } from "../../../../../lib/api";
import { enforceRateLimit } from "../../../../../lib/rate-limit";
import { galleryCommentInput } from "../../../../../lib/gallery";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const comments = await getPrisma().galleryComment.findMany({ where: { postId: id, status: "APPROVED", post: { status: "PUBLISHED" } }, orderBy: { createdAt: "desc" }, take: 100, select: { id: true, author: true, body: true, createdAt: true } });
    return NextResponse.json({ ok: true, comments }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return fail(error, 503); }
}
export async function POST(request: NextRequest, { params }: Context) {
  try {
    await enforceRateLimit(request, { route: "gallery.comment", limit: 5, windowMs: 3600000 });
    const { id } = await params;
    const payload = galleryCommentInput.parse(await request.json());
    const post = await getPrisma().galleryPost.findFirst({ where: { id, status: "PUBLISHED" }, select: { id: true } });
    if (!post) return NextResponse.json({ ok: false, error: "Activity not found" }, { status: 404 });
    await getPrisma().galleryComment.create({ data: { postId: id, author: payload.author, body: payload.body }, select: { id: true } });
    return NextResponse.json({ ok: true, message: "Igitekerezo cyakiriwe. Kiragaragara kimaze kwemezwa na BaBra." }, { status: 201 });
  } catch (error) { return fail(error, error instanceof Error && error.message === "Rate limit exceeded" ? 429 : 400); }
}
