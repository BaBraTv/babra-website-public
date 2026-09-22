import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

test("retention endpoint denies missing/wrong credentials, continues when disabled, and reports failures", async () => {
  const source = await readFile(new URL("../app/api/cron/analytics-retention/route.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  let calls = 0, fail = false;
  const env: Record<string,string> = { ANALYTICS_ENABLED: "false" };
  const exports: { GET?: (request: Request) => Promise<Response> } = {};
  const nativeRequire = createRequire(import.meta.url);
  vm.runInNewContext(compiled, { exports, process: { env }, Buffer, Response, require: (name: string) => {
    if (name === "node:crypto") return nativeRequire(name);
    assert.equal(name, "../../../../lib/analytics-store");
    return { analyticsPool: () => ({}), cleanupAnalytics: async (_pool: unknown, batch: number) => {
      calls++; assert.equal(batch, 100000); if (fail) throw new Error("private database details");
    } };
  } });
  const invoke = (token = "") => exports.GET!(new Request("https://example.test/api/cron/analytics-retention", { headers: { authorization: token } }));
  assert.equal((await invoke("Bearer ")).status, 401);
  env.CRON_SECRET = "a".repeat(40);
  assert.equal((await invoke()).status, 401);
  assert.equal((await invoke(`Bearer ${"b".repeat(40)}`)).status, 401);
  assert.equal(calls, 0);
  const success = await invoke(`Bearer ${env.CRON_SECRET}`);
  assert.equal(success.status, 200); assert.match(success.headers.get("cache-control")!, /no-store/);
  assert.equal(calls, 1);
  fail = true;
  const failure = await invoke(`Bearer ${env.CRON_SECRET}`);
  assert.equal(failure.status, 503); assert.equal((await failure.text()).includes("private database details"), false);
});
