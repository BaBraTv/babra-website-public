# Final Release

Release candidate: RC24

Regenerated: 2026-07-19

Branch: `codex/production-readiness`

## Release Scope

This release candidate prepares the BaBra public website for official review without deploying or merging.

## Included

- Official-safe Founder page.
- Completed BaBra Holding structure.
- Official BaBra Cosmetics product structure for:
  - BaBra Lotion Women - 500 ml
  - BaBra Lotion Men - 500 ml
  - BaBra Lotion Babies - 500 ml
- Rwanda Mobile Hub service structure.
- Premium BaBra Foundation experience built exclusively from the six official uploads in `public/media/foundation/`.
- Foundation Hero, Our Mission, Community Impact, Education, Health, Children Support, Gallery, Donation CTA, and Volunteer CTA sections.
- Responsive Foundation imagery through `next/image`, optimized WebP display assets, descriptive alt text, SEO filenames, and lazy loading below the fold.
- Foundation Open Graph image, Twitter card, canonical metadata, search metadata, and `NGO` structured data.
- BaBra Schools public structure.
- LifeTalk TV public structure.
- Contact readiness section.
- Global official footer.
- Page-specific SEO metadata on main public pages.
- Official favicon and PWA icon set from prior RC.

## Not Included

- No fake founder photo.
- No stock office, school, foundation, or TV images.
- No placeholder, stock, AI-generated, or `public/photos` media is used by the Foundation page.
- No confidential product formulation.
- No invented prices, certifications, testimonials, or claims.
- No backend changes.
- No authentication changes.
- No database changes.
- No API changes.

## Launch Condition

RC24 is ready for preview review. All requested static checks and the production build pass. Public production release should happen only after leadership reviews the Foundation presentation and approves deployment.

## Verification

- `pnpm lint` — passed.
- `pnpm exec tsc --noEmit` — passed.
- `pnpm prisma validate` — passed.
- `pnpm build` — passed; `/foundation` generated successfully.
- No deployment or merge was performed.
