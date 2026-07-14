-- Milestone 6: production readiness foundations for media, shipping, refunds, and notifications.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'RefundStatus') THEN
    CREATE TYPE "RefundStatus" AS ENUM ('REQUESTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PROCESSING', 'REFUNDED', 'CANCELLED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "MediaAsset" (
  "id" TEXT NOT NULL,
  "folder" TEXT NOT NULL DEFAULT 'products',
  "fileName" TEXT NOT NULL,
  "originalName" TEXT,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL DEFAULT 0,
  "width" INTEGER,
  "height" INTEGER,
  "url" TEXT NOT NULL,
  "optimizedUrl" TEXT,
  "alt" TEXT,
  "provider" TEXT NOT NULL DEFAULT 'LOCAL',
  "storageKey" TEXT,
  "uploadedById" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ShippingZone" (
  "id" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "countries" JSONB NOT NULL,
  "regions" JSONB,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ShippingZone_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ShippingMethod" (
  "id" TEXT NOT NULL,
  "zoneId" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "baseFeeCents" INTEGER NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'RWF',
  "estimateMinDays" INTEGER,
  "estimateMaxDays" INTEGER,
  "supportsCOD" BOOLEAN NOT NULL DEFAULT false,
  "requiresQuote" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RefundRequest" (
  "id" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "paymentId" TEXT,
  "requestedById" TEXT,
  "reviewedById" TEXT,
  "status" "RefundStatus" NOT NULL DEFAULT 'REQUESTED',
  "reason" TEXT NOT NULL,
  "amountCents" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'RWF',
  "customerNotes" TEXT,
  "adminNotes" TEXT,
  "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reviewedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RefundRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "MediaAsset_folder_createdAt_idx" ON "MediaAsset"("folder", "createdAt");
CREATE INDEX IF NOT EXISTS "MediaAsset_provider_idx" ON "MediaAsset"("provider");
CREATE UNIQUE INDEX IF NOT EXISTS "ShippingZone_code_key" ON "ShippingZone"("code");
CREATE INDEX IF NOT EXISTS "ShippingZone_isActive_idx" ON "ShippingZone"("isActive");
CREATE UNIQUE INDEX IF NOT EXISTS "ShippingMethod_zoneId_code_key" ON "ShippingMethod"("zoneId", "code");
CREATE INDEX IF NOT EXISTS "ShippingMethod_isActive_idx" ON "ShippingMethod"("isActive");
CREATE INDEX IF NOT EXISTS "RefundRequest_orderId_idx" ON "RefundRequest"("orderId");
CREATE INDEX IF NOT EXISTS "RefundRequest_status_createdAt_idx" ON "RefundRequest"("status", "createdAt");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ShippingMethod_zoneId_fkey') THEN
    ALTER TABLE "ShippingMethod" ADD CONSTRAINT "ShippingMethod_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "ShippingZone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'RefundRequest_orderId_fkey') THEN
    ALTER TABLE "RefundRequest" ADD CONSTRAINT "RefundRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
