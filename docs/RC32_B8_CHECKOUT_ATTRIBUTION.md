# RC32-B8 Checkout Affiliate Attribution

Order submission now accepts an optional affiliate code capped at the B3 20-character format. The server resolves the code to an affiliate; clients cannot submit affiliate IDs, rates, commission amounts, or financial snapshots.

After the order is created, attribution runs through the B5 serializable service. It requires an active, unexpired affiliate, rejects self-referrals, snapshots the normalized code, binds the referral to the new order, and relies on the unique order constraint to prevent duplicate attribution.

An invalid or inactive code does not discard a legitimate customer order. The response exposes only a boolean attribution result and does not disclose whether a code was missing, expired, suspended, or self-referred. Unexpected infrastructure errors still fail closed for observability rather than being misclassified as domain rejection.

No cookie, public tracking endpoint, UI, commission creation, or payout action is introduced in this phase.
