import type { Metadata } from "next";
import { site } from "../commerce-data";

const canonical = `${site.url}/quality`;
const description = "Discover BaBra's commitment to responsible manufacturing, product documentation and thoughtful skincare.";

export const metadata: Metadata = {
  title: "Our Quality Commitment | BaBra Cosmetics",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "Our Quality Commitment | BaBra", description, url: canonical, type: "website", images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] },
  twitter: { card: "summary_large_image", title: "Our Quality Commitment | BaBra", description, images: ["/media/logos/babra-logo.jpeg"] }
};

const commitments = [
  {
    title: "Thoughtful manufacturing",
    description: "BaBra Lotion is manufactured with Guangzhou Pallas Cosmetics Co., Ltd. Facility documentation includes ISO 22716 and cosmetics GMP assessment records."
  },
  {
    title: "Product care & traceability",
    description: "Our team maintains product and batch documentation to support identification, responsible handling and professional distribution."
  },
  {
    title: "Clear product information",
    description: "The ingredient declaration and usage directions on the bottle are the primary consumer reference. Our team can provide additional product guidance."
  }
];

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <header className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(214,173,87,0.2),transparent_34rem)]" />
        <div className="mx-auto max-w-7xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Our quality commitment</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Quality in every <em className="font-normal text-[#d8b77c]">detail.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">From signature bottle designs to careful product information, BaBra is committed to a refined experience supported by responsible documentation and personal service.</p>
        </div>
      </header>
      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">The BaBra approach</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none md:text-6xl">Care built on attention to detail.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {commitments.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="mt-5 leading-8 text-black/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#211610] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Documentation & partnerships</p>
            <h2 className="mt-4 font-serif text-5xl leading-none md:text-6xl">Confidence through clarity.</h2>
            <p className="mt-6 max-w-2xl leading-8 text-white/70">BaBra Cosmetics Ltd holds a Rwanda FDA cosmetics-wholesaler premises licence. Import authorization and finished-product registration are distinct matters. Authorized partners may request current supporting documentation directly from BaBra.</p>
          </div>
          <div className="flex flex-col gap-4">
            <a href="/contact" className="rounded-full bg-[#e7c681] px-7 py-4 text-center font-bold text-[#26180d]">Request official information</a>
            <a href="/products" className="rounded-full border border-white/30 px-7 py-4 text-center font-bold text-white">Explore the collection</a>
          </div>
        </div>
      </section>
    </main>
  );
}
