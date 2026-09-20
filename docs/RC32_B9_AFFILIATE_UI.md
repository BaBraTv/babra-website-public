# RC32-B9 Affiliate Workflow UI

Adds authenticated `/affiliate` and admin-only `/admin/affiliates` workspaces plus the optional affiliate-code field in checkout. The user workspace supports application, status/code/rate visibility, balance summaries, and manual withdrawal requests. The admin workspace supports application review and rate selection with visibility into related record counts.

Both pages retain server-side route guards in addition to API authorization. The browser never receives credentials, payout-account data, or administrative withdrawal reasons. No automatic payout or external provider is present.
