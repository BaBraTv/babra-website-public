# Production Database Configuration

## Production Provider

Recommended provider: **Supabase Pro PostgreSQL**.

## Required Supabase Setup

1. Create a Supabase project for `babra-store-production`.
2. Choose the closest stable region for BaBra operations and customers.
3. Save the database password in a secure password manager.
4. Open Project Settings > Database.
5. Copy the pooled connection string for app runtime.
6. Copy the direct connection string for controlled migrations if available.

## Vercel Runtime Variable

Set this in Vercel Project Settings > Environment Variables:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
```

Use the Supabase pooler URL for Vercel runtime so serverless functions do not open too many direct database connections.
Use `DIRECT_URL` for Prisma migrations.

## Local Development Variable

Use a local PostgreSQL database when developing:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/babra_store?schema=public"
```

## Migration Command

After `DATABASE_URL` points to the production database, run:

```bash
pnpm production:migrate
```

Do not run destructive reset commands against production.

## Current Migration Set

- `20260629120000_init`
- `20260629190000_add_investor_access_requests`

## Production Verification

After migrations run, verify:

```bash
pnpm verify:api
```

The verification script requires:

- `PRODUCTION_APP_URL`
- `DATABASE_URL` configured in the deployed app
- `ADMIN_SETUP_SECRET` if admin setup should be tested
- `PAYMENT_CALLBACK_SECRET` if callback behavior should be tested

## Backups

Enable automatic backups in Supabase before accepting real users. Keep at least:

- 7 daily backups
- 4 weekly backups
- one manual backup before each schema change

Test restore into a staging database before relying on the process.
