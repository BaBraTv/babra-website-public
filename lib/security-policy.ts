import type { UserRole } from "@prisma/client";

export function isAdminRole(role: UserRole) {
  return role === "ADMIN" || role === "STAFF";
}

export function sessionCookieOptions(expires: Date, production = process.env.NODE_ENV === "production") {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: production,
    path: "/",
    expires,
    priority: "high" as const
  };
}

export function isRateLimited(count: number, limit: number) {
  return count > limit;
}
