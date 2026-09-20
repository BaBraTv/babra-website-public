import { randomBytes } from "crypto";

export type AffiliateStatus = "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED";
export type ReferralStatus = "ATTRIBUTED" | "CONVERTED" | "EXPIRED" | "INVALID";
export type CommissionStatus = "PENDING" | "APPROVED" | "VOIDED" | "PAID";
export type WithdrawalStatus = "PENDING" | "APPROVED" | "REJECTED" | "PAID" | "CANCELLED";
export type MinorUnits = number;
export type BasisPoints = number;
export type AffiliateCode = string & { readonly __affiliateCode: unique symbol };

const affiliateCodePattern = /^AFF-[A-Z0-9]{16}$/;
export const affiliateCodeMaxLength = 20;
export const defaultReferralCookieTtlMs = 30 * 24 * 60 * 60 * 1000;

export function normalizeAffiliateCode(value: string) {
  return value.trim().toUpperCase();
}

export function isValidAffiliateCode(value: string): value is AffiliateCode {
  return value.length <= affiliateCodeMaxLength && affiliateCodePattern.test(value);
}

export type CodeCandidateFactory = () => string;

export function randomAffiliateCode(): string {
  return `AFF-${randomBytes(8).toString("hex").toUpperCase()}`;
}

export async function generateUniqueAffiliateCode(
  codeExists: (code: AffiliateCode) => boolean | Promise<boolean>,
  options: { candidate?: CodeCandidateFactory; maxAttempts?: number } = {}
) {
  const candidate = options.candidate ?? randomAffiliateCode;
  const maxAttempts = options.maxAttempts ?? 8;
  if (!Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 100) {
    throw new RangeError("maxAttempts must be an integer from 1 to 100");
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const code = normalizeAffiliateCode(candidate());
    if (!isValidAffiliateCode(code)) throw new Error("Generated affiliate code has an invalid format");
    if (!(await codeExists(code))) return { code, attempts: attempt };
  }
  throw new Error("Unable to allocate a unique affiliate code");
}

export type ReferralAttributionInput = {
  affiliateStatus: AffiliateStatus;
  code: string;
  codeExpiresAt?: Date | null;
  now: Date;
  affiliateUserId: string;
  customerUserId?: string | null;
  orderAlreadyAttributed: boolean;
  allowSelfReferral?: boolean;
  landingPath?: string | null;
};

export type ReferralAttributionDecision =
  | { attributed: true; code: AffiliateCode; cookieExpiresAt: Date; landingPath: string | null }
  | { attributed: false; reason: "INACTIVE_AFFILIATE" | "INVALID_CODE" | "EXPIRED_CODE" | "ORDER_ALREADY_ATTRIBUTED" | "SELF_REFERRAL" };

export function safeLandingPath(value?: string | null) {
  if (!value) return null;
  const path = value.trim();
  if (path.length > 512 || !path.startsWith("/") || path.startsWith("//") || /[\u0000-\u001f]/.test(path)) return null;
  return path;
}

export function decideReferralAttribution(input: ReferralAttributionInput): ReferralAttributionDecision {
  if (input.affiliateStatus !== "ACTIVE") return { attributed: false, reason: "INACTIVE_AFFILIATE" };
  const code = normalizeAffiliateCode(input.code);
  if (!isValidAffiliateCode(code)) return { attributed: false, reason: "INVALID_CODE" };
  if (input.codeExpiresAt && input.codeExpiresAt.getTime() <= input.now.getTime()) {
    return { attributed: false, reason: "EXPIRED_CODE" };
  }
  if (input.orderAlreadyAttributed) return { attributed: false, reason: "ORDER_ALREADY_ATTRIBUTED" };
  if (!input.allowSelfReferral && input.customerUserId && input.customerUserId === input.affiliateUserId) {
    return { attributed: false, reason: "SELF_REFERRAL" };
  }
  return {
    attributed: true,
    code,
    cookieExpiresAt: new Date(input.now.getTime() + defaultReferralCookieTtlMs),
    landingPath: safeLandingPath(input.landingPath)
  };
}

export function decideCommissionCreation(input: { referralId?: string | null; referralStatus: ReferralStatus }) {
  if (!input.referralId || (input.referralStatus !== "ATTRIBUTED" && input.referralStatus !== "CONVERTED")) {
    return { allowed: false as const, reason: "VALID_ATTRIBUTION_REQUIRED" as const };
  }
  return { allowed: true as const, referralId: input.referralId };
}

function assertMinorUnits(value: number, field: string) {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`${field} must be non-negative safe integer minor units`);
}

export type CommissionPolicy = {
  rateBasisPoints: BasisPoints;
  includeDelivery: boolean;
  includeTax: boolean;
};

export type CommissionAmounts = {
  merchandiseSubtotal: MinorUnits;
  discount: MinorUnits;
  delivery: MinorUnits;
  tax: MinorUnits;
};

