import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import * as policy from "../lib/analytics-policy.ts";

function client() {
  const local = new Map<string,string>(), session = new Map<string,string>();
  const storage = (map:Map<string,string>) => ({getItem:(key:string)=>map.get(key) || null,setItem:(key:string,value:string)=>map.set(key,value),removeItem:(key:string)=>map.delete(key)});
  const sent:Array<Record<string,unknown>>=[];
  const navigator={doNotTrack:"0",globalPrivacyControl:false};
  const exports = {} as typeof import("../app/analytics-client");
  const source = ts.transpileModule(readFileSync(new URL("../app/analytics-client.ts",import.meta.url),"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  runInNewContext(source,{
    exports,require:()=>policy,localStorage:storage(local),sessionStorage:storage(session),navigator,
    window:{dispatchEvent:()=>{}},Event:class {},crypto:{randomUUID},URLSearchParams,Date,
    document:{referrer:"https://facebook.com/path?private=hidden"},
    location:{pathname:"/cosmetics",search:"?utm_source=facebook&utm_campaign=private-email@example.com"},
    fetch:async (_url:string,options:{body:string})=>{sent.push(JSON.parse(options.body));return {};}
  });
  exports.configureAnalytics(true,["approved-launch"]);
  return {api:exports,local,session,sent,navigator};
}
test("no collection or random identifier before consent; withdrawal stops and clears identifiers",()=>{
  const c=client(); c.api.trackAnalytics("page_view"); assert.equal(c.sent.length,0); assert.equal(c.local.size,0); assert.equal(c.session.size,0);
  c.api.setAnalyticsConsent(true); c.api.trackAnalytics("page_view"); assert.equal(c.sent.length,1);
  assert.equal(c.sent[0].campaign,""); assert.equal(c.sent[0].source,"Facebook");
  assert.equal(JSON.stringify(c.sent).includes("private-email"),false);
  c.api.setAnalyticsConsent(false); c.api.trackAnalytics("page_view"); assert.equal(c.sent.length,1);
  assert.equal(c.local.size,1); assert.equal(c.session.size,0);
});
test("DNT, GPC, disabled collector and private pages override opt-in",()=>{
  const c=client(); c.api.setAnalyticsConsent(true);
  c.navigator.doNotTrack="1";c.api.trackAnalytics("page_view");assert.equal(c.sent.length,0);
  c.navigator.doNotTrack="0";c.navigator.globalPrivacyControl=true;c.api.trackAnalytics("page_view");assert.equal(c.sent.length,0);
  c.navigator.globalPrivacyControl=false;c.api.trackAnalytics("page_view","/admin/analytics");assert.equal(c.sent.length,0);
  c.api.configureAnalytics(false,[]);c.api.trackAnalytics("page_view");assert.equal(c.sent.length,0);
});
test("visit identity persists across navigation and payload contains only approved fields",()=>{
  const c=client();c.api.setAnalyticsConsent(true);c.api.trackAnalytics("page_view","/cosmetics?email=secret@example.com");c.api.trackAnalytics("product_view","/products/women");
  assert.equal(c.sent[0].visit,c.sent[1].visit);assert.equal(c.sent[0].visitor,c.sent[1].visitor);assert.notEqual(c.sent[0].id,c.sent[1].id);
  assert.equal(c.sent[0].path,"/cosmetics");assert.equal(JSON.stringify(c.sent).includes("secret@example.com"),false);
  assert.deepEqual(Object.keys(c.sent[0]).sort(),["id","visit","visitor","consent","path","event","source","campaign"].sort());
});
