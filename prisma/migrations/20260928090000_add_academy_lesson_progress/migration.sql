CREATE TABLE "AcademyLessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AcademyLessonProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AcademyLessonProgress_userId_lessonId_key" ON "AcademyLessonProgress"("userId", "lessonId");
CREATE INDEX "AcademyLessonProgress_userId_completedAt_idx" ON "AcademyLessonProgress"("userId", "completedAt");

ALTER TABLE "AcademyLessonProgress"
ADD CONSTRAINT "AcademyLessonProgress_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "AcademyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
