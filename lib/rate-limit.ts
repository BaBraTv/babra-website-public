import { createHash } from "crypto";
import { Prisma } from "@prisma/client";
import type { NextRequest } from "next/server";
import { getPrisma } from "./db";
import { isRateLimited } from "./security-policy";

export { isRateLimited } from "./security-policy";

export type RateLimitPolicy = {
  route: string;
  limit: number;
  windowMs: number;
};

function clientAddress(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function enforceRateLimit(request: NextRequest, policy: RateLimitPolicy) {
  const ipAddress = clientAddress(request);
  const key = createHash("sha256").update(`${policy.route}:${ipAddress}`).digest("hex");
  const resetAt = new Date(Date.now() + policy.windowMs);

  const rows = await getPrisma().$queryRaw<Array<{ count: number; resetAt: Date }>>(Prisma.sql`
    INSERT INTO "RateLimitEvent" ("id", "key", "route", "ipAddress", "count", "resetAt", "createdAt", "updatedAt")
    VALUES (${crypto.randomUUID()}, ${key}, ${policy.route}, ${ipAddress}, 1, ${resetAt}, NOW(), NOW())
    ON CONFLICT ("key", "route") DO UPDATE SET
      "count" = CASE WHEN "RateLimitEvent"."resetAt" <= NOW() THEN 1 ELSE "RateLimitEvent"."count" + 1 END,
      "resetAt" = CASE WHEN "RateLimitEvent"."resetAt" <= NOW() THEN ${resetAt} ELSE "RateLimitEvent"."resetAt" END,
      "ipAddress" = ${ipAddress},
      "updatedAt" = NOW()
    RETURNING "count", "resetAt"
  `);

  if (!rows[0] || isRateLimited(rows[0].count, policy.limit)) {
    throw new Error("Rate limit exceeded");
  }
}
