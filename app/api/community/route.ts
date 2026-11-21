import { NextResponse, type NextRequest } from "next/server";
import { fail } from "../../../lib/api";
import {
  communityAction, communityMemberSelect, communityThreadScope, getCommunityAccount, visibleMember,
} from "../../../lib/community";
import { getPrisma } from "../../../lib/db";
import { isAdminRole } from "../../../lib/session";
import { decodeGalleryPhoto } from "../../../lib/gallery";
import { enforceRateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

function reply(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
}

function missing() {
  return reply({ error: "Ibyo ushaka ntibibonetse." }, 404);
}

const messageSelect = { id: true, senderId: true, body: true, createdAt: true } as const;
const newest = [{ createdAt: "desc" }, { id: "desc" }] as const;

export async function GET(request: NextRequest) {
  try {
    const account = await getCommunityAccount();
    if (!account?.member) return reply({ error: "Injira muri BaBra Community." }, 403);
    const { id } = account.member;
    const db = getPrisma();
    const params = request.nextUrl.searchParams;
    const threadId = params.get("thread");
    const search = params.get("members");
    if (search !== null) {
      const members = await db.communityMember.findMany({
        where: { ...visibleMember, id: { not: id }, displayName: { contains: search.trim().slice(0, 45), mode: "insensitive" } },
        select: communityMemberSelect, orderBy: [{ displayName: "asc" }, { id: "asc" }], take: 24,
      });
      return reply({ members });
    }
    if (threadId) {
      const scope = communityThreadScope(id);
      const thread = await db.communityThread.findFirst({
        where: { id: threadId, ...scope, status: "ACCEPTED" }, select: { id: true },
      });
      if (!thread) return missing();
      const before = params.get("before");
      const cursor = before ? await db.communityMessage.findFirst({
        where: { id: before, threadId }, select: { id: true },
      }) : null;
      if (before && !cursor) return missing();
      const messages = await db.communityMessage.findMany({
        where: { threadId }, select: messageSelect, orderBy: [...newest], take: 51,
        ...(cursor ? { cursor, skip: 1 } : {}),
      });
      return reply({ messages: messages.slice(0, 50).reverse(), hasOlder: messages.length > 50 });
    }
    if (params.has("inbox")) {
      const threads = await db.communityThread.findMany({
        where: { ...communityThreadScope(id), status: { in: ["PENDING", "ACCEPTED"] } },
        orderBy: [{ updatedAt: "desc" }, { id: "desc" }], take: 60,
        select: {
          id: true, requesterId: true, status: true, requesterRead: true, recipientRead: true,
          requester: { select: communityMemberSelect }, recipient: { select: communityMemberSelect },
          messages: { where: { senderId: { not: id } }, orderBy: [...newest], take: 1, select: { createdAt: true } },
        },
      });
      return reply({ threads: threads.map((thread) => {
        const incoming = thread.requesterId !== id;
        const read = incoming ? thread.recipientRead : thread.requesterRead;
        const latest = thread.messages[0]?.createdAt;
        return {
          id: thread.id, status: thread.status, incoming, person: incoming ? thread.requester : thread.recipient,
          unread: thread.status === "PENDING" ? incoming : Boolean(latest && (!read || latest > read)),
        };
      }) });
    }
    const page = Math.min(100, Math.max(0, parseInt(params.get("page") ?? "", 10) || 0));
    const posts = await db.communityPost.findMany({
      where: { author: visibleMember },
      orderBy: [...newest], skip: page * 12, take: 13,
      select: {
        id: true, body: true, alt: true, createdAt: true, author: { select: communityMemberSelect },
        comments: {
          where: { author: visibleMember }, orderBy: [...newest], take: 20,
          select: { id: true, body: true, author: { select: communityMemberSelect } },
        },
      },
    });
    return reply({ posts: posts.slice(0, 12), hasMore: posts.length > 12 });
  } catch (error) {
    return fail(error, 503);
  }
}

export async function POST(request: NextRequest) {
  try {
    const account = await getCommunityAccount();
    if (!account) return reply({ error: "Injira muri konti ya BaBra." }, 401);
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 820000) return reply({ error: "Ifoto ni nini cyane." }, 413);
    let input: unknown;
    try { input = JSON.parse(raw); } catch { return reply({ error: "Ongera usuzume ibyo wanditse." }, 400); }
    const data = communityAction.parse(input);
    const db = getPrisma();

    if (data.action === "join") {
      await enforceRateLimit(request, { route: "community.join", limit: 15, windowMs: 3600000 });
      const member = await db.communityMember.upsert({
        where: { userId: account.userId }, create: { userId: account.userId, displayName: data.displayName },
        update: {}, select: communityMemberSelect,
      });
      return reply({ member });
    }
    if (!account.member) return reply({ error: "Banza winjire muri BaBra Community." }, 403);
    const memberId = account.member.id;
    if (data.action !== "read") {
      await enforceRateLimit(request, {
        route: `community.${data.action}.${memberId}`,
        limit: data.action === "message" ? 45 : 15, windowMs: 60000,
      });
    }
    switch (data.action) {
      case "post": {
        let image;
        try { image = data.photo && decodeGalleryPhoto(data.photo); }
        catch { return reply({ error: "Hitamo JPG, PNG cyangwa WebP iri munsi ya 600 KB." }, 400); }
        await db.communityPost.create({
          data: { authorId: memberId, body: data.body, photo: image?.data, contentType: image?.contentType, alt: image?.alt },
        });
        return reply({}, 201);
      }
      case "comment": {
        const post = await db.communityPost.findFirst({
          where: { id: data.postId, author: visibleMember }, select: { id: true },
        });
        if (!post) return missing();
        await db.communityComment.create({ data: { postId: post.id, authorId: memberId, body: data.body } });
        return reply({}, 201);
      }
      case "removePost":
        await db.communityPost.deleteMany({ where: { id: data.postId, ...(!isAdminRole(account.role) && { authorId: memberId }) } });
        return reply({});
      case "removeComment":
        await db.communityComment.deleteMany({ where: { id: data.commentId, ...(!isAdminRole(account.role) && { authorId: memberId }) } });
        return reply({});
      case "request": {
        const person = await db.communityMember.findFirst({
          where: { ...visibleMember, id: { equals: data.memberId, not: memberId } }, select: { id: true },
        });
        if (!person) return missing();
        const pairKey = [memberId, person.id].sort().join(":");
        const thread = await db.communityThread.upsert({
          where: { pairKey }, update: {},
          create: { pairKey, requesterId: memberId, recipientId: person.id },
          select: { id: true, status: true },
        });
        if (thread.status === "DECLINED" || thread.status === "BLOCKED") return reply({ error: "Iki kiganiro ntigishobora gufungurwa." }, 409);
        return reply({ thread });
      }
      case "respond": {
        const result = await db.communityThread.updateMany({
          where: { ...communityThreadScope(memberId), id: data.threadId, recipientId: memberId, status: "PENDING" },
          data: { status: data.accept ? "ACCEPTED" : "DECLINED" },
        });
        return result.count ? reply({}) : missing();
      }
      case "block": {
        const result = await db.communityThread.updateMany({
          where: { ...communityThreadScope(memberId), id: data.threadId, status: "ACCEPTED" },
          data: { status: "BLOCKED" },
        });
        return result.count ? reply({}) : missing();
      }
      case "read": {
        const scope = { ...communityThreadScope(memberId), status: "ACCEPTED" };
        const message = await db.communityMessage.findFirst({
          where: { id: data.messageId, threadId: data.threadId, senderId: { not: memberId }, thread: scope },
          select: { createdAt: true },
        });
        if (!message) return missing();
        const readAt = message.createdAt;
        await db.$transaction([
          db.communityThread.updateMany({
            where: { ...scope, id: data.threadId, requesterId: memberId, AND: [{ OR: [{ requesterRead: null }, { requesterRead: { lt: readAt } }] }] },
            data: { requesterRead: readAt },
          }),
          db.communityThread.updateMany({
            where: { ...scope, id: data.threadId, recipientId: memberId, AND: [{ OR: [{ recipientRead: null }, { recipientRead: { lt: readAt } }] }] },
            data: { recipientRead: readAt },
          }),
        ]);
        return reply({});
      }
      case "message": {
        const thread = await db.communityThread.findFirst({
          where: { ...communityThreadScope(memberId), id: data.threadId, status: "ACCEPTED" },
          select: { id: true },
        });
        if (!thread) return missing();
        const message = await db.$transaction(async (tx) => {
          const writable = await tx.communityThread.updateMany({
            where: { id: thread.id, ...communityThreadScope(memberId), status: "ACCEPTED" },
            data: { updatedAt: new Date() },
          });
          if (!writable.count) return null;
          return tx.communityMessage.upsert({
            where: { id: data.messageId, threadId: thread.id, senderId: memberId }, update: {},
            create: { id: data.messageId, threadId: thread.id, senderId: memberId, body: data.body },
            select: messageSelect,
          });
        });
        return message ? reply({ message }, 201) : missing();
      }
    }
  } catch (error) {
    return fail(error, error instanceof Error && error.message === "Rate limit exceeded" ? 429 :
      error instanceof Error && error.name === "ZodError" ? 400 : 503);
  }
}
