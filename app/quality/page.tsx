import type { Metadata } from "next";
import { site } from "../commerce-data";

const canonical = `${site.url}/quality`;
const description = "Evidence-labelled BaBra quality information covering manufacturing certificates, Rwanda premises licensing and Rwanda FDA authorization to import the three BaBra Lotion variants.";

export const metadata: Metadata = {
  title: "Quality, Manufacturing & Registration Status | BaBra",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "BaBra Quality & Documentation Status", description, url: canonical, type: "website", images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] },
  twitter: { card: "summary_large_image", title: "BaBra Quality & Documentation Status", description, images: ["/media/logos/babra-logo.jpeg"] }
};

const manufacturingRecords = [
  {
    title: "ISO 22716 manufacturing-system certificate",
    reference: "Intertek certificate HBPCER20260202",
    dates: "Printed issue date 26 May 2026 · Printed expiry date 24 May 2029",
    detail: "The reviewed certificate identifies Guangzhou Pallas Cosmetics Co., Ltd. and a scope that includes cream and lotion manufacturing. It reports conformity to ISO 22716:2007 cosmetics good manufacturing practices.",
    limit: "This is facility-scope evidence, not product registration, a clinical result or proof that every product is suitable for every user. Live issuer validity and surveillance status should be rechecked before any regulatory submission."
  },
  {
    title: "Cosmetic GMP assessment certificate",
    reference: "Intertek certificate HBPCER20260203",
    dates: "Printed issue date 26 May 2026 · Printed expiry date 24 May 2029",
    detail: "The reviewed certificate identifies Guangzhou Pallas Cosmetics Co., Ltd. and references cosmetic good manufacturing practice guidance published by the US FDA.",
    limit: "The certificate was issued by Intertek, not by the US FDA. It is not FDA product approval, FDA endorsement or a BaBra product-registration certificate."
  },
  {
    title: "Batch-specific Certificates of Analysis",
    reference: "Manufacturer COA for batch 20260401",
    dates: "Printed test date 13 April 2026 · Printed report date 18 April 2026",
    detail: "The reviewed three-page COA set identifies Signature for Him, Soft Care for Kids and Signature for Her. It records checks for appearance, odour, pH, heat and cold resistance, microbial counts, packaging and net weight, with the reported batch results marked eligible or OK.",
    limit: "A COA is batch-specific quality evidence. It is not a clinical study, long-term stability study, preservative challenge test, finished-product safety assessment or product-registration approval."
  }
];

