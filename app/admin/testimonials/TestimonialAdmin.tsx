"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  fullName: string;
  publicName: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  productSlug: string;
  story: string;
  rating: number | null;
  permissionToPublish: boolean;
  purchaseVerified: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  adminNotes: string | null;
  createdAt: string;
  publishedAt: string | null;
};

export function TestimonialAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/testimonials", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load testimonials.");
      setItems(data.testimonials || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function moderate(item: Testimonial, status: Testimonial["status"], purchaseVerified = item.purchaseVerified) {
    setMessage("");
    const adminNotes = window.prompt("Optional internal admin note:", item.adminNotes || "") ?? item.adminNotes ?? "";
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status, purchaseVerified, adminNotes })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update testimonial.");
      setMessage("Updated " + item.publicName + " to " + status + ".");
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update testimonial.");
    }
  }

  return (
    <main className="min-h-screen bg-[#090706] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/admin">← BaBra Admin</a>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d6ad57]">Private moderation</p>
            <h1 className="mt-3 font-serif text-5xl md:text-7xl">Real BaBra Stories</h1>
            <p className="mt-4 max-w-3xl leading-7 text-white/60">Approve only genuine, permissioned submissions. Purchase verification must be based on BaBra/Vida records, not assumption.</p>
          </div>
          <button onClick={()=>void load()} className="rounded-full border border-white/20 px-5 py-3 font-black">Refresh</button>
        </div>

        {message ? <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.05] p-4" role="status">{message}</p> : null}
        {loading ? <p className="mt-8">Loading…</p> : null}

        <div className="mt-8 grid gap-5">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-[#18110f] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-full border border-[#d6ad57]/30 px-3 py-1 text-xs font-black text-[#f1d58b]">{item.status}</span>
                  <h2 className="mt-3 font-serif text-3xl">{item.publicName}</h2>
                  <p className="mt-1 text-sm text-white/48">Private full name: {item.fullName}</p>
                  <p className="text-sm text-white/48">{item.phone || "No phone"} · {item.email || "No email"}</p>
                  <p className="text-sm text-white/48">{[item.city, item.country].filter(Boolean).join(", ") || "No public location"} · {item.productSlug}</p>
                </div>
                <div className="text-right text-sm text-white/52">
                  <p>{new Date(item.createdAt).toLocaleString()}</p>
                  <p>Consent: {item.permissionToPublish ? "YES" : "NO"}</p>
                  <p>Purchase verified: {item.purchaseVerified ? "YES" : "NO"}</p>
                  {item.rating ? <p>Rating: {item.rating}/5</p> : null}
                </div>
              </div>

              <blockquote className="mt-5 rounded-xl border border-white/10 bg-black/25 p-5 leading-8 text-white/76">“{item.story}”</blockquote>
              {item.adminNotes ? <p className="mt-4 text-sm text-white/45">Admin note: {item.adminNotes}</p> : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button disabled={!item.permissionToPublish} onClick={()=>void moderate(item, "APPROVED", item.purchaseVerified)} className="rounded-full bg-[#f1d58b] px-5 py-3 font-black text-[#130d08] disabled:opacity-40">Approve & publish</button>
                <button onClick={()=>void moderate(item, item.status, !item.purchaseVerified)} className="rounded-full border border-white/20 px-5 py-3 font-black">{item.purchaseVerified ? "Remove purchase verification" : "Mark purchase verified"}</button>
                <button onClick={()=>void moderate(item, "REJECTED")} className="rounded-full border border-red-400/40 px-5 py-3 font-black text-red-200">Reject</button>
                <button onClick={()=>void moderate(item, "HIDDEN")} className="rounded-full border border-white/20 px-5 py-3 font-black">Hide</button>
                <button onClick={()=>void moderate(item, "PENDING")} className="rounded-full border border-white/20 px-5 py-3 font-black">Return to pending</button>
              </div>
            </article>
          ))}
          {!loading && items.length === 0 ? <p className="rounded-xl border border-white/10 bg-white/[0.04] p-6">No testimonial submissions yet.</p> : null}
        </div>
      </div>
    </main>
  );
}
