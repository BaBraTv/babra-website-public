# Milestone 2 Homepage & Core UI Refactor

Date: 2026-07-14
Branch: `codex/milestone-2-homepage-core-ui`

## Scope

This milestone refactors the existing platform without rebuilding it. Existing backend integrations, routes, Prisma schema, Supabase configuration, authentication, admin routes, order routes, payment routes, and form APIs were preserved.

## Completed

### ESLint

- Added ESLint tooling compatible with the current Next.js 15 application.
- Added `eslint.config.mjs` using FlatCompat for `next/core-web-vitals`.
- Updated `package.json` lint script to run `eslint . --max-warnings=0`.
- Ignored generated/build folders and the nested archived copy folder from lint scope.
- Confirmed lint passes with zero warnings.

### Design System

Created reusable UI primitives in `app/components/ui.tsx`:

- `ButtonLink`
- `Badge`
- `Section`
- `LuxuryCard`
- `LightCard`
- `TextInput`

Created core layout components:

- `app/components/SiteNav.tsx`
- `app/components/SiteFooter.tsx`

Created homepage data module:

- `app/data/homepage.ts`

### Homepage

Rebuilt the homepage presentation safely using the new design system. The page now includes:

- Premium sticky navigation
- Mobile menu
- Large luxury hero
- Official slogan: `Luxury in Every Touch`
- About BaBra section
- Our Companies section:
  - BaBra Cosmetics
  - BaBra School
  - LifeTalk TV
  - Rwanda Mobile Hub
  - BaBra Foundation
- Featured product placeholders:
  - Women Lotion 500ml
  - Men Lotion 500ml
  - Babies Lotion 500ml
- Why Choose BaBra section
- Call to action section
- Newsletter preparation section
- Professional footer

No fake testimonials, fake history, fake prices, or unverified achievements were added.

### Accessibility

- Added semantic `header`, `nav`, `section`, `footer`, `address`, and form structure.
- Added mobile menu ARIA attributes.
- Preserved visible focus states from global CSS.
- Improved contrast using black, white, gold, and deep blue.
- Improved button and link hit areas.

### Performance

- Removed heavy homepage client runtime by making `app/page.tsx` a server component.
- Moved mobile interactivity into `SiteNav` only.
- Reduced homepage first-load size from the previous heavier client page to a smaller static page in the production build.
- Lazy-loaded non-hero images and kept hero/product assets scoped.

## QA Results

Commands run:

```bash
corepack.cmd pnpm lint
node_modules\.bin\tsc.CMD --noEmit
npm.cmd run build
```

Results:

- ESLint: passed with zero warnings.
- TypeScript: passed with zero errors.
- Production build: passed.
- Static generation: 77 pages generated.

Route checks from local production server:

- `/` - 200
- `/store` - 200
- `/products` - 200
- `/cosmetics` - 200
- `/contact` - 200
- `/forms` - 200
- `/rwanda-mobile-hub` - 200
- `/foundation` - 200
- `/schools` - 200
- `/lifetalk-tv` - 200
- `/privacy` - 200
- `/terms` - 200

## Files Changed

- `app/page.tsx`
- `app/components/SiteFooter.tsx`
- `app/components/SiteNav.tsx`
- `app/components/ui.tsx`
- `app/data/homepage.ts`
- `eslint.config.mjs`
- `package.json`
- `pnpm-lock.yaml`
- `postcss.config.mjs`
- `docs/MILESTONE_2_HOMEPAGE_CORE_UI.md`

## Remaining Tasks

- Extend shared design system components to store, cosmetics, forms, account, and admin pages.
- Replace more page-local repeated UI with shared components gradually.
- Add deeper responsive visual QA with browser screenshots before production merge.
- Review image optimization page by page and migrate high-impact images to `next/image` where beneficial.
- Continue product architecture refactor around the official catalog source of truth.

## Risks

- The homepage now uses fewer old sections, so stakeholders should review whether any prior content needs to be reintroduced below the new premium structure.
- ESLint intentionally does not lint the nested archived copy folder `BaBraWebsite-PublicSafe/**` because it duplicates older app code inside the repo.
- Some strict Next rules around raw `<img>` and internal `<a>` usage are disabled temporarily to avoid a broad multi-page rewrite in this milestone. These should be addressed gradually in later refactors.