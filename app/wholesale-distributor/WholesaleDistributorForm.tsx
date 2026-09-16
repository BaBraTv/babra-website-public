"use client";

import { FormEvent } from "react";

function openWhatsApp(message: string) {
  window.open(
    `https://wa.me/250788351482?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

const inputClass =
  "min-h-14 rounded-xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none placeholder:text-white/38 focus:border-[#d6ad57]";

export function WholesaleDistributorForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    openWhatsApp(
      [
        "BaBra International Wholesale / Distributor Inquiry",
        `Business: ${form.get("businessName")}`,
        `Contact person: ${form.get("contactName")}`,
        `Phone / WhatsApp: ${form.get("phone")}`,
        `Email: ${form.get("email")}`,
        `Country: ${form.get("country")}`,
        `City / Region: ${form.get("city")}`,
        `Business type: ${form.get("accountType")}`,
        `Products: ${form.get("products")}`,
        `Estimated order size: ${form.get("orderScale")}`,
        `Order frequency: ${form.get("orderFrequency")}`,
        `Shipping destination: ${form.get("shippingDestination")}`,
        `Factory-to-country option: ${form.get("directFactory")}`,
        `Notes: ${form.get("notes")}`
      ].join("\n")
    );
  }

  return (
    <form
      id="wholesale-distributor"
      onSubmit={submit}
      className="rounded-[2rem] border border-[#d6ad57]/25 bg-[#100d0a] p-5 shadow-2xl shadow-black/20 md:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f1d58b]">Wholesale lead form</p>
        <h2 className="mt-3 font-serif text-4xl leading-none md:text-5xl">Request a BaBra wholesale quote</h2>
        <p className="mt-4 leading-7 text-white/64">
          Tell us about your market and expected order size. For qualifying large-volume orders, BaBra can review direct shipment from its China manufacturing supply chain to the buyer&apos;s destination country.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input className={inputClass} name="businessName" placeholder="Company / business name" required />
        <input className={inputClass} name="contactName" placeholder="Contact person" required />
        <input className={inputClass} name="phone" placeholder="Phone / WhatsApp" required />
        <input className={inputClass} name="email" type="email" placeholder="Business email" required />
        <input className={inputClass} name="country" placeholder="Country" required />
        <input className={inputClass} name="city" placeholder="City / State / Region" required />

        <select className={inputClass} name="accountType" required defaultValue="">
          <option value="" disabled>Business type</option>
          <option>International distributor</option>
          <option>Importer / wholesaler</option>
          <option>Cosmetics distributor</option>
          <option>Pharmacy group</option>
          <option>Supermarket / retail chain</option>
          <option>Beauty shop / salon network</option>
          <option>E-commerce business</option>
          <option>Reseller / retail shop</option>
          <option>Other business buyer</option>
        </select>

        <input className={inputClass} name="products" placeholder="Products of interest" required />

        <select className={inputClass} name="orderScale" required defaultValue="">
          <option value="" disabled>Estimated order size</option>
          <option>Cartons / trial wholesale order</option>
          <option>100–499 units</option>
          <option>500–1,999 units</option>
          <option>2,000–9,999 units</option>
          <option>10,000+ units</option>
          <option>20-ft container inquiry</option>
          <option>40-ft container inquiry</option>
        </select>

        <select className={inputClass} name="orderFrequency" required defaultValue="">
          <option value="" disabled>Expected order frequency</option>
          <option>One-time order</option>
          <option>Monthly</option>
          <option>Every 2–3 months</option>
          <option>Quarterly</option>
          <option>Ongoing distributor supply</option>
          <option>Not sure yet</option>
        </select>

        <input
          className={inputClass}
          name="shippingDestination"
          placeholder="Preferred destination city / port / country"
          required
        />

        <select className={inputClass} name="directFactory" required defaultValue="">
          <option value="" disabled>Preferred supply route</option>
          <option>China → directly to my country</option>
          <option>BaBra should advise the best route</option>
          <option>Supply from Rwanda preferred</option>
        </select>
      </div>

      <textarea
        className="mt-4 min-h-36 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none placeholder:text-white/38 focus:border-[#d6ad57]"
        name="notes"
        placeholder="Tell us about your market, distribution coverage, target customers, import requirements, or any special request"
      />

      <label className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/62">
        <input className="mt-1" type="checkbox" required />
        <span>
          I understand that MOQ, production availability, lead time, freight, customs, import permits, taxes, and final commercial terms depend on the destination country and the approved quotation.
        </span>
      </label>

      <button
        className="mt-6 min-h-14 w-full rounded-full bg-[#f1d58b] px-6 text-lg font-black text-[#130d08] transition hover:bg-[#ffe6a3]"
        type="submit"
      >
        Request Wholesale Quote on WhatsApp
      </button>

      <p className="mt-4 text-center text-sm leading-6 text-white/46">
        International partnerships: +250 788 351 482 · babracosmeticsltd@gmail.com
      </p>
    </form>
  );
}
