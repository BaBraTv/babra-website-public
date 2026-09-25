import { z } from "zod";
import { AffiliatePersistenceError } from "./affiliate-persistence.ts";

const identifier = z.string().trim().min(1).max(191);
const currency = z.string().trim().regex(/^[A-Za-z]{3,8}$/).transform((value) => value.toUpperCase());

export const withdrawalRequestSchema = z.object({
  idempotencyKey: z.string().trim().min(1).max(128),
  amountMinor: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  currency: currency.default("RWF")
}).strict();

export const affiliateReviewSchema = z.object({
  affiliateId: identifier,
  status: z.enum(["ACTIVE", "REJECTED", "SUSPENDED"]),
  commissionRateBasisPoints: z.number().int().min(0).max(10_000).optional(),
  reason: z.string().trim().min(1).max(500).optional()
}).strict().superRefine((value, context) => {
  if (value.status === "ACTIVE" && (!value.commissionRateBasisPoints || value.commissionRateBasisPoints < 1)) {
    context.addIssue({ code: "custom", path: ["commissionRateBasisPoints"], message: "Active affiliates require an approved commission rate" });
  }
});

export const commissionCreateSchema = z.object({
  referralId: identifier,
  includeDelivery: z.boolean().default(false)
}).strict();

export const commissionTransitionSchema = z.object({
  commissionId: identifier,
  affiliateId: identifier,
  status: z.enum(["APPROVED", "VOIDED", "PAID"]),
  reason: z.string().trim().min(1).max(500).optional()
}).strict().superRefine((value, context) => {
  if (value.status === "PAID" && !value.reason) {
    context.addIssue({ code: "custom", path: ["reason"], message: "A non-secret direct settlement reference is required" });
  }
});

export const withdrawalTransitionSchema = z.object({
  withdrawalId: identifier,
  affiliateId: identifier,
  status: z.enum(["APPROVED", "REJECTED", "PAID", "CANCELLED"]),
  adminReason: z.string().trim().min(1).max(500).optional(),
  payoutReference: z.string().trim().min(1).max(191).optional()
}).strict().superRefine((value, context) => {
  if (value.status === "PAID" && !value.payoutReference) {
    context.addIssue({ code: "custom", path: ["payoutReference"], message: "Payout reference is required" });
  }
});

function positiveIntegerSetting(name: string) {
  const raw = process.env[name];
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be configured as positive integer minor units`);
  return value;
}

export function withdrawalPolicyFromEnvironment() {
  if (process.env.AFFILIATE_WITHDRAWALS_ENABLED === "false") throw new Error("Affiliate withdrawals are not enabled");
  const minimumAmount = positiveIntegerSetting("AFFILIATE_WITHDRAWAL_MIN_MINOR");
  const maximumRaw = process.env.AFFILIATE_WITHDRAWAL_MAX_MINOR;
  const maximumAmount = maximumRaw ? positiveIntegerSetting("AFFILIATE_WITHDRAWAL_MAX_MINOR") : null;
  if (maximumAmount != null && maximumAmount < minimumAmount) throw new Error("Affiliate withdrawal policy is invalid");
  return { minimumAmount, maximumAmount };
}

export function affiliateErrorStatus(error: unknown) {
  if (error instanceof z.ZodError) return 400;
  if (error instanceof Error && error.message === "Rate limit exceeded") return 429;
  if (!(error instanceof AffiliatePersistenceError)) return 500;
  if (["AFFILIATE_NOT_FOUND", "REFERRAL_NOT_FOUND", "COMMISSION_NOT_FOUND", "WITHDRAWAL_NOT_FOUND"].includes(error.code)) return 404;
  if (["DUPLICATE_AFFILIATE", "DUPLICATE_REFERRAL", "DUPLICATE_COMMISSION", "IDEMPOTENCY_CONFLICT", "CROSS_AFFILIATE_MISMATCH", "SETTLEMENT_CONFLICT"].includes(error.code)) return 409;
  return 422;
}

export function publicAffiliateAccount(snapshot: Awaited<ReturnType<import("./affiliate-persistence.ts").AffiliatePersistenceService["getAccountSnapshot"]>>) {
  const { affiliate, balances } = snapshot;
  return {
    affiliate: {
      id: affiliate.id,
      code: affiliate.code,
      status: affiliate.status,
      commissionRateBasisPoints: affiliate.commissionRateBasisPoints,
      codeExpiresAt: affiliate.codeExpiresAt,
      approvedAt: affiliate.approvedAt,
      createdAt: affiliate.createdAt
    },
    balances,
    referrals: affiliate.referrals,
    commissions: affiliate.commissions,
    withdrawals: affiliate.withdrawals.map(({ adminReason: _adminReason, ...withdrawal }) => withdrawal)
  };
}
