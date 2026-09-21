# RC34 — first-party visitor analytics

## Release truth — 21 September 2026

Implemented on `codex/rc34-visitor-analytics`, based on production commit `8030f35`. **Not deployed or enabled in production.** No production migration, environment changes, paid services or synthetic production traffic were introduced.

The separate four-image Cosmetics release is live at https://www.babra.store/cosmetics#campaigns. Vercel reported success for `8030f35`; the live browser loaded all four images.

## 1. Before RC34

A repository search of app, lib, Prisma and dependencies found no Vercel Analytics SDK, Google Analytics, custom visitor collector or visitor database tables. Existing administrative counts concern operational users, orders and forms. They are not visitor analytics. Hosting-account analytics settings were not accessible and are not asserted absent.

## 2. Added

- `/admin/analytics`: authenticated dashboard; active ADMIN and STAFF roles match the existing admin role policy. Anonymous users redirect to login; normal or suspended users cannot read the page/API.
- `/api/analytics`: same-origin POST-only, bounded, allowlisted collection with explicit consent. Disabled unless `ANALYTICS_ENABLED=true` and a 32+ character `ANALYTICS_HASH_SECRET` are set.
- `/api/admin/analytics`: authorization before database access, private/no-store responses, generic failure output. No public reporting endpoint.
- Consent controls in the shared layout and a privacy-policy section; withdrawal remains available on public pages including `/privacy`.
- Real application hooks for both cart implementations, successful order-request responses, WhatsApp anchors and the existing WhatsApp form handoffs.
- Service worker v8 clears older caches and bypasses API/admin/authenticated-account surfaces; no-store/private responses are not cached.

## 3. What is measured

All traffic figures are **consent-based observations**, not total population estimates. No historical data is invented.

| Metric | Definition |
| --- | --- |
| Visitors | Distinct HMACs of random, consented browser identifiers. Not verified humans; different browsers/cleared storage/30-day expiry can count one person more than once. |
| Visits | Per-tab sessions ending after 30 minutes without observed activity, split at Kigali midnight. |
| Visitors today/yesterday/week/month | Distinct browser hashes for calendar periods in Africa/Kigali; week starts Monday. |
| Total visits | All retained visits within the latest 90 calendar days, explicitly labelled. Not an all-time lifetime total. |
| Page views | Initial public page and client navigation views; query strings and fragments removed; only named public routes accepted. |
| Popular pages | Views and distinct browser hashes for each approved page. |
| Traffic chart | Daily visitors/views for today, 7 days, 30 days, month or a custom range of up to 31 days within retention. Zero means no recorded event, not proof nobody visited. |
| Sources | Known social/search classes, direct/unknown, other referral. First observed source for the visit; never a full referrer URL. Regional Google domains not explicitly recognized are Other referral unless a recognized UTM source is used. |
| Campaigns | Explicitly approved `utm_campaign` codes from `ANALYTICS_CAMPAIGNS`. Other values are not transmitted by the browser and are discarded server-side. No arbitrary UTM term/content strings are stored. |
| Country | Vercel country header only when explicitly enabled on Vercel. Otherwise Unknown. No city, region, GPS or address inference. |
| Devices | Coarse mobile/desktop/tablet, browser family, OS family. User-agent string is parsed transiently and not persisted. |
| Engagement | Approximate average active visible time per visit from 15-second heartbeats, only after user activity in the previous minute; server caps each increment to elapsed time and 15 seconds. Not per-page duration. |
| Completed orders | Existing operational `Order` records currently COMPLETED, using `completedAt` in the selected Kigali date range. No identity fields are selected and no browser/user link is created. Missing completion dates are not guessed. |
| Recent activity | Last-15-minute country/page/device groups, only if at least five visits share that combination. No individual timeline, visitor hash, exact visitor timestamp or identity leaves the server. |

