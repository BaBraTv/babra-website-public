import { createHash } from "crypto";
import { headers } from "next/headers";
import { getPrisma } from "../db";

export async function enforceAcademyRateLimit(route: string, limit = 10, windowMinutes = 15) {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const key = createHash("sha256").update(`academy:${route}:${ip}`).digest("hex");
  const now = new Date();
  const existing = await getPrisma().rateLimitEvent.findUnique({ where: { key_route: { key, route } } });
  if (!existing || existing.resetAt <= now) {
    await getPrisma().rateLimitEvent.upsert({
      where: { key_route: { key, route } },
      create: { key, route, ipAddress: ip, count: 1, resetAt: new Date(now.getTime() + windowMinutes * 60_000) },
      update: { count: 1, ipAddress: ip, resetAt: new Date(now.getTime() + windowMinutes * 60_000) }
    });
    return;
  }
  if (existing.count >= limit) throw new Error("RATE_LIMITED");
  await getPrisma().rateLimitEvent.update({ where: { key_route: { key, route } }, data: { count: { increment: 1 } } });
}
