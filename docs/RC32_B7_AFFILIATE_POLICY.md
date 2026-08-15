# RC32-B7 Affiliate Approval and Rate Policy

Authenticated users may submit one affiliate application. Applications receive a cryptographically random unique code, remain `PENDING`, and carry a zero commission rate so they cannot earn before review.

Only `ADMIN` or `STAFF` may list and review applications. Activation requires an explicit commission rate from 1 through 10,000 basis points; the application never selects its own rate. Supported review transitions are pending to active/rejected, active to suspended, and suspended to active. Rate changes affect only future commission snapshots. Existing commission snapshots remain immutable.

Application and review endpoints are same-origin JSON, authenticated, rate-limited, strictly validated, and audited. No production policy value is invented, no payout provider is enabled, and no schema or migration change is required.