export function calculateCommission(amounts: CommissionAmounts, policy: CommissionPolicy) {
  for (const [field, value] of Object.entries(amounts)) assertMinorUnits(value, field);
  if (!Number.isSafeInteger(policy.rateBasisPoints) || policy.rateBasisPoints < 0 || policy.rateBasisPoints > 10_000) {
    throw new RangeError("rateBasisPoints must be an integer from 0 to 10000");
  }
  const discountedMerchandise = Math.max(0, amounts.merchandiseSubtotal - amounts.discount);
  const eligibleBase = discountedMerchandise + (policy.includeDelivery ? amounts.delivery : 0) + (policy.includeTax ? amounts.tax : 0);
  if (!Number.isSafeInteger(eligibleBase)) throw new RangeError("Eligible commission base exceeds safe integer range");
  const commission = Number((BigInt(eligibleBase) * BigInt(policy.rateBasisPoints)) / 10_000n);
  if (!Number.isSafeInteger(commission) || commission < 0 || commission > eligibleBase) {
    throw new RangeError("Calculated commission is outside the eligible base");
  }
  return { eligibleBase, commission, rounding: "FLOOR_MINOR_UNIT" as const };
}

export type TransitionDecision<TStatus extends string> = {
  from: TStatus;
  to: TStatus;
  changed: boolean;
  reason: string;
  occurredAt: Date;
};

export function transitionCommission(from: CommissionStatus, to: CommissionStatus, occurredAt = new Date()): TransitionDecision<CommissionStatus> {
  if (from === to) return { from, to, changed: false, reason: "IDEMPOTENT_REPLAY", occurredAt };
  const allowed: Record<CommissionStatus, CommissionStatus[]> = {
    PENDING: ["APPROVED", "VOIDED"],
    APPROVED: ["PAID", "VOIDED"],
    VOIDED: [],
    PAID: []
  };
  if (!allowed[from].includes(to)) throw new Error(`Invalid commission transition: ${from} -> ${to}`);
  return { from, to, changed: true, reason: `COMMISSION_${to}`, occurredAt };
}

export type CommissionRecord = { id: string; amount: MinorUnits; status: CommissionStatus };
export type WithdrawalRecord = { id: string; amount: MinorUnits; status: WithdrawalStatus; idempotencyKey: string };

function deduplicateById<T extends { id: string }>(records: T[]) {
  const unique = new Map<string, T>();
  for (const record of records) {
    if (!record.id) throw new Error("Record identifier is required");
    const existing = unique.get(record.id);
    if (existing && JSON.stringify(existing) !== JSON.stringify(record)) throw new Error(`Conflicting duplicate record: ${record.id}`);
    unique.set(record.id, record);
  }
  return [...unique.values()];
}

export function calculateAffiliateBalance(commissions: CommissionRecord[], withdrawals: WithdrawalRecord[]) {
  const uniqueCommissions = deduplicateById(commissions);
  const withdrawalsById = deduplicateById(withdrawals);
  const withdrawalsByKey = new Map<string, WithdrawalRecord>();
  for (const withdrawal of withdrawalsById) {
    if (!withdrawal.idempotencyKey) throw new Error("Withdrawal idempotency key is required");
    const existing = withdrawalsByKey.get(withdrawal.idempotencyKey);
    if (existing && JSON.stringify(existing) !== JSON.stringify(withdrawal)) {
      throw new Error(`Conflicting withdrawal idempotency key: ${withdrawal.idempotencyKey}`);
    }
    withdrawalsByKey.set(withdrawal.idempotencyKey, withdrawal);
  }
  const uniqueWithdrawals = [...withdrawalsByKey.values()];
  uniqueCommissions.forEach((item) => assertMinorUnits(item.amount, "commission amount"));
  uniqueWithdrawals.forEach((item) => assertMinorUnits(item.amount, "withdrawal amount"));

  const pendingEarnings = uniqueCommissions.filter((item) => item.status === "PENDING").reduce((sum, item) => sum + item.amount, 0);
  const approvedEarnings = uniqueCommissions.filter((item) => item.status === "APPROVED").reduce((sum, item) => sum + item.amount, 0);
  const paidCommissionEarnings = uniqueCommissions.filter((item) => item.status === "PAID").reduce((sum, item) => sum + item.amount, 0);
  const reservedForWithdrawals = uniqueWithdrawals
    .filter((item) => item.status === "PENDING" || item.status === "APPROVED")
    .reduce((sum, item) => sum + item.amount, 0);
  const paidSettledEarnings = uniqueWithdrawals.filter((item) => item.status === "PAID").reduce((sum, item) => sum + item.amount, 0);
  const availableToWithdraw = Math.max(0, approvedEarnings - reservedForWithdrawals);
  for (const [field, value] of Object.entries({ pendingEarnings, approvedEarnings, paidCommissionEarnings, reservedForWithdrawals, paidSettledEarnings, availableToWithdraw })) {
    if (!Number.isSafeInteger(value)) throw new RangeError(`${field} exceeds safe integer range`);
  }
  return { pendingEarnings, approvedEarnings, paidCommissionEarnings, reservedForWithdrawals, paidSettledEarnings, availableToWithdraw };
}

