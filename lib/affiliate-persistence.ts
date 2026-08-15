import { Prisma, type PrismaClient } from "@prisma/client";
import {
  calculateCommission,
  decideCommissionCreation,
  decideReferralAttribution,
  decideWithdrawalEligibility,
  transitionCommission,
  transitionWithdrawal,
  type CommissionStatus,
  type WithdrawalPolicy,
  type WithdrawalStatus
} from "./affiliate-domain.ts";
import { withSerializableRetry, type RetryOptions } from "./transaction-retry.ts";

type AffiliatePrismaClient = Pick<PrismaClient, "$transaction">;

export type AffiliatePersistenceErrorCode =
  | "AFFILIATE_NOT_FOUND"
  | "REFERRAL_REJECTED"
  | "DUPLICATE_REFERRAL"
  | "REFERRAL_NOT_FOUND"
  | "DUPLICATE_COMMISSION"
  | "INVALID_COMMISSION_SNAPSHOT"
  | "CROSS_AFFILIATE_MISMATCH"
  | "COMMISSION_NOT_FOUND"
  | "WITHDRAWAL_NOT_FOUND"
  | "WITHDRAWAL_REJECTED"
  | "IDEMPOTENCY_CONFLICT";

export class AffiliatePersistenceError extends Error {
  readonly code: AffiliatePersistenceErrorCode;

  constructor(code: AffiliatePersistenceErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "AffiliatePersistenceError";
  }
}

function isUniqueConstraint(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
    || Boolean(error && typeof error === "object" && "code" in error && (error as { code?: unknown }).code === "P2002");
}

function normalizeCurrency(currency: string) {
  const normalized = currency.trim().toUpperCase();
  if (!/^[A-Z]{3,8}$/.test(normalized)) throw new AffiliatePersistenceError("INVALID_COMMISSION_SNAPSHOT", "Invalid currency snapshot");
  return normalized;
}

export function assertCommissionSnapshot(snapshot: {
  amountMinor: number;
  eligibleBaseMinor: number;
  rateBasisPoints: number;
  currency: string;
}) {
  const currency = normalizeCurrency(snapshot.currency);
  const calculated = calculateCommission(
    { merchandiseSubtotal: snapshot.eligibleBaseMinor, discount: 0, delivery: 0, tax: 0 },
    { rateBasisPoints: snapshot.rateBasisPoints, includeDelivery: false, includeTax: false }
  );
  if (calculated.commission !== snapshot.amountMinor) {
    throw new AffiliatePersistenceError("INVALID_COMMISSION_SNAPSHOT", "Commission amount does not match its immutable rate/base snapshot");
  }
  return { ...snapshot, currency };
}

export class AffiliatePersistenceService {
  private readonly prisma: AffiliatePrismaClient;
  private readonly retryOptions: RetryOptions;

  constructor(
    prisma: AffiliatePrismaClient,
    retryOptions: RetryOptions = {}
  ) {
    this.prisma = prisma;
    this.retryOptions = retryOptions;
  }

