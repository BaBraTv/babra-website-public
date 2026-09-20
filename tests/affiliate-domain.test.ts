import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateAffiliateBalance,
  calculateCommission,
  createAffiliateAuditEvent,
  decideReferralAttribution,
  decideCommissionCreation,
  decideWithdrawalEligibility,
  defaultReferralCookieTtlMs,
  generateUniqueAffiliateCode,
  isValidAffiliateCode,
  normalizeAffiliateCode,
  resolveWithdrawalSubmission,
  safeLandingPath,
  transitionCommission,
  transitionWithdrawal,
  type CommissionRecord,
  type WithdrawalRecord
} from "../lib/affiliate-domain.ts";
import { isRetryableTransactionConflict, withSerializableRetry } from "../lib/transaction-retry.ts";

const validCode = "AFF-0123456789ABCDEF";
const now = new Date("2026-08-09T10:00:00Z");

test("affiliate code format is uppercase, bounded, normalized, and contains no identity", () => {
  assert.equal(normalizeAffiliateCode(`  ${validCode.toLowerCase()} `), validCode);
  assert.equal(isValidAffiliateCode(validCode), true);
  for (const invalid of ["", "AFF-ABC", "AFF-0123456789ABCDE!", "USR-0123456789ABCDEF", `${validCode}X`, "AFF-user@example.com"]) {
    assert.equal(isValidAffiliateCode(invalid), false);
  }
});

test("affiliate code generation retries collisions and returns uniqueness evidence", async () => {
  const candidates = [validCode, "AFF-FEDCBA9876543210"];
  const result = await generateUniqueAffiliateCode((code) => code === validCode, { candidate: () => candidates.shift()!, maxAttempts: 2 });
  assert.deepEqual(result, { code: "AFF-FEDCBA9876543210", attempts: 2 });
  await assert.rejects(() => generateUniqueAffiliateCode(() => true, { candidate: () => validCode, maxAttempts: 2 }), /Unable to allocate/);
  await assert.rejects(() => generateUniqueAffiliateCode(() => false, { candidate: () => "bad" }), /invalid format/);
});

test("only active, valid, unexpired, non-self referrals receive attribution", () => {
  const base = { affiliateStatus: "ACTIVE" as const, code: validCode, now, affiliateUserId: "affiliate-1", orderAlreadyAttributed: false };
  const accepted = decideReferralAttribution({ ...base, customerUserId: "customer-1", landingPath: "/products/women?ref=ignored" });
  assert.equal(accepted.attributed, true);
  if (accepted.attributed) {
    assert.equal(accepted.cookieExpiresAt.getTime(), now.getTime() + defaultReferralCookieTtlMs);
    assert.equal(accepted.landingPath, "/products/women?ref=ignored");
  }
  assert.deepEqual(decideReferralAttribution({ ...base, affiliateStatus: "SUSPENDED" }), { attributed: false, reason: "INACTIVE_AFFILIATE" });
  assert.deepEqual(decideReferralAttribution({ ...base, code: "bad" }), { attributed: false, reason: "INVALID_CODE" });
  assert.deepEqual(decideReferralAttribution({ ...base, codeExpiresAt: now }), { attributed: false, reason: "EXPIRED_CODE" });
  assert.deepEqual(decideReferralAttribution({ ...base, orderAlreadyAttributed: true }), { attributed: false, reason: "ORDER_ALREADY_ATTRIBUTED" });
  assert.deepEqual(decideReferralAttribution({ ...base, customerUserId: "affiliate-1" }), { attributed: false, reason: "SELF_REFERRAL" });
  assert.equal(safeLandingPath("https://evil.example"), null);
  assert.equal(safeLandingPath("//evil.example"), null);
});

test("commission creation requires a valid referral attribution", () => {
  assert.deepEqual(decideCommissionCreation({ referralId: "ref-1", referralStatus: "ATTRIBUTED" }), { allowed: true, referralId: "ref-1" });
  assert.equal(decideCommissionCreation({ referralId: null, referralStatus: "ATTRIBUTED" }).allowed, false);
  assert.equal(decideCommissionCreation({ referralId: "ref-1", referralStatus: "EXPIRED" }).allowed, false);
});

