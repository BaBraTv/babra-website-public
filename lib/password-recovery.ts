import { createHash, randomBytes } from "node:crypto";
import type { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "./auth.ts";

export const recoveryMessage = "If an active account has that email address, a reset link will arrive shortly. Check your inbox and spam folder. / Niba iyo email iri kuri konti ikora, urabona link yo guhindura password.";
export const invalidResetMessage = "This link is invalid, expired or already used. Request a new link.";
export function validateNewPassword(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length < 12 || Buffer.byteLength(value, "utf8") > 72) throw new Error("Use at least 12 characters and at most 72 UTF-8 bytes.");
}
export function tokenDigest(token: string) { return createHash("sha256").update(token).digest("hex"); }

export async function requestRecovery(prisma: PrismaClient, email: string, deliver: (email: string, token: string) => Promise<void>) {
  const users = await prisma.user.findMany({ where: { email: { equals: email, mode: "insensitive" }, status: "ACTIVE" }, take: 2 });
  if (users.length !== 1 || !users[0].email) return;
  const user = users[0];
  const token = randomBytes(32).toString("hex"), tokenHash = tokenDigest(token);
  const issued = await prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id"=${user.id} FOR UPDATE`;
    if (await tx.passwordResetToken.count({ where: { userId: user.id, createdAt: { gt: new Date(Date.now() - 60_000) } } })) return false;
    await tx.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + 30 * 60_000) } });
    return true;
  });
  if (!issued) return;
  try { await deliver(user.email!, token); }
  catch {
    await prisma.passwordResetToken.deleteMany({ where: { tokenHash } });
    console.error("Password recovery email delivery failed");
  }
}

export async function resetPassword(prisma: PrismaClient, token: string, password: string) {
  validateNewPassword(password);
  if (!/^[a-f0-9]{64}$/.test(token)) throw new Error(invalidResetMessage);
  const candidate = await prisma.passwordResetToken.findUnique({ where: { tokenHash: tokenDigest(token) } });
  if (!candidate || candidate.usedAt || candidate.expiresAt <= new Date()) throw new Error(invalidResetMessage);
  const passwordHash = await hashPassword(password);
  await prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id"=${candidate.userId} FOR UPDATE`;
    const user = await tx.user.findUnique({ where: { id: candidate.userId } });
    if (!user || user.status !== "ACTIVE") throw new Error(invalidResetMessage);
    const claimed = await tx.passwordResetToken.updateMany({ where: { id: candidate.id, usedAt: null, expiresAt: { gt: new Date() } }, data: { usedAt: new Date() } });
    if (claimed.count !== 1) throw new Error(invalidResetMessage);
    await tx.user.update({ where: { id: user.id }, data: { passwordHash } });
    await tx.passwordResetToken.updateMany({ where: { userId: user.id, usedAt: null }, data: { usedAt: new Date() } });
    await tx.session.deleteMany({ where: { userId: user.id } });
  });
}

export async function changePassword(prisma: PrismaClient, userId: string, current: string, password: string) {
  validateNewPassword(password);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.status !== "ACTIVE" || !user.passwordHash || !await verifyPassword(current, user.passwordHash)) throw new Error("Current password is incorrect.");
  const passwordHash = await hashPassword(password);
  await prisma.$transaction(async tx => {
    await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id"=${user.id} FOR UPDATE`;
    const changed = await tx.user.updateMany({ where: { id: user.id, status: "ACTIVE", passwordHash: user.passwordHash }, data: { passwordHash } });
    if (changed.count !== 1) throw new Error("Current password is incorrect.");
    await tx.passwordResetToken.updateMany({ where: { userId, usedAt: null }, data: { usedAt: new Date() } });
    await tx.session.deleteMany({ where: { userId } });
  });
}
