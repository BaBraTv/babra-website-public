# Daily BaBra Gallery

Public route: `/gallery`. Administration: `/admin/gallery`, linked from the existing admin dashboard. The public homepage navigation and common footer link to Gallery.

Authorized ACTIVE ADMIN/STAFF users can publish a dated activity, upload 1–4 JPEG/PNG/WebP photos from a phone, edit title/date/description/division, hide and republish a post, and approve or reject pending comments. The browser resizes photos to a maximum edge of 1400 px; the server checks size and image signatures. Uploaded photos persist as bounded binary records in the existing database. Public image delivery checks the post's current publication state.

Visitors can filter by date or division, paginate, enlarge photos, and submit a public name and comment with publication consent. All comments start PENDING. Only APPROVED comments on PUBLISHED posts are visible publicly. No private contact details are requested. Existing origin checks and a per-address rate limit protect comment submissions. Admin actions are logged.

Prisma migration `20261106080000_daily_gallery` creates three additive tables with foreign keys, indexes and status checks. All three have RLS enabled and no anon/authenticated grants. Access flows through the existing server session system, never through a public database key. The migration was applied to the confirmed production database and recorded in Prisma migration history with its exact checksum.

The initial entry dates the existing Signature for Her phone recording to 8 October 2026. Its photo is a crop of the genuine original video at 2.6 seconds (see BABRA_PRODUCT_FILMS_20261009.md); no bottle geometry or label was generated. Current homepage bottle artwork and layout remain unchanged, following the user's later preference.

Checks: date, publication consent, honeypot, image signatures/size and activity validation tests; Prisma schema validation; production build; database transaction verifies hidden posts and pending comments cannot enter public queries. Temporary database verification rows are rolled back. Runtime/production UI verification follows deployment.
