# Final Deployment

## Do Not Deploy From This Step

This RC does not deploy and does not merge to `main`.

## Pre-Deployment Checklist

1. Confirm all final official content approvals.
2. Confirm all official media approvals.
3. Confirm production environment variables in Vercel.
4. Confirm Supabase production database readiness.
5. Run final QA:
   - `pnpm lint`
   - `pnpm exec tsc --noEmit`
   - `pnpm prisma validate`
   - `pnpm build`
6. Push branch to GitHub.
7. Open pull request into `main`.
8. Review Vercel preview on desktop, tablet, and mobile.
9. Run Lighthouse against preview.
10. Merge only after approval.
11. Verify `https://www.babra.store` after production deployment.

## Post-Deployment Verification

- Browser tab favicon.
- Mobile PWA icon.
- Homepage official media.
- Product detail pages.
- Store/cart/checkout flow.
- Contact form and WhatsApp links.
- Sitemap and robots.
- Admin/auth/API smoke tests if production backend is in launch scope.

## Known Pending Items

- Founder media and approved founder content.
- Division media for Mobile Hub, Foundation, Schools, LifeTalk TV, and Holding.
- Product commercial and regulatory details.
- Google Maps pin, business hours, and official social links.
