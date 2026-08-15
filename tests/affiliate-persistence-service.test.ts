import assert from "node:assert/strict";
import test from "node:test";
import { AffiliatePersistenceError, AffiliatePersistenceService, assertCommissionSnapshot } from "../lib/affiliate-persistence.ts";

type Row = Record<string, unknown> & { id: string };
type State = {
  affiliates: Row[];
  orders: Row[];
  referrals: Row[];
  commissions: Row[];
  withdrawals: Row[];
  auditLogs: Row[];
};

function uniqueError() {
  return Object.assign(new Error("Unique constraint"), { code: "P2002" });
}

class FakePrisma {
  state: State;
  private sequence = 0;
  private queue = Promise.resolve();
  failReferralUpdate = false;

  constructor(state?: Partial<State>) {
    this.state = {
      affiliates: [{ id: "affiliate-1", userId: "owner-1", code: "AFF-1234567890ABCDEF", status: "ACTIVE", commissionRateBasisPoints: 1_000, codeExpiresAt: null }],
      orders: [{ id: "order-1", customerId: "customer-1", subtotalCents: 10_000, discountCents: 0, deliveryCents: 500, currency: "RWF" }],
      referrals: [], commissions: [], withdrawals: [], auditLogs: [], ...state
    };
  }

  private nextId(prefix: string) {
    this.sequence += 1;
    return `${prefix}-${this.sequence}`;
  }

  private transactionClient() {
    const db = this;
    return {
      $queryRaw: async (_strings: TemplateStringsArray, affiliateId: string) => db.state.affiliates.filter((row) => row.id === affiliateId).map(({ id }) => ({ id })),
      affiliate: {
        findUnique: async ({ where, include }: { where: { id?: string; code?: string; userId?: string }; include?: object }) => {
          const affiliate = db.state.affiliates.find((row) => row.id === where.id || row.code === where.code || row.userId === where.userId);
          if (!affiliate || !include) return affiliate ?? null;
          return {
            ...affiliate,
            referrals: db.state.referrals.filter((row) => row.affiliateId === affiliate.id),
            commissions: db.state.commissions.filter((row) => row.affiliateId === affiliate.id),
            withdrawals: db.state.withdrawals.filter((row) => row.affiliateId === affiliate.id)
          };
        }
      },
      order: {
        findUnique: async ({ where }: { where: { id: string } }) => db.state.orders.find((row) => row.id === where.id) ?? null
      },
      affiliateReferral: {
        findUnique: async ({ where, include }: { where: { id?: string; orderId?: string }; include?: object }) => {
          const referral = db.state.referrals.find((row) => row.id === where.id || row.orderId === where.orderId);
          if (!referral || !include) return referral ?? null;
          return {
            ...referral,
            affiliate: db.state.affiliates.find((row) => row.id === referral.affiliateId),
            order: db.state.orders.find((row) => row.id === referral.orderId),
            commission: db.state.commissions.find((row) => row.referralId === referral.id) ?? null
          };
        },
        create: async ({ data }: { data: Row }) => {
          if (db.state.referrals.some((row) => row.orderId === data.orderId)) throw uniqueError();
          const row = { status: "ATTRIBUTED", ...data, id: db.nextId("referral") };
          db.state.referrals.push(row);
          return row;
        },
        update: async ({ where, data }: { where: { id: string }; data: Row }) => {
          if (db.failReferralUpdate) throw new Error("forced referral update failure");
          return db.update(db.state.referrals, where.id, data);
        }
      },
      affiliateCommission: {
        findUnique: async ({ where, include }: { where: { id: string }; include?: object }) => {
          const commission = db.state.commissions.find((row) => row.id === where.id);
          if (!commission || !include) return commission ?? null;
          return { ...commission, referral: db.state.referrals.find((row) => row.id === commission.referralId) };
        },
        create: async ({ data }: { data: Row }) => {
          if (db.state.commissions.some((row) => row.referralId === data.referralId || row.orderId === data.orderId)) throw uniqueError();
          const row = { status: "PENDING", approvedAt: null, voidedAt: null, paidAt: null, voidReason: null, ...data, id: db.nextId("commission") };
          db.state.commissions.push(row);
          return row;
        },
        update: async ({ where, data }: { where: { id: string }; data: Row }) => db.update(db.state.commissions, where.id, data),
        aggregate: async ({ where }: { where: { affiliateId: string; currency: string; status: string } }) => ({
          _sum: { amountMinor: db.state.commissions.filter((row) => row.affiliateId === where.affiliateId && row.currency === where.currency && row.status === where.status).reduce((sum, row) => sum + Number(row.amountMinor), 0) || null }
        })
      },
      affiliateWithdrawal: {
        findUnique: async ({ where }: { where: { id?: string; affiliateId_idempotencyKey?: { affiliateId: string; idempotencyKey: string } } }) => {
          const key = where.affiliateId_idempotencyKey;
          return db.state.withdrawals.find((row) => row.id === where.id || key && row.affiliateId === key.affiliateId && row.idempotencyKey === key.idempotencyKey) ?? null;
        },
        create: async ({ data }: { data: Row }) => {
          if (db.state.withdrawals.some((row) => row.affiliateId === data.affiliateId && row.idempotencyKey === data.idempotencyKey)) throw uniqueError();
          const row = { status: "PENDING", adminReason: null, payoutReference: null, approvedAt: null, rejectedAt: null, paidAt: null, cancelledAt: null, ...data, id: db.nextId("withdrawal") };
          db.state.withdrawals.push(row);
          return row;
        },
        update: async ({ where, data }: { where: { id: string }; data: Row }) => db.update(db.state.withdrawals, where.id, data),
        aggregate: async ({ where }: { where: { affiliateId: string; currency: string; status: { in: string[] } } }) => ({
          _sum: { amountMinor: db.state.withdrawals.filter((row) => row.affiliateId === where.affiliateId && row.currency === where.currency && where.status.in.includes(String(row.status))).reduce((sum, row) => sum + Number(row.amountMinor), 0) || null }
        })
      },
      adminActivityLog: {
        create: async ({ data }: { data: Row }) => {
          const row = { ...data, id: db.nextId("audit") };
          db.state.auditLogs.push(row);
          return row;
        }
      }
    };
  }

