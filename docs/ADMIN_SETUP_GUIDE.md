# Admin Setup Guide

## Purpose

Admin access is protected. A normal customer signup cannot create an admin account.

## Required Environment Variable

Set this in Vercel:

```env
ADMIN_SETUP_SECRET="a-long-random-secret"
```

Use a strong random value and keep it private.

## Create The First Admin

After production deploy and database migration, send a signup request with the admin setup secret:

```bash
curl -X POST "https://www.babra.store/api/auth/signup" \
  -H "Content-Type: application/json" \
  -H "x-babra-admin-setup-secret: YOUR_ADMIN_SETUP_SECRET" \
  -d '{
    "fullName": "BaBra Admin",
    "email": "admin@babra.store",
    "phone": "250788351482",
    "password": "replace-with-a-strong-password",
    "role": "ADMIN"
  }'
```

If the secret is missing or wrong, the account is created as a customer, not an admin.

## Login

Go to:

```text
https://www.babra.store/login
```

After login, admin users can open:

```text
https://www.babra.store/admin
```

## Security Rules

- Do not share `ADMIN_SETUP_SECRET`.
- Rotate the secret after creating the first admin.
- Use a unique admin email and a strong password.
- Keep at least one backup admin account.
- Do not give admin access to customer or public accounts.

## What Admin Can See In Phase 2

- Users
- Orders
- Payments
- Contact messages
- Job applications
- Lost & Found reports
- Investor access requests

## What Admin Should Not Do Yet

- Do not mark payments as received unless BaBra has confirmed them.
- Do not enable automatic payment success until MTN MoMo, Airtel Money, or bank callbacks are fully configured.
- Do not send fake confirmations. Email records are queued only until email delivery is configured.
