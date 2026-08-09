# RC32-B3 Affiliate Domain Foundation

This phase defines database-independent business rules only. It does not add routes, UI, cookies, Prisma models, migrations, payout providers, or a default commission percentage.

## Policies fixed by the domain layer

- Affiliate codes use `AFF-` plus 16 uppercase hexadecimal characters (20 characters total). They contain no names, email addresses, phone numbers, or sequential database identifiers. Persistence must enforce uniqueness; generation retries collisions up to a bounded limit.
- Only `ACTIVE` affiliates may receive attribution. Codes must be valid and unexpired. Self-referrals are rejected by default. An order accepts exactly one referral. Landing paths are relative, control-character-free paths capped at 512 characters. The reusable default attribution-cookie lifetime is 30 days; HTTP cookie implementation remains B4 work.
- Money is represented as non-negative safe-integer minor units. Rates are integer basis points from 0 through 10,000. The commission base is discounted merchandise plus delivery and tax only when explicitly enabled. Rounding always floors to the minor unit. No BaBra percentage is selected here.
- Commissions begin `PENDING`; supported terminal decisions prevent backward transitions. Same-state replay is idempotent and every decision returns `from`, `to`, `changed`, `reason`, and `occurredAt`.
- Only `APPROVED` commissions contribute to availability. `PENDING` and `APPROVED` withdrawals reserve funds; rejected/cancelled withdrawals release them. Paid withdrawals are reported separately as settled. Duplicate record IDs are counted once; conflicting duplicates fail closed.
- Withdrawal requests require an active affiliate, configurable bounds, sufficient available balance, and an idempotency key. Persistence must return the existing logical submission for duplicate keys.
- Serializable work may retry only Prisma `P2034` or PostgreSQL `40001`/`40P01`, with bounded exponential jitter. Validation, authorization, uniqueness, and other errors are never retried.

## RC32-B4 persistence contract

### Affiliate

Required fields: `id`, `userId`, `code`, `status`, `commissionRateBasisPoints`, optional `codeExpiresAt`, `approvedAt`, `rejectedAt`, `suspendedAt`, `createdAt`, and `updatedAt`.

Required constraints/indexes:

- Primary key on `id`.
- Unique `userId` and unique normalized uppercase `code`.
- Check `commissionRateBasisPoints BETWEEN 0 AND 10000`.
- Index `(status, createdAt)` and optional expiry index on `codeExpiresAt`.
- Required one-to-one relation to `User`; deletion behavior must preserve financial/audit history (prefer restrict or soft deletion).

### AffiliateReferral

Required fields: `id`, `affiliateId`, `orderId`, `status`, `affiliateCodeSnapshot`, optional `customerUserId`, `landingPath`, `attributedAt`, `convertedAt`, `expiresAt`, `createdAt`, and `updatedAt`.

Required constraints/indexes:

- Primary key on `id`.
- Unique `orderId` to guarantee exactly one affiliate referral per order.
- Index `(affiliateId, status, attributedAt)` and `(expiresAt, status)`.
- Relations to `Affiliate`, `Order`, and optional customer `User`.
- Preserve the code snapshot and attribution facts if the affiliate code later changes.

Commission persistence is expected either as a dedicated `AffiliateCommission` object or as an immutable commission component attached one-to-one to the referral. The dedicated form is recommended and requires: `id`, unique `referralId`, `affiliateId`, `orderId`, integer `amountMinor`, `currency`, integer `rateBasisPoints`, integer `eligibleBaseMinor`, `status`, audit timestamps, and optional void reason. Index `(affiliateId, status, createdAt)` and enforce all monetary/rate checks.

### AffiliateWithdrawal

Required fields: `id`, `affiliateId`, `idempotencyKey`, integer `amountMinor`, `currency`, `status`, optional bounded administrative reason/reference fields, `requestedAt`, `approvedAt`, `rejectedAt`, `paidAt`, `cancelledAt`, `createdAt`, and `updatedAt`.

Required constraints/indexes:

- Primary key on `id`.
- Unique composite `(affiliateId, idempotencyKey)`.
- Check `amountMinor > 0`.
- Index `(affiliateId, status, requestedAt)` and `(status, requestedAt)`.
- Required relation to `Affiliate` with restrictive deletion behavior.

### Transaction and audit requirements

Attribution, commission creation, balance calculation, withdrawal reservation, payout completion, and release of rejected/cancelled reservations must execute in serializable transactions. B4 must lock or otherwise serialize the affiliate balance scope, re-read eligible commissions and active reservations inside the transaction, use the retry policy, and enforce idempotency through database uniqueness rather than preflight checks alone.

Future audit persistence needs actor, affiliate, entity, action, transition timestamps, bounded reason, and safe status/amount/currency metadata. It must not store credentials, tokens, callback secrets, or full payout-account data.
