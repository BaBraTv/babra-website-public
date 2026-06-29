# BaBra Store Production Platform Roadmap

This branch starts the migration from a public marketing/demo site to a real dynamic production platform. Existing public pages must remain intact while backend capabilities are added in phases.

## Phase 1 - Database Foundation

- PostgreSQL is the production database target.
- Prisma ORM owns the schema in `prisma/schema.prisma`.
- `DATABASE_URL` is configured through `prisma.config.ts` and `.env`.
- Core models now cover users, profiles, sessions, reset tokens, products, orders, order items, payments, contact messages, job applications, lost/found reports, admin activity logs, email notifications, and rate-limit events.

## Phase 2 - Authentication

- Add server-side signup/login/logout using hashed passwords.
- Add customer/admin/staff roles from `UserRole`.
- Protect customer dashboard routes.
- Protect admin routes with `ADMIN` or `STAFF` role checks.
- Add forgot-password token creation and reset flow using `PasswordResetToken`.

## Phase 3 - Real Store Orders

- Replace local-storage-only cart submission with database-backed `Order` and `OrderItem` writes.
- Keep existing storefront pages while connecting forms/actions to Prisma.
- Admin order screens should update `OrderStatus` and write `AdminActivityLog` entries.

## Phase 4 - Payments

- Use `Payment`, `PaymentProvider`, and `PaymentStatus` to track MTN MoMo, Airtel Money, bank transfer, cash on delivery, and future providers.
- Payment callbacks should validate `PAYMENT_CALLBACK_SECRET`, store raw callback JSON in `Payment.callbackPayload`, and never trust client-only payment state.

## Phase 5 - Email Notifications

- Create email jobs for orders, contact messages, job applications, and lost/found submissions.
- Store notification attempts in `EmailNotification`.
- Keep SMTP credentials in environment variables only.

## Phase 6 - Admin Dashboard

- Admin dashboard should manage products, orders, users, messages, job applications, lost/found reports, and payments.
- Every sensitive admin action should create an `AdminActivityLog` row.

## Phase 7 - Production Hardening

- Add Zod validation at all request boundaries.
- Add route-level rate limiting using `RateLimitEvent` or a managed edge/Redis equivalent.
- Document database backups and restore testing.
- Keep `.env` out of Git and use Vercel/hosting environment variables.
- Run `pnpm exec tsc --noEmit`, `pnpm build`, and Prisma validation before deployment.
