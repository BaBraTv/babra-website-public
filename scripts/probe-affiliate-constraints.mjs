import { randomUUID } from "node:crypto";
import pg from "pg";

const connectionString = process.env.AFFILIATE_STAGING_DATABASE_URL;
if (!connectionString || process.env.AFFILIATE_STAGING_DATABASE_CONFIRM !== "DISPOSABLE") {
  throw new Error("Set AFFILIATE_STAGING_DATABASE_URL and AFFILIATE_STAGING_DATABASE_CONFIRM=DISPOSABLE; DATABASE_URL is intentionally ignored");
}

const parsed = new URL(connectionString);
if (!parsed.hostname.endsWith(".supabase.co") && !parsed.hostname.endsWith(".supabase.com")) {
  throw new Error("Constraint probes are restricted to an explicitly confirmed disposable Supabase staging database");
}

const pool = new pg.Pool({ connectionString, max: 1 });
const client = await pool.connect();
const prefix = `rc32b5-${randomUUID()}`;
let passed = 0;

async function expectRejected(name, sql, values, expectedCode) {
  await client.query("SAVEPOINT affiliate_probe");
  try {
    await client.query(sql, values);
    throw new Error(`${name}: database accepted invalid data`);
  } catch (error) {
    await client.query("ROLLBACK TO SAVEPOINT affiliate_probe");
    if (error.code !== expectedCode) throw new Error(`${name}: expected SQLSTATE ${expectedCode}, received ${error.code ?? "none"}`);
    passed += 1;
    process.stdout.write(`PASS ${name} (${expectedCode})\n`);
  }
}

