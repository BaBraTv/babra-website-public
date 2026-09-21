import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID, createHash } from "node:crypto";
import { Pool } from "pg";
const database = process.env.ANALYTICS_TEST_DATABASE_URL, base = process.env.ANALYTICS_TEST_ORIGIN;
test("HTTP collection, authorization, privacy and bot exclusion",{skip:!database || !base},async()=>{
  assert.equal(new URL(database!).hostname,"127.0.0.1"); assert.equal(new URL(base!).hostname,"localhost");
  const db=new Pool({connectionString:database});
  const ids:string[]=[];
  try {
    await db.query('TRUNCATE "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate"');
    const cookies:Record<string,string>={};
    for(const [name,role,status,expired] of [["admin","ADMIN","ACTIVE",false],["staff","STAFF","ACTIVE",false],["customer","CUSTOMER","ACTIVE",false],["suspended","ADMIN","SUSPENDED",false],["expired","ADMIN","ACTIVE",true]] as const) {
      const id=randomUUID(), token=randomUUID(); ids.push(id);
      await db.query('INSERT INTO "User" (id,"fullName",role,status,"updatedAt") VALUES ($1,$2,$3,$4,NOW())',[id,"Local test "+name,role,status]);
      await db.query('INSERT INTO "Session" (id,"userId","sessionToken","expiresAt") VALUES ($1,$2,$3,$4)',[randomUUID(),id,createHash("sha256").update(token).digest("hex"),new Date(Date.now()+(expired?-1:1)*86400000)]);
      cookies[name]=`babra_session=${token}`;
    }
    const read=(cookie="")=>fetch(`${base}/api/admin/analytics`,{headers:{cookie},redirect:"manual"});
    assert.equal((await read()).status,401);
    assert.equal((await read(cookies.customer)).status,403);
    assert.equal((await read(cookies.suspended)).status,403);
    assert.equal((await read(cookies.expired)).status,401);
    for(const role of ["admin","staff"]) { const r=await read(cookies[role]); assert.equal(r.status,200); assert.match(r.headers.get("cache-control")!,/no-store/); assert.equal((await r.json()).report.summary.visits,0); }
    for(const cookie of ["",cookies.customer,cookies.suspended]) { const r=await fetch(`${base}/admin/analytics`,{headers:{cookie},redirect:"manual"}); assert.ok([303,307].includes(r.status)); assert.equal((await r.text()).includes("Traffic over time"),false); }
    const p={id:randomUUID(),visit:randomUUID(),visitor:randomUUID(),consent:true,path:"/cosmetics",event:"page_view",source:"Direct / unknown",campaign:""};
    const post=(data:unknown=p,extra:Record<string,string>={})=>fetch(`${base}/api/analytics`,{method:"POST",headers:{"Content-Type":"application/json",origin:base!,"user-agent":"Mozilla/5.0 Chrome/130",...extra},body:JSON.stringify(data)});
    assert.equal((await post(p,{origin:"https://evil.example"})).status,403);
    assert.equal((await post({...p,consent:false})).status,400);
    assert.equal((await post({...p,path:"/admin/analytics"})).status,400);
    assert.equal((await post({...p,email:"private@example.com"})).status,400);
    assert.equal((await post({...p,source:"x".repeat(3000)})).status,413);
    const excludedHeaders: Record<string,string>[] = [{"user-agent":"Googlebot"},{dnt:"1"},{"sec-gpc":"1"},{cookie:cookies.admin}];
    for(const extra of excludedHeaders) assert.equal((await post(p,extra)).status,204);
    assert.equal((await db.query('SELECT COUNT(*)::int n FROM "AnalyticsVisit"')).rows[0].n,0);
    assert.equal((await post(p,{"x-vercel-ip-country":"RW"})).status,204);
    assert.equal((await post(p)).status,204);
    assert.equal((await post({...p,id:randomUUID(),event:"whatsapp_click"})).status,204);
    const data=await (await read(cookies.admin)).json();
    assert.equal(data.report.summary.pageViews,1); assert.equal(data.report.summary.visitors,1);
    assert.equal(data.report.breakdowns.country[0].name,"Unknown");
    assert.equal(data.report.events.find((e:{name:string})=>e.name==="whatsapp_click").count,1);
    for(const value of [p.visitor,p.visit,p.id,"sessionToken","ipAddress","fullName","lastSeen"]) assert.equal(JSON.stringify(data).includes(value),false);
    assert.equal((await fetch(`${base}/api/admin/analytics?from=2026-02-30&to=2026-03-01`,{headers:{cookie:cookies.admin}})).status,400);
  } finally {
    await db.query('DELETE FROM "Session" WHERE "userId"=ANY($1)',[ids]);
    await db.query('DELETE FROM "User" WHERE id=ANY($1)',[ids]);
    await db.query('TRUNCATE "AnalyticsVisit", "AnalyticsReceipt", "AnalyticsRate"');
    await db.end();
  }
});
