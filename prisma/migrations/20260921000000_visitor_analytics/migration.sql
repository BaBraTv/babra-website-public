CREATE TABLE "AnalyticsVisit" (
  "id" TEXT PRIMARY KEY, "visitor" TEXT NOT NULL, "day" DATE NOT NULL,
  "startedAt" TIMESTAMPTZ NOT NULL, "lastSeen" TIMESTAMPTZ NOT NULL,
  "source" TEXT NOT NULL, "campaign" TEXT NOT NULL, "country" TEXT NOT NULL,
  "device" TEXT NOT NULL, "browser" TEXT NOT NULL, "os" TEXT NOT NULL,
  "lastPath" TEXT NOT NULL, "pageViews" INTEGER NOT NULL DEFAULT 0,
  "eventCount" INTEGER NOT NULL DEFAULT 0, "engagementSeconds" INTEGER NOT NULL DEFAULT 0,
  "pages" JSONB NOT NULL DEFAULT '{}', "events" JSONB NOT NULL DEFAULT '{}'
);
CREATE INDEX "AnalyticsVisit_day_visitor_idx" ON "AnalyticsVisit" ("day", "visitor");
CREATE INDEX "AnalyticsVisit_lastSeen_idx" ON "AnalyticsVisit" ("lastSeen");
CREATE TABLE "AnalyticsReceipt" ("id" TEXT PRIMARY KEY, "createdAt" TIMESTAMPTZ NOT NULL);
CREATE INDEX "AnalyticsReceipt_createdAt_idx" ON "AnalyticsReceipt" ("createdAt");
CREATE TABLE "AnalyticsRate" ("id" TEXT PRIMARY KEY, "count" INTEGER NOT NULL, "updatedAt" TIMESTAMPTZ NOT NULL);
CREATE INDEX "AnalyticsRate_updatedAt_idx" ON "AnalyticsRate" ("updatedAt");