Events: product views, WhatsApp outbound clicks, store WhatsApp order CTA clicks, links to wholesale/partnership enquiries, add-to-cart, checkout page entry, browser-reported successful order requests, wholesale form focus, sample/contact/wholesale WhatsApp handoffs, Foundation link clicks and TV social/video outbound links. Every event is a fixed enum; no button text, form value, messages, order IDs or user IDs are collected.

## 4. What cannot be reliably measured

- WhatsApp conversations, sent messages, accepted applications and WhatsApp sales. CTA and outbound WhatsApp click are one action, never two funnel steps.
- New versus returning people, cross-device identity, exact location and complete traffic including non-consenting or blocked visitors.
- Visitor-to-completed-sale attribution: orders are counted independently from the operational database. No fabricated conversion rate.
- An ordered purchase funnel: the dashboard explicitly shows visits containing cumulative sets of product/cart/checkout/request actions, not their chronological sequence. Its request rate is labelled accordingly.
- Testimonial submissions: the current production base has no testimonial submission route. RC33 unfinished work in another checkout was not silently included. Add a fixed success hook only once that real workflow exists; never count a button press as a saved testimonial.
- Server contact/wholesale submission success for existing WhatsApp-based forms: these handoffs are labelled handoffs, not saved submissions.

## 5. Privacy and security

Consent is required globally before collection; no geo-based assumption about exemptions. Local storage records a choice for 180 days and, only after opting in, a random 30-day browser identifier. Session storage holds visit identity/attribution. No third-party analytics cookies or services are added. Withdrawal clears the identifiers and stops collection; existing de-identified summaries age out. DNT and GPC signals suppress client and server collection.

The database stores HMACs, never raw browser/session identifiers. The analytics secret must be server-only and independent from authentication/payment secrets. No IP address or full UA/referrer/URL is retained in analytics. A separate rate bucket uses HMAC(secret, Kigali day + IP); daily keys cannot be linked without the secret. Existing hosting logs and account/security IP handling are separate, unchanged systems.

Both client and server allowlist routes/events. Request bodies are streamed with a 2 KiB cap, including chunked bodies. Fixed configured origins and JSON are required. Logged-in ADMIN/STAFF activity is discarded; private routes are excluded. Unknown internal traffic, sophisticated bots and forged browser events cannot all be detected. Obvious bot/crawler/headless/monitor agents are ignored. PostgreSQL rate buckets allow 120 requests/minute per daily IP key, and each visit is capped at 1,000 accepted events/day. Shared NATs can be undercounted. There is no invasive fingerprinting.

## 6. Database impact and aggregation

Migration: `20260921000000_visitor_analytics` adds only three analytics tables and indexes.

- `AnalyticsVisit`: one aggregate row per visit/day. Bounded JSON counters for approved pages/events, scalar counts, broad attribution/device dimensions and keyed browser hash. No permanent raw-event log.
- `AnalyticsReceipt`: short-lived keyed event UUID, unique primary key; accepted event retries within 24 hours count once. Receipt and visit increments share a transaction. Concurrent updates use database row locking/atomic JSON increments.
- `AnalyticsRate`: one short-lived bucket per keyed IP/day, fixed one-minute windows.
- Indexes: visit `(day, visitor)`, lastSeen, receipt createdAt, rate updatedAt. Admin requests are capped to 31 days and aggregate in SQL in a consistent read snapshot; only top 50 pages/top 30 dimension rows and aggregate counts are returned.

This is appropriate for a modest first-party deployment, not an unbounded warehouse. At higher traffic, monitor database size/query latency, partition visits by date, and move older data to non-identifying daily totals before increasing retention. Do not remove limits to inflate figures.

## 7. Required environment and activation

Existing `DATABASE_URL` points to the current verified PostgreSQL database. Migration uses the existing approved migration workflow and `DIRECT_URL`; builds never migrate production.

