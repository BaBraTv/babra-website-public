-- These tables are used through the server's PostgreSQL connection, not PostgREST.
-- Initializing the previously empty production database must not expose accounts,
-- sessions, payments, forms, or analytics via Supabase's default API grants.
BEGIN;
DO $$
DECLARE table_name TEXT; api_role TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'User', 'CustomerProfile', 'Session', 'PasswordResetToken', 'Product',
    'Order', 'OrderItem', 'Payment', 'ContactMessage', 'JobApplication',
    'LostFoundReport', 'AdminActivityLog', 'EmailNotification', 'RateLimitEvent',
    'InvestorAccessRequest', 'Affiliate', 'AffiliateReferral', 'AffiliateCommission',
    'AffiliateWithdrawal', 'AnalyticsVisit', 'AnalyticsReceipt', 'AnalyticsRate',
    '_prisma_migrations'
  ] LOOP
    IF to_regclass(format('public.%I', table_name)) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
      EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC', table_name);
      FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role) THEN
          EXECUTE format('REVOKE ALL ON TABLE public.%I FROM %I', table_name, api_role);
        END IF;
      END LOOP;
    END IF;
  END LOOP;
END $$;
COMMIT;
