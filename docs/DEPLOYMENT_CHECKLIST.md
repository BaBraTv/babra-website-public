# Deployment Checklist

Use this checklist before making `babra.store` fully operational.

## 1. Repository

- Confirm work is in `E:\BaBraWebsite-Deploy`.
- Confirm the GitHub repository is `BaBraTv/babra-website-public`.
- Confirm the production branch is reviewed before merge.
- Do not merge into `main` until build, database, and environment checks pass.

## 2. PostgreSQL

- Create Supabase production project.
- Copy pooled PostgreSQL connection string.
- Add `DATABASE_URL` to Vercel production environment.
- Confirm backups are enabled.
- Run:

```bash
pnpm exec prisma validate
pnpm exec prisma migrate deploy
```

## 3. Vercel Environment Variables

Set these in Vercel production:

```env
DATABASE_URL=""
PRODUCTION_APP_URL="https://www.babra.store"
NEXT_PUBLIC_SITE_URL="https://www.babra.store"
AUTH_SESSION_SECRET=""
NEXTAUTH_SECRET=""
PASSWORD_RESET_TOKEN_SECRET=""
ADMIN_SETUP_SECRET=""
PAYMENT_CALLBACK_SECRET=""
EMAIL_FROM="BaBra Store <no-reply@babra.store>"
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_SECURE="true"
MTN_MOMO_BASE_URL=""
MTN_MOMO_SUBSCRIPTION_KEY=""
MTN_MOMO_API_USER=""
MTN_MOMO_API_KEY=""
```

Email and payment provider values can stay empty until configured, but `DATABASE_URL`, auth secrets, and `ADMIN_SETUP_SECRET` must be real before production use.

## 4. Build Verification

Run locally:

```bash
pnpm install
pnpm exec prisma generate
pnpm exec tsc --noEmit
pnpm build
```

## 5. API Verification

After Vercel deploy and database migration:

```bash
set PRODUCTION_APP_URL=https://www.babra.store
set ADMIN_SETUP_SECRET=your-secret
set PAYMENT_CALLBACK_SECRET=your-secret
pnpm verify:api
```

Verify these routes:

- `/api/auth/signup`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`
- `/api/auth/forgot-password`
- `/api/account/summary`
- `/api/orders`
- `/api/payments/manual`
- `/api/payments/callback`
- `/api/forms/contact`
- `/api/forms/jobs`
- `/api/forms/lost-found`
- `/api/forms/investor-access`
- `/api/admin/summary`

## 6. Admin Setup

- Create first admin using `docs/ADMIN_SETUP_GUIDE.md`.
- Login at `/login`.
- Confirm `/admin` opens only for admin/staff users.
- Confirm customer users redirect away from `/admin`.

## 7. Manual Payment Readiness

- Confirm Cash on Delivery orders save to database.
- Confirm MTN MoMo manual confirmation creates payment review records.
- Confirm Airtel Money manual confirmation creates payment review records.
- Confirm Bank Transfer manual confirmation creates payment review records.
- Do not mark payment received until BaBra verifies it.

## 8. Email Readiness

- Confirm records are created in `EmailNotification`.
- Configure SMTP or transactional email provider.
- Test delivery in staging before production.
- Do not send fake success emails.

## 9. Final Production Smoke Test

- Home opens.
- Store opens.
- Signup works.
- Login works.
- Checkout saves an order.
- My Account shows the order.
- Admin dashboard shows the order.
- Payment review record appears.
- Contact, job, lost/found, and investor request records save.

## 10. Go Live

- Merge only after approval.
- Deploy production.
- Run `pnpm verify:api`.
- Save verification output in the release notes.
