# RC32-B10 Production Preflight

## Deployment target

- Git repository: `BaBraTv/babra-website-public`
- Branch under review: `codex/production-readiness`
- Vercel project: `babra-website-public-uzcw`
- Public application: `https://www.babra.store`
- Database provider: the separately configured BaBra production PostgreSQL/Supabase project (never the disposable staging project)

## Exact migrations awaiting production approval

1. `20260629120000_init`
2. `20260629190000_add_investor_access_requests`
3. `20260809120000_add_affiliate_program`
4. `20260809130000_add_affiliate_withdrawals`

All four applied successfully from zero in disposable staging. The affiliate migrations are additive and contain no `DROP`, `TRUNCATE`, or data-deletion statements. Production migration status must be read immediately before execution because an already-partially-migrated production database would change the actual pending set.

## Required production environment

`DATABASE_URL`, `DIRECT_URL`, `PRODUCTION_APP_URL`, `NEXT_PUBLIC_SITE_URL`, `AUTH_SESSION_SECRET`, `NEXTAUTH_SECRET`, `PASSWORD_RESET_TOKEN_SECRET`, `ADMIN_SETUP_SECRET`, `PAYMENT_CALLBACK_SECRET`, and an approved `AFFILIATE_WITHDRAWAL_MIN_MINOR` are required. `AFFILIATE_WITHDRAWAL_MAX_MINOR` is optional but must be no lower than the minimum. Email variables are required before real email delivery. External payment-provider variables remain disabled/empty until those providers receive a separate security review.

`PRODUCTION_MIGRATION_APPROVED=YES` is a one-command approval guard. It must not be persisted in Vercel or source control.

## Approved-action command sequence

The following is documentation only and has not been executed:

1. Confirm automated backups and take a named manual pre-RC32 backup/snapshot.
2. Export the reviewed production environment into the controlled operator shell.
3. Run `pnpm production:preflight`.
4. Run read-only `pnpm exec prisma migrate status` with `DATABASE_URL` scoped to the production `DIRECT_URL`.
5. After explicit owner approval only, set `PRODUCTION_MIGRATION_APPROVED=YES` for the command and run `pnpm production:migrate`.
6. Re-run migration status and database constraint smoke checks without destructive resets.
7. Deploy the reviewed commit to Vercel project `babra-website-public-uzcw` using the approved Git/Vercel release workflow.
8. Run `pnpm verify:api` and authenticated manual smoke tests for checkout, affiliate application, admin approval, commission review, withdrawal request/review, and authorization denial paths.

Never run `prisma migrate reset` or `prisma db push` against production.

## Rollback plan

The schema changes are additive, so application rollback is the first response: immediately promote the prior known-good Vercel deployment while leaving the new tables intact. Disable affiliate entry points operationally by rolling back the application; do not drop financial tables. If migration execution fails, stop deployment, capture the exact migration state/logs, and use `prisma migrate resolve` only after review of the specific failed migration. If a database restore is genuinely required, place the site in maintenance/read-only mode and restore the named pre-RC32 backup into a verified recovery target before cutover. Prefer a reviewed forward-fix migration over destructive rollback once production writes exist.

## Exact production impact

The database gains affiliate, referral, commission, and withdrawal enums/tables, indexes, checks, and restrictive foreign keys. The application gains optional checkout affiliate-code attribution; authenticated affiliate application, balance, and withdrawal workflows; and admin-only affiliate/rate/commission/withdrawal controls. Existing orders, users, Founder pages, Rwanda Mobile Hub, payment controls, and security middleware remain in place. No automatic payout, external payout provider, tracking cookie, or public unauthenticated financial endpoint is enabled.

## Approval boundary

RC32-B10 changes the build so Vercel cannot migrate implicitly. No production database or deployment action may occur until the owner reviews this document, confirms the production target and withdrawal policy, confirms backup readiness, and explicitly approves the irreversible migration/deployment sequence.
