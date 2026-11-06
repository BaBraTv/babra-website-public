import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../lib/db";
import { fail } from "../../../lib/api";
import { galleryDate, galleryDivisions } from "../../../lib/gallery";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams;
    const page = Math.min(500, Math.max(0, Number(q.get("page")) || 0));
    const division = q.get("division");
    const date = q.get("date");
    const posts = await getPrisma().galleryPost.findMany({
      where: { status: "PUBLISHED", ...(division && galleryDivisions.includes(division as typeof galleryDivisions[number]) ? { division } : {}), ...(date ? { activityDate: new Date(`${galleryDate.parse(date)}T00:00:00.000Z`) } : {}) },
      orderBy: [{ activityDate: "desc" }, { id: "desc" }], skip: Math.floor(page) * 12, take: 13,
      select: { id: true, title: true, description: true, activityDate: true, division: true, status: true,
        images: { orderBy: { position: "asc" }, select: { id: true, alt: true, src: true } },
        _count: { select: { comments: { where: { status: "APPROVED" } } } } }
    });
    return NextResponse.json({ ok: true, posts: posts.slice(0, 12), hasMore: posts.length > 12 }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return fail(error, 503); }
}
