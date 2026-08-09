# RC32-B4 Affiliate Persistence

## Outcome

The tested RC32-B3 affiliate domain contract is represented by four Prisma models and two additive migrations. Existing migrations remain immutable. No Account or VerificationToken compatibility models were added because the current custom authentication code does not use them.

## Models and relationships

### Affiliate

One-to-one with `User` through unique `userId`. It stores the unique normalized code, B3 affiliate status, configured commission basis points, optional code expiry, approval/rejection/suspension timestamps, and creation/update timestamps. User deletion is restricted to preserve financial history.

Indexes and constraints: unique user, unique code, `(status, createdAt)`, `codeExpiresAt`, basis points from 0 through 10,000, and the B3 `AFF-` code format.

### AffiliateReferral

Belongs to `Affiliate` and `Order`, and optionally references the customer `User`. Unique `orderId` enforces exactly one affiliate attribution per order. It preserves the affiliate-code snapshot, safe landing path, attribution/conversion/expiry timestamps, and B3 referral status.

Indexes: `(affiliateId, status, attributedAt)`, `(expiresAt, status)`, and `customerUserId`. Affiliate and order deletion is restricted; optional customer deletion sets the reference to null.

### AffiliateCommission

A dedicated commission table is required. Attribution and commission are distinct lifecycles: the commission must preserve immutable order/referral/rate/base/amount snapshots, be queried independently for balances and administration, and transition through `PENDING`, `APPROVED`, `VOIDED`, and `PAID`. Embedding these fields in the referral would mix attribution evidence with mutable financial settlement state.

Each referral and order has at most one commission. Monetary values are integer minor units. SQL checks require non-negative amounts, commission no greater than eligible base, basis points from 0 through 10,000, and a currency length from 3 through 8 characters.

Indexes: `(affiliateId, status, createdAt)` for dashboard/balance work and `(status, createdAt)` for administration.

### AffiliateWithdrawal

Belongs to `Affiliate`, with restrictive deletion. It stores positive integer minor-unit amount, currency, B3 withdrawal status, bounded administrative reason, non-secret payout reference, and all lifecycle timestamps.

Constraints and indexes: unique `(affiliateId, idempotencyKey)`, idempotency key length 1–128, positive amount, `(affiliateId, status, requestedAt)` for balance/dashboard operations, and `(status, requestedAt)` for administration.

## Migration chain

1. `20260629120000_init` — unchanged.
2. `20260629190000_add_investor_access_requests` — unchanged.
3. `20260809120000_add_affiliate_program` — affiliate, referral, and commission enums/tables/constraints/relations.
4. `20260809130000_add_affiliate_withdrawals` — withdrawal enum/table/constraints/relation.

## SQL review

The new SQL is additive. It contains no `DROP`, `TRUNCATE`, or data-deletion statements. Foreign keys use `ON UPDATE CASCADE`; core financial relations use `ON DELETE RESTRICT`, while the optional referral-customer relation uses `ON DELETE SET NULL`. Unique indexes enforce affiliate ownership, code uniqueness, one referral/commission per order, one commission per referral, and affiliate-scoped withdrawal idempotency. Explicit PostgreSQL checks cover code shape, landing-path bounds, commission values/rates, withdrawal amount, currency length, idempotency-key length, and administrative-reason length.

## Verification

- Prisma format: passed.
- Prisma schema validation: passed.
- Prisma Client generation: passed.
- Static schema-domain and additive-SQL tests: passed.
- Fresh-database migration proof: not executed. This workstation exposed no local PostgreSQL executable/service, Docker runtime, or explicitly disposable database connection. Production/Supabase was deliberately not contacted.

## Remaining risks

- The complete migration chain still requires execution from zero against an explicitly disposable PostgreSQL database, followed by `prisma migrate status` and database-level constraint probes.
- Prisma cannot express the reviewed SQL `CHECK` constraints in the schema; future generated diffs must preserve them manually.
- B5 transaction code must keep referral, commission, balance reservation, and payout transitions serializable and must enforce cross-record consistency between duplicated affiliate/order identifiers.
- Payout references must remain non-secret; provider credentials and complete payout-account data must never be stored in this field.
