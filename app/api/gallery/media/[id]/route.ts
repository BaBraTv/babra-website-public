import { type NextRequest } from "next/server";
import { getPrisma } from "../../../../../lib/db";
import { getCurrentUser, isAdminRole } from "../../../../../lib/session";
export const dynamic = "force-dynamic";
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const image = await getPrisma().galleryImage.findUnique({ where: { id }, include: { post: { select: { status: true } } } });
    if (!image?.data) return new Response(null, { status: 404 });
    if (image.post.status !== "PUBLISHED") {
      const user = await getCurrentUser();
      if (!user || user.status !== "ACTIVE" || !isAdminRole(user.role)) return new Response(null, { status: 404 });
    }
    return new Response(new Uint8Array(image.data), { headers: { "Content-Type": image.contentType, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 503 }); }
}
