# BaBra Holding Ltd Platform

Official Next.js platform for the BaBra ecosystem. The project is a production-oriented application built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

The codebase must be evolved gradually. Do not rebuild from scratch, remove working routes, or publish unverified BaBra claims, prices, testimonials, achievements, or company history. Use placeholders when official information is unavailable.

## Current Architecture

- `app/` - Next.js App Router pages, layouts, route handlers, and client components.
- `app/api/` - API routes for authentication, account summaries, admin summaries, orders, payments, and forms.
- `app/commerce-data.ts` - Public commerce constants, official product catalog data, pricing labels, Rwanda location summary, and WhatsApp helpers.
- `app/division-content.ts` - Shared content for scalable division pages such as Rwanda Mobile Hub, Foundation, Hospital, Farm, and Holding.
- `app/forms/` - Form pages and shared form components, including Rwanda location selection.
- `lib/` - Server helpers for API responses, auth, catalog synchronization, database access, email routing, payments, sessions, and validation.
- `prisma/` - PostgreSQL schema and migrations.
- `public/` - Official product photos, ecosystem photos, icons, videos, and static assets.
- `docs/` - Production readiness notes, setup guides, API verification notes, and deployment checklists.
- `scripts/` - Production environment checks, migration helpers, Vercel build wrapper, and API verification scripts.

## Requirements

- Node.js compatible with the Vercel project setting.
- pnpm for dependency management.
- PostgreSQL database, recommended through Supabase for production.
- Vercel project connected to the GitHub repository.

## Installation

```bash
pnpm install
pnpm db:generate
pnpm exec tsc --noEmit
pnpm build
```

Run locally:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

If pnpm is not available, enable it with Corepack or install it using the approved project tooling before changing dependencies.

## Environment Variables

Create `.env.local` for local development. Do not commit real secrets.

Required for production backend features:

```text
DATABASE_URL=
DIRECT_URL=
ADMIN_SETUP_SECRET=
AUTH_SECRET=
NEXTAUTH_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
MTN_MOMO_SUBSCRIPTION_KEY=
MTN_MOMO_API_USER=
MTN_MOMO_API_KEY=
MTN_MOMO_TARGET_ENVIRONMENT=
```

Some integrations may remain placeholders until official provider credentials are configured.

## Database

Validate Prisma schema:

```bash
pnpm db:validate
```

Generate Prisma client:

```bash
pnpm db:generate
```

Apply migrations in production only after confirming environment variables:

```bash
pnpm production:env-check
pnpm production:migrate
```

## Verification

Recommended checks before pushing:

```bash
pnpm exec tsc --noEmit
pnpm db:validate
pnpm build
```

API verification script:

```bash
pnpm verify:api
```

## Deployment

The Vercel production project deploys from `main`. Keep Supabase, authentication, SMTP, MTN MoMo, admin, payments, and other backend environment variables intact during frontend or content changes.

Production deployment flow:

1. Work on a feature branch.
2. Run TypeScript, Prisma validation, and production build locally.
3. Push the branch and review the Vercel preview.
4. Merge into `main` only after approval.
5. Confirm `https://www.babra.store` shows the approved version.

## Product Structure

Official public product structure currently centers on:

- Women Lotion 500ml
- Men Lotion 500ml
- Babies Lotion 500ml

Additional categories in the codebase must remain public-safe placeholders until official product information, pricing, labels, and launch details are confirmed.

## Engineering Rules

- Preserve working code and production integrations.
- Refactor gradually instead of rewriting.
- Keep commits focused and reviewable.
- Do not invent BaBra claims, pricing, achievements, testimonials, or company history.
- Use real uploaded assets where available.
- Use placeholders for unavailable official information.
- Do not modify database configuration or production environment variables during UI-only work.

## Current Milestone Focus

Milestone 1 is codebase hardening:

- Audit code structure.
- Remove confirmed dead code.
- Fix TypeScript/build problems.
- Replace interactive or broken checks with repeatable scripts.
- Improve documentation.
- Identify safe refactors for shared product, navigation, and division data.