test("commission calculation uses integer basis points and floor rounding", () => {
  assert.deepEqual(calculateCommission(
    { merchandiseSubtotal: 10_000, discount: 1_000, delivery: 500, tax: 300 },
    { rateBasisPoints: 125, includeDelivery: false, includeTax: false }
  ), { eligibleBase: 9_000, commission: 112, rounding: "FLOOR_MINOR_UNIT" });
  assert.equal(calculateCommission(
    { merchandiseSubtotal: 0, discount: 0, delivery: 0, tax: 0 },
    { rateBasisPoints: 0, includeDelivery: false, includeTax: false }
  ).commission, 0);
});

test("commission base configuration handles discounts, delivery, tax, and edge values", () => {
  const amounts = { merchandiseSubtotal: 10_000, discount: 20_000, delivery: 500, tax: 300 };
  assert.equal(calculateCommission(amounts, { rateBasisPoints: 10_000, includeDelivery: false, includeTax: false }).eligibleBase, 0);
  assert.equal(calculateCommission(amounts, { rateBasisPoints: 10_000, includeDelivery: true, includeTax: true }).commission, 800);
  const maximum = calculateCommission(
    { merchandiseSubtotal: Number.MAX_SAFE_INTEGER, discount: 0, delivery: 0, tax: 0 },
    { rateBasisPoints: 10_000, includeDelivery: false, includeTax: false }
  );
  assert.equal(maximum.commission, Number.MAX_SAFE_INTEGER);
  assert.throws(() => calculateCommission({ merchandiseSubtotal: -1, discount: 0, delivery: 0, tax: 0 }, { rateBasisPoints: 100, includeDelivery: false, includeTax: false }), /non-negative/);
  for (const rate of [-1, 10_001, 1.5]) {
    assert.throws(() => calculateCommission({ merchandiseSubtotal: 100, discount: 0, delivery: 0, tax: 0 }, { rateBasisPoints: rate, includeDelivery: false, includeTax: false }), /rateBasisPoints/);
  }
});

test("commission lifecycle is auditable, idempotent, and rejects backward transitions", () => {
  assert.equal(transitionCommission("PENDING", "APPROVED", now).changed, true);
  assert.equal(transitionCommission("APPROVED", "APPROVED", now).reason, "IDEMPOTENT_REPLAY");
  assert.equal(transitionCommission("APPROVED", "VOIDED", now).to, "VOIDED");
  assert.equal(transitionCommission("APPROVED", "PAID", now).to, "PAID");
  assert.throws(() => transitionCommission("PAID", "PENDING"), /Invalid commission transition/);
  assert.throws(() => transitionCommission("VOIDED", "APPROVED"), /Invalid commission transition/);
});

test("balance separates earnings and prevents duplicate double-counting", () => {
  const commissions: CommissionRecord[] = [
    { id: "c1", amount: 100, status: "PENDING" },
    { id: "c2", amount: 1_000, status: "APPROVED" },
    { id: "c2", amount: 1_000, status: "APPROVED" },
    { id: "c3", amount: 400, status: "PAID" },
    { id: "c4", amount: 999, status: "VOIDED" }
  ];
  const withdrawals: WithdrawalRecord[] = [
    { id: "w1", amount: 300, status: "PENDING", idempotencyKey: "key-1" },
    { id: "w1", amount: 300, status: "PENDING", idempotencyKey: "key-1" },
    { id: "w2", amount: 200, status: "PAID", idempotencyKey: "key-2" },
    { id: "w3", amount: 100, status: "REJECTED", idempotencyKey: "key-3" }
  ];
  assert.deepEqual(calculateAffiliateBalance(commissions, withdrawals), {
    pendingEarnings: 100,
    approvedEarnings: 1_000,
    paidCommissionEarnings: 400,
    reservedForWithdrawals: 300,
    paidSettledEarnings: 200,
    availableToWithdraw: 700
  });
  assert.throws(() => calculateAffiliateBalance([{ id: "c1", amount: 1, status: "PENDING" }, { id: "c1", amount: 2, status: "PENDING" }], []), /Conflicting duplicate/);
  assert.throws(() => calculateAffiliateBalance([], [
    { id: "w1", amount: 100, status: "PENDING", idempotencyKey: "same-key" },
    { id: "w2", amount: 100, status: "PENDING", idempotencyKey: "same-key" }
  ]), /Conflicting withdrawal idempotency key/);
});

