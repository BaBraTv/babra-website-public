-- CreateTable
CREATE TABLE "InvestorAccessRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "organization" TEXT,
    "position" TEXT,
    "country" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "projectArea" TEXT,
    "message" TEXT,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "reviewedAt" TIMESTAMP(3),
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorAccessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InvestorAccessRequest_status_createdAt_idx" ON "InvestorAccessRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "InvestorAccessRequest_email_idx" ON "InvestorAccessRequest"("email");

-- AddForeignKey
ALTER TABLE "InvestorAccessRequest" ADD CONSTRAINT "InvestorAccessRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
