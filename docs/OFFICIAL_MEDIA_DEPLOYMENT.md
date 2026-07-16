# Official BaBra Media Deployment

RC18 completed on branch `codex/production-readiness`. No merge to `main` and no production deployment were performed.

## Approved Media Used

Only these existing assets were treated as approved:

| Media | Registry id | Path | Usage |
|---|---|---|---|
| Official BaBra logo | `babra-logo-primary` | `public/media/logos/babra-logo.jpeg` | navigation, metadata, manifest, service worker cache |
| BaBra Lotion Women — 500 ml | `babra-lotion-women-500ml` | `public/media/products/babra-lotion-women-500ml.png` | homepage hero, featured products, store, product detail, cart, checkout |
| BaBra Lotion Men — 500 ml | `babra-lotion-men-500ml` | `public/media/products/babra-lotion-men-500ml.png` | homepage hero, featured products, store, product detail, cart, checkout |
| BaBra Lotion Babies — 500 ml | `babra-lotion-babies-500ml` | `public/media/products/babra-lotion-babies-500ml.png` | homepage hero, featured products, store, product detail, cart, checkout |

## Media Intake Structure

Created/confirmed:

- `public/media/logos/`
- `public/media/products/`
- `public/media/founder/`
- `public/media/mobile-hub/`
- `public/media/foundation/`
- `public/media/schools/`
- `public/media/lifetalk/`
- `public/media/holding/`

Empty intake folders include `.gitkeep` so the structure remains in Git.

## Pages Updated

- Homepage: uses official logo and three official lotion images only.
- Products page: now lists only the three approved 500 ml lotion products.
- Product detail pages: generated only for `women`, `men`, and `babies`.
- Store page/client: product grid and hero use official product media only.
- Cart/checkout flow: uses official product media from the shared product catalog.
- Cosmetics page: uses official product media only.
- Division pages: missing division media displays text-only pending state.
- Schools and Schools Masterplan: gallery images replaced with text-only pending state.
- Showroom: unapproved showroom image replaced with text-only pending state.
- Layout/manifest/service worker: old `/brand` and unapproved product image references replaced with official `/media` paths.

## Missing Founder Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official asset: founder portrait/photo approved for public use.

## Missing Rwanda Mobile Hub Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official assets: Mobile Hub shop/workstation/accessory/service photos approved for public use.

## Missing Foundation Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official assets: foundation activity photos approved for public use.

## Missing School Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official assets: BaBra Schools master plan, campus renderings, or approved school images.

## Missing LifeTalk TV Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official assets: LifeTalk TV logo, studio images, thumbnails, or approved production stills.

## Missing Holding Media

- Status: missing.
- Current public behavior: text-only pending state.
- Required official assets: EI BaBra Holding Ltd logo/brand image and official division logos if separate from the primary BaBra logo.

## Remaining Text Placeholders

The site intentionally keeps these as text until official approval:

- “Official BaBra media pending approval.”
- “Official information pending.”
- Product prices, stock, ingredients, barcode, certifications, reviews, testimonials, production details, and claims.

## Not Used

The following older public folders remain untouched but are not used by the active official media flow:

- `public/brand/`
- `public/photos/`
- `public/products/`
- `public/science/`
- `public/showroom/`

They should stay untouched until a separate approval confirms which files are official and which can be removed.

## Verification

Required commands were run after implementation:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm prisma validate`
- `pnpm build`

