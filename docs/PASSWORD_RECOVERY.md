# Password recovery and password change

Customers, ADMIN and STAFF use the same recovery flow. Existing bcrypt hashes are never recoverable or displayed. `/account/security` lets an authenticated active user change a password after supplying the current password. `/forgot-password` accepts the registered email. `/reset-password` consumes a 30-minute, one-use token and requires a new password twice. Tokens are random 256-bit values; only SHA-256 hashes are stored. The token is in the URL fragment, removed from the address bar after loading, and never persisted in browser storage.

Both reset and password change revoke every existing session and all outstanding reset tokens in a transaction, with row locking to prevent concurrent reuse. Active status is checked. Passwords must contain at least 12 characters and be at most 72 UTF-8 bytes (bcrypt limit). Recovery responds identically for unknown, suspended and known addresses; account lookup and delivery run after the response using Next.js after(), avoiding an email-delivery timing signal. Request rate limiting and a per-user 60-second email cooldown apply. Origin/content-type protection is enforced by existing middleware. Reset pages are excluded from analytics and service-worker caches; response APIs are private/no-store. A registered email is required; phone-only accounts need identity-verified support, never a reset just for supplying a phone number.

## Email activation (not yet configured)

The owner confirmed no email delivery service exists. Email recovery therefore remains disabled and the public form truthfully explains this. Password change works independently of email.

1. Create a BaBra account at https://resend.com and verify a sender domain using the exact DNS records Resend provides. Disable email click/open tracking for recovery emails.
2. Create a sending API key. Enter it privately in Vercel Production as `RESEND_API_KEY`; never put it in chat or source control.
3. Set `PASSWORD_RECOVERY_FROM` to a verified sender, for example `BaBra <no-reply@babra.store>`, and `PRODUCTION_APP_URL=https://www.babra.store`.
4. Set `PASSWORD_RECOVERY_EMAIL_ENABLED=true`, then redeploy.
5. Request a reset for an owner-controlled account and confirm receipt before calling delivery verified. Do not change a production user's password merely for testing. Provider acceptance does not guarantee inbox delivery.

Provider implementation follows https://resend.com/docs/api-reference/emails/send-email. No paid subscription or third-party account was created by this change. No production passwords were changed and no real recovery emails were sent during tests.

## Validation

The local PostgreSQL regression suite uses disposable users only: admin/customer recovery, hashed token storage, single-use concurrent claims, expiry, invalidation of other links, session revocation, wrong current password, suspended/unknown accounts, password byte limits, and mocked email provider success/failure. Build, lint and type checks are required before deployment. Browser visual QA and actual email delivery are separate checks and are not implied by these tests.
