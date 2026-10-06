# BaBra public media authenticity audit — 6 October 2026

## Publishing standard

BaBra must not depict AI-generated people, anonymous stock scenes, prototype renderings, or concept designs as **real BaBra operations**, physical premises, customers, schools, hospitals, farms, or community activities.

Use photographic media only when the source, permission to publish, identifiable people’s consent (especially children), and context are confirmed. A concept illustration may only be used if clearly and prominently described as a **proposed concept**, never as an operating facility.

This audit covers images and videos referenced in the public Next.js source. It does **not** independently authenticate the capture history or permissions of repository image files. Image filenames such as "official" are not proof of origin.

## Changes implemented in this branch

| Surface | Previous presentation | Action |
| --- | --- | --- |
| Homepage hero | Unverified skin video and product-mockup poster | Replaced with luxury typography/gradient. Retains approved product-bottle assets inside hero. |
| Homepage ecosystem | Generic photos of clinics, schools, farmland, smartphones, volunteers and offices, plus conceptual showroom image | Replaced unsupported scenes with BaBra editorial identity panels; real RMH asset and approved bottle assets remain. |
| Homepage product collection | Stylized lotion images and a serum preview that is not confirmed as launched | Uses only approved Women, Men and Kids bottle images; removes serum promotion. |
| Homepage science | Two illustrative skin/science artworks | Text-based education panels; no fabricated science illustration. |
| Homepage production | Production advertisement montage not authenticated for publication | Removed video from active homepage; uses approved product packaging and cautious manufacturer wording. |
| Cosmetics campaigns | Ad campaign pictures with unverifiable provenance | Uses only three approved lotion bottle packshots, with product links. |
| Showroom page | Blank "Official BaBra division" media placeholder | Uses official bottle pictures, explicitly not presented as a photo of an operating showroom. |
| Division services | The same BaBra logo repeated as if each service had its own photo | Brand-designed typographic panels used where no service photograph exists. |

## Source classifications and follow-up

### Existing approved in-repository brand references

- `public/media/logos/babra-logo.jpeg` — approved branding per `app/data/official-media.ts`.
- `public/media/products/babra-lotion-women-500ml.png` — approved brand packshot per registry.
- `public/media/products/babra-lotion-men-500ml.png` — approved brand packshot per registry.
- `public/media/products/babra-lotion-babies-500ml.png` — approved brand packshot per registry.
- `public/media/founder/*` — existing founder photo resources; confirm owner permission and production source before any *new* reuse.
- `public/media/mobile-hub/*.jpg` — current division photography described as official in site content; reconfirm origin/permissions before any expanded use.

### Still require independent source confirmation

- `public/media/foundation/*`: marked "official" in website copy, including identifiable children and families. Verify original capture source, child/guardian publication permissions and event descriptions before continued long-term use. **This branch does not delete this previously published material.**
- `public/media/schools/concepts/*`: proposed architectural drawings, not photographs of an existing campus. They are currently presented as *concept drawings* with explicit disclaimers. If the public-facing site should show only operating projects, hide these until final architectural plans are approved.
- `public/videos/*`: marketing videos may be reenactments/montages. Removed active homepage links until production provenance is confirmed.
- `public/media/campaigns/*`, `public/photos/*`, `public/science/*`, `public/showroom/showroom.png`, `public/products/serum-safe-preview.jpg`: were used as generic/illustrative marketing or mockups, **not independently verified as original BaBra documentary photography**. Removed their active references in this branch. They are still in Git history/repository for now, not public site components.

## Photos needed from BaBra

1. **Corporate headquarters / operations:** genuine office exterior, entrance, workplace, staff and showroom (only as they currently exist).
2. **BaBra Cosmetics:** real 500 ml Women/Men/Kids bottles photographed front/back in clean lighting; packaging, tamper-evident seals, actual stock and approved factory behind-the-scenes footage.
3. **Rwanda Mobile Hub:** storefront, technicians, authorized repairs, team photo and service workshop.
4. **Foundation:** original, permission-cleared photos of actual activities; guardian consent for any clearly identifiable minors.
5. **Farm, Schools, Hospital and Academy:** only real currently operating activity; otherwise clean branded informational panels that explicitly say *planned / in development*, without simulated people or facilities.
6. **LifeTalk TV / BaBra TV:** genuine studio, presenter, production and event images with permission.

## Requirements before merging to Production

- Vercel preview **Ready** for the branch.
- Visually inspect homepage (mobile + desktop), Cosmetics and Showroom.
- Confirm founder, mobile-hub and foundation source provenance for future publishing.
- No public page should imply a concept institution is already built or operating.
- Do not auto-delete original customer-supplied media based solely on filenames or speculation; obtain confirmation first.
