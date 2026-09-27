import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { requestRecovery, resetPassword, changePassword, tokenDigest, validateNewPassword } from "../lib/password-recovery.ts";
import { hashPassword, verifyPassword } from "../lib/auth.ts";
import { recoveryEmailConfigured, sendRecoveryEmail } from "../lib/password-email.ts";

test("password limits reject short and bcrypt-truncated multibyte passwords", () => {
  assert.throws(() => validateNewPassword("short"));
  assert.throws(() => validateNewPassword("é".repeat(37)));
  validateNewPassword("A long test password");
});

test("email is fail-closed; configured sender uses fixed origin and private fragment", async () => {
  const saved = { ...process.env }, originalFetch = globalThis.fetch;
  try {
    delete process.env.PASSWORD_RECOVERY_EMAIL_ENABLED;
    assert.equal(recoveryEmailConfigured(), false);
    await assert.rejects(sendRecoveryEmail("local@example.invalid", "a".repeat(64)));
    Object.assign(process.env, { PASSWORD_RECOVERY_EMAIL_ENABLED: "true", RESEND_API_KEY: "test-only", PASSWORD_RECOVERY_FROM: "test@example.invalid", PRODUCTION_APP_URL: "https://www.babra.store" });
    let called = false;
    globalThis.fetch = async (url, options) => {
      called = true; assert.equal(url, "https://api.resend.com/emails");
      const body = JSON.parse(String(options?.body));
      assert.deepEqual(body.to, ["local@example.invalid"]);
      assert.ok(body.text.includes("https://www.babra.store/reset-password#token="));
      return new Response("{}", { status: 200 });
    };
    await sendRecoveryEmail("local@example.invalid", "a".repeat(64)); assert.equal(called, true);
    globalThis.fetch = async () => new Response("private provider error", { status: 500 });
    await assert.rejects(sendRecoveryEmail("local@example.invalid", "a".repeat(64)), /Email delivery failed/);
  } finally { globalThis.fetch = originalFetch; for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key]; Object.assign(process.env, saved); }
});

test("local PostgreSQL: recovery for admin/customer, single-use race, expiry and session revocation", async () => {
  const url = process.env.PASSWORD_TEST_DATABASE_URL;
  assert.ok(url, "Set PASSWORD_TEST_DATABASE_URL to a disposable local database");
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(url).hostname));
  const pool = new Pool({ connectionString: url, max: 5 });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  const ids: string[] = [];
  const password = "Original test password 2026";
  try {
    for (const role of ["CUSTOMER", "ADMIN"] as const) {
      const email = `recovery-${randomUUID()}@example.invalid`;
      const user = await prisma.user.create({ data: { email, fullName: "Local recovery test", role, status: "ACTIVE", passwordHash: await hashPassword(password) } }); ids.push(user.id);
      await prisma.session.create({ data: { userId: user.id, sessionToken: randomUUID(), expiresAt: new Date(Date.now() + 60000) } });
      let token = "", deliveries = 0;
      const deliver = async (recipient: string, value: string) => { assert.equal(recipient, email); token = value; deliveries++; };
      await requestRecovery(prisma, email.toUpperCase(), deliver);
      assert.equal(deliveries, 1); assert.match(token, /^[a-f0-9]{64}$/);
      const stored = await prisma.passwordResetToken.findUniqueOrThrow({ where: { tokenHash: tokenDigest(token) } });
      assert.notEqual(stored.tokenHash, token);
      await requestRecovery(prisma, email, deliver); assert.equal(deliveries, 1);
      const otherToken = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: tokenDigest(otherToken), expiresAt: new Date(Date.now() + 60000) } });
      const results = await Promise.allSettled([resetPassword(prisma, token, "New secure test password"), resetPassword(prisma, token, "New secure test password")]);
      assert.equal(results.filter(x => x.status === "fulfilled").length, 1);
      assert.equal(await prisma.session.count({ where: { userId: user.id } }), 0);
      assert.ok(await verifyPassword("New secure test password", (await prisma.user.findUniqueOrThrow({ where: { id: user.id } })).passwordHash!));
      await assert.rejects(resetPassword(prisma, otherToken, "Another test password"));
      await assert.rejects(changePassword(prisma, user.id, "wrong", "Another test password"));
      await prisma.session.create({ data: { userId: user.id, sessionToken: randomUUID(), expiresAt: new Date(Date.now() + 60000) } });
      await changePassword(prisma, user.id, "New secure test password", "Another test password");
      assert.equal(await prisma.session.count({ where: { userId: user.id } }), 0);
      const expired = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: tokenDigest(expired), expiresAt: new Date(Date.now() - 1000) } });
      await assert.rejects(resetPassword(prisma, expired, "New secure test password"));
      await prisma.user.update({ where: { id: user.id }, data: { status: "SUSPENDED" } });
      await requestRecovery(prisma, email, deliver); assert.equal(deliveries, 1);
      const suspendedToken = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash: tokenDigest(suspendedToken), expiresAt: new Date(Date.now() + 60000) } });
      await assert.rejects(resetPassword(prisma, suspendedToken, "New secure test password"));
    }
    await requestRecovery(prisma, "absent@example.invalid", async () => { assert.fail("Unknown account must not send email"); });
  } finally { await prisma.user.deleteMany({ where: { id: { in: ids } } }); await prisma.$disconnect(); await pool.end(); }
});
