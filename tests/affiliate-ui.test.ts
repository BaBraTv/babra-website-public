import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFile(new URL(path, root), "utf8");

test("affiliate and admin pages enforce server-side route guards", async () => {
  const affiliate = await read("app/affiliate/page.tsx");
  const admin = await read("app/admin/affiliates/page.tsx");
  assert.match(affiliate, /await getCurrentUser\(\)/);
  assert.match(affiliate, /redirect\("\/login"\)/);
  assert.match(admin, /user\.role !== "ADMIN"/);
  assert.match(admin, /user\.role !== "STAFF"/);
});

test("checkout sends only the optional affiliate code", async () => {
  const checkout = await read("app/PlatformClient.tsx");
  assert.match(checkout, /Affiliate code \(optional\)/);
  assert.match(checkout, /affiliateCode: affiliateCode \|\| undefined/);
  assert.doesNotMatch(checkout, /affiliateId:\s*affiliate/);
});

test("affiliate UI uses secured APIs without payout secrets or providers", async () => {
  const portal = await read("app/affiliate/AffiliatePortal.tsx");
  const admin = await read("app/admin/affiliates/AffiliateAdmin.tsx");
  assert.match(portal, /\/api\/affiliate\/application/);
  assert.match(portal, /\/api\/affiliate\/withdrawals/);
  assert.match(admin, /\/api\/admin\/affiliates/);
  assert.match(admin, /\/api\/admin\/affiliate-commissions/);
  assert.match(admin, /\/api\/admin\/affiliate-withdrawals/);
  for (const source of [portal, admin]) assert.doesNotMatch(source, /API_KEY|PASSWORD|SUBSCRIPTION_KEY|payoutAccount/i);
});
