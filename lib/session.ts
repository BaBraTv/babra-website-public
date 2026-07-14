import { randomBytes, createHash } from "crypto";
import { cookies, headers } from "next/headers";
import type { UserRole } from "@prisma/client";
import { getPrisma } from "./db";

export const sessionCookieName = "babra_session";

const sessionDays = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function publicUser(user: {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  status: string;
  preferredLocale: string;
  profile?: unknown;
}) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    preferredLocale: user.preferredLocale,
    profile: user.profile ?? null
  };
}

export async function createSession(userId: string) {
  const prisma = getPrisma();
  const rawToken = randomBytes(32).toString("hex");
  const sessionToken = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + sessionDays * 24 * 60 * 60 * 1000);
  const headerStore = await headers();

  await prisma.session.create({
    data: {
      userId,
      sessionToken,
      expiresAt,
      userAgent: headerStore.get("user-agent") ?? undefined,
      ipAddress: headerStore.get("x-forwarded-for")?.split(",")[0]?.trim()
    }
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt
  });
}

export async function destroyCurrentSession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(sessionCookieName)?.value;
  cookieStore.delete(sessionCookieName);

  if (!rawToken) return;

  await getPrisma().session.deleteMany({
    where: { sessionToken: hashToken(rawToken) }
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(sessionCookieName)?.value;
  if (!rawToken) return null;

  const session = await getPrisma().session.findUnique({
    where: { sessionToken: hashToken(rawToken) },
    include: { user: { include: { profile: true } } }
  });

  if (!session || session.expiresAt < new Date() || session.user.status === "DELETED") {
    return null;
  }

  return session.user;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

export async function requireAdminUser() {
  const user = await requireCurrentUser();
  if (user.role !== "ADMIN" && user.role !== "MANAGER" && user.role !== "STAFF") {
    throw new Error("Admin access required");
  }
  return user;
}