  private serializable<T>(operation: (tx: Prisma.TransactionClient) => Promise<T>) {
    return withSerializableRetry(
      () => this.prisma.$transaction(operation, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }),
      this.retryOptions
    );
  }

  private async lockAffiliate(tx: Prisma.TransactionClient, affiliateId: string) {
    const rows = await tx.$queryRaw<Array<{ id: string }>>`SELECT "id" FROM "Affiliate" WHERE "id" = ${affiliateId} FOR UPDATE`;
    if (rows.length !== 1) throw new AffiliatePersistenceError("AFFILIATE_NOT_FOUND", "Affiliate not found");
  }

  async createReferral(input: {
    affiliateCode: string;
    orderId: string;
    customerUserId?: string | null;
    landingPath?: string | null;
    now?: Date;
  }) {
    return this.serializable(async (tx) => {
      const now = input.now ?? new Date();
      const affiliate = await tx.affiliate.findUnique({ where: { code: input.affiliateCode.trim().toUpperCase() } });
      if (!affiliate) throw new AffiliatePersistenceError("AFFILIATE_NOT_FOUND", "Affiliate not found");
      await this.lockAffiliate(tx, affiliate.id);
      const order = await tx.order.findUnique({ where: { id: input.orderId }, select: { id: true, customerId: true } });
      if (!order) throw new AffiliatePersistenceError("REFERRAL_REJECTED", "Order not found");
      if (input.customerUserId && order.customerId && input.customerUserId !== order.customerId) {
        throw new AffiliatePersistenceError("CROSS_AFFILIATE_MISMATCH", "Referral customer does not match the order customer");
      }
      const existing = await tx.affiliateReferral.findUnique({ where: { orderId: order.id } });
      const decision = decideReferralAttribution({
        affiliateStatus: affiliate.status,
        code: affiliate.code,
        codeExpiresAt: affiliate.codeExpiresAt,
        now,
        affiliateUserId: affiliate.userId,
        customerUserId: input.customerUserId ?? order.customerId,
        orderAlreadyAttributed: Boolean(existing),
        landingPath: input.landingPath
      });
      if (!decision.attributed) {
        if (decision.reason === "ORDER_ALREADY_ATTRIBUTED") throw new AffiliatePersistenceError("DUPLICATE_REFERRAL", "Order already has a referral");
        throw new AffiliatePersistenceError("REFERRAL_REJECTED", decision.reason);
      }
      try {
        return await tx.affiliateReferral.create({ data: {
          affiliateId: affiliate.id,
          orderId: order.id,
          customerUserId: input.customerUserId ?? order.customerId,
          affiliateCodeSnapshot: decision.code,
          landingPath: decision.landingPath,
          attributedAt: now,
          expiresAt: decision.cookieExpiresAt
        } });
      } catch (error) {
        if (isUniqueConstraint(error)) throw new AffiliatePersistenceError("DUPLICATE_REFERRAL", "Order already has a referral");
        throw error;
      }
    });
  }

  async createCommission(input: { referralId: string; includeDelivery?: boolean; now?: Date }) {
    return this.serializable(async (tx) => {
      const referral = await tx.affiliateReferral.findUnique({
        where: { id: input.referralId },
        include: { affiliate: true, order: true, commission: true }
      });
      if (!referral) throw new AffiliatePersistenceError("REFERRAL_NOT_FOUND", "Referral not found");
      await this.lockAffiliate(tx, referral.affiliateId);
      if (referral.commission) throw new AffiliatePersistenceError("DUPLICATE_COMMISSION", "Referral already has a commission");
      const decision = decideCommissionCreation({ referralId: referral.id, referralStatus: referral.status });
      if (!decision.allowed) throw new AffiliatePersistenceError("INVALID_COMMISSION_SNAPSHOT", decision.reason);
      if (referral.orderId !== referral.order.id || referral.affiliateId !== referral.affiliate.id) {
        throw new AffiliatePersistenceError("CROSS_AFFILIATE_MISMATCH", "Referral relationships are inconsistent");
      }
      if (referral.affiliateCodeSnapshot !== referral.affiliate.code) {
        throw new AffiliatePersistenceError("CROSS_AFFILIATE_MISMATCH", "Referral code snapshot does not match its affiliate");
      }
      const calculated = calculateCommission(
        {
          merchandiseSubtotal: referral.order.subtotalCents,
          discount: referral.order.discountCents,
          delivery: referral.order.deliveryCents,
          tax: 0
        },
        {
          rateBasisPoints: referral.affiliate.commissionRateBasisPoints,
          includeDelivery: input.includeDelivery ?? false,
          includeTax: false
        }
      );
      const snapshot = assertCommissionSnapshot({
        amountMinor: calculated.commission,
        eligibleBaseMinor: calculated.eligibleBase,
        rateBasisPoints: referral.affiliate.commissionRateBasisPoints,
        currency: referral.order.currency
      });
      try {
        const commission = await tx.affiliateCommission.create({ data: {
          referralId: referral.id,
          affiliateId: referral.affiliateId,
          orderId: referral.orderId,
          amountMinor: snapshot.amountMinor,
          eligibleBaseMinor: snapshot.eligibleBaseMinor,
          rateBasisPoints: snapshot.rateBasisPoints,
          currency: snapshot.currency
        } });
        if (referral.status === "ATTRIBUTED") {
          await tx.affiliateReferral.update({ where: { id: referral.id }, data: { status: "CONVERTED", convertedAt: input.now ?? new Date() } });
        }
        return commission;
      } catch (error) {
        if (isUniqueConstraint(error)) throw new AffiliatePersistenceError("DUPLICATE_COMMISSION", "Referral or order already has a commission");
        throw error;
      }
    });
  }

  async transitionCommission(input: { commissionId: string; affiliateId: string; to: CommissionStatus; reason?: string; now?: Date }) {
    return this.serializable(async (tx) => {
      await this.lockAffiliate(tx, input.affiliateId);
      const commission = await tx.affiliateCommission.findUnique({ where: { id: input.commissionId }, include: { referral: true } });
      if (!commission) throw new AffiliatePersistenceError("COMMISSION_NOT_FOUND", "Commission not found");
      if (commission.affiliateId !== input.affiliateId || commission.referral.affiliateId !== input.affiliateId || commission.referral.orderId !== commission.orderId) {
        throw new AffiliatePersistenceError("CROSS_AFFILIATE_MISMATCH", "Commission relationships are inconsistent");
      }
      assertCommissionSnapshot(commission);
      const decision = transitionCommission(commission.status, input.to, input.now ?? new Date());
      if (!decision.changed) return commission;
      return tx.affiliateCommission.update({
        where: { id: commission.id },
        data: {
          status: input.to,
          approvedAt: input.to === "APPROVED" ? decision.occurredAt : commission.approvedAt,
          voidedAt: input.to === "VOIDED" ? decision.occurredAt : commission.voidedAt,
          paidAt: input.to === "PAID" ? decision.occurredAt : commission.paidAt,
          voidReason: input.to === "VOIDED" ? input.reason?.trim().slice(0, 500) || "Commission voided" : commission.voidReason
        }
      });
    });
  }

  async createWithdrawal(input: {
    affiliateId: string;
    idempotencyKey: string;
    amountMinor: number;
    currency?: string;
    policy: WithdrawalPolicy;
    now?: Date;
  }) {
    return this.serializable(async (tx) => {
      await this.lockAffiliate(tx, input.affiliateId);
      const key = input.idempotencyKey.trim();
      const currency = normalizeCurrency(input.currency ?? "RWF");
      const existing = await tx.affiliateWithdrawal.findUnique({
        where: { affiliateId_idempotencyKey: { affiliateId: input.affiliateId, idempotencyKey: key } }
      });
      if (existing) {
        if (existing.amountMinor !== input.amountMinor || existing.currency !== currency) {
          throw new AffiliatePersistenceError("IDEMPOTENCY_CONFLICT", "Idempotency key was already used with different withdrawal data");
        }
        return existing;
      }
      const affiliate = await tx.affiliate.findUnique({ where: { id: input.affiliateId } });
      if (!affiliate) throw new AffiliatePersistenceError("AFFILIATE_NOT_FOUND", "Affiliate not found");
      const [commissionTotal, withdrawalTotal] = await Promise.all([
        tx.affiliateCommission.aggregate({
          where: { affiliateId: input.affiliateId, currency, status: "APPROVED" },
          _sum: { amountMinor: true }
        }),
        tx.affiliateWithdrawal.aggregate({
          where: { affiliateId: input.affiliateId, currency, status: { in: ["PENDING", "APPROVED", "PAID"] } },
          _sum: { amountMinor: true }
        })
      ]);
      const earned = commissionTotal._sum.amountMinor ?? 0;
      const consumed = withdrawalTotal._sum.amountMinor ?? 0;
      const availableBalance = Math.max(0, earned - consumed);
      const decision = decideWithdrawalEligibility({
        affiliateStatus: affiliate.status,
        amount: input.amountMinor,
        availableBalance,
        idempotencyKey: key,
        policy: input.policy
      });
      if (!decision.eligible) throw new AffiliatePersistenceError("WITHDRAWAL_REJECTED", decision.reason);
      try {
        return await tx.affiliateWithdrawal.create({ data: {
          affiliateId: input.affiliateId,
          idempotencyKey: decision.idempotencyKey,
          amountMinor: decision.amount,
          currency,
          requestedAt: input.now ?? new Date()
        } });
      } catch (error) {
        if (!isUniqueConstraint(error)) throw error;
        const replay = await tx.affiliateWithdrawal.findUnique({
          where: { affiliateId_idempotencyKey: { affiliateId: input.affiliateId, idempotencyKey: key } }
        });
        if (replay && replay.amountMinor === input.amountMinor && replay.currency === currency) return replay;
        throw new AffiliatePersistenceError("IDEMPOTENCY_CONFLICT", "Idempotency key conflicts with another withdrawal");
      }
    });
  }

  async transitionWithdrawal(input: {
    withdrawalId: string;
    affiliateId: string;
    to: WithdrawalStatus;
    adminReason?: string;
    payoutReference?: string;
    now?: Date;
  }) {
    return this.serializable(async (tx) => {
      await this.lockAffiliate(tx, input.affiliateId);
      const withdrawal = await tx.affiliateWithdrawal.findUnique({ where: { id: input.withdrawalId } });
      if (!withdrawal) throw new AffiliatePersistenceError("WITHDRAWAL_NOT_FOUND", "Withdrawal not found");
      if (withdrawal.affiliateId !== input.affiliateId) throw new AffiliatePersistenceError("CROSS_AFFILIATE_MISMATCH", "Withdrawal belongs to another affiliate");
      const decision = transitionWithdrawal(withdrawal.status, input.to, input.now ?? new Date());
      if (!decision.changed) return withdrawal;
      const reason = input.adminReason?.trim();
      if (reason && reason.length > 500) throw new Error("Administrative reason is too long");
      const payoutReference = input.payoutReference?.trim();
      if (input.to === "PAID" && !payoutReference) throw new Error("A payout reference is required to mark a withdrawal paid");
      return tx.affiliateWithdrawal.update({
        where: { id: withdrawal.id },
        data: {
          status: input.to,
          adminReason: reason ?? withdrawal.adminReason,
          payoutReference: input.to === "PAID" ? payoutReference : withdrawal.payoutReference,
          approvedAt: input.to === "APPROVED" ? decision.occurredAt : withdrawal.approvedAt,
          rejectedAt: input.to === "REJECTED" ? decision.occurredAt : withdrawal.rejectedAt,
          paidAt: input.to === "PAID" ? decision.occurredAt : withdrawal.paidAt,
          cancelledAt: input.to === "CANCELLED" ? decision.occurredAt : withdrawal.cancelledAt
        }
      });
    });
  }
}
