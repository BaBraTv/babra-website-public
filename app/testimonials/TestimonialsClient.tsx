"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackAnalytics } from "../analytics-client";

type Story = {
  id: string;
  publicName: string;
  country: string | null;
  city: string | null;
  productSlug: string;
  story: string;
  rating: number | null;
  purchaseVerified: boolean;
  publishedAt: string | null;
};

const productNames: Record<string, string> = {
  women: "BaBra Lotion Women",
  men: "BaBra Lotion Men",
  babies: "BaBra Lotion Kids",
  other: "Other BaBra product"
};

const emptyForm = {
  fullName: "",
  publicName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  productSlug: "women",
  story: "",
  rating: "",
  permissionToPublish: false
};

export function TestimonialsClient() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/testimonials", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load stories.");
        if (active) setStories(data.stories || []);
      })
      .catch(() => {
        if (active) setStories([]);
      })
      .finally(() => {
        if (active) setLoadingStories(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function update(name: keyof typeof emptyForm, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rating: form.rating ? Number(form.rating) : undefined
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your story could not be submitted.");
      setForm(emptyForm);
      setStatus("Murakoze. Your story has been submitted for BaBra review. It will not appear publicly until approved.");
      trackAnalytics("testimonial_submitted", "/testimonials");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your story could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/cosmetics">
            BaBra Cosmetics
          </a>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Real BaBra Stories</p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Customer experiences, reviewed before publication.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
            Every story shown here is submitted by a customer and reviewed by BaBra before publication. We do not create fake testimonials, fake ratings, or fabricated before-and-after claims.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#a9141d]">Published stories</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">What customers chose to share.</h2>
            </div>
            <a className="rounded-full bg-[#18110c] px-6 py-3 font-black text-white" href="#share-story">Share your story</a>
          </div>

          {loadingStories ? (
            <p className="mt-10">Loading customer stories…</p>
          ) : stories.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-black/10 bg-white p-7 shadow-xl shadow-black/5">
              <h3 className="font-serif text-3xl">No published stories yet.</h3>
              <p className="mt-3 max-w-2xl leading-7 text-black/62">
                Customer stories are being collected and reviewed. BaBra will publish only stories that have permission and pass moderation.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {stories.map((item) => (
                <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">{productNames[item.productSlug] || item.productSlug}</span>
                    {item.purchaseVerified ? <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">Purchase verified</span> : <span className="text-xs font-bold text-black/45">Customer-submitted</span>}
                  </div>
                  {item.rating ? <p className="mt-4 text-lg" aria-label={item.rating + " out of 5 stars"}>{"★".repeat(item.rating)}{"☆".repeat(5-item.rating)}</p> : null}
                  <blockquote className="mt-4 text-lg leading-8 text-black/72">“{item.story}”</blockquote>
                  <p className="mt-5 font-black">{item.publicName}</p>
                  <p className="text-sm text-black/48">{[item.city, item.country].filter(Boolean).join(", ") || "Location not published"}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="share-story" className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d6ad57]">Share your experience</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Tell BaBra your real story.</h2>
            <p className="mt-5 leading-8 text-white/62">
              We ask for your private contact only so BaBra can review the submission. Your email and phone are never displayed publicly. Only the public name, location you choose to provide, product, story, optional rating, and verification label can be published.
            </p>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#18110f] p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white/78">Full name · private
                <input required value={form.fullName} onChange={(e)=>update("fullName", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Public name
                <input required value={form.publicName} onChange={(e)=>update("publicName", e.target.value)} placeholder="Example: Odile U." className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Phone / WhatsApp
                <input value={form.phone} onChange={(e)=>update("phone", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Email
                <input type="email" value={form.email} onChange={(e)=>update("email", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Country
                <input value={form.country} onChange={(e)=>update("country", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">City · optional
                <input value={form.city} onChange={(e)=>update("city", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Product
                <select value={form.productSlug} onChange={(e)=>update("productSlug", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                  <option value="women">BaBra Lotion Women</option>
                  <option value="men">BaBra Lotion Men</option>
                  <option value="babies">BaBra Lotion Kids</option>
                  <option value="other">Other BaBra product</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">Rating · optional
                <select value={form.rating} onChange={(e)=>update("rating", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                  <option value="">No rating</option>
                  {[5,4,3,2,1].map((n)=><option key={n} value={String(n)}>{n} / 5</option>)}
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-bold text-white/78">Your experience
              <textarea required minLength={30} maxLength={3000} value={form.story} onChange={(e)=>update("story", e.target.value)} placeholder="Tell us what your experience was like. Please describe only what you personally experienced." className="min-h-40 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" />
            </label>

            <label className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/68">
              <input required checked={form.permissionToPublish} onChange={(e)=>update("permissionToPublish", e.target.checked)} type="checkbox" className="mt-1" />
              <span>I confirm this is my genuine experience and I give BaBra permission to review and, if approved, publish the public-name version of this story. I understand BaBra may edit only for length, privacy, spelling, or legal/safety clarity without changing the meaning.</span>
            </label>

            <p className="mt-4 text-sm leading-6 text-white/48">At least one private contact method — phone or email — is required for review. Do not include passwords, payment credentials, private medical records, or another person&apos;s private information.</p>

            <button disabled={submitting} className="mt-6 min-h-14 w-full rounded-full bg-[#f1d58b] px-6 font-black text-[#130d08] disabled:opacity-50" type="submit">
              {submitting ? "Submitting…" : "Submit story for review"}
            </button>
            {status ? <p className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/76" role="status">{status}</p> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
