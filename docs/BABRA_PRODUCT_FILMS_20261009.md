# BaBra product film provenance and release checks

Original audio was extracted, but audio input is unsupported in this chat and it was not heard or transcribed. The user subsequently explicitly requested jingle/instrumental music only, without the original audio. The release versions therefore contain only an original instrumental jingle; no claims about the source audio are made.

## Source and scope

The two user attachments from the referenced conversation were made available as local temporary previews. SHA-256 hashes match the same-named copies in the user's Pictures directory:

- VID_20261008_122624.mp4: F13D89B27A443111D1453390959B45EEC3201BF9457BC9C50541D074873D35CC, 31,362,607 bytes.
- VID_20261008_122923.mp4: FC5F115BCB1FF55625F50488B395EDD8F2B1B56C266B37D56F8C8B6FFB99DA20, 31,207,499 bytes.

Both contain approximately 5.2 seconds of 3840×2160 phone footage, Android 15 metadata, and an AAC stereo audio track. Creation timestamps are 2026-10-08 10:26:30 UTC and 10:29:30 UTC respectively. These metadata support a phone recording provenance, but do not independently prove legal ownership. The current user expressly requested editing and publication of these supplied assets for BaBra.

The front footage shows a lotion bottle on an office desk. Its label reads BaBra, Luxury, BODY LOTION, Signature for Her, and 500 ml. The back footage shows printed ingredients, directions, manufacturer and distributor details, icons and a barcode. Reflections obscure some small print. No efficacy, safety, certification, registration, or medical claim is added to the website. Printed FDA/ISO/GMP symbols are not treated as verified certifications. No people or testimonials appear in these shots.

## Editing

- Front: source 0.15–4.85 seconds; encoded duration 4.666667 seconds.
- Back: source 0.10–3.35 seconds; 3.25 seconds. Removed the final camera move away from the bottle.
- 1280×720, 24 fps, H.264, yuv420p, CRF 27, capped video bitrate 1.2 Mbps, MP4 faststart, short 0.12/0.15-second opening/closing fades.
- Original frames only. No AI imagery, generated labels, fake background, new logo, voiceover or subtitles. Official repository logo is retained in the surrounding Cosmetics page.
- Source audio is omitted entirely. An original four-note D-major instrumental motif was composed and synthesized from sine harmonics with a soft sustained chord and short fades, without third-party recordings, samples, music models or vocals. The same motif accompanies both clips. AAC mono at 64 kbps, 44.1 kHz; target -20 LUFS with a 0.65-second closing audio fade. Measured front encode: -20.8 LUFS integrated, -7.7 dBFS true peak. Audio was objectively measured, not subjectively listened to in this chat.
- Front encode 420,859 bytes; back encode 461,933 bytes. WebP posters 27,266 and 45,954 bytes. Total new website media: 956,012 bytes. The separate original jingle master is retained among the user's local outputs and is not deployed as an extra website asset.
- Originals and existing user assets have not been deleted or altered.

## Integration

Target: /cosmetics#product-films. Separate front/back players, descriptive filenames, responsive 16:9 layout, lazy posters, keyboard-accessible play buttons, native controls, playsInline, direct file links, text descriptions and failure fallback. Video sources are attached only after a user clicks Play; there is no background video download or unsolicited playback.

## Repository and deployment

Started from main 3aaa3cec9e1196b579dd56a0c7ecc71f5f99900b. PR #19 was already merged into this commit. Work is isolated on codex/babra-product-films-20261009. Homepage and pricing/security files are untouched.

Verified Vercel project babra-website-public-uzcw, prj_eschkCiyUCSP8bBp26ZLGDn2QvNP, team babratvs-projects. Before this release, www.babra.store resolved to Ready deployment dpl_ALfbXG2LGZr4GMeYX9DuQrDxfMys. Vercel MCP deployment listing returned a scope 403, but the same team's authenticated local CLI succeeded. Release results are recorded in the output status report after verification.

The reported 8.5/10 GB deployment storage usage has not been independently remeasured. No deployment cleanup has been performed. These encodes add under 1 MB of media per deployment; a full deployment also contains the existing site assets.

## Validation and remaining release steps

Both MP4s fully decode without errors. Focused ESLint passed. Full Next.js production build passed after refreshing the local generated Prisma client from the current schema (the initial attempt used an outdated generated client). No production database migration was run.

Initial silent-draft local production server QA: Cosmetics page loads, poster views render correctly at desktop and 390×844 mobile viewport; both films played to completion at 1280×720 without media errors. Both direct MP4 links returned HTTP 206 for bytes 0–1023 with video/mp4 and correct Content-Range totals. Viewport was reset after testing. Final jingle version and production checks are recorded in the output status report.

Release requirements: recheck remote main; publish only a fast-forward change from the verified base; verify the intended project and exact commit; confirm the production build and custom-domain assignment; test page/media HTTP and byte-range delivery plus desktop/mobile players. Do not mark published merely because a build is Ready.