try {
  await client.query("BEGIN");
  await client.query(
    `INSERT INTO "User" ("id", "fullName", "status", "updatedAt") VALUES ($1, 'RC32 B5 Probe', 'ACTIVE', CURRENT_TIMESTAMP)`,
    [`${prefix}-user`]
  );
  await client.query(
    `INSERT INTO "Order" ("id", "orderNumber", "customerName", "customerPhone", "updatedAt") VALUES ($1, $2, 'RC32 B5 Probe', '000', CURRENT_TIMESTAMP)`,
    [`${prefix}-order-1`, `${prefix}-number-1`]
  );
  await client.query(
    `INSERT INTO "Order" ("id", "orderNumber", "customerName", "customerPhone", "updatedAt") VALUES ($1, $2, 'RC32 B5 Probe', '000', CURRENT_TIMESTAMP)`,
    [`${prefix}-order-2`, `${prefix}-number-2`]
  );
  await client.query(
    `INSERT INTO "Affiliate" ("id", "userId", "code", "status", "commissionRateBasisPoints", "updatedAt") VALUES ($1, $2, 'AFF-1234567890ABCDEF', 'ACTIVE', 1000, CURRENT_TIMESTAMP)`,
    [`${prefix}-affiliate`, `${prefix}-user`]
  );
  await client.query(
    `INSERT INTO "AffiliateReferral" ("id", "affiliateId", "orderId", "affiliateCodeSnapshot", "updatedAt") VALUES ($1, $2, $3, 'AFF-1234567890ABCDEF', CURRENT_TIMESTAMP)`,
    [`${prefix}-referral`, `${prefix}-affiliate`, `${prefix}-order-1`]
  );
  await client.query(
    `INSERT INTO "AffiliateReferral" ("id", "affiliateId", "orderId", "affiliateCodeSnapshot", "updatedAt") VALUES ($1, $2, $3, 'AFF-1234567890ABCDEF', CURRENT_TIMESTAMP)`,
    [`${prefix}-referral-2`, `${prefix}-affiliate`, `${prefix}-order-2`]
  );
  await client.query(
    `INSERT INTO "AffiliateCommission" ("id", "referralId", "affiliateId", "orderId", "amountMinor", "rateBasisPoints", "eligibleBaseMinor", "updatedAt") VALUES ($1, $2, $3, $4, 100, 1000, 1000, CURRENT_TIMESTAMP)`,
    [`${prefix}-commission`, `${prefix}-referral`, `${prefix}-affiliate`, `${prefix}-order-1`]
  );
  await client.query(
    `INSERT INTO "AffiliateWithdrawal" ("id", "affiliateId", "idempotencyKey", "amountMinor", "updatedAt") VALUES ($1, $2, 'probe-key', 100, CURRENT_TIMESTAMP)`,
    [`${prefix}-withdrawal`, `${prefix}-affiliate`]
  );

  await expectRejected("affiliate code format", `UPDATE "Affiliate" SET "code" = 'bad-code' WHERE "id" = $1`, [`${prefix}-affiliate`], "23514");
  await expectRejected("affiliate rate bounds", `UPDATE "Affiliate" SET "commissionRateBasisPoints" = 10001 WHERE "id" = $1`, [`${prefix}-affiliate`], "23514");
  await expectRejected("one referral per order", `INSERT INTO "AffiliateReferral" ("id", "affiliateId", "orderId", "affiliateCodeSnapshot", "updatedAt") VALUES ($1, $2, $3, 'AFF-1234567890ABCDEF', CURRENT_TIMESTAMP)`, [`${prefix}-duplicate-referral`, `${prefix}-affiliate`, `${prefix}-order-1`], "23505");
  await expectRejected("one commission per referral", `INSERT INTO "AffiliateCommission" ("id", "referralId", "affiliateId", "orderId", "amountMinor", "rateBasisPoints", "eligibleBaseMinor", "updatedAt") VALUES ($1, $2, $3, $4, 100, 1000, 1000, CURRENT_TIMESTAMP)`, [`${prefix}-duplicate-commission-referral`, `${prefix}-referral`, `${prefix}-affiliate`, `${prefix}-order-2`], "23505");
  await expectRejected("one commission per order", `INSERT INTO "AffiliateCommission" ("id", "referralId", "affiliateId", "orderId", "amountMinor", "rateBasisPoints", "eligibleBaseMinor", "updatedAt") VALUES ($1, $2, $3, $4, 100, 1000, 1000, CURRENT_TIMESTAMP)`, [`${prefix}-duplicate-commission-order`, `${prefix}-referral-2`, `${prefix}-affiliate`, `${prefix}-order-1`], "23505");
  await expectRejected("commission amount snapshot", `UPDATE "AffiliateCommission" SET "amountMinor" = 1001 WHERE "id" = $1`, [`${prefix}-commission`], "23514");
  await expectRejected("commission rate snapshot", `UPDATE "AffiliateCommission" SET "rateBasisPoints" = -1 WHERE "id" = $1`, [`${prefix}-commission`], "23514");
  await expectRejected("positive withdrawal amount", `UPDATE "AffiliateWithdrawal" SET "amountMinor" = 0 WHERE "id" = $1`, [`${prefix}-withdrawal`], "23514");
  await expectRejected("withdrawal idempotency", `INSERT INTO "AffiliateWithdrawal" ("id", "affiliateId", "idempotencyKey", "amountMinor", "updatedAt") VALUES ($1, $2, 'probe-key', 100, CURRENT_TIMESTAMP)`, [`${prefix}-duplicate-withdrawal`, `${prefix}-affiliate`], "23505");
  await expectRejected("affiliate foreign key", `INSERT INTO "AffiliateWithdrawal" ("id", "affiliateId", "idempotencyKey", "amountMinor", "updatedAt") VALUES ($1, 'missing-affiliate', 'foreign-key', 100, CURRENT_TIMESTAMP)`, [`${prefix}-bad-foreign-key`], "23503");
  process.stdout.write(`Affiliate constraint probes passed: ${passed}/10\n`);
} finally {
  await client.query("ROLLBACK").catch(() => {});
  client.release();
  await pool.end();
}
