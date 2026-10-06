# BaBra luxury refresh and storage audit — 6 October 2026

## The problem

The previous homepage combined 900+ lines of marketing text, services, architecture commentary, reference graphics and operational details on one landing page. It weakened the aspirational BaBra identity and created unnecessary visual density.

The first-phase redesign introduces an editorial luxury style with:
- a quiet, spacious deep-cocoa, warm-ivory and muted-gold palette;
- Georgia-based serif display typography, measured secondary text and refined CTAs;
- approved packshots for Women, Men and Kids only, with no AI models or unlaunched serum;
- a clearer distinction between active businesses and longer-term plans;
- a reduced high-impact homepage presentation, while **keeping existing backend routes and features**;
- desktop and mobile layouts, semantic navigation and reduced-motion support;
- account, store, testimonials, company, academy, clinic, foundation, forms and partnership links preserved.

## Review limits

This change is a **luxury homepage preview**, not a claim that every internal route has been restyled. Cosmetics, store, checkout, founder, school, foundation and admin have their own designs that need separate harmonization passes. A Vercel build and actual desktop/mobile screenshots are required before merging. Do not use a green build status as a substitute for visual approval.

## Repository inventory observed from GitHub main

GitHub repository metadata reports approximately **77,111 KiB**. A recursive tree listing accounts for **60,412,393 bytes** of currently tracked file blobs (the latter excludes historical Git objects and other backend usage). There is no evidence that the 8 GB / 10 GB meter shown to the user refers to this Git repository.

Large-file candidates for manual source/use review:

| Path | Approx size | Notes |
| --- | ---: | --- |
| public/videos/babra-production-ad.mp4 | 14.0 MiB | No longer embedded on the homepage; verify elsewhere before removing |
| public/products/pocket-fresh-com.png | 4.9 MiB | Legacy product concept; verify publishing plans |
| public/products/pocket-fresh-rose.png | 4.9 MiB | Legacy product concept; verify publishing plans |
| public/showroom/showroom.png | 4.7 MiB | Old conceptual showroom image, replaced in the active page |
| public/products/pads.png | 4.6 MiB | Future product visual, status unverified |
| public/media/foundation/babra-foundation-vulnerable-community-support.mp4 | 3.6 MiB | Previously provided activity media: **retain** pending consent/provenance review |
| public/products/soap-1.png, public/products/soap-2.png | 3.5 MiB combined | Future product concepts, publication status unknown |
| docs/internal/sources/babra-schools-architectural-reference.pdf | 1.9 MiB | Architectural source: **retain** |
| public/videos/skin-hero.mp4 | 1.3 MiB | Removed from active homepage |

Brand and media folder duplicates exist (several official bottle images have matching Git blob identifiers); deduplication is possible after confirming all references.

**Do not remove or rewrite Git history, Supabase database tables, original founder/Foundation media, registered product assets, backups, or user-uploaded files solely to reduce an unknown storage meter.** GitHub deletes from a branch do not immediately reclaim historical Git storage; they primarily reduce future checkout/deployment payloads.

## Before clearing storage

1. Ask for a screenshot showing the service and meter reporting **8 GB used / 2 GB free** (possibly device drive, deployment workspace, cloud storage, or another quota).
2. Identify the service and billable/physical storage category.
3. Audit actual references, duplicates, and retention requirements.
4. Stage only proven unused generated media for deletion in a separate pull request, with a reversible backup.
5. Confirm the effect on real usage after deployment, rather than promising a specific GB savings.

## Next visual passes

1. Homepage: approve preview on desktop and mobile.
2. Cosmetics/product detail/store/checkout: harmonize typography, gallery, product imagery and CTA styles.
3. Holding, Academy, Foundation, Schools, Mobile Hub and planned divisions: editorial consistency; clear active vs planned labels.
4. Accessibility, performance (WebP/AVIF where appropriate), broken-link testing and media provenance check.
5. Deploy only after screenshot review and successful automated checks.
