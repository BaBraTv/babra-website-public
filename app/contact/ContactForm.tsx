"use client";

import { FormEvent } from "react";

export function ContactForm() {
  function sendWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `BaBra Website Message\nName: ${form.get("name")}\nPhone: ${form.get("phone")}\nInterest: ${form.get("interest")}\n\nMessage:\n${form.get("message")}`;
    window.open(`https://wa.me/250788351482?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={sendWhatsApp} className="rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-6 text-[#18110c] shadow-2xl shadow-black/35 md:p-8">
      <h2 className="font-serif text-4xl leading-none">Send a WhatsApp message</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-black/70">
          Your name
          <input className="rounded-lg border border-black/10 bg-white px-4 py-3 text-base outline-none" name="name" placeholder="Full name" required />
        </label>
        <label className="grid gap-2 text-sm font-bold text-black/70">
          Phone / WhatsApp
          <input className="rounded-lg border border-black/10 bg-white px-4 py-3 text-base outline-none" name="phone" placeholder="+250..." required />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-bold text-black/70">
        Interest
        <select className="rounded-lg border border-black/10 bg-white px-4 py-3 text-base outline-none" name="interest" required>
          <option>Samples</option>
          <option>Wholesale</option>
          <option>Partnership</option>
          <option>Customer support</option>
          <option>Franchise / showroom</option>
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-black/70">
        Message
        <textarea className="min-h-36 rounded-lg border border-black/10 bg-white px-4 py-3 text-base outline-none" name="message" placeholder="Write your message..." required />
      </label>
      <button className="mt-5 w-full rounded-full bg-[#090706] px-6 py-3 font-black text-[#f1d58b]" type="submit">Send via WhatsApp</button>
      <p className="mt-4 text-sm leading-6 text-black/56">This opens WhatsApp with your message already prepared.</p>
    </form>
  );
}
