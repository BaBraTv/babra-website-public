CREATE TYPE "AcademyRole" AS ENUM ('CANDIDATE', 'INSTRUCTOR', 'CONTENT_EDITOR', 'EXAMINER', 'HR_RECRUITER', 'HR_MANAGER', 'EMPLOYER_USER', 'EMPLOYER_ADMIN', 'FINANCE', 'ACADEMY_ADMIN', 'SUPER_ADMIN');
CREATE TYPE "AcademyUserStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DELETED');

CREATE TABLE "AcademyUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "status" "AcademyUserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
  "emailVerifiedAt" TIMESTAMP(3),
  "lastLoginAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyUser_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AcademyUser_email_key" ON "AcademyUser"("email");
CREATE INDEX "AcademyUser_status_createdAt_idx" ON "AcademyUser"("status", "createdAt");

CREATE TABLE "AcademyUserRole" (
  "userId" TEXT NOT NULL,
  "role" "AcademyRole" NOT NULL,
  "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademyUserRole_pkey" PRIMARY KEY ("userId", "role")
);
CREATE INDEX "AcademyUserRole_role_idx" ON "AcademyUserRole"("role");

CREATE TABLE "AcademySession" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "userAgent" TEXT,
  "ipAddress" TEXT,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademySession_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AcademySession_tokenHash_key" ON "AcademySession"("tokenHash");
CREATE INDEX "AcademySession_userId_idx" ON "AcademySession"("userId");
CREATE INDEX "AcademySession_expiresAt_idx" ON "AcademySession"("expiresAt");

CREATE TABLE "AcademyVerificationToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademyVerificationToken_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AcademyVerificationToken_tokenHash_key" ON "AcademyVerificationToken"("tokenHash");
CREATE INDEX "AcademyVerificationToken_userId_expiresAt_idx" ON "AcademyVerificationToken"("userId", "expiresAt");

CREATE TABLE "AcademyPasswordResetToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademyPasswordResetToken_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AcademyPasswordResetToken_tokenHash_key" ON "AcademyPasswordResetToken"("tokenHash");
CREATE INDEX "AcademyPasswordResetToken_userId_expiresAt_idx" ON "AcademyPasswordResetToken"("userId", "expiresAt");

CREATE TABLE "AcademyAuditLog" (
  "id" TEXT NOT NULL,
  "actorId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "outcome" TEXT NOT NULL DEFAULT 'SUCCESS',
  "metadata" JSONB,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademyAuditLog_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "AcademyAuditLog_actorId_createdAt_idx" ON "AcademyAuditLog"("actorId", "createdAt");
CREATE INDEX "AcademyAuditLog_entityType_entityId_idx" ON "AcademyAuditLog"("entityType", "entityId");
CREATE INDEX "AcademyAuditLog_action_createdAt_idx" ON "AcademyAuditLog"("action", "createdAt");

ALTER TABLE "AcademyUserRole" ADD CONSTRAINT "AcademyUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademySession" ADD CONSTRAINT "AcademySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademyVerificationToken" ADD CONSTRAINT "AcademyVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademyPasswordResetToken" ADD CONSTRAINT "AcademyPasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademyAuditLog" ADD CONSTRAINT "AcademyAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "AcademyUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
