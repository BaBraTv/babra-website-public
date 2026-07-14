# Milestone 6: Production Readiness

## Scope

This milestone prepares the existing BaBra commerce platform for production operations without rebuilding the project or removing existing functionality.

## Completed

- Added media asset database model and admin media API.
- Added cloud storage abstraction for local, S3-style, or future provider-backed media.
- Prepared image optimization metadata through `url`, `optimizedUrl`, dimensions, alt text, folders, and storage keys.
- Added production email provider abstraction for queue-only, Resend, SendGrid, or SMTP integration.
- Added templates for welcome, order confirmation, shipping update, password reset, and contact acknowledgement.
- Added notification abstraction for Email, WhatsApp, and SMS with provider names sourced from environment variables.
- Added coupon admin API supporting fixed discounts, percentage discounts, expiration, active status, and usage limits.
- Added shipping architecture with zones, methods, Rwanda delivery, international enquiry support, delivery estimates, and COD capability flags.
- Added refund request and admin review workflow with status tracking.
- Added audit helper and connected it to media, coupon, shipping, refund, and order status actions.
- Expanded production environment validation and Vercel environment template for media, email, WhatsApp, SMS, Stripe, MTN MoMo, and Airtel Money.

## Database Changes

- `RefundStatus` enum.
- `MediaAsset`.
- `ShippingZone`.
- `ShippingMethod`.
- `RefundRequest`.

## Environment Configuration

New placeholders were added for:

- `EMAIL_PROVIDER`
- `RESEND_API_KEY`
- `SENDGRID_API_KEY`
- `WHATSAPP_PROVIDER`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `SMS_PROVIDER`
- `SMS_API_KEY`
- `SMS_SENDER_ID`
- `MEDIA_STORAGE_PROVIDER`
- `MEDIA_PUBLIC_BASE_URL`
- `MEDIA_BUCKET`
- `MEDIA_ACCESS_KEY_ID`
- `MEDIA_SECRET_ACCESS_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `AIRTEL_MONEY_BASE_URL`
- `AIRTEL_MONEY_CLIENT_ID`
- `AIRTEL_MONEY_CLIENT_SECRET`

## QA

- `node_modules\.bin\prisma.CMD validate`
- `node_modules\.bin\prisma.CMD generate`
- `node_modules\.bin\tsc.CMD --noEmit`
- `npm.cmd run lint`
- `npm.cmd run build`

## Remaining Work Before Public Launch

- Configure the selected real media storage provider and test real file upload.
- Configure the selected email provider and send test transactional emails.
- Configure WhatsApp/SMS provider credentials and test delivery.
- Configure live payment provider credentials after official accounts are approved.
- Seed official shipping zones and methods.
- Add frontend/admin screens for media upload UI, coupon editing UI, shipping settings, and refund review.
- Run production migrations against Supabase before deployment.
