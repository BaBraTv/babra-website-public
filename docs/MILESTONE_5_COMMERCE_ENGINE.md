# Milestone 5: Commerce Engine

## Scope

This milestone turns the existing BaBra platform into a stronger ecommerce foundation without rebuilding the project or removing existing functionality.

## Completed

- Added customer commerce data models for addresses, saved carts, recently viewed products, coupons, and notification deliveries.
- Expanded order lifecycle support for pending, confirmed, paid, packed, shipped, delivered, cancelled, refund requested, and refunded states.
- Added checkout architecture for billing address, shipping address, delivery options, taxes, coupons, and gift notes.
- Added payment provider abstraction for Stripe/Card, MTN Mobile Money, Airtel Money, Bank Transfer, Cash on Delivery, Manual, and USDT.
- Added automatic inventory reservation and stock deduction when orders are created.
- Added inventory movement logs for order reservations.
- Added customer APIs for addresses, saved cart, wishlist persistence, and recently viewed products.
- Added checkout quote API for subtotal, delivery, tax, discount, and total calculations.
- Added notification delivery architecture for email, WhatsApp, and SMS channels.
- Added customer email notification queueing for order confirmation.
- Added admin reports API for sales, revenue, inventory, customers, and product performance.
- Added rate limiting helper and applied it to order creation, cart persistence, and checkout quotes.
- Added a Reports section placeholder to the admin dashboard.

## Database Changes

- `CustomerAddress`
- `SavedCart`
- `RecentlyViewedProduct`
- `Coupon`
- `NotificationDelivery`
- `Order.taxCents`
- `Order.billingAddress`
- `Order.shippingAddress`
- `Order.deliveryOption`
- `Order.couponCode`
- `Order.giftNote`
- New `OrderStatus` values: `PENDING`, `CONFIRMED`, `PAID`, `PACKED`, `SHIPPED`, `REFUND_REQUESTED`

## Security and Validation

- Commerce write routes use Zod validation.
- Admin order status changes use same-origin validation.
- Rate limiting is prepared through the existing `RateLimitEvent` table.
- Payment providers do not hardcode secrets.

## QA

- `node_modules\.bin\prisma.CMD validate`
- `node_modules\.bin\prisma.CMD generate`
- `node_modules\.bin\tsc.CMD --noEmit`
- `npm.cmd run lint`
- `npm.cmd run build`

## Remaining Work

- Connect Stripe, MTN MoMo, and Airtel Money live credentials after official provider accounts are ready.
- Add frontend UI for saved addresses, persistent wishlist, saved cart, and recently viewed sync.
- Add admin UI actions for order lifecycle updates and refunds.
- Add real coupon management UI.
- Add email/SMS/WhatsApp sending providers after official credentials are configured.
- Add payment reconciliation and refund workflows.
