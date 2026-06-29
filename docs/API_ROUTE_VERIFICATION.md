# API Route Verification

The production API verification script is:

```bash
pnpm verify:api
```

It tests the current core system against `PRODUCTION_APP_URL` or `NEXT_PUBLIC_SITE_URL`.

## Routes Covered

- `POST /api/auth/signup`
- `GET /api/auth/me`
- `POST /api/orders`
- `POST /api/payments/manual`
- `GET /api/account/summary`
- `POST /api/forms/contact`
- `POST /api/forms/jobs`
- `POST /api/forms/lost-found`
- `POST /api/forms/investor-access`
- optional `POST /api/payments/callback`
- optional `GET /api/admin/summary`

## Required Before Running

The deployed app must already have:

- `DATABASE_URL`
- `ADMIN_SETUP_SECRET`
- `PAYMENT_CALLBACK_SECRET`
- migrated PostgreSQL schema

## Important

The script creates test records in the production database. Run it only when BaBra is ready to accept test records and clean them up afterward if needed.
