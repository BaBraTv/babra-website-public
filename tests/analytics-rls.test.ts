import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { Pool } from "pg";

const url = process.env.ANALYTICS_TEST_DATABASE_URL;
test("analytics migration revokes API grants and RLS denies accidental grants", { skip: !url }, async () => {
  assert.ok(["localhost", "127.0.0.1"].includes(new URL(url!).hostname), "Requires a disposable local database");
  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const role of ["anon", "authenticated"]) {
      await client.query(`DO $$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='${role}') THEN CREATE ROLE ${role} NOLOGIN; END IF; END $$`);
      await client.query(`GRANT USAGE ON SCHEMA public TO ${role}`);
      await client.query(`GRANT ALL ON "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate" TO ${role}`);
    }
    await client.query(await readFile(new URL("../prisma/migrations/20260922000000_analytics_private_tables/migration.sql", import.meta.url), "utf8"));
    await client.query(`INSERT INTO "AnalyticsReceipt" (id,"createdAt") VALUES ('rls-test', NOW());
      INSERT INTO "AnalyticsRate" (id,count,"updatedAt") VALUES ('rls-test',1,NOW());
      INSERT INTO "AnalyticsVisit" (id,visitor,day,"startedAt","lastSeen",source,campaign,country,device,browser,os,"lastPath")
      VALUES ('rls-test','rls-test',CURRENT_DATE,NOW(),NOW(),'Direct','None','Unknown','Desktop','Other','Other','/');`);
    for (const role of ["anon", "authenticated"]) {
      for (const table of ["AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate"]) {
        const result = await client.query("SELECT has_table_privilege($1, $2, 'SELECT') AS allowed", [role, `"${table}"`]);
        assert.equal(result.rows[0].allowed, false);
        await client.query(`GRANT SELECT ON "${table}" TO ${role}`);
      }
      await client.query(`SET LOCAL ROLE ${role}`);
      for (const table of ["AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate"]) {
        assert.equal((await client.query(`SELECT * FROM "${table}"`)).rowCount, 0);
      }
      await client.query("RESET ROLE");
    }
    const rls = await client.query("SELECT relrowsecurity FROM pg_class WHERE oid IN ('\"AnalyticsVisit\"'::regclass,'\"AnalyticsReceipt\"'::regclass,'\"AnalyticsRate\"'::regclass)");
    assert.equal(rls.rowCount, 3);
    assert.ok(rls.rows.every(row => row.relrowsecurity));
  } finally {
    await client.query("ROLLBACK");
    client.release();
    await pool.end();
  }
});
