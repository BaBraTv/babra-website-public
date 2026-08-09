import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { NextRequest } from "next/server.js";
import nextConfig from "../next.config.mjs";
import { middleware } from "../middleware.ts";
import { isAdminRole, isRateLimited, sessionCookieOptions } from "../lib/security-policy.ts";
import { secretsMatch } from "../lib/secrets.ts";
import { publicErrorMessage, redactPayment, redactUser } from "../lib/api.ts";

function request(path: string, init: ConstructorParameters<typeof NextRequest>[1] = {}) {
  return new NextRequest(`https://www.babra.store${path}`, init);
}

test("public GET requests pass without Origin or Content-Type", () => {
  assert.equal(middleware(request("/api/auth/me")).status, 200);
});

test("same-origin JSON POST is accepted", () => {
  const response = middleware(request("/api/auth/login", {
    method: "POST",
    headers: { origin: "https://www.babra.store", "content-type": "application/json; charset=utf-8" }
  }));
  assert.equal(response.status, 200);
});

test("cross-origin, missing Origin, and malformed Origin are rejected", () => {
  for (const origin of ["https://attacker.example", "not a URL", undefined]) {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (origin) headers.origin = origin;
    assert.equal(middleware(request("/api/auth/login", { method: "POST", headers })).status, 403);
  }
});

test("unsafe application APIs require JSON", () => {
  assert.equal(middleware(request("/api/auth/login", {
    method: "POST",
    headers: { origin: "https://www.babra.store", "content-type": "text/plain" }
  })).status, 415);
});

test("payment callback has a narrow Origin exemption but still requires JSON", () => {
  assert.equal(middleware(request("/api/payments/callback", {
    method: "POST",
    headers: { "content-type": "application/json" }
  })).status, 200);
  assert.equal(middleware(request("/api/payments/callback", { method: "POST" })).status, 415);
});

test("security headers include required production protections", async () => {
  const rules = await nextConfig.headers();
  const headers = Object.fromEntries(rules[0].headers.map(({ key, value }) => [key, value]));
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.doesNotMatch(headers["Content-Security-Policy"], /unsafe-eval/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["Strict-Transport-Security"], "max-age=31536000");
});

test("production session cookies are browser-inaccessible and secure", () => {
  const options = sessionCookieOptions(new Date("2030-01-01T00:00:00Z"), true);
  assert.equal(options.httpOnly, true);
  assert.equal(options.secure, true);
  assert.equal(options.sameSite, "lax");
  assert.equal(options.path, "/");
  assert.equal(options.priority, "high");
});

test("rate-limit boundary permits the limit and rejects the next request", () => {
  assert.equal(isRateLimited(10, 10), false);
  assert.equal(isRateLimited(11, 10), true);
});

test("admin roles and constant-time secret policy reject unauthorized values", () => {
  assert.equal(isAdminRole("ADMIN"), true);
  assert.equal(isAdminRole("STAFF"), true);
  assert.equal(isAdminRole("CUSTOMER"), false);
  assert.equal(secretsMatch("correct", "correct"), true);
  assert.equal(secretsMatch("wrong", "correct"), false);
  assert.equal(secretsMatch("", undefined), false);
});

test("internal errors and sensitive record fields are not exposed", () => {
  assert.equal(publicErrorMessage(new Error("password authentication failed for postgres"), 500), "Service temporarily unavailable");
  assert.deepEqual(redactUser({ id: "user-1", passwordHash: "secret-hash" }), { id: "user-1" });
  assert.deepEqual(redactPayment({ id: "payment-1", callbackPayload: { token: "secret" } }), { id: "payment-1" });
});

test("protected route sources enforce server-side authentication and authorization", async () => {
  const admin = await readFile(new URL("../app/api/admin/summary/route.ts", import.meta.url), "utf8");
  const account = await readFile(new URL("../app/api/account/summary/route.ts", import.meta.url), "utf8");
  const orders = await readFile(new URL("../app/api/orders/route.ts", import.meta.url), "utf8");
  assert.match(admin, /await requireAdminUser\(\)/);
  assert.match(account, /await requireCurrentUser\(\)/);
  assert.match(orders, /await requireAdminUser\(\)/);
});
