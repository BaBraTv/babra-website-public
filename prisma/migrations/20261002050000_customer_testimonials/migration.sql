BEGIN;

CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN');

CREATE TABLE "Testimonial" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "publicName" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "country" TEXT,
  "city" TEXT,
  "productSlug" TEXT NOT NULL,
  "story" TEXT NOT NULL,
  "rating" INTEGER,
  "permissionToPublish" BOOLEAN NOT NULL DEFAULT false,
  "purchaseVerified" BOOLEAN NOT NULL DEFAULT false,
  "status" "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
  "adminNotes" TEXT,
  "approvedAt" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Testimonial_rating_check" CHECK ("rating" IS NULL OR ("rating" >= 1 AND "rating" <= 5))
);

CREATE INDEX "Testimonial_status_publishedAt_idx" ON "Testimonial"("status", "publishedAt");
CREATE INDEX "Testimonial_createdAt_idx" ON "Testimonial"("createdAt");

ALTER TABLE public."Testimonial" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public."Testimonial" FROM PUBLIC;

DO $$
DECLARE api_role TEXT;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role) THEN
      EXECUTE format('REVOKE ALL ON TABLE public."Testimonial" FROM %I', api_role);
    END IF;
  END LOOP;
END $$;

COMMIT;
