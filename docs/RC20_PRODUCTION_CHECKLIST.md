# RC20 Production Checklist

Branch: `codex/production-readiness`

No merge and no deployment were performed.

## Completed Items

### Code and route audit

- Preserved all existing routes and public functionality.
- Confirmed the official media flow uses `public/media/` paths.
- Removed unreferenced demo/unverified assets that were no longer referenced by the active app.
- Confirmed no old active image references remain for `/photos/`, `/science/`, `/showroom/`, `/videos/`, or the removed unverified `/products/` files.
- Confirmed lint catches unused imports and no ESLint errors remain.

### Removed obsolete demo assets

Removed unreferenced files from:

- `public/photos/`
- `public/products/`
- `public/science/`
- `public/showroom/`
- `public/videos/`

The approved official media remains in:

- `public/media/logos/babra-logo.jpeg`
- `public/media/products/babra-lotion-women-500ml.png`
- `public/media/products/babra-lotion-men-500ml.png`
- `public/media/products/babra-lotion-babies-500ml.png`

### Performance

- Product and logo media use `next/image` through the official media registry or product catalog.
- Above-the-fold official hero media remains prioritized.
- Non-priority official media is lazy-loaded.
- Image containers use stable sizing to reduce CLS.
- Removed large unreferenced demo media, including old videos and unverified product images.
- Remaining largest assets are approved official bottle PNGs, approximately 583 KB to 641 KB each.

### Accessibility

- Official media entries include descriptive alt text.
- Missing media states render readable text instead of fake imagery.
- Primary navigation has an ARIA label.
- CTA touch targets are large enough for mobile interaction.
- Focus-visible styling is present globally.
- Heading hierarchy was reviewed on the homepage, products page, store, and product detail pages.

### SEO

- Metadata base is configured from the official site URL.
- Canonical URL is configured for the root site.
- Open Graph and Twitter cards use the official BaBra logo.
- Organization structured data is present with official BaBra information only.
- Product structured data uses the three official product names and approved official media only.
- `app/sitemap.ts` and `app/robots.ts` are present and build successfully.

### Security

- No real secrets or `.env` files were added.
- Environment variable usage is centralized in server-side libraries and deployment scripts.
- Payment callback secret validation exists in `lib/payments.ts`.
- Production migration script refuses localhost production migration targets.
- External `target="_blank"` usage was checked; no missing `rel="noopener noreferrer"` issue was found in the active scan.

## Remaining Official Media Required

- Founder portrait/photo approved for public use.
- Rwanda Mobile Hub shop, service, workstation, or official brand media.
- BaBra Foundation approved activity media.
- BaBra Schools master plan or approved school images.
- LifeTalk TV logo, thumbnails, studio images, or approved production stills.
- Holding division official media and any official division logos.

## Remaining Content Approvals

- Product prices.
- Stock and availability.
- Ingredients.
- Barcode and SKU publication rules.
- Product claims and regulatory wording.
- Certifications and quality documentation.
- Founder biography and approved founder image.
- Official descriptions for each division.
- Public wording for schools, foundation, hospital, mobile hub, and LifeTalk TV.

## Lighthouse Recommendations

- Run Lighthouse on the Vercel preview before production release.
- Pay close attention to mobile LCP on the homepage because the hero intentionally displays three official bottle images.
- If mobile LCP is above target, consider creating approved smaller responsive derivatives of the official bottle media.
- Confirm CLS remains low after official founder/division images are added.
- Review JavaScript cost from existing client-side homepage animation after preview deployment.
- Re-check color contrast once final brand color values are approved.

## Deployment Checklist

- Confirm all production environment variables are present in Vercel.
- Confirm Supabase production database connection is healthy.
- Run migrations only through the approved production deployment process.
- Confirm `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm prisma validate`, and `pnpm build` pass.
- Review the Vercel preview visually on desktop, tablet, and mobile.
- Test signup, login, store, cart, checkout, contact forms, admin dashboard, and payment routes.
- Confirm official media appears on homepage, products, store, product detail, cart, and checkout.
- Confirm missing official media displays `Official media coming soon.`
- Confirm no unapproved stock, AI, demo, or placeholder images appear.
- Confirm sitemap and robots routes are reachable.
- Confirm no secrets are committed.
- Merge only after stakeholder approval.

## Final Risk Assessment

Production readiness status: strong release candidate, pending final content and media approvals.

Primary risks:

- Several business divisions still need approved official media.
- Product commercial details remain intentionally pending.
- The approved bottle PNG files are usable but could be further optimized if approved responsive derivatives are created.
- Lighthouse must still be run on an actual preview URL to validate real network performance.

Recommendation: proceed to preview review after QA passes, but do not release publicly until the remaining official media and content approvals are accepted.