test("reserved withdrawals cannot make available balance negative", () => {
  const result = calculateAffiliateBalance(
    [{ id: "c1", amount: 100, status: "APPROVED" }],
    [{ id: "w1", amount: 500, status: "APPROVED", idempotencyKey: "key" }]
  );
  assert.equal(result.availableToWithdraw, 0);
});

test("withdrawal eligibility enforces active status, bounds, balance, and idempotency", () => {
  const base = { affiliateStatus: "ACTIVE" as const, amount: 500, availableBalance: 1_000, idempotencyKey: "submit-1", policy: { minimumAmount: 100, maximumAmount: 800 } };
  const reason = (decision: ReturnType<typeof decideWithdrawalEligibility>) => decision.eligible ? null : decision.reason;
  assert.deepEqual(decideWithdrawalEligibility(base), { eligible: true, amount: 500, idempotencyKey: "submit-1" });
  assert.equal(reason(decideWithdrawalEligibility({ ...base, affiliateStatus: "SUSPENDED" })), "INACTIVE_AFFILIATE");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, amount: 99 })), "BELOW_MINIMUM");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, amount: 801 })), "ABOVE_MAXIMUM");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, amount: 1_001 })), "ABOVE_MAXIMUM");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, amount: 700, availableBalance: 600, policy: { minimumAmount: 100 } })), "INSUFFICIENT_BALANCE");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, idempotencyKey: "" })), "MISSING_IDEMPOTENCY_KEY");
  assert.equal(reason(decideWithdrawalEligibility({ ...base, amount: -1 })), "INVALID_AMOUNT");
  assert.throws(() => decideWithdrawalEligibility({ ...base, policy: { minimumAmount: 900, maximumAmount: 800 } }), /maximumAmount/);
});

test("withdrawal submission and lifecycle are idempotent", () => {
  const existing: WithdrawalRecord = { id: "w1", amount: 500, status: "PENDING", idempotencyKey: "submit-1" };
  assert.equal(resolveWithdrawalSubmission("submit-1", [existing]), existing);
  assert.equal(resolveWithdrawalSubmission("new-key", [existing]), null);
  assert.equal(transitionWithdrawal("PENDING", "PENDING", now).changed, false);
  assert.equal(transitionWithdrawal("PENDING", "APPROVED", now).changed, true);
  assert.equal(transitionWithdrawal("APPROVED", "PAID", now).to, "PAID");
  assert.throws(() => transitionWithdrawal("PAID", "PENDING"), /Invalid withdrawal transition/);
  assert.throws(() => transitionWithdrawal("REJECTED", "APPROVED"), /Invalid withdrawal transition/);
});

test("serialization retry recognizes only transaction conflicts and is bounded", async () => {
  assert.equal(isRetryableTransactionConflict({ code: "P2034" }), true);
  assert.equal(isRetryableTransactionConflict({ code: "40001" }), true);
  assert.equal(isRetryableTransactionConflict({ cause: { code: "40P01" } }), true);
  assert.equal(isRetryableTransactionConflict({ code: "P2002" }), false);
  let attempts = 0;
  const delays: number[] = [];
  const value = await withSerializableRetry(async () => {
    attempts += 1;
    if (attempts < 3) throw { code: "40001" };
    return "ok";
  }, { maxAttempts: 4, baseDelayMs: 10, random: () => 0, sleep: async (delay) => { delays.push(delay); } });
  assert.equal(value, "ok");
  assert.deepEqual(delays, [5, 10]);
  await assert.rejects(() => withSerializableRetry(async () => { throw new Error("validation"); }, { sleep: async () => {} }), /validation/);
  await assert.rejects(() => withSerializableRetry(async () => { throw { code: "40P01" }; }, { maxAttempts: 2, sleep: async () => {} }));
});

test("affiliate audit event contains only bounded, non-secret domain metadata", () => {
  const event = createAffiliateAuditEvent({
    action: "WITHDRAWAL_APPROVED",
    actorId: "admin-1",
    affiliateId: "affiliate-1",
    entityId: "withdrawal-1",
    occurredAt: now,
    reason: "Policy checks passed",
    metadata: { previousStatus: "PENDING", nextStatus: "APPROVED", amountMinor: 500, currency: "RWF" }
  });
  assert.equal(Object.isFrozen(event), true);
  assert.equal("payoutAccount" in event, false);
  assert.throws(() => createAffiliateAuditEvent({ ...event, reason: "x".repeat(501) }), /too long/);
});
