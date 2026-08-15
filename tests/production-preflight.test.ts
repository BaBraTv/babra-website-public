import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { evaluateProductionEnvironment } from "../lib/production-preflight.mjs";

const valid = {
  DATABASE_URL: "postgresql://user:encoded@pool.example.com:6543/postgres",
  DIRECT_URL: "postgresql://user:encoded@db.example.com:5432/postgres",
  PRODUCTION_APP_URL: "https://www.babra.store", NEXT_PUBLIC_SITE_URL: "https://www.babra.store",
  AUTH_SESSION_SECRET: "a".repeat(40), NEXTAUTH_SECRET: "b".repeat(40), PASSWORD_RESET_TOKEN_SECRET: "c".repeat(40),
  ADMIN_SETUP_SECRET: "d".repeat(40), PAYMENT_CALLBACK_SECRET: "e".repeat(40), AFFILIATE_WITHDRAWAL_MIN_MINOR: "100"
};

test("production preflight accepts complete remote configuration without returning values", () => {
  const result = evaluateProductionEnvironment(valid);
  assert.equal(result.ok, true);
  assert.equal(JSON.stringify(result).includes("encoded"), false);
});

test("production preflight rejects localhost, placeholders, and invalid affiliate policy", () => {
  assert.equal(evaluateProductionEnvironment({ ...valid, DATABASE_URL: "postgresql://u:p@localhost/db" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, AUTH_SESSION_SECRET: "replace-me" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, AFFILIATE_WITHDRAWAL_MIN_MINOR: "1000", AFFILIATE_WITHDRAWAL_MAX_MINOR: "500" }).ok, false);
});

test("production build cannot invoke migrations and migration script requires approval", async () => {
  const build = await readFile(new URL("../scripts/vercel-build.mjs", import.meta.url), "utf8");
  const migration = await readFile(new URL("../scripts/apply-production-migrations.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(build, /prisma", "migrate", "deploy/);
  assert.match(migration, /PRODUCTION_MIGRATION_APPROVED/);
});
