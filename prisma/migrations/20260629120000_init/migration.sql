-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'ADMIN', 'STAFF');
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'DELETED');
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('DRAFT', 'QUOTE_REQUESTED', 'PENDING_PAYMENT', 'PAYMENT_RECEIVED', 'PROCESSING', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'REFUNDED');
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'REFUNDED', 'CALLBACK_RECEIVED', 'MANUAL_REVIEW');
-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('CASH_ON_DELIVERY', 'MTN_MOMO', 'AIRTEL_MONEY', 'BANK_TRANSFER', 'CARD', 'USDT', 'MANUAL');
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('NEW', 'IN_REVIEW', 'RESPONDED', 'CLOSED', 'SPAM');
-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('SUBMITTED', 'SCREENING', 'INTERVIEW', 'ACCEPTED', 'REJECTED', 'ARCHIVED');
-- CreateEnum
CREATE TYPE "LostFoundType" AS ENUM ('LOST', 'FOUND');
-- CreateEnum
CREATE TYPE "LostFoundStatus" AS ENUM ('SUBMITTED', 'VERIFYING', 'MATCHED', 'CLAIMED', 'RETURNED', 'CLOSED', 'REJECTED');
-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'STATUS_CHANGE', 'PAYMENT_REVIEW', 'EXPORT', 'SECURITY_EVENT');
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "emailVerifiedAt" TIMESTAMP(3),
    "phoneVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "preferredLocale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerType" TEXT NOT NULL DEFAULT 'Retail',
    "province" TEXT,
    "district" TEXT,
    "sector" TEXT,
    "cell" TEXT,
    "village" TEXT,
    "landmark" TEXT,
    "deliveryNotes" TEXT,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "description" TEXT,
    "size" TEXT,
    "category" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "priceCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "publicSortOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerPhone" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'QUOTE_REQUESTED',
    "subtotalCents" INTEGER NOT NULL DEFAULT 0,
    "deliveryCents" INTEGER NOT NULL DEFAULT 0,
    "discountCents" INTEGER NOT NULL DEFAULT 0,
    "totalCents" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "province" TEXT,
    "district" TEXT,
    "sector" TEXT,
    "cell" TEXT,
    "village" TEXT,
    "landmark" TEXT,
    "deliveryNotes" TEXT,
    "adminNotes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productSlug" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPriceCents" INTEGER NOT NULL DEFAULT 0,
    "totalCents" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "provider" "PaymentProvider" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "customerPhone" TEXT,
    "providerReference" TEXT,
    "internalReference" TEXT NOT NULL,
    "callbackUrl" TEXT,
    "callbackPayload" JSONB,
    "callbackReceivedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "manualReviewNotes" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "sourcePage" TEXT,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "roleApplied" TEXT NOT NULL,
    "division" TEXT,
    "province" TEXT,
    "district" TEXT,
    "experience" TEXT,
    "coverMessage" TEXT,
    "resumeUrl" TEXT,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "LostFoundReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "reportType" "LostFoundType" NOT NULL,
    "status" "LostFoundStatus" NOT NULL DEFAULT 'SUBMITTED',
    "reporterName" TEXT NOT NULL,
    "reporterPhone" TEXT NOT NULL,
    "reporterEmail" TEXT,
    "itemType" TEXT NOT NULL,
    "itemTitle" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "ownerName" TEXT,
    "foundLocation" TEXT,
    "lostLocation" TEXT,
    "province" TEXT,
    "district" TEXT,
    "sector" TEXT,
    "cell" TEXT,
    "village" TEXT,
    "rewardCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'RWF',
    "proofImageUrl" TEXT,
    "adminNotes" TEXT,
    "matchedReportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    CONSTRAINT "LostFoundReport_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "AdminActivityLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" "AdminAction" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "summary" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminActivityLog_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "EmailNotification" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "sentAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailNotification_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "RateLimitEvent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "ipAddress" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RateLimitEvent_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
-- CreateIndex
CREATE INDEX "User_role_status_idx" ON "User"("role", "status");
-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_userId_key" ON "CustomerProfile"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");
-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");
-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_expiresAt_idx" ON "PasswordResetToken"("userId", "expiresAt");
-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
-- CreateIndex
CREATE INDEX "Product_status_category_idx" ON "Product"("status", "category");
-- CreateIndex
CREATE INDEX "Product_isFeatured_publicSortOrder_idx" ON "Product"("isFeatured", "publicSortOrder");
-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");
-- CreateIndex
CREATE INDEX "Order_customerPhone_idx" ON "Order"("customerPhone");
-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
-- CreateIndex
CREATE INDEX "OrderItem_productSlug_idx" ON "OrderItem"("productSlug");
-- CreateIndex
CREATE UNIQUE INDEX "Payment_internalReference_key" ON "Payment"("internalReference");
-- CreateIndex
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");
-- CreateIndex
CREATE INDEX "Payment_provider_status_idx" ON "Payment"("provider", "status");
-- CreateIndex
CREATE INDEX "Payment_providerReference_idx" ON "Payment"("providerReference");
-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");
-- CreateIndex
CREATE INDEX "ContactMessage_assignedToId_idx" ON "ContactMessage"("assignedToId");
-- CreateIndex
CREATE INDEX "JobApplication_status_createdAt_idx" ON "JobApplication"("status", "createdAt");
-- CreateIndex
CREATE INDEX "JobApplication_division_idx" ON "JobApplication"("division");
-- CreateIndex
CREATE INDEX "LostFoundReport_reportType_status_idx" ON "LostFoundReport"("reportType", "status");
-- CreateIndex
CREATE INDEX "LostFoundReport_reporterPhone_idx" ON "LostFoundReport"("reporterPhone");
-- CreateIndex
CREATE INDEX "LostFoundReport_createdAt_idx" ON "LostFoundReport"("createdAt");
-- CreateIndex
CREATE INDEX "AdminActivityLog_actorId_idx" ON "AdminActivityLog"("actorId");
-- CreateIndex
CREATE INDEX "AdminActivityLog_entityType_entityId_idx" ON "AdminActivityLog"("entityType", "entityId");
-- CreateIndex
CREATE INDEX "AdminActivityLog_action_createdAt_idx" ON "AdminActivityLog"("action", "createdAt");
-- CreateIndex
CREATE INDEX "EmailNotification_templateKey_createdAt_idx" ON "EmailNotification"("templateKey", "createdAt");
-- CreateIndex
CREATE INDEX "EmailNotification_sentAt_idx" ON "EmailNotification"("sentAt");
-- CreateIndex
CREATE INDEX "RateLimitEvent_resetAt_idx" ON "RateLimitEvent"("resetAt");
-- CreateIndex
CREATE UNIQUE INDEX "RateLimitEvent_key_route_key" ON "RateLimitEvent"("key", "route");
-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "LostFoundReport" ADD CONSTRAINT "LostFoundReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "AdminActivityLog" ADD CONSTRAINT "AdminActivityLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
