"use client";

import { FormEvent, useState } from "react";

export function AcademyRecoveryForm({ mode, token = "" }: { mode: "forgot" | "reset"; token?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`/api/academy/v1/auth/${mode === "forgot" ? "forgot-password" : "reset-password"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Request failed. Please try again.");
    } catch {
      setError("Internet connection failed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      {mode === "reset" ? <input type="hidden" name="token" value={token} /> : null}
      {mode === "forgot" ? (
        <label className="block">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label>
      ) : (
        <label className="block">New password<input name="password" type="password" minLength={12} required autoComplete="new-password" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label>
      )}
      {error ? <p role="alert" className="rounded-xl border border-rose-300/25 bg-rose-400/10 p-4 text-sm text-rose-100">{error}</p> : null}
      <button disabled={busy} className="w-full rounded-lg bg-amber-300 px-4 py-3 font-semibold text-slate-950 disabled:opacity-55">{busy ? "Please wait…" : mode === "forgot" ? "Send reset link" : "Update password"}</button>
    </form>
  );
}
