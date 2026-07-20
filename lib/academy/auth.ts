import { createHash, randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Route } from "next";
import type { AcademyRole } from "@prisma/client";
import { getPrisma } from "../db";
import { hasAcademyPermission, type AcademyPermission } from "./permissions";

export const academySessionCookie = "babra_academy_session";

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function hashAcademyPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyAcademyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createAcademySession(userId: string) {
  const rawToken = randomBytes(32).toString("base64url");
  const days = Math.min(Math.max(Number(process.env.ACADEMY_SESSION_DAYS ?? 7), 1), 30);
  const expiresAt = new Date(Date.now() + days * 86_400_000);
  const requestHeaders = await headers();

  await getPrisma().academySession.create({
    data: {
      userId,
      tokenHash: hashToken(rawToken),
      expiresAt,
      userAgent: requestHeaders.get("user-agent"),
      ipAddress: requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    }
  });

  const cookieStore = await cookies();
  cookieStore.set(academySessionCookie, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/academy",
    expires: expiresAt
  });
}

export async function destroyAcademySession() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(academySessionCookie)?.value;
  cookieStore.delete(academySessionCookie);
  if (rawToken) {
    await getPrisma().academySession.deleteMany({ where: { tokenHash: hashToken(rawToken) } });
  }
}

export async function getAcademyUser() {
  const rawToken = (await cookies()).get(academySessionCookie)?.value;
  if (!rawToken) return null;
  const session = await getPrisma().academySession.findUnique({
    where: { tokenHash: hashToken(rawToken) },
    include: { user: { include: { roles: true } } }
  });
  if (!session || session.expiresAt <= new Date() || session.user.status !== "ACTIVE") return null;
  return session.user;
}

export async function requireAcademyUser() {
  const user = await getAcademyUser();
  if (!user) redirect("/academy/login" as Route);
  return user;
}

export async function requireAcademyPermission(permission: AcademyPermission) {
  const user = await requireAcademyUser();
  const roles = user.roles.map(({ role }: { role: AcademyRole }) => role);
  if (!hasAcademyPermission(roles, permission)) redirect("/academy/unauthorized" as Route);
  return user;
}
