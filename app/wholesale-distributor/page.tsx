import type { Metadata } from "next";
import { WholesaleDistributorForm } from "./WholesaleDistributorForm";

export const metadata: Metadata = {
  title: "BaBra Wholesale & International Distribution | babra.store",
  description:
    "Request BaBra Cosmetics wholesale, distributor, importer, bulk and container supply. Qualified large orders can be reviewed for direct shipment from China to the buyer's destination country.",
  alternates: {
    canonical: "https://www.babra.store/wholesale-distributor"
  },
  openGraph: {
    title: "BaBra Wholesale & International Distribution",
    description:
      "Bulk skincare supply for wholesalers, importers and distributors, including direct-to-country shipment review for qualifying large orders.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  }
};

const partnerTypes = [
  "Cosmetics distributors",
  "Importers & wholesalers",
  "Pharmacy groups",
  "Supermarkets & retail chains",
  "Beauty stores & salon networks",
  "E-commerce businesses",
  "Regional distributors",
  "International trading companies"
];

const steps = [
  ["01", "Send your inquiry", "Tell us your country, business type, products, expected quantity, and preferred destination."],
  ["02", "Commercial review", "BaBra reviews the volume, market, destination, supply route, and any distributor requirements."],
  ["03", "Quotation", "We prepare the applicable product, production, freight, and commercial terms for the requested order."],
  ["04", "Production", "For qualifying large-volume orders, production can be arranged through BaBra's manufacturing supply chain in China."],
  ["05", "International shipping", "Where commercially and logistically feasible, shipment can move directly from China to the agreed destination country."],
  ["06", "Receive your order", "The buyer receives the shipment according to the agreed shipping, customs, payment, and import arrangements."]
];

export default function WholesaleDistributorPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="border-b border-white/10 px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/cosmetics">
              BaBra Cosmetics
            </a>
            <a className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white/80" href="/forms/cosmetics">
              Cosmetics forms
            </a>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">
                Wholesale · Distribution · International supply
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.92] md:text-8xl">
                Build your market with BaBra.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/66 md:text-xl">
                BaBra Cosmetics welcomes serious wholesalers, importers, distributors, pharmacies, retailers, supermarkets, and international business partners looking for premium skincare supply.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#d6ad57]/25 bg-[#17110e] p-6 md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]">Direct-to-country option</p>
              <h2 className="mt-4 font-serif text-4xl leading-none">China → Buyer&apos;s Country</h2>
              <p className="mt-5 leading-7 text-white/64">
                A qualifying large order does not necessarily need to pass through Rwanda first. BaBra can review production through its China manufacturing supply chain and direct shipment to the agreed destination country.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/46">
                Final route, MOQ, lead time, freight, customs, import permits, taxes, and Incoterms are confirmed in the approved quotation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Who can partner with BaBra?</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-6xl">Built for serious business buyers.</h2>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 font-bold text-white/76">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-14 text-[#18110c] md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9a6b18]">How it works</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-6xl">From inquiry to international delivery.</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article key={number} className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-sm font-black text-[#9a6b18]">{number}</p>
                <h3 className="mt-3 font-serif text-3xl leading-none">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <WholesaleDistributorForm />
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f1d58b]">BaBra Cosmetics Ltd</p>
            <h2 className="mt-2 font-serif text-4xl leading-none">International wholesale enquiries</h2>
            <p className="mt-3 text-white/58">WhatsApp: +250 788 351 482 · babracosmeticsltd@gmail.com</p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f1d58b] px-6 font-black text-[#130d08]"
            href="https://wa.me/250788351482?text=Hello%20BaBra%20Cosmetics%2C%20I%20want%20international%20wholesale%20information."
            target="_blank"
            rel="noopener noreferrer"
          >
            Start on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