export default function QualityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: "BaBra Quality, Manufacturing and Registration Status",
    description,
    inLanguage: "en-RW",
    dateModified: "2026-11-03",
    about: { "@type": "Organization", "@id": `${site.url}/#babra-cosmetics`, name: "BaBra Cosmetics Ltd" }
  };

  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(214,173,87,0.2),transparent_34rem),radial-gradient(circle_at_10%_80%,rgba(111,49,37,0.22),transparent_28rem)]" />
        <div className="mx-auto max-w-7xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/">babra.store</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Quality &amp; official information</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Proof belongs<br /><em className="font-normal text-[#d8b77c]">in the right category.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/68">Manufacturing certificates, premises licences and import licences are different records. BaBra reports each one accurately, including Rwanda FDA authorization to import the three named BaBra Lotion variants.</p>
        </div>
      </header>

      <section className="border-y border-white/10 bg-[#17100d] px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Manufacturing certificates", "Describe the assessed manufacturing site, system and scope."],
            ["Company premises licence", "Authorizes the named Rwanda premises and wholesale activity within its stated scope."],
            ["Rwanda FDA import licence", "Authorizes BaBra Cosmetics Ltd to import the three named lotion variants under the stated conditions."],
            ["Product registration", "Applies to a specific finished product and must not be inferred from the other records."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="font-serif text-3xl text-[#fff4e3]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Manufacturing records reviewed</p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.035em] md:text-7xl">Facility evidence, precisely stated.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {manufacturingRecords.map((record) => (
              <article key={record.reference} className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(68,43,20,0.08)] md:p-9">
                <span className="rounded-full bg-[#eee0c7] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#775328]">Reviewed document</span>
                <h3 className="mt-5 font-serif text-4xl leading-tight">{record.title}</h3>
                <p className="mt-4 font-bold text-[#76512c]">{record.reference}</p>
                <p className="mt-2 text-sm text-black/48">{record.dates}</p>
                <p className="mt-6 leading-8 text-black/64">{record.detail}</p>
                <p className="mt-5 border-l-2 border-[#a36d32] pl-4 text-sm leading-7 text-[#65472c]">{record.limit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#211610] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-7 md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Rwanda company premises licence</p>
            <h2 className="mt-4 font-serif text-4xl">BaBra Cosmetics Ltd</h2>
            <dl className="mt-7 grid gap-5 text-sm">
              <div><dt className="font-bold text-[#e9cc90]">Licence</dt><dd className="mt-2 leading-7 text-white/62">RWA-FDA/DD-WCP/12-2025/0062/0120</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Scope printed on the document</dt><dd className="mt-2 leading-7 text-white/62">Premises licence for a cosmetics wholesaler.</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Printed validity</dt><dd className="mt-2 leading-7 text-white/62">Five years from 1 May 2026.</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Company identifier</dt><dd className="mt-2 leading-7 text-white/62">TIN 149358983.</dd></div>
            </dl>
            <p className="mt-7 border-l-2 border-[#d6ad57] pl-4 text-sm leading-7 text-white/60">This licence supports the stated Rwanda wholesale premises activity. It is not the Chinese manufacturer's licence and is not registration or approval of an individual lotion variant.</p>
          </article>

          <article className="rounded-2xl border border-[#d6ad57]/35 bg-white/[0.07] p-7 md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Rwanda FDA import licence</p>
            <h2 className="mt-4 font-serif text-4xl">The three lotion variants are authorized for import.</h2>
            <dl className="mt-7 grid gap-5 text-sm">
              <div><dt className="font-bold text-[#e9cc90]">Import licence</dt><dd className="mt-2 leading-7 text-white/62">RWANDA-FDA26/COS/SLIC/0469</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Importer</dt><dd className="mt-2 leading-7 text-white/62">BaBra Cosmetics Ltd</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Authorized products</dt><dd className="mt-2 leading-7 text-white/62">Signature for Her, Signature for Him and Soft Care for Kids, 500 mL.</dd></div>
              <div><dt className="font-bold text-[#e9cc90]">Issue and validity</dt><dd className="mt-2 leading-7 text-white/62">Issued 13 May 2026; printed valid-until date 12 November 2026.</dd></div>
            </dl>
            <p className="mt-7 border-l-2 border-[#d6ad57] pl-4 text-sm leading-7 text-white/60">The licence states that it authorizes import of the products specified in the invoice after compliance with import requirements. It also requires inspection of the consignment at the port of entry or importer&apos;s premises on arrival.</p>
          </article>

          <article className="rounded-2xl border border-[#d6ad57]/25 bg-[#f3e6d1] p-7 text-[#2c1d14] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b5c28]">Product-registration status</p>
            <h2 className="mt-4 font-serif text-4xl">Import authorization is verified.</h2>
            <p className="mt-6 leading-8 text-black/65">The Rwanda FDA import licence specifically names Signature for Her, Signature for Him and Soft Care for Kids and authorizes BaBra Cosmetics Ltd to import them under its stated conditions.</p>
            <p className="mt-5 leading-8 text-black/65">This site describes that record as Rwanda FDA import authorization. It does not relabel the Rwanda document as US FDA product approval.</p>
            <a className="mt-8 inline-flex rounded-full bg-[#2b1c13] px-6 py-3 font-bold text-white" href="/contact">Request official documentation</a>
          </article>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Open verification items</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">What must be resolved before stronger claims.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Final approved INCI lists and corrected consumer label artwork for all three variants.",
              "Kids age-range, preservation and finished-product safety substantiation; factory capability alone is not enough.",
              "Confirmation that 'Building B' in product records and 'Building 2' on certificates identify the same manufacturing site.",
              "Current live issuer validity and surveillance status for the Intertek certificates.",
              "A final official product-registration decision before any registration or approval claim is published."
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-white p-6 leading-7 text-black/63 shadow-[0_18px_50px_rgba(68,43,20,0.06)]">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
