"use client";
import { useEffect, useState } from "react";
import { createOrReuseWithdrawalRequest, parsePendingWithdrawalRequest, type PendingWithdrawalRequest } from "../../lib/withdrawal-retry";

type Account = {
  affiliate: { id: string; code: string; status: string; commissionRateBasisPoints: number };
  balances: Record<string, { approvedMinor: number; consumedMinor: number; availableMinor: number }>;
  referrals: Array<{ id: string; status: string; attributedAt: string }>;
  commissions: Array<{ id: string; status: string; amountMinor: number; currency: string }>;
  withdrawals: Array<{ id: string; status: string; amountMinor: number; currency: string; requestedAt?: string }>;
};

async function request<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json" } });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.error || "Request failed"), { status: response.status });
  return data as T;
}
const money = (minor: number, currency: string) => `${(minor / 100).toLocaleString()} ${currency}`;
const pendingKey = (affiliateId: string) => `babra:affiliate:${affiliateId}:pending-withdrawal`;
function readPending(affiliateId: string) { try { return parsePendingWithdrawalRequest(localStorage.getItem(pendingKey(affiliateId))); } catch { return null; } }
function savePending(affiliateId: string, value: PendingWithdrawalRequest) { try { localStorage.setItem(pendingKey(affiliateId), JSON.stringify(value)); } catch { /* Memory state still preserves retries for this page session. */ } }
function clearPending(affiliateId: string) { try { localStorage.removeItem(pendingKey(affiliateId)); } catch { /* Nothing sensitive is stored. */ } }

export function AffiliatePortal() {
  const [account, setAccount] = useState<Account | null>(null);
  const [needsApplication, setNeedsApplication] = useState(false);
  const [amount, setAmount] = useState("");
  const [pending, setPending] = useState<PendingWithdrawalRequest | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    try {
      const data = await request<Account>("/api/affiliate/summary");
      setAccount(data);
      setPending(readPending(data.affiliate.id));
      setNeedsApplication(false);
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 404) setNeedsApplication(true);
      else setMessage(error instanceof Error ? error.message : "Unable to load affiliate account");
    }
  }
  useEffect(() => { void load(); }, []);

  async function apply() {
    try {
      await request("/api/affiliate/application", { method: "POST", body: "{}" });
      setMessage("Application submitted for review.");
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Application failed"); }
  }

  async function submitWithdrawal(retry = false) {
    if (!account || submitting) return;
    try {
      setSubmitting(true);
      const requestPayload = retry && pending
        ? pending
        : createOrReuseWithdrawalRequest(pending, Number(amount), "RWF", () => crypto.randomUUID());
      savePending(account.affiliate.id, requestPayload);
      setPending(requestPayload);
      await request("/api/affiliate/withdrawals", { method: "POST", body: JSON.stringify(requestPayload) });
      clearPending(account.affiliate.id);
      setPending(null);
      setMessage("Withdrawal request submitted. An identical retry will return the same request.");
      setAmount("");
      await load();
    } catch (error) {
      setMessage(`${error instanceof Error ? error.message : "Withdrawal failed"}. Retry uses the same request key.`);
    } finally { setSubmitting(false); }
  }

  return <main className="min-h-screen bg-[#100b08] px-5 py-12 text-white"><div className="mx-auto max-w-6xl">
    <p className="text-sm font-black uppercase tracking-[.2em] text-[#d6ad57]">BaBra Affiliate</p><h1 className="mt-3 font-serif text-5xl">Affiliate workspace</h1>
    {message && <p className="mt-5 rounded-xl border border-[#d6ad57]/30 p-4">{message}</p>}
    {needsApplication ? <button className="mt-8 rounded-full bg-[#f1d58b] px-6 py-3 font-black text-black" onClick={apply}>Apply to become an affiliate</button> : account ? <div className="mt-8 grid gap-6">
      <section className="grid gap-4 md:grid-cols-3"><Card title="Status" value={account.affiliate.status}/><Card title="Affiliate code" value={account.affiliate.code}/><Card title="Commission rate" value={`${account.affiliate.commissionRateBasisPoints / 100}%`}/></section>
      <section className="grid gap-4 md:grid-cols-3">{Object.entries(account.balances).map(([currency, balance]) => <Card key={currency} title={`Available ${currency}`} value={money(balance.availableMinor, currency)}/>)}</section>
      <section className="rounded-2xl border border-white/10 p-6"><h2 className="font-serif text-3xl">Request withdrawal</h2><div className="mt-4 flex flex-wrap gap-3"><input className="rounded-xl bg-black/30 px-4 py-3" type="number" min="1" step="1" placeholder="Amount in minor units" value={amount} onChange={(event)=>setAmount(event.target.value)}/><button disabled={submitting || Boolean(pending) || account.affiliate.status!=="ACTIVE" || !amount} className="rounded-full bg-[#f1d58b] px-5 py-3 font-black text-black disabled:opacity-40" onClick={()=>void submitWithdrawal()}>{submitting ? "Submitting…" : "Submit request"}</button>{pending && <button disabled={submitting} className="rounded-full border border-[#f1d58b]/50 px-5 py-3 font-black disabled:opacity-40" onClick={()=>void submitWithdrawal(true)}>Retry pending request</button>}</div>{pending && <p className="mt-3 text-sm text-amber-200">A request is awaiting confirmation. Retry it before creating a different request.</p>}</section>
      <History title="Commissions" rows={account.commissions.map(item => ({ id:item.id, label:money(item.amountMinor,item.currency), status:item.status }))}/>
      <History title="Withdrawals" rows={account.withdrawals.map(item => ({ id:item.id, label:money(item.amountMinor,item.currency), status:item.status }))}/>
      <History title="Referrals" rows={account.referrals.map(item => ({ id:item.id, label:new Date(item.attributedAt).toLocaleDateString(), status:item.status }))}/>
    </div> : <p className="mt-8">Loading secure affiliate account…</p>}
  </div></main>;
}

function Card({title,value}:{title:string;value:string}) { return <article className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-sm font-black uppercase tracking-wider text-[#d6ad57]">{title}</p><strong className="mt-3 block break-all text-2xl">{value}</strong></article>; }
function History({title,rows}:{title:string;rows:Array<{id:string;label:string;status:string}>}) { return <section className="rounded-2xl border border-white/10 bg-white/5 p-6"><h2 className="font-serif text-3xl">{title}</h2>{rows.length ? <div className="mt-4 grid gap-2">{rows.map(row=><div key={row.id} className="flex justify-between gap-4 border-t border-white/10 py-3 text-sm"><span>{row.label}</span><strong>{row.status}</strong></div>)}</div> : <p className="mt-3 text-white/60">No records yet.</p>}</section>; }
