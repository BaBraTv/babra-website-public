# BaBra AI Academy staging runbook

This applies only to the `babra-ai-academy` branch. Do not enable the Academy in production during Phase 1.

## Required staging services

- A separate PostgreSQL staging database.
- A staging deployment URL.
- An SMTP account for verification and password-reset email.

## Deployment order

1. Configure `.env.example` variables in the hosting provider's encrypted environment settings.
2. Keep `ACADEMY_ENABLED=false` for the first deployment.
3. Run `pnpm academy:staging-check` and resolve the reported configuration issues.
4. Run `pnpm db:deploy` against the staging database.
5. Set the three one-time `ACADEMY_BOOTSTRAP_*` variables, run `pnpm academy:bootstrap-admin`, then delete those variables immediately.
6. Set `ACADEMY_ENABLED=true`, redeploy staging, and run acceptance tests.

## Acceptance tests

- Registration is blocked from login until email verification.
- Verification links expire and cannot be reused.
- Password-reset links expire, cannot be reused, and revoke old sessions.
- Candidate users cannot use administrator permissions.
- Repeated authentication attempts return HTTP 429.
- Registration, verification, login, logout and bootstrap events appear in `AcademyAuditLog`.
- `/academy` and `/api/academy/*` responses never appear in the service-worker cache.

## Rollback

Set `ACADEMY_ENABLED=false`. This removes Academy access without changing existing commerce, `/login`, `/admin`, or local-storage behavior. The migration is additive and should not be manually reversed on a shared environment.
