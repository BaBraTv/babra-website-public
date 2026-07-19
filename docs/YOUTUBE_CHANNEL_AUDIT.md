# YouTube Channel Audit

Date: 2026-07-19

Scope: LifeTalk TV and BaBra TV

## Verified Channel Links

The official channel URLs supplied for RC27 returned HTTP 200 and resolved to their canonical YouTube handle pages:

| Channel | Current handle | Verified URL | Website section |
| --- | --- | --- | --- |
| LifeTalk TV | `@lifetalkt` | `https://www.youtube.com/@lifetalkt` | `https://www.babra.store/lifetalk-tv` |
| BaBra TV | `@babratv` | `https://www.youtube.com/@babratv` | `https://www.babra.store/babra-tv` |

The project now keeps these values in one source of truth: `app/data/official-channels.ts`.

## Identity and Role Audit

### LifeTalk TV

- Primary role: entertainment and human-centred media.
- Positioning: movies, series, documentaries, interviews, inspirational content, social and community stories, Nzabigeraho, news, and features.
- Recommended tagline: **Stories That Inspire Life**.
- Brand character: cinematic, emotional, credible, inspirational, East African, and globally accessible.

### BaBra TV

- Primary role: official corporate media for the BaBra ecosystem.
- Positioning: founder journey, divisions, products, projects, business, innovation, community impact, and behind-the-scenes company content.
- Recommended tagline: **Building a Better Future**.
- Brand character: premium, entrepreneurial, corporate, visionary, African, and trustworthy.

The website now presents these as separate channels with different roles. LifeTalk TV is not used as a corporate update feed, and BaBra TV is not presented as an entertainment channel.

## Name and Handle Recommendations

- Keep the public channel name **LifeTalk TV**.
- The current `@lifetalkt` handle is valid but visually incomplete. Review availability for `@LifeTalkTV`, then `@LifeTalkTVRwanda`, then `@LifeTalkAfrica` inside YouTube Studio.
- Do not release the current handle until the preferred replacement is confirmed available and the change implications are reviewed.
- Keep **BaBra TV** and `@babratv` if YouTube Studio confirms that the handle remains attached to the official BaBra identity.
- No handle changes were made during RC27.

## Link Audit

Approved for use:

- `https://www.babra.store`
- `https://www.babra.store/lifetalk-tv`
- `https://www.babra.store/babra-tv`
- `https://www.youtube.com/@lifetalkt`
- `https://www.youtube.com/@babratv`
- `info@babra.store`

No Facebook, Instagram, TikTok, or WhatsApp profile URL was added because none was verified for these channels in RC27.

## Public-section Readiness

YouTube Home sections should be enabled only after the corresponding published video or playlist exists. Empty shelves reduce credibility and should remain hidden.

- Channel trailers: script-ready, not confirmed as produced or uploaded.
- Returning-subscriber videos: select inside YouTube Studio after suitable current videos are confirmed.
- Playlists: architecture and descriptions are prepared, but creation should follow content verification.
- Popular Uploads: enable only when YouTube can populate it meaningfully.
- Shorts: enable after verified Shorts are published.

## Website Audit

- Added official channel CTAs with `target="_blank"` and `rel="noopener noreferrer"`.
- Added reusable YouTube iconography without third-party image assets.
- Added a dedicated BaBra TV page and upgraded the LifeTalk TV page.
- Added distinct channel cards to the homepage.
- Added `/babra-tv` to the sitemap.
- Verified the LifeTalk TV CTAs at 1440 px desktop and 390 px mobile widths, and verified the BaBra TV mobile CTA geometry with no horizontal overflow.
- No subscriber numbers, awards, audience statistics, episode counts, release dates, partnerships, or budgets were added.
- No unverified social links or invented video embeds were added.

## Manual YouTube Studio Checklist

- Confirm channel owner and Brand Account for each handle.
- Confirm channel display names, descriptions, country, contact email, and website links.
- Review handle alternatives without changing the current handle automatically.
- Confirm profile image, banner, watermark, and trailer assets use approved media.
- Review each existing video's title, description, playlist, thumbnail, subtitles, audience setting, copyright status, end screen, and cards.
- Confirm channel permissions use named roles and least privilege.
- Enable two-step security for every account with channel access.
- Review moderation, blocked words, live chat, remix, chapters, and community settings.
