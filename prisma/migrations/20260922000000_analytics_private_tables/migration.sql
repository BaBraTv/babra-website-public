-- Analytics is accessed only through the authenticated server, never PostgREST.
-- Keep RLS enabled even if deployment default privileges grant future access.
ALTER TABLE "AnalyticsVisit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AnalyticsReceipt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AnalyticsRate" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate" FROM PUBLIC;

DO $$
DECLARE api_role TEXT;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role) THEN
      EXECUTE format('REVOKE ALL ON TABLE "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate" FROM %I', api_role);
    END IF;
  END LOOP;
END $$;