  private update(rows: Row[], id: string, data: Row) {
    const index = rows.findIndex((row) => row.id === id);
    if (index < 0) throw new Error("row not found");
    rows[index] = { ...rows[index], ...data };
    return rows[index];
  }

  $transaction<T>(operation: (tx: ReturnType<FakePrisma["transactionClient"]>) => Promise<T>) {
    const run = async () => {
      const snapshot = structuredClone(this.state);
      try {
        return await operation(this.transactionClient());
      } catch (error) {
        this.state = snapshot;
        throw error;
      }
    };
    const result = this.queue.then(run, run);
    this.queue = result.then(() => undefined, () => undefined);
    return result;
  }
}

function service(db: FakePrisma) {
  return new AffiliatePersistenceService(db as never, { baseDelayMs: 0 });
}

async function expectCode(promise: Promise<unknown>, code: string) {
  await assert.rejects(promise, (error: unknown) => error instanceof AffiliatePersistenceError && error.code === code);
}

async function createReferral(db: FakePrisma) {
  return service(db).createReferral({ affiliateCode: "aff-1234567890abcdef", orderId: "order-1", customerUserId: "customer-1" });
}

test("duplicate referral prevention", async () => {
  const db = new FakePrisma();
  await createReferral(db);
  await expectCode(createReferral(db), "DUPLICATE_REFERRAL");
  assert.equal(db.state.referrals.length, 1);
});

test("duplicate commission prevention", async () => {
  const db = new FakePrisma();
  const referral = await createReferral(db);
  await service(db).createCommission({ referralId: String(referral.id) });
  await expectCode(service(db).createCommission({ referralId: String(referral.id) }), "DUPLICATE_COMMISSION");
  assert.equal(db.state.commissions.length, 1);
});

test("invalid commission snapshots are rejected", () => {
  assert.throws(() => assertCommissionSnapshot({ amountMinor: 999, eligibleBaseMinor: 10_000, rateBasisPoints: 1_000, currency: "RWF" }),
    (error: unknown) => error instanceof AffiliatePersistenceError && error.code === "INVALID_COMMISSION_SNAPSHOT");
});

test("withdrawal idempotency returns the original request and rejects payload reuse", async () => {
  const db = new FakePrisma({ commissions: [{ id: "commission-1", affiliateId: "affiliate-1", status: "APPROVED", amountMinor: 1_000, currency: "RWF" }] });
  const first = await service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: " payout-1 ", amountMinor: 600, policy: { minimumAmount: 100 } });
  const replay = await service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "payout-1", amountMinor: 600, policy: { minimumAmount: 100 } });
  assert.equal(replay.id, first.id);
  await expectCode(service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "payout-1", amountMinor: 500, policy: { minimumAmount: 100 } }), "IDEMPOTENCY_CONFLICT");
});

