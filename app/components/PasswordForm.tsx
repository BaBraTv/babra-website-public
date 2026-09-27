"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";

export function PasswordForm({ mode, emailReady = true }: { mode: "forgot" | "reset" | "change"; emailReady?: boolean }) {
  const [email, setEmail] = useState(""), [current, setCurrent] = useState(""), [password, setPassword] = useState(""), [confirm, setConfirm] = useState("");
  const [token, setToken] = useState(""), [show, setShow] = useState(false), [busy, setBusy] = useState(false), [done, setDone] = useState(false), [error, setError] = useState("");
  const initialized = useRef(false);
  useEffect(() => {
    if (mode !== "reset" || initialized.current) return;
    initialized.current = true;
    const value = new URLSearchParams(window.location.hash.slice(1)).get("token") || "";
    window.history.replaceState(null, "", window.location.pathname);
    if (/^[a-f0-9]{64}$/.test(value)) setToken(value);
    else setError("Open the full private link from your email. / Fungura link yose iri muri email.");
  }, [mode]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (mode !== "forgot" && (password.length < 12 || new TextEncoder().encode(password).length > 72)) { setError("Use at least 12 characters (maximum 72 UTF-8 bytes). / Koresha nibura inyuguti 12."); return; }
    if (mode !== "forgot" && password !== confirm) { setError("Passwords do not match. / Password zombi ntizihuye."); return; }
    setBusy(true);
    try {
      const body = mode === "forgot" ? { identifier: email } : mode === "reset" ? { token, password } : { currentPassword: current, password };
      const response = await fetch(`/api/auth/${mode === "forgot" ? "forgot" : mode}-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again later.");
      setPassword(""); setConfirm(""); setCurrent(""); setToken(""); setDone(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again later."); }
    finally { setBusy(false); }
  }
  const field = "w-full rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-300";
  return <main className="min-h-screen bg-[#080606] px-5 py-12 text-white">
    <div className="mx-auto max-w-lg">
      <a href="/" className="font-serif text-2xl text-amber-200">BaBra</a>
      <section className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
        <h1 className="text-3xl font-bold">{mode === "forgot" ? "Forgot password?" : mode === "reset" ? "Set a new password" : "Change password"}</h1>
        <p className="mt-2 text-amber-200">{mode === "forgot" ? "Wibagiwe password?" : "Hindura password yawe"}</p>
        <p className="mt-4 text-sm text-white/75">{mode === "forgot" ? "Enter the email registered to your account. This works for customers and administrators. / Andika email ya konti yawe, waba umukiriya cyangwa admin." : "After saving, sign in again on all your devices. / Numara kuyibika, wongere winjire ku bikoresho byawe byose."}</p>
        {mode === "forgot" && !emailReady && <p role="status" className="mt-5 rounded-xl border border-amber-300/40 p-4 text-amber-100">Email recovery is not available yet. / Koherezwa link kuri email ntibirafungurwa. <a className="underline" href="mailto:support@babra.store">Contact support</a>. If you know your password, <a href="/account/security" className="underline">change it here</a>.</p>}
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-400 p-3 text-red-200">{error}</p>}
        {done ? <div role="status" className="mt-6 space-y-4">
          <p>{mode === "forgot" ? "If an active account has that email, a link will arrive shortly. Check spam too. It expires in 30 minutes. / Reba email yawe na Spam; link irangira mu minota 30." : "Your password has been changed. Sign in with your new password. / Password yahinduwe. Injira ukoresheje nshya."}</p>
          <a className="inline-block rounded-xl bg-amber-200 px-5 py-3 font-bold text-black" href="/login">Sign in / Injira</a>
          {mode === "forgot" && <button type="button" className="block underline" onClick={() => setDone(false)}>Try again / Ongera</button>}
        </div> : <form className="mt-6 space-y-5" onSubmit={submit}>
          {mode === "forgot" ? <label className="grid gap-2">Email<input className={field} type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label> : <>
            {mode === "change" && <label className="grid gap-2">Current password / Iyo ukoresha<input className={field} type={show ? "text" : "password"} autoComplete="current-password" required maxLength={128} value={current} onChange={e => setCurrent(e.target.value)} /></label>}
            <label className="grid gap-2">New password / Password nshya<input className={field} type={show ? "text" : "password"} autoComplete="new-password" required minLength={12} maxLength={72} value={password} onChange={e => setPassword(e.target.value)} /></label>
            <label className="grid gap-2">Confirm password / Yandike nanone<input className={field} type={show ? "text" : "password"} autoComplete="new-password" required minLength={12} maxLength={72} value={confirm} onChange={e => setConfirm(e.target.value)} /></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)} />Show passwords / Erekana password</label>
            <p className="text-sm text-white/65">At least 12 characters. Never share your password. / Nibura inyuguti 12. Ntuyisangize abandi.</p>
          </>}
          <button disabled={busy || (mode === "forgot" && !emailReady) || (mode === "reset" && !token)} className="w-full rounded-xl bg-amber-200 px-5 py-3 font-bold text-black disabled:opacity-40">{busy ? "Please wait / Tegereza…" : mode === "forgot" ? "Email me a reset link / Nyohereza link" : "Save new password / Bika password nshya"}</button>
        </form>}
        <nav className="mt-6 flex flex-wrap gap-4 text-sm text-amber-200"><a href="/login" className="underline">Sign in / Injira</a>{mode !== "forgot" && <a className="underline" href="/forgot-password">Forgot password? / Waryibagiwe?</a>}</nav>
      </section>
    </div>
  </main>;
}
