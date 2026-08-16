# RC32-B12 Repository Remediation

## Affiliate workflow completion

The secured admin workflow now exposes referral-to-commission creation, commission approval/voiding, and direct commission settlement. The affiliate portal shows individual referral, commission, and withdrawal states instead of counts alone.

Withdrawal submissions persist the exact pending amount, currency, and idempotency key in browser-local storage before the request is sent. A failed or ambiguous request can therefore be retried with the identical payload. The server remains authoritative: affiliate-scoped uniqueness returns the existing request for an identical replay and rejects payload reuse, while serializable transactions and an affiliate row lock prevent concurrent overspending. A paid withdrawal remains included in consumed balance permanently.

## Why no allocation ledger is required

The current accounting model has two intentionally disjoint settlement paths per affiliate and currency:

1. Direct commission settlement transitions a specific approved commission to `PAID`, removing it from the approved earnings available for withdrawal.
2. Withdrawal settlement leaves its backing commissions approved and subtracts every `PENDING`, `APPROVED`, or `PAID` withdrawal from aggregate approved earnings.

Before direct commission settlement, the service now rejects the transition when any non-released withdrawal exists for the affiliate and currency. This prevents the same pool from being settled through both paths. Rejected and cancelled withdrawals are released. Therefore an allocation table is not required to prevent overspending or duplicate payout in the present model. An allocation ledger would become necessary if BaBra later needs a single withdrawal to close named commissions, partial per-commission settlement, or invoice-level payout reconciliation.

No new database migration is introduced by B12.

## Production target identity

Production preflight now requires an explicitly reviewed Supabase project reference plus exact runtime and direct database hosts. Each connection must match both its expected host and the project identity carried by the Supabase direct hostname or pooler username. Migration execution reruns this preflight and fails before Prisma starts if identity validation fails. Preflight results contain statuses and variable names only, never URL values or credentials.

## Secret inventory

The current application directly consumes `ADMIN_SETUP_SECRET` and `PAYMENT_CALLBACK_SECRET`; both remain mandatory and subject to strength checks. Session and password-reset tokens are generated with cryptographic randomness and stored as hashes. The application does not use NextAuth and does not consume `AUTH_SESSION_SECRET`, `NEXTAUTH_SECRET`, or `PASSWORD_RESET_TOKEN_SECRET`, so those obsolete placeholders are no longer required by production preflight.
