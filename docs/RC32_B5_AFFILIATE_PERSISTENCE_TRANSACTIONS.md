# RC32-B5 Affiliate Persistence Transactions

## Architecture

`lib/affiliate-persistence.ts` is the database-facing service boundary for referral attribution, commission creation/settlement, and withdrawal creation/state handling. It reuses the RC32-B3 pure domain decisions and accepts a Prisma transaction-capable client, which keeps business decisions testable without exposing API or UI integration.

Referral creation normalizes and resolves the persisted affiliate code, locks the affiliate balance scope, validates active/expiry/self-referral/order/customer rules, and relies on the unique order constraint as the final duplicate guard.

Commission creation loads the referral, affiliate, order, and existing commission together. The service rejects inconsistent duplicated identifiers and affiliate-code snapshots, derives the eligible base from the persisted order rather than caller-supplied financial values, snapshots the persisted affiliate rate and order currency, verifies the exact floor-minor-unit calculation, creates at most one commission per referral/order, and converts the referral in the same transaction. Commission transitions only update lifecycle fields; financial snapshot fields are revalidated and never mutated.

Withdrawal creation locks the affiliate row before reading earnings and withdrawals. It returns an exact existing idempotent replay, rejects reuse of a key with a different amount/currency, and calculates spendable balance per currency as approved commissions less every non-released withdrawal (`PENDING`, `APPROVED`, or `PAID`). Including paid withdrawals prevents a completed payout from becoming spendable again. Rejected and cancelled withdrawals release their reservation. Lifecycle updates require matching affiliate ownership, valid RC32-B3 state transitions, and a non-empty payout reference for `PAID`.

## Transaction and concurrency strategy

All attribution and financial operations use Prisma interactive transactions at PostgreSQL `SERIALIZABLE` isolation. A `SELECT ... FOR UPDATE` on the affiliate row provides an explicit per-affiliate serialization point before balance-sensitive reads or writes. The RC32-B3 bounded retry helper retries only Prisma `P2034` and PostgreSQL `40001`/`40P01` conflicts. Database unique constraints remain the authoritative last line of defense for duplicate referral, commission, and withdrawal-idempotency races.

Any error rolls back the complete interactive transaction. In particular, commission creation and referral conversion cannot partially commit.

## Database constraint probes

`scripts/probe-affiliate-constraints.mjs` performs ten negative probes inside one outer transaction and always rolls it back. It verifies affiliate code/rate checks, referral and commission uniqueness, commission amount/rate checks, positive withdrawals, withdrawal idempotency, and affiliate foreign keys. For production safety it ignores `DATABASE_URL`, requires the dedicated `AFFILIATE_STAGING_DATABASE_URL`, requires `AFFILIATE_STAGING_DATABASE_CONFIRM=DISPOSABLE`, and restricts execution to a Supabase hostname.

## Test coverage

`tests/affiliate-persistence-service.test.ts` covers duplicate referrals, duplicate commissions, invalid commission snapshots, withdrawal idempotency conflicts/replays, insufficient balance, concurrent overspend attempts, cross-affiliate mismatch, valid commission lifecycle, valid withdrawal lifecycle including post-payment consumption, and rollback after a forced financial-operation failure.

## Staging verification

The disposable Supabase staging database passed all ten rollback-only constraint probes over verified TLS. PostgreSQL rejected invalid affiliate codes and rates, duplicate referral/commission relationships, invalid commission snapshots, non-positive withdrawals, duplicate affiliate-scoped idempotency keys, and missing affiliate foreign keys with the expected SQLSTATEs. The complete probe fixture was enclosed in an outer transaction and rolled back.

Direct inspection of `_prisma_migrations` confirmed the four expected migrations are finished and not rolled back, in order, with no unresolved migration attempts. It also confirmed the one historical BOM-failed `20260629120000_init` attempt remains safely marked rolled back before the successful chain.

## Remaining risks

- The current schema does not allocate individual commissions to withdrawals. The B5 service therefore computes consumed value from withdrawal records per currency; future accounting/reporting may benefit from an additive allocation or ledger model.
- API authorization, request validation, rate limiting, and UI integration remain intentionally outside RC32-B5. RC32-B2 controls remain unchanged.
- Payout references must remain non-secret. Provider credentials and full payout-account data must not be stored in the withdrawal record.
