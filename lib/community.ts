import { z } from "zod";
import { getPrisma } from "./db";
import { getCurrentUser } from "./session";

const id = z.string().min(1).max(64);
const body = (max: number) => z.string().trim().min(1).max(max);
const photo = z.object({
  data: z.string().max(800000),
  type: z.enum(["image/jpeg", "image/png", "image/webp"]),
  alt: body(160),
});

export const communityAction = z.discriminatedUnion("action", [
  z.object({ action: z.literal("join"), displayName: body(45) }),
  z.object({ action: z.literal("post"), body: body(1200), photo: photo.optional() }),
  z.object({ action: z.literal("comment"), postId: id, body: body(600) }),
  z.object({ action: z.literal("removePost"), postId: id }),
  z.object({ action: z.literal("removeComment"), commentId: id }),
  z.object({ action: z.literal("request"), memberId: id }),
  z.object({ action: z.literal("respond"), threadId: id, accept: z.boolean() }),
  z.object({ action: z.literal("block"), threadId: id }),
  z.object({ action: z.literal("read"), threadId: id, messageId: z.uuid() }),
  z.object({ action: z.literal("message"), threadId: id, messageId: z.uuid(), body: body(2000) }),
]);

export const communityMemberSelect = { id: true, displayName: true } as const;
export const visibleMember = { user: { status: "ACTIVE" as const } };

export async function getCommunityAccount() {
  const user = await getCurrentUser();
  if (user?.status !== "ACTIVE") return null;
  const member = await getPrisma().communityMember.findUnique({
    where: { userId: user.id },
    select: communityMemberSelect,
  });
  return { userId: user.id, role: user.role, member };
}

export function communityThreadScope(memberId: string) {
  return {
    OR: [{ requesterId: memberId }, { recipientId: memberId }],
    requester: visibleMember,
    recipient: visibleMember,
  };
}