export type WithdrawalPolicy = { minimumAmount: MinorUnits; maximumAmount?: MinorUnits | null };

export type WithdrawalEligibility =
  | { eligible: true; idempotencyKey: string; amount: MinorUnits }
  | { eligible: false; reason: "INACTIVE_AFFILIATE" | "INVALID_AMOUNT" | "BELOW_MINIMUM" | "ABOVE_MAXIMUM" | "INSUFFICIENT_BALANCE" | "MISSING_IDEMPOTENCY_KEY" };

export function decideWithdrawalEligibility(input: {
  affiliateStatus: AffiliateStatus;
  amount: MinorUnits;
  availableBalance: MinorUnits;
  idempotencyKey: string;
  policy: WithdrawalPolicy;
}): WithdrawalEligibility {
  if (input.affiliateStatus !== "ACTIVE") return { eligible: false, reason: "INACTIVE_AFFILIATE" };
  if (!Number.isSafeInteger(input.amount) || input.amount <= 0 || !Number.isSafeInteger(input.availableBalance) || input.availableBalance < 0) {
    return { eligible: false, reason: "INVALID_AMOUNT" };
  }
  assertMinorUnits(input.policy.minimumAmount, "minimumAmount");
  if (input.policy.maximumAmount != null) assertMinorUnits(input.policy.maximumAmount, "maximumAmount");
  if (input.policy.maximumAmount != null && input.policy.maximumAmount < input.policy.minimumAmount) {
    throw new RangeError("maximumAmount cannot be below minimumAmount");
  }
  const key = input.idempotencyKey.trim();
  if (!key || key.length > 128) return { eligible: false, reason: "MISSING_IDEMPOTENCY_KEY" };
  if (input.amount < input.policy.minimumAmount) return { eligible: false, reason: "BELOW_MINIMUM" };
  if (input.policy.maximumAmount != null && input.amount > input.policy.maximumAmount) return { eligible: false, reason: "ABOVE_MAXIMUM" };
  if (input.amount > input.availableBalance) return { eligible: false, reason: "INSUFFICIENT_BALANCE" };
  return { eligible: true, idempotencyKey: key, amount: input.amount };
}

export function resolveWithdrawalSubmission<T extends WithdrawalRecord>(idempotencyKey: string, existing: T[]) {
  const key = idempotencyKey.trim();
  if (!key) throw new Error("Idempotency key is required");
  const matches = existing.filter((item) => item.idempotencyKey === key);
  if (matches.length > 1 && matches.some((item) => JSON.stringify(item) !== JSON.stringify(matches[0]))) {
    throw new Error("Conflicting withdrawals share an idempotency key");
  }
  return matches[0] ?? null;
}

export function transitionWithdrawal(from: WithdrawalStatus, to: WithdrawalStatus, occurredAt = new Date()): TransitionDecision<WithdrawalStatus> {
  if (from === to) return { from, to, changed: false, reason: "IDEMPOTENT_REPLAY", occurredAt };
  const allowed: Record<WithdrawalStatus, WithdrawalStatus[]> = {
    PENDING: ["APPROVED", "REJECTED", "CANCELLED"],
    APPROVED: ["PAID", "REJECTED", "CANCELLED"],
    REJECTED: [],
    PAID: [],
    CANCELLED: []
  };
  if (!allowed[from].includes(to)) throw new Error(`Invalid withdrawal transition: ${from} -> ${to}`);
  return { from, to, changed: true, reason: `WITHDRAWAL_${to}`, occurredAt };
}

export type AffiliateAuditAction =
  | "AFFILIATE_APPROVED" | "AFFILIATE_REJECTED" | "AFFILIATE_SUSPENDED"
  | "COMMISSION_APPROVED" | "COMMISSION_VOIDED"
  | "WITHDRAWAL_APPROVED" | "WITHDRAWAL_REJECTED" | "WITHDRAWAL_PAID" | "WITHDRAWAL_CANCELLED";

export type AffiliateAuditEvent = {
  action: AffiliateAuditAction;
  actorId: string;
  affiliateId: string;
  entityId: string;
  occurredAt: Date;
  reason?: string;
  metadata?: { previousStatus?: string; nextStatus?: string; amountMinor?: number; currency?: string };
};

export function createAffiliateAuditEvent(event: AffiliateAuditEvent) {
  if (!event.actorId || !event.affiliateId || !event.entityId) throw new Error("Audit identifiers are required");
  if (event.reason && event.reason.length > 500) throw new Error("Audit reason is too long");
  if (event.metadata?.amountMinor != null) assertMinorUnits(event.metadata.amountMinor, "audit amount");
  return Object.freeze({ ...event, metadata: event.metadata ? Object.freeze({ ...event.metadata }) : undefined });
}
