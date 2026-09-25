import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { evaluateProductionEnvironment } from "../lib/production-preflight.mjs";
import { loadProductionEnvironment } from "../scripts/load-production-env.mjs";

const valid = {
  DATABASE_URL: "postgresql://postgres.abcdefghijklmnopqrst:encoded@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
  DIRECT_URL: "postgresql://postgres:encoded@db.abcdefghijklmnopqrst.supabase.co:5432/postgres",
  PRODUCTION_APP_URL: "https://www.babra.store", NEXT_PUBLIC_SITE_URL: "https://www.babra.store",
  ADMIN_SETUP_SECRET: "d".repeat(40), PAYMENT_CALLBACK_SECRET: "e".repeat(40), AFFILIATE_WITHDRAWAL_MIN_MINOR: "100",
  PRODUCTION_SUPABASE_PROJECT_REF: "abcdefghijklmnopqrst",
  PRODUCTION_DATABASE_HOST: "aws-0-eu-central-1.pooler.supabase.com",
  PRODUCTION_DIRECT_DATABASE_HOST: "db.abcdefghijklmnopqrst.supabase.co"
};

test("production preflight accepts complete remote configuration without returning values", () => {
  const result = evaluateProductionEnvironment(valid);
  assert.equal(result.ok, true);
  assert.equal(JSON.stringify(result).includes("encoded"), false);
});

test("unapproved withdrawal policy is permitted only when withdrawals are explicitly disabled", () => {
  const unapproved = { ...valid, AFFILIATE_WITHDRAWAL_MIN_MINOR: "" };
  assert.equal(evaluateProductionEnvironment(unapproved).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...unapproved, AFFILIATE_WITHDRAWALS_ENABLED: "true" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...unapproved, AFFILIATE_WITHDRAWALS_ENABLED: "false" }).ok, true);
  assert.equal(evaluateProductionEnvironment({ ...unapproved, AFFILIATE_WITHDRAWALS_ENABLED: "false", PAYMENT_CALLBACK_SECRET: "" }).ok, false);
});

test("production preflight rejects localhost, placeholders, and invalid affiliate policy", () => {
  assert.equal(evaluateProductionEnvironment({ ...valid, DATABASE_URL: "postgresql://u:p@localhost/db" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, ADMIN_SETUP_SECRET: "replace-me" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, AFFILIATE_WITHDRAWAL_MIN_MINOR: "1000", AFFILIATE_WITHDRAWAL_MAX_MINOR: "500" }).ok, false);
});

test("production preflight fails closed for a different Supabase project or host", () => {
  assert.equal(evaluateProductionEnvironment({ ...valid, PRODUCTION_SUPABASE_PROJECT_REF: "zyxwvutsrqponmlkjihg" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, PRODUCTION_DATABASE_HOST: "aws-1-eu-central-1.pooler.supabase.com" }).ok, false);
  assert.equal(evaluateProductionEnvironment({ ...valid, DIRECT_URL: "postgresql://postgres:encoded@db.zyxwvutsrqponmlkjihg.supabase.co:5432/postgres" }).ok, false);
});

test("only secrets used by the current application are required", () => {
  const result = evaluateProductionEnvironment(valid);
  assert.equal(result.ok, true);
  assert.equal(result.checks.missing.includes("NEXTAUTH_SECRET"), false);
  assert.equal(result.checks.missing.includes("AUTH_SESSION_SECRET"), false);
  assert.equal(result.checks.missing.includes("PASSWORD_RESET_TOKEN_SECRET"), false);
});

test("production-local files override empty base placeholders", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "babra-production-env-"));
  await mkdir(join(cwd, ".vercel"));
  await writeFile(join(cwd, ".env"), "DATABASE_URL=\nAUTH_SESSION_SECRET=\n");
  await writeFile(join(cwd, ".vercel", ".env.production.local"), "DATABASE_URL=postgresql://production.example/db\nAUTH_SESSION_SECRET=secure-production-secret\n");
  const environment: Record<string, string> = {};

  loadProductionEnvironment({ cwd, environment });

  assert.equal(environment.DATABASE_URL, "postgresql://production.example/db");
  assert.equal(environment.AUTH_SESSION_SECRET, "secure-production-secret");
});

test("production build cannot invoke migrations and migration script requires approval", async () => {
  const build = await readFile(new URL("../scripts/vercel-build.mjs", import.meta.url), "utf8");
  const migration = await readFile(new URL("../scripts/apply-production-migrations.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(build, /prisma", "migrate", "deploy/);
  assert.match(migration, /PRODUCTION_MIGRATION_APPROVED/);
  assert.match(migration, /evaluateProductionEnvironment/);
});
