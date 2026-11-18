import type { Metadata } from "next";
import { site } from "../commerce-data";

const canonical = `${site.url}/quality`;
const description = "Documented BaBra manufacturing records and Rwanda premises and import authorizations, clearly separated from finished-product registration.";

export const metadata: Metadata = {
  title: "Quality Records & Authorizations | BaBra Cosmetics",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "BaBra Quality Records & Authorizations", description, url: canonical, type: "website", images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] },
  twitter: { card: "summary_large_image", title: "BaBra Quality Records & Authorizations", description, images: ["/media/logos/babra-logo.jpeg"] }
};

const manufacturingRecords = [
  {
    title: "ISO 22716 manufacturing-system certificate",
    reference: "Intertek certificate HBPCER20260202",
    dates: "Issued 26 May 2026 · Printed expiry 24 May 2029",
    description: "The record identifies Guangzhou Pallas Cosmetics Co., Ltd. and a scope that includes cream and lotion manufacturing under ISO 22716:2007 cosmetics good manufacturing practices."
  },
  {
    title: "Cosmetics GMP assessment certificate",
    reference: "Intertek certificate HBPCER20260203",
    dates: "Issued 26 May 2026 · Printed expiry 24 May 2029",
    description: "The record identifies Guangzhou Pallas Cosmetics Co., Ltd. and references cosmetics good manufacturing practice guidance. It was issued by Intertek, not by the US FDA."
  }
];

export default function QualityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: "BaBra Quality Records and Authorizations",
    description,
    inLanguage: "en-RW",
    dateModified: "2026-11-18",
    about: { "@type": "Organization", "@id": `${site.url}/#babra-cosmetics`, name: "BaBra Cosmetics Ltd" }
  };

  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(214,173,87,0.2),transparent_34rem),radial-gradient(circle_at_10%_80%,rgba(111,49,37,0.22),transparent_28rem)]" />
        <div className="mx-auto max-w-7xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Quality records &amp; authorizations</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Trust, stated with <em className="font-normal text-[#d8b77c]">precision.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">BaBra presents manufacturing records, Rwanda premises licensing and import authorization in their proper categories, with the references and dates shown on the reviewed documents.</p>
        </div>
      </header>

      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Manufacturer quality records</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Facility-scope evidence, professionally presented.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {manufacturingRecords.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="mt-4 font-bold text-[#76512c]">{item.reference}</p>
                <p className="mt-2 text-sm text-black/48">{item.dates}</p>
                <p className="mt-5 leading-8 text-black/65">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#211610] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Rwanda documentation</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Premises and import records, kept distinct.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Rwanda FDA premises licence</p>
              <h3 className="mt-4 font-serif text-4xl">BaBra Cosmetics Ltd</h3>
              <dl className="mt-7 grid gap-5 text-sm">
                <div><dt className="font-bold text-[#e9cc90]">Reference</dt><dd className="mt-2 leading-7 text-white/65">RWA-FDA/DD-WCP/12-2025/0062/0120</dd></div>
                <div><dt className="font-bold text-[#e9cc90]">Documented scope</dt><dd className="mt-2 leading-7 text-white/65">Cosmetics wholesaler premises.</dd></div>
                <div><dt className="font-bold text-[#e9cc90]">Printed validity</dt><dd className="mt-2 leading-7 text-white/65">Five years from 1 May 2026.</dd></div>
              </dl>
            </article>
            <article className="rounded-2xl border border-[#d6ad57]/35 bg-white/[0.07] p-7 md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Documented Rwanda FDA import authorization</p>
              <h3 className="mt-4 font-serif text-4xl">Three BaBra Lotion variants named.</h3>
              <dl className="mt-7 grid gap-5 text-sm">
                <div><dt className="font-bold text-[#e9cc90]">Reference</dt><dd className="mt-2 leading-7 text-white/65">RWANDA-FDA26/COS/SLIC/0469</dd></div>
                <div><dt className="font-bold text-[#e9cc90]">Products named</dt><dd className="mt-2 leading-7 text-white/65">Signature for Her, Signature for Him and Soft Care for Kids, 500 mL.</dd></div>
                <div><dt className="font-bold text-[#e9cc90]">Documented term</dt><dd className="mt-2 leading-7 text-white/65">Issued 13 May 2026 · Printed valid through 12 November 2026.</dd></div>
              </dl>
            </article>
          </div>
          <div className="mt-8 rounded-2xl border border-[#d6ad57]/25 bg-[#f3e6d1] p-7 text-[#2c1d14] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b5c28]">Clear regulatory distinction</p>
            <h3 className="mt-4 font-serif text-4xl">These records do not by themselves establish finished-product registration.</h3>
            <p className="mt-5 max-w-4xl leading-8 text-black/65">The premises licence concerns the named Rwanda wholesale premises. The import licence documented authorization to import the products named during its printed term. The ISO 22716 and GMP records concern the manufacturer&apos;s facility and quality system. None of these records is presented as US FDA approval or as an automatic substitute for finished-product registration.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-[#2b1c13] px-7 py-4 text-center font-bold text-white">Request official information</a>
              <a href="/where-to-buy" className="rounded-full border border-black/20 px-7 py-4 text-center font-bold text-[#2b1c13]">Authorized partners</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