| Variable | Purpose |
| --- | --- |
| `ANALYTICS_ENABLED` | `false` by default. Explicit `true` enables collection/reporting. |
| `ANALYTICS_HASH_SECRET` | Independent cryptographically random server secret, 32+ characters. Never `NEXT_PUBLIC_*`. |
| `ANALYTICS_ALLOWED_ORIGINS` | Exact comma-separated origins; defaults to https://www.babra.store and https://babra.store. Local test origin must be explicit. |
| `ANALYTICS_CAMPAIGNS` | Optional comma-separated approved non-personal campaign identifiers. This allowlist is intentionally public. |
| `ANALYTICS_TRUST_VERCEL_GEO` | `false` unless platform header provenance is verified; requires `VERCEL=1` too. |

Activation order: verify the production database identity and existing environment preflight, apply the reviewed migration through the repository's approved migration process, configure the independent secret/origins, configure and verify daily retention cleanup, then enable and rebuild/redeploy (the shared layout's configuration is built into public pages). Verify admin access, consent behavior and an authorized real visit. Never seed demonstration traffic into production.

Current local production preflight fails: DATABASE_URL, DIRECT_URL and the existing required production identity/security settings are missing from this checkout. This does not prove the deployed application's environment is missing them. No production credentials were invented, copied from unrelated accounts or changed.

## 8. Consent/cookies

No analytics cookies are introduced, but browser storage and visitor measurement still use opt-in consent. Necessary first-party consent preference storage is separate from optional random identifiers. Reject and allow buttons have equal prominence. Site functions continue without analytics. This implementation is a technical privacy model, not a jurisdiction-specific legal determination.

## 9. Retention and operations

Reporting excludes visit rows older than 90 calendar days. Each ingest performs indexed bounded cleanup (up to 100 expired rows per table), protecting against indefinite growth during ordinary traffic. **Before activation, a daily scheduled job is required** to run:

`node --experimental-strip-types scripts/analytics-retention.ts`

It deletes expired visit rows (>90 days) and receipts/rate keys (>24 hours), up to one million per table per run. Monitor successful runs and table growth; repeat if an exceptional backlog exceeds that bound. Do not claim exact physical deletion deadlines if the scheduler fails or is not configured. Database backup retention is governed by the existing database operator and must be aligned separately. The scheduler was not configured in production by this change.

## 10. Administrator access and validation

Sign in with an existing active ADMIN or STAFF account, then use **Website visitor analytics** in `/admin` or open `/admin/analytics`. No additional admin user is created in production.

Completed checks:

- All five repository migrations apply successfully to an isolated local PostgreSQL 17 instance, including the new analytics migration.
- Six policy/database tests pass: private-data rejection, safe source classification, bot/device handling, dates/timezone boundaries, keyed hashes, concurrent dedup/increments, distinct counts, aggregation, caps and physical retention deletion.
- HTTP integration test passes against the actual Next routes: anonymous 401, CUSTOMER/SUSPENDED 403, expired session 401, active ADMIN/STAFF 200; protected page redirects; no-store; invalid dates/origins/payloads; streamed size limit; DNT/GPC/bot/admin exclusion; country header distrust outside Vercel; duplicate page views; business events; response redaction.
- Existing security suite: 11 tests pass.
- Three isolated client tests pass: no collection/identifiers before opt-in, withdrawal clears identifiers and stops collection, DNT/GPC and disable flags override consent, visit continuity and safe payload fields. These tests do not substitute for browser layout/interaction QA.
- Production build passes: TypeScript/lint and 85 static pages generated. `/admin/analytics` and its API remain dynamic.

Verification limit: the development browser was blocked by the existing production CSP (`unsafe-eval` is disallowed), so the CSP was preserved. Automatic approval review then rejected starting the production-mode local preview with “blocked by policy”, including a loopback-only retry, without a more specific reason. Responsive CSS is implemented and compiled, but interactive consent behavior and mobile dashboard rendering have **not** been visually verified. Do not report that browser QA passed.

All synthetic fixtures were confined to a disposable loopback-only local database. No live visitor, payment or form data was used in tests.
