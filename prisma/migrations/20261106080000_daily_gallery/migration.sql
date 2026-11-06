CREATE TABLE "GalleryPost" (
 "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "description" TEXT NOT NULL,
 "activityDate" DATE NOT NULL, "division" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK ("status" IN ('PUBLISHED','HIDDEN')),
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE TABLE "GalleryImage" (
 "id" TEXT PRIMARY KEY, "postId" TEXT NOT NULL REFERENCES "GalleryPost"("id") ON DELETE CASCADE,
 "alt" TEXT NOT NULL, "src" TEXT, "data" BYTEA, "contentType" TEXT NOT NULL,
 "position" INTEGER NOT NULL DEFAULT 0,
 CONSTRAINT "gallery_image_source" CHECK (("src" IS NULL) <> ("data" IS NULL)),
 CONSTRAINT "gallery_image_size" CHECK (octet_length("data") <= 600000)
);
CREATE TABLE "GalleryComment" (
 "id" TEXT PRIMARY KEY, "postId" TEXT NOT NULL REFERENCES "GalleryPost"("id") ON DELETE CASCADE,
 "author" TEXT NOT NULL, "body" TEXT NOT NULL,
 "status" TEXT NOT NULL DEFAULT 'PENDING' CHECK ("status" IN ('PENDING','APPROVED','REJECTED')),
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "GalleryPost_status_activityDate_id_idx" ON "GalleryPost"("status","activityDate","id");
CREATE INDEX "GalleryImage_postId_position_idx" ON "GalleryImage"("postId","position");
CREATE INDEX "GalleryComment_postId_status_createdAt_idx" ON "GalleryComment"("postId","status","createdAt");
CREATE INDEX "GalleryComment_status_createdAt_idx" ON "GalleryComment"("status","createdAt");
ALTER TABLE "GalleryPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "GalleryImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "GalleryComment" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "GalleryPost", "GalleryImage", "GalleryComment" FROM anon, authenticated;
