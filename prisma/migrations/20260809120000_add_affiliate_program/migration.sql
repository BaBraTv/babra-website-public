-- CreateEnum
CREATE TYPE "AffiliateStatus" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "AffiliateReferralStatus" AS ENUM ('ATTRIBUTED', 'CONVERTED', 'EXPIRED', 'INVALID');

-- CreateEnum
CREATE TYPE "AffiliateCommissionStatus" AS ENUM ('PENDING', 'APPROVED', 'VOIDED', 'PAID');

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "AffiliateStatus" NOT NULL DEFAULT 'PENDING',
    "commissionRateBasisPoints" INTEGER NOT NULL,
    "codeExpiresAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Affiliate_commissionRateBasisPoints_check" CHECK ("commissionRateBasisPoints" BETWEEN 0 AND 10000),
    CONSTRAINT "Affiliate_code_format_check" CHECK ("code" ~ '^AFF-[A-Z0-9]{16}$')
);

-- CreateTable
CREATE TABLE "AffiliateReferral" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerUserId" TEXT,
    "status" "AffiliateReferralStatus" NOT NULL DEFAULT 'ATTRIBUTED',
    "affiliateCodeSnapshot" TEXT NOT NULL,
    "landingPath" TEXT,
    "attributedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "convertedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AffiliateReferral_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AffiliateReferral_code_snapshot_format_check" CHECK ("affiliateCodeSnapshot" ~ '^AFF-[A-Z0-9]{16}$'),
    CONSTRAINT "AffiliateReferral_landing_path_check" CHECK ("landingPath" IS NULL OR (char_length("landingPath") <= 512 AND "landingPath" LIKE '/%' AND "landingPath" NOT LIKE '//%'))
);

-- CreateTable
CREATE TABLE "AffiliateCommission" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "rateBasisPoints" INTEGER NOT NULL,
    "eligibleBaseMinor" INTEGER NOT NULL,
    "status" "AffiliateCommissionStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "voidedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "voidReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AffiliateCommission_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AffiliateCommission_amount_check" CHECK ("amountMinor" >= 0 AND "eligibleBaseMinor" >= 0 AND "amountMinor" <= "eligibleBaseMinor"),
    CONSTRAINT "AffiliateCommission_rate_check" CHECK ("rateBasisPoints" BETWEEN 0 AND 10000),
    CONSTRAINT "AffiliateCommission_currency_check" CHECK (char_length("currency") BETWEEN 3 AND 8)
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_userId_key" ON "Affiliate"("userId");
CREATE UNIQUE INDEX "Affiliate_code_key" ON "Affiliate"("code");
CREATE INDEX "Affiliate_status_createdAt_idx" ON "Affiliate"("status", "createdAt");
CREATE INDEX "Affiliate_codeExpiresAt_idx" ON "Affiliate"("codeExpiresAt");
CREATE UNIQUE INDEX "AffiliateReferral_orderId_key" ON "AffiliateReferral"("orderId");
CREATE INDEX "AffiliateReferral_affiliateId_status_attributedAt_idx" ON "AffiliateReferral"("affiliateId", "status", "attributedAt");
CREATE INDEX "AffiliateReferral_expiresAt_status_idx" ON "AffiliateReferral"("expiresAt", "status");
CREATE INDEX "AffiliateReferral_customerUserId_idx" ON "AffiliateReferral"("customerUserId");
CREATE UNIQUE INDEX "AffiliateCommission_referralId_key" ON "AffiliateCommission"("referralId");
CREATE UNIQUE INDEX "AffiliateCommission_orderId_key" ON "AffiliateCommission"("orderId");
CREATE INDEX "AffiliateCommission_affiliateId_status_createdAt_idx" ON "AffiliateCommission"("affiliateId", "status", "createdAt");
CREATE INDEX "AffiliateCommission_status_createdAt_idx" ON "AffiliateCommission"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AffiliateReferral" ADD CONSTRAINT "AffiliateReferral_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AffiliateReferral" ADD CONSTRAINT "AffiliateReferral_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AffiliateReferral" ADD CONSTRAINT "AffiliateReferral_customerUserId_fkey" FOREIGN KEY ("customerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AffiliateCommission" ADD CONSTRAINT "AffiliateCommission_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "AffiliateReferral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AffiliateCommission" ADD CONSTRAINT "AffiliateCommission_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AffiliateCommission" ADD CONSTRAINT "AffiliateCommission_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
