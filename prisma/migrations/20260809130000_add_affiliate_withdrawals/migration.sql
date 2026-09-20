-- CreateEnum
CREATE TYPE "AffiliateWithdrawalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "AffiliateWithdrawal" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "status" "AffiliateWithdrawalStatus" NOT NULL DEFAULT 'PENDING',
    "adminReason" TEXT,
    "payoutReference" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AffiliateWithdrawal_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AffiliateWithdrawal_amount_check" CHECK ("amountMinor" > 0),
    CONSTRAINT "AffiliateWithdrawal_currency_check" CHECK (char_length("currency") BETWEEN 3 AND 8),
    CONSTRAINT "AffiliateWithdrawal_idempotency_key_check" CHECK (char_length("idempotencyKey") BETWEEN 1 AND 128),
    CONSTRAINT "AffiliateWithdrawal_admin_reason_check" CHECK ("adminReason" IS NULL OR char_length("adminReason") <= 500)
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateWithdrawal_affiliateId_idempotencyKey_key" ON "AffiliateWithdrawal"("affiliateId", "idempotencyKey");
CREATE INDEX "AffiliateWithdrawal_affiliateId_status_requestedAt_idx" ON "AffiliateWithdrawal"("affiliateId", "status", "requestedAt");
CREATE INDEX "AffiliateWithdrawal_status_requestedAt_idx" ON "AffiliateWithdrawal"("status", "requestedAt");

-- AddForeignKey
ALTER TABLE "AffiliateWithdrawal" ADD CONSTRAINT "AffiliateWithdrawal_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
