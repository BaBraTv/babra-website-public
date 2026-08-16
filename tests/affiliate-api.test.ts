import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { AffiliatePersistenceError } from "../lib/affiliate-persistence.ts";
import {
  affiliateErrorStatus,
  affiliateReviewSchema,
  commissionTransitionSchema,
  publicAffiliateAccount,
  withdrawalPolicyFromEnvironment,
  withdrawalRequestSchema,
  withdrawalTransitionSchema
} from "../lib/affiliate-api.ts";
import { orderSubmissionSchema } from "../lib/validation.ts";

test("withdrawal request validation is strict and integer-minor-unit only", () => {
  assert.deepEqual(withdrawalRequestSchema.parse({ idempotencyKey: " payout-1 ", amountMinor: 500 }), {
    idempotencyKey: "payout-1", amountMinor: 500, currency: "RWF"
  });
  assert.throws(() => withdrawalRequestSchema.parse({ idempotencyKey: "x", amountMinor: 1.5 }));
  assert.throws(() => withdrawalRequestSchema.parse({ idempotencyKey: "x", amountMinor: 1, payoutAccount: "secret" }));
});

test("checkout accepts only a bounded affiliate code and no affiliate financial input", () => {
  const base = { customerName: "Customer", customerPhone: "250700000000", items: [{ productSlug: "women", quantity: 1 }] };
  assert.equal(orderSubmissionSchema.parse({ ...base, affiliateCode: " aff-1234567890abcdef " }).affiliateCode, "aff-1234567890abcdef");
  assert.throws(() => orderSubmissionSchema.parse({ ...base, affiliateCode: "x".repeat(21) }));
  assert.throws(() => orderSubmissionSchema.parse({ ...base, affiliateId: "attacker-selected" }));
});

test("admin transition schemas allow only bounded lifecycle input", () => {
  assert.equal(commissionTransitionSchema.parse({ commissionId: "c", affiliateId: "a", status: "APPROVED" }).status, "APPROVED");
  assert.throws(() => commissionTransitionSchema.parse({ commissionId: "c", affiliateId: "a", status: "PENDING" }));
  assert.throws(() => commissionTransitionSchema.parse({ commissionId: "c", affiliateId: "a", status: "PAID" }), /settlement reference/);
  assert.equal(commissionTransitionSchema.parse({ commissionId: "c", affiliateId: "a", status: "PAID", reason: "direct-1" }).status, "PAID");
  assert.throws(() => withdrawalTransitionSchema.parse({ withdrawalId: "w", affiliateId: "a", status: "PAID" }), /Payout reference/);
  assert.equal(withdrawalTransitionSchema.parse({ withdrawalId: "w", affiliateId: "a", status: "PAID", payoutReference: "provider-1" }).status, "PAID");
});

test("affiliate approval requires an explicit non-zero rate", () => {
  assert.equal(affiliateReviewSchema.parse({ affiliateId: "a", status: "ACTIVE", commissionRateBasisPoints: 500 }).commissionRateBasisPoints, 500);
  assert.throws(() => affiliateReviewSchema.parse({ affiliateId: "a", status: "ACTIVE", commissionRateBasisPoints: 0 }), /approved commission rate/);
  assert.equal(affiliateReviewSchema.parse({ affiliateId: "a", status: "REJECTED", reason: "Not eligible" }).status, "REJECTED");
});

test("withdrawal policy fails closed unless configured", () => {
  const previousMin = process.env.AFFILIATE_WITHDRAWAL_MIN_MINOR;
  const previousMax = process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR;
  try {
    delete process.env.AFFILIATE_WITHDRAWAL_MIN_MINOR;
    delete process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR;
    assert.throws(withdrawalPolicyFromEnvironment, /AFFILIATE_WITHDRAWAL_MIN_MINOR/);
    process.env.AFFILIATE_WITHDRAWAL_MIN_MINOR = "100";
    process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR = "1000";
    assert.deepEqual(withdrawalPolicyFromEnvironment(), { minimumAmount: 100, maximumAmount: 1000 });
  } finally {
    if (previousMin == null) delete process.env.AFFILIATE_WITHDRAWAL_MIN_MINOR; else process.env.AFFILIATE_WITHDRAWAL_MIN_MINOR = previousMin;
    if (previousMax == null) delete process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR; else process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR = previousMax;
  }
});

test("affiliate errors map to safe HTTP classes", () => {
  assert.equal(affiliateErrorStatus(new AffiliatePersistenceError("AFFILIATE_NOT_FOUND", "internal")), 404);
  assert.equal(affiliateErrorStatus(new AffiliatePersistenceError("IDEMPOTENCY_CONFLICT", "internal")), 409);
  assert.equal(affiliateErrorStatus(new AffiliatePersistenceError("SETTLEMENT_CONFLICT", "internal")), 409);
  assert.equal(affiliateErrorStatus(new AffiliatePersistenceError("WITHDRAWAL_REJECTED", "internal")), 422);
  assert.equal(affiliateErrorStatus(new Error("unexpected")), 500);
});

test("affiliate account response excludes administrative reasons", () => {
  const result = publicAffiliateAccount({
    balances: { RWF: { approvedMinor: 1000, consumedMinor: 100, availableMinor: 900 } },
    affiliate: {
      id: "a", code: "AFF-1234567890ABCDEF", status: "ACTIVE", commissionRateBasisPoints: 1000,
      codeExpiresAt: null, approvedAt: null, createdAt: new Date(), referrals: [], commissions: [],
      withdrawals: [{ id: "w", affiliateId: "a", idempotencyKey: "key", amountMinor: 100, currency: "RWF", status: "REJECTED", adminReason: "internal", payoutReference: null }]
    }
  } as never);
  assert.equal("adminReason" in result.withdrawals[0], false);
});

test("affiliate routes enforce authentication, authorization, and rate limits", async () => {
  const root = new URL("../", import.meta.url);
  const summary = await readFile(new URL("app/api/affiliate/summary/route.ts", root), "utf8");
  const withdrawals = await readFile(new URL("app/api/affiliate/withdrawals/route.ts", root), "utf8");
  const commissions = await readFile(new URL("app/api/admin/affiliate-commissions/route.ts", root), "utf8");
  const adminWithdrawals = await readFile(new URL("app/api/admin/affiliate-withdrawals/route.ts", root), "utf8");
  const application = await readFile(new URL("app/api/affiliate/application/route.ts", root), "utf8");
  const affiliates = await readFile(new URL("app/api/admin/affiliates/route.ts", root), "utf8");
  const orders = await readFile(new URL("app/api/orders/route.ts", root), "utf8");
  assert.match(summary, /await requireCurrentUser\(\)/);
  assert.match(withdrawals, /await requireCurrentUser\(\)/);
  assert.match(withdrawals, /await enforceRateLimit\(/);
  assert.match(application, /await requireCurrentUser\(\)/);
  assert.match(application, /await enforceRateLimit\(/);
  assert.match(affiliates, /await requireAdminUser\(\)/);
  assert.match(orders, /new AffiliatePersistenceService\(prisma\)\.createReferral\(/);
  assert.doesNotMatch(orders, /affiliateId:\s*payload/);
  for (const source of [commissions, adminWithdrawals]) {
    assert.match(source, /await requireAdminUser\(\)/);
    assert.match(source, /await enforceRateLimit\(/);
  }
});
