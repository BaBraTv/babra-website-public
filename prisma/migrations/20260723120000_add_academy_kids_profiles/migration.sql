ALTER TYPE "AcademyRole" ADD VALUE IF NOT EXISTS 'STUDENT';
ALTER TYPE "AcademyRole" ADD VALUE IF NOT EXISTS 'PARENT';

CREATE TABLE "AcademyLearnerProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "birthYear" INTEGER,
  "currentLevel" TEXT NOT NULL DEFAULT 'level-1',
  "preferredLocale" TEXT NOT NULL DEFAULT 'en',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AcademyLearnerProfile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AcademyLearnerProfile_userId_key" ON "AcademyLearnerProfile"("userId");
CREATE INDEX "AcademyLearnerProfile_currentLevel_idx" ON "AcademyLearnerProfile"("currentLevel");

CREATE TABLE "AcademyGuardianLink" (
  "guardianId" TEXT NOT NULL,
  "learnerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AcademyGuardianLink_pkey" PRIMARY KEY ("guardianId", "learnerId")
);
CREATE INDEX "AcademyGuardianLink_learnerId_idx" ON "AcademyGuardianLink"("learnerId");

ALTER TABLE "AcademyLearnerProfile" ADD CONSTRAINT "AcademyLearnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademyGuardianLink" ADD CONSTRAINT "AcademyGuardianLink_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AcademyGuardianLink" ADD CONSTRAINT "AcademyGuardianLink_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "AcademyLearnerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
