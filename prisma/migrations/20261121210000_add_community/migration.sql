-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "photo" BYTEA,
    "contentType" TEXT,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityThread" (
    "id" TEXT NOT NULL,
    "pairKey" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requesterRead" TIMESTAMP(3),
    "recipientRead" TIMESTAMP(3),

    CONSTRAINT "CommunityThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMember_userId_key" ON "CommunityMember"("userId");

-- CreateIndex
CREATE INDEX "CommunityMember_displayName_id_idx" ON "CommunityMember"("displayName", "id");

-- CreateIndex
CREATE INDEX "CommunityPost_createdAt_id_idx" ON "CommunityPost"("createdAt", "id");

-- CreateIndex
CREATE INDEX "CommunityComment_postId_createdAt_id_idx" ON "CommunityComment"("postId", "createdAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityThread_pairKey_key" ON "CommunityThread"("pairKey");

-- CreateIndex
CREATE INDEX "CommunityThread_requesterId_updatedAt_idx" ON "CommunityThread"("requesterId", "updatedAt");

-- CreateIndex
CREATE INDEX "CommunityThread_recipientId_updatedAt_idx" ON "CommunityThread"("recipientId", "updatedAt");

-- CreateIndex
CREATE INDEX "CommunityMessage_threadId_createdAt_id_idx" ON "CommunityMessage"("threadId", "createdAt", "id");

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "CommunityMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "CommunityMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityThread" ADD CONSTRAINT "CommunityThread_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "CommunityMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityThread" ADD CONSTRAINT "CommunityThread_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "CommunityMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMessage" ADD CONSTRAINT "CommunityMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "CommunityThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "CommunityPost" ADD CONSTRAINT "community_photo_format" CHECK (
    ("photo" IS NULL AND "contentType" IS NULL AND "alt" IS NULL) OR
    ("photo" IS NOT NULL AND octet_length("photo") <= 600000 AND "contentType" IS NOT NULL
      AND "contentType" IN ('image/jpeg', 'image/png', 'image/webp') AND "alt" IS NOT NULL)
);
ALTER TABLE "CommunityThread" ADD CONSTRAINT "community_thread_state" CHECK (
    "requesterId" <> "recipientId" AND "status" IN ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED')
);

ALTER TABLE "CommunityMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CommunityPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CommunityComment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CommunityThread" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CommunityMessage" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "CommunityMember", "CommunityPost", "CommunityComment", "CommunityThread", "CommunityMessage" FROM anon, authenticated;
