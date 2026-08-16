import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createOrReuseWithdrawalRequest, parsePendingWithdrawalRequest } from "../lib/withdrawal-retry.ts";

test("withdrawal retries reuse the exact idempotency key and payload", () => {
  let generated = 0;
  const createKey = () => `key-${++generated}`;
  const first = createOrReuseWithdrawalRequest(null, 500, "rwf", createKey);
  const retry = createOrReuseWithdrawalRequest(first, 500, "RWF", createKey);
  assert.deepEqual(retry, first);
  assert.equal(generated, 1);
  assert.equal(parsePendingWithdrawalRequest(JSON.stringify(first))?.idempotencyKey, first.idempotencyKey);
});

test("a changed withdrawal payload receives a new idempotency key", () => {
  const first = createOrReuseWithdrawalRequest(null, 500, "RWF", () => "key-1");
  const changed = createOrReuseWithdrawalRequest(first, 600, "RWF", () => "key-2");
  assert.equal(changed.idempotencyKey, "key-2");
  assert.equal(parsePendingWithdrawalRequest("not-json"), null);
});

test("admin UI exposes commission creation, approval, direct settlement, and withdrawal settlement", async () => {
  const source = await readFile(new URL("../app/admin/affiliates/AffiliateAdmin.tsx", import.meta.url), "utf8");
  assert.match(source, /Create commission/);
  assert.match(source, /Mark directly paid/);
  assert.match(source, /Mark paid/);
  assert.match(source, /method:\s*"POST"/);
  assert.match(source, /status:\"APPROVED\"\|\"VOIDED\"\|\"PAID\"/);
});

test("affiliate UI persists pending withdrawals and exposes record states", async () => {
  const source = await readFile(new URL("../app/affiliate/AffiliatePortal.tsx", import.meta.url), "utf8");
  assert.match(source, /localStorage\.setItem/);
  assert.match(source, /Retry pending request/);
  assert.match(source, /submitWithdrawal\(true\)/);
  assert.match(source, /History title="Commissions"/);
  assert.match(source, /History title="Withdrawals"/);
});
