"use client";

import { FormEvent, useState } from "react";

export function AcademyLogoutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/academy/v1/auth/logout", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Logout failed.");
    } catch {
      setError("Internet connection failed.");
    } finally {
      setBusy(false);
    }
  }

  return <div><button className="rounded-full border border-white/15 px-5 py-3 font-black disabled:opacity-55" disabled={busy} onClick={logout} type="button">{busy ? "Tegereza…" : "Sohoka"}</button>{error ? <p role="alert" className="mt-2 text-sm text-rose-200">{error}</p> : null}</div>;
}

export function AcademyDeleteAccount() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function deleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const password = String(new FormData(event.currentTarget).get("password") || "");
    try {
      const response = await fetch("/api/academy/v1/account/delete", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Account deletion failed.");
    } catch {
      setError("Internet connection failed.");
    } finally {
      setBusy(false);
    }
  }

  return <details className="mt-14 rounded-2xl border border-rose-300/15 bg-rose-400/[0.04] p-6"><summary className="cursor-pointer font-bold text-rose-100">Delete Academy account</summary><p className="mt-4 text-sm leading-6 text-white/55">This permanently removes your Academy account, sessions and saved progress. This cannot be undone.</p><form onSubmit={deleteAccount} className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row"><input name="password" type="password" required autoComplete="current-password" placeholder="Confirm password" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" /><button disabled={busy} className="rounded-full border border-rose-300/30 px-5 py-3 font-black text-rose-100 disabled:opacity-55">{busy ? "Deleting…" : "Permanently delete"}</button></form>{error ? <p role="alert" className="mt-3 text-sm text-rose-200">{error}</p> : null}</details>;
}
