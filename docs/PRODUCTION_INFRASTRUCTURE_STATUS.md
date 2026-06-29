# Production Infrastructure Status

## Current State

The application code is ready for production infrastructure connection, but the real infrastructure cannot be completed from the repository alone because these secrets are not present locally:

- Supabase production `DATABASE_URL`
- Vercel project environment access
- `ADMIN_SETUP_SECRET`
- auth/password reset/payment callback secrets
- email provider credentials

## What Is Ready

- Prisma schema validates.
- PostgreSQL migration files exist.
- Prisma migration lock is set to PostgreSQL.
- Production migration script exists: `pnpm production:migrate`.
- Production env validation script exists: `pnpm production:env-check`.
- API verification script exists: `pnpm verify:api`.
- Vercel env template exists: `scripts/vercel-env-production-template.txt`.

## Required Manual Infrastructure Step

Create Supabase production PostgreSQL and copy the pooled connection string into Vercel as `DATABASE_URL`.

After that, run:

```bash
pnpm production:env-check
pnpm production:migrate
pnpm verify:api
```

## Do Not Continue Feature Work Until

- Production database is connected.
- Migrations have run against production.
- API verification passes against `https://www.babra.store`.
- Admin account is created and verified.
- Orders and manual payments are confirmed in the real database.
