import { getCommunityAccount, visibleMember } from "../../../../../lib/community";
import { getPrisma } from "../../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const headers = { "Cache-Control": "private, no-store" };
  if (!(await getCommunityAccount())?.member) return new Response(null, { status: 404, headers });
  const post = await getPrisma().communityPost.findFirst({
    where: { id, author: visibleMember }, select: { photo: true, contentType: true },
  });
  if (!post?.photo || !post.contentType) return new Response(null, { status: 404, headers });
  return new Response(Buffer.from(post.photo), {
    headers: { ...headers, "Content-Type": post.contentType, "X-Content-Type-Options": "nosniff" },
  });
}