test("insufficient balance rejects without writing", async () => {
  const db = new FakePrisma({ commissions: [{ id: "commission-1", affiliateId: "affiliate-1", status: "APPROVED", amountMinor: 400, currency: "RWF" }] });
  await expectCode(service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "too-much", amountMinor: 500, policy: { minimumAmount: 100 } }), "WITHDRAWAL_REJECTED");
  assert.equal(db.state.withdrawals.length, 0);
});

test("concurrent withdrawal attempts cannot overspend", async () => {
  const db = new FakePrisma({ commissions: [{ id: "commission-1", affiliateId: "affiliate-1", status: "APPROVED", amountMinor: 1_000, currency: "RWF" }] });
  const results = await Promise.allSettled([
    service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "concurrent-1", amountMinor: 700, policy: { minimumAmount: 100 } }),
    service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "concurrent-2", amountMinor: 700, policy: { minimumAmount: 100 } })
  ]);
  assert.deepEqual(results.map((result) => result.status).sort(), ["fulfilled", "rejected"]);
  assert.equal(db.state.withdrawals.length, 1);
});

test("cross-affiliate record mismatch is rejected", async () => {
  const db = new FakePrisma({
    referrals: [{ id: "referral-1", affiliateId: "affiliate-other", orderId: "order-1", status: "CONVERTED", affiliateCodeSnapshot: "AFF-1234567890ABCDEF" }],
    commissions: [{ id: "commission-1", referralId: "referral-1", affiliateId: "affiliate-1", orderId: "order-1", amountMinor: 1_000, eligibleBaseMinor: 10_000, rateBasisPoints: 1_000, currency: "RWF", status: "PENDING", approvedAt: null, voidedAt: null, paidAt: null }]
  });
  await expectCode(service(db).transitionCommission({ commissionId: "commission-1", affiliateId: "affiliate-1", to: "APPROVED" }), "CROSS_AFFILIATE_MISMATCH");
});

test("valid commission lifecycle preserves financial snapshots", async () => {
  const db = new FakePrisma();
  const referral = await createReferral(db);
  const created = await service(db).createCommission({ referralId: String(referral.id) });
  const approved = await service(db).transitionCommission({ commissionId: String(created.id), affiliateId: "affiliate-1", to: "APPROVED", actorId: "admin-1" });
  const paid = await service(db).transitionCommission({ commissionId: String(created.id), affiliateId: "affiliate-1", to: "PAID" });
  assert.equal(approved.status, "APPROVED");
  assert.equal(paid.status, "PAID");
  assert.equal(paid.amountMinor, created.amountMinor);
  assert.equal(paid.eligibleBaseMinor, created.eligibleBaseMinor);
  assert.equal(paid.rateBasisPoints, created.rateBasisPoints);
  assert.equal(db.state.auditLogs.length, 1);
  assert.equal(db.state.auditLogs[0].actorId, "admin-1");
});

test("valid withdrawal lifecycle remains consumed after payout", async () => {
  const db = new FakePrisma({ commissions: [{ id: "commission-1", affiliateId: "affiliate-1", status: "APPROVED", amountMinor: 1_000, currency: "RWF" }] });
  const created = await service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "life-1", amountMinor: 700, policy: { minimumAmount: 100 } });
  await service(db).transitionWithdrawal({ withdrawalId: String(created.id), affiliateId: "affiliate-1", to: "APPROVED" });
  const paid = await service(db).transitionWithdrawal({ withdrawalId: String(created.id), affiliateId: "affiliate-1", to: "PAID", payoutReference: "provider-reference-1" });
  assert.equal(paid.status, "PAID");
  await expectCode(service(db).createWithdrawal({ affiliateId: "affiliate-1", idempotencyKey: "life-2", amountMinor: 400, policy: { minimumAmount: 100 } }), "WITHDRAWAL_REJECTED");
});

test("failed financial operation rolls back every write", async () => {
  const db = new FakePrisma();
  const referral = await createReferral(db);
  db.failReferralUpdate = true;
  await assert.rejects(service(db).createCommission({ referralId: String(referral.id) }), /forced referral update failure/);
  assert.equal(db.state.commissions.length, 0);
  assert.equal(db.state.referrals[0].status, "ATTRIBUTED");
});
