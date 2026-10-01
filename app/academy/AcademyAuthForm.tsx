"use client";

import Link from "next/link";
import type { Route } from "next";
import { FormEvent, useState } from "react";

export function AcademyAuthForm({ mode }: { mode: "register" | "login" }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch(`/api/academy/v1/auth/${mode}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (response.redirected) { window.location.assign(response.url); return; }
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Ntibyashobotse. Ongera ugerageze · Something went wrong. Please try again.");
    } catch {
      setError("Internet connection failed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mt-8 space-y-5">
    {mode === "register" && <>
      <label className="block font-bold">Account type<select name="accountType" className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a111f] px-4 py-3"><option value="student">Student · Umunyeshuri</option><option value="parent">Parent or guardian · Umubyeyi</option></select></label>
      <label className="block font-bold">Full name<input name="fullName" required autoComplete="name" className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a111f] px-4 py-3" /></label>
      <label className="block font-bold">Student birth year <span className="text-white/45">(students only)</span><input name="birthYear" type="number" min="1900" max={new Date().getFullYear() - 10} inputMode="numeric" className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a111f] px-4 py-3" /><span className="mt-2 block text-xs text-white/50">Academy lessons are for learners aged 10 and above.</span></label>
    </>}
    <label className="block font-bold">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a111f] px-4 py-3" /></label>
    <label className="block font-bold">Password<input name="password" type="password" minLength={mode === "register" ? 12 : undefined} required autoComplete={mode === "register" ? "new-password" : "current-password"} className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a111f] px-4 py-3" />{mode === "register" && <span className="mt-2 block text-xs text-white/50">At least 12 characters, including uppercase, lowercase and a number.</span>}</label>
    {mode === "register" && <p className="rounded-xl border border-[#55e6d0]/20 bg-[#55e6d0]/[0.06] p-4 text-sm leading-6 text-white/65">Students should register with a parent or guardian&apos;s knowledge. Never enter private details beyond the information requested here.</p>}
    {error && <p role="alert" className="rounded-xl border border-rose-300/25 bg-rose-400/10 p-4 text-sm text-rose-100">{error}</p>}
    <button disabled={busy} className="w-full rounded-full bg-[#f1d58b] px-4 py-3 font-black text-[#130d08] disabled:opacity-55">{busy ? "Tegereza… · Please wait…" : mode === "register" ? "Create secure account" : "Injira · Sign in"}</button>
    <p className="text-center text-sm text-white/55">{mode === "register" ? <>Ufite konti? <Link className="font-bold text-[#55e6d0]" href={"/academy/login" as Route}>Injira</Link></> : <>Nta konti ufite? <Link className="font-bold text-[#55e6d0]" href={"/academy/register" as Route}>Iyandikishe</Link></>}</p>
  </form>;
}
