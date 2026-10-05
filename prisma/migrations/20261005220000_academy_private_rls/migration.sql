BEGIN;

ALTER TABLE public."AcademyUser" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyUserRole" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademySession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyVerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyPasswordResetToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyAuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyLearnerProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyGuardianLink" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AcademyLessonProgress" ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  tbl text;
  role_name text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'AcademyUser','AcademyUserRole','AcademySession','AcademyVerificationToken',
    'AcademyPasswordResetToken','AcademyAuditLog','AcademyLearnerProfile',
    'AcademyGuardianLink','AcademyLessonProgress'
  ] LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC', tbl);
    FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
      IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
        EXECUTE format('REVOKE ALL ON TABLE public.%I FROM %I', tbl, role_name);
      END IF;
    END LOOP;
  END LOOP;
END $$;

COMMIT;
