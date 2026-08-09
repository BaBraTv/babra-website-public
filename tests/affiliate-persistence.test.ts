import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const schema = await readFile(new URL("prisma/schema.prisma", root), "utf8");
const programSql = await readFile(new URL("prisma/migrations/20260809120000_add_affiliate_program/migration.sql", root), "utf8");
const withdrawalSql = await readFile(new URL("prisma/migrations/20260809130000_add_affiliate_withdrawals/migration.sql", root), "utf8");
const migrationSql = `${programSql}\n${withdrawalSql}`;

test("affiliate signup and approval persistence has unique user/code and lifecycle fields", () => {
  assert.match(schema, /model Affiliate \{[\s\S]*userId\s+String\s+@unique[\s\S]*code\s+String\s+@unique/);
  for (const field of ["status", "commissionRateBasisPoints", "approvedAt", "rejectedAt", "suspendedAt", "createdAt", "updatedAt"]) {
    assert.match(schema, new RegExp(`model Affiliate \\{[\\s\\S]*${field}`));
  }
  assert.match(programSql, /commissionRateBasisPoints" BETWEEN 0 AND 10000/);
  assert.match(programSql, /Affiliate_code_format_check/);
});

test("one referral per order is enforced and attribution facts are preserved", () => {
  assert.match(schema, /model AffiliateReferral \{[\s\S]*orderId\s+String\s+@unique/);
  for (const field of ["affiliateCodeSnapshot", "landingPath", "attributedAt", "convertedAt", "expiresAt"]) {
    assert.match(schema, new RegExp(`model AffiliateReferral \\{[\\s\\S]*${field}`));
  }
  assert.match(programSql, /AffiliateReferral_orderId_key/);
  assert.match(programSql, /ON DELETE RESTRICT/);
});

test("commission persistence supports immutable financial snapshots and lifecycle queries", () => {
  for (const field of ["referralId", "affiliateId", "orderId", "amountMinor", "rateBasisPoints", "eligibleBaseMinor", "status", "approvedAt", "voidedAt", "paidAt"]) {
    assert.match(schema, new RegExp(`model AffiliateCommission \\{[\\s\\S]*${field}`));
  }
  assert.match(schema, /@@index\(\[affiliateId, status, createdAt\]\)/);
  assert.match(programSql, /amountMinor" >= 0[\s\S]*amountMinor" <= "eligibleBaseMinor/);
  assert.match(programSql, /rateBasisPoints" BETWEEN 0 AND 10000/);
});

test("withdrawals enforce affiliate-scoped idempotency and support balance/admin queries", () => {
  assert.match(schema, /@@unique\(\[affiliateId, idempotencyKey\]\)/);
  assert.match(schema, /@@index\(\[affiliateId, status, requestedAt\]\)/);
  assert.match(schema, /@@index\(\[status, requestedAt\]\)/);
  for (const field of ["requestedAt", "approvedAt", "rejectedAt", "paidAt", "cancelledAt"]) {
    assert.match(schema, new RegExp(`model AffiliateWithdrawal \\{[\\s\\S]*${field}`));
  }
  assert.match(withdrawalSql, /AffiliateWithdrawal_amount_check" CHECK \("amountMinor" > 0\)/);
  assert.match(withdrawalSql, /AffiliateWithdrawal_affiliateId_idempotencyKey_key/);
});

test("migration SQL is additive and contains the expected keys and enums", () => {
  assert.doesNotMatch(migrationSql, /\bDROP\b/i);
  assert.doesNotMatch(migrationSql, /\bTRUNCATE\b/i);
  assert.doesNotMatch(migrationSql, /\bDELETE\s+FROM\b/i);
  for (const table of ["Affiliate", "AffiliateReferral", "AffiliateCommission", "AffiliateWithdrawal"]) {
    assert.match(migrationSql, new RegExp(`CREATE TABLE "${table}"`));
  }
  for (const enumName of ["AffiliateStatus", "AffiliateReferralStatus", "AffiliateCommissionStatus", "AffiliateWithdrawalStatus"]) {
    assert.match(migrationSql, new RegExp(`CREATE TYPE "${enumName}" AS ENUM`));
  }
  assert.equal((migrationSql.match(/ADD CONSTRAINT .*_fkey/g) ?? []).length, 8);
});
