import { NextRequest } from "next/server";
import { getPrisma } from "./db";

export async function assertRateLimit(request: NextRequest, route: string, limit = 20, windowMs = 60_000) {
  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `${route}:${ipAddress}`;
  const resetAt = new Date(Date.now() + windowMs);
  const prisma = getPrisma();
  const current = await prisma.rateLimitEvent.findUnique({ where: { key_route: { key, route } } });

  if (!current || current.resetAt < new Date()) {
    await prisma.rateLimitEvent.upsert({
      where: { key_route: { key, route } },
      update: { count: 1, resetAt, ipAddress },
      create: { key, route, count: 1, resetAt, ipAddress }
    });
    return;
  }

  if (current.count >= limit) {
    throw new Error("Too many requests. Please try again shortly.");
  }

  await prisma.rateLimitEvent.update({
    where: { key_route: { key, route } },
    data: { count: { increment: 1 }, ipAddress }
  });
}
