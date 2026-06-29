# Phase 2 Core System

This phase turns the public demo into a database-backed platform while keeping existing pages and content.

## Implemented

- PostgreSQL/Prisma schema now includes investor access requests in addition to users, products, orders, order items, payments, contact messages, job applications, lost and found reports, email notifications, rate limits, and admin logs.
- Signup, login, logout, forgot password, session cookies, customer role, admin/staff role, and server-side route protection are in place.
- My Account reads database orders, job applications, lost/found reports, investor requests, payments, and profile data.
- Checkout creates database orders with order items and payment records.
- Manual payment modes are prepared for Cash on Delivery, MTN MoMo, Airtel Money, and Bank Transfer.
- Admin summary reads users, orders, payments, contact messages, job applications, lost/found reports, and investor requests.
- Email routing queues notification records without sending fake confirmations.

## Production Setup Required

- Set `DATABASE_URL` in Vercel before using live auth, orders, forms, or admin.
- Set `ADMIN_SETUP_SECRET` before creating the first admin account.
- Apply Prisma migrations to the production PostgreSQL database.
- Configure SMTP or an email provider before enabling real outbound email.
- Configure MTN MoMo, Airtel Money, or bank gateway credentials before enabling automatic payment confirmation.
