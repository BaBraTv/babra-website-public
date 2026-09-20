# RC32-B6 Secured Affiliate API

## Outcome

RC32-B6 exposes the validated B3–B5 affiliate foundation through authenticated, same-origin JSON APIs. It adds no UI, public tracking cookie, checkout attribution, payout-provider integration, schema change, or migration.

## Routes

- `GET /api/affiliate/summary` requires an authenticated user and returns only that user's affiliate account, bounded recent records, and per-currency balances. Administrative withdrawal reasons are excluded.
- `POST /api/affiliate/withdrawals` requires an authenticated affiliate, strict integer-minor-unit input, an idempotency key, a configured withdrawal policy, and rate limiting.
- `POST /api/admin/affiliate-commissions` requires an admin/staff session and creates a commission from a persisted referral/order snapshot.
- `PATCH /api/admin/affiliate-commissions` requires an admin/staff session and performs a valid commission transition.
- `PATCH /api/admin/affiliate-withdrawals` requires an admin/staff session and performs a valid withdrawal transition. Paid transitions require a bounded, non-secret payout reference.

Unsafe requests continue to inherit RC32-B2 middleware enforcement for same-origin requests and `application/json` content. No route accepts credentials, payout-account secrets, caller-selected commission rates, or arbitrary financial snapshots.

## Authorization and audit

Affiliate identity is derived from the authenticated session and its unique `Affiliate.userId`; callers cannot select another affiliate for withdrawal creation or account reads. Administrative commission and withdrawal operations require `ADMIN` or `STAFF`. Admin-created commissions and lifecycle transitions write bounded `AdminActivityLog` entries inside the same serializable transaction as the financial operation.

## Operational configuration

`AFFILIATE_WITHDRAWAL_MIN_MINOR` is required before withdrawal requests can succeed. `AFFILIATE_WITHDRAWAL_MAX_MINOR` is optional but, when set, must be a positive safe integer no lower than the minimum. No default BaBra financial policy is invented by the application.

## Production change preview

Deploying the B3–B6 branch would apply the already staged and validated affiliate migrations to production, then expose the authenticated affiliate API routes in the application deployment. Production must first receive an approved withdrawal policy, verified database backup/recovery posture, migration credentials, trusted TLS configuration, and the standard pre-deployment validation. No production migration or deployment is performed by RC32-B6 implementation.

## Deferred scope

- Affiliate application/approval administration and commission-rate policy selection.
- Public code capture, attribution cookies, checkout integration, and affiliate UI.
- Payout-provider credentials, payout-account storage, and automated disbursement.
- A commission-to-withdrawal allocation ledger for detailed reconciliation.
