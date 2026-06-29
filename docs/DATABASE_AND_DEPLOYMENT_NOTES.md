# Database and Deployment Notes

## Required Environment Variables

Set these in local `.env` and in the production host environment:

- `DATABASE_URL`
- `AUTH_SESSION_SECRET`
- `PASSWORD_RESET_TOKEN_SECRET`
- `ADMIN_SETUP_SECRET`
- `PAYMENT_CALLBACK_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Email and payment provider variables can stay empty until those integrations are activated, but they must not be committed with real secrets.

## Local Database Setup

1. Create a PostgreSQL database named `babra_store`.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` to the local database connection string.
4. Run `pnpm db:generate`.
5. Run `pnpm db:migrate` for development migrations.

## Production Migration

For production, apply migrations through the deployment pipeline or a controlled release command after `DATABASE_URL` is configured. Do not run destructive resets against production data.

## Backups

- Use managed PostgreSQL automated daily backups where available.
- Keep at least 7 daily backups and 4 weekly backups.
- Test restore into a staging database before relying on a backup process.
- Before major schema changes, create an on-demand backup and record the migration version.

## Security Notes

- Keep `.env` out of Git.
- Rotate secrets if they are ever exposed.
- Protect admin routes with server-side role checks.
- Store payment callbacks and raw provider references for auditability, but do not store sensitive card data.

## Phase 2 Core System

- Customer signup and login use the `User`, `CustomerProfile`, and `Session` tables.
- Admin accounts can only be created by sending `x-babra-admin-setup-secret` with a value matching `ADMIN_SETUP_SECRET`.
- My Account, Profile, Orders, Payment Confirmation, Admin, and Dashboard routes are protected server-side.
- Checkout saves real `Order`, `OrderItem`, and `Payment` records when `DATABASE_URL` is configured.
- Manual payment modes are stored as `MANUAL_REVIEW`; BaBra must confirm payment before an order is moved forward.
- Email notification records are queued in `EmailNotification`. No real email is sent until SMTP/provider delivery is configured.
