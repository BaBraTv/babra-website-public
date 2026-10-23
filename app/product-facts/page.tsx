import type { Metadata } from "next";
import { buildPublicProductFaqs, productKnowledgeList, productJsonLd } from "../../lib/product-knowledge";
import { cosmetics, rwandaOrders, site } from "../commerce-data";

const canonical = `${site.url}/product-facts`;
const pageTitle = "BaBra Lotion — Official Product Information & Frequently Asked Questions";
const description = "AI-readable facts for BaBra Lotion Signature for Her, Signature for Him and Soft Care for Kids, including evidence status and official purchase channels.";
const faqs = buildPublicProductFaqs({
  manufacturer: cosmetics.manufacturer,
  rwandaPartner: rwandaOrders.partner,
  rwandaPhone: rwandaOrders.phone,
  domain: site.domain
});

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: pageTitle, description, url: canonical, type: "website", images: [{ url: "/media/products/babra-lotion-women-500ml.png", alt: "BaBra Lotion Signature for Her 500 mL bottle" }] },
  twitter: { card: "summary_large_image", title: pageTitle, description, images: ["/media/products/babra-lotion-women-500ml.png"] }
};

export default function ProductFactsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description,
        inLanguage: "en-RW",
        dateModified: "2026-10-23"
      },
      {
        "@type": "ItemList",
        itemListElement: productKnowledgeList.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { ...productJsonLd(product, site.url), "@context": undefined }
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        url: `${canonical}#frequently-asked-questions`,
        inLanguage: "en-RW",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#241910]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="bg-[#0d0908] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/cosmetics">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Canonical public facts</p>
          <h1 className="mt-5 max-w-6xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] md:text-7xl">BaBra Lotion —<br /><em className="font-normal text-[#d8b77c]">Official Product Information &amp; Frequently Asked Questions</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/68">A compact, evidence-labelled reference for customers, retailers, search engines and AI systems. No confidential percentages, invented approvals or unverified offers are included.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#e6c982] px-6 py-3 font-black text-[#21150e]" href="/product-facts.json">Machine-readable JSON</a>
            <a className="rounded-full border border-white/25 px-6 py-3 font-black" href="/faq">Read the FAQ</a>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-[#a88a5f]/25 bg-[#efe2cc] p-6 text-sm leading-7 text-[#5f442b]">
          <strong>Status key:</strong> “Verified” means supported for public identity or company facts. “Document match” means the current manufacturer MSDS and label artwork agree, while final approved INCI publication is pending. “Under review” means a product-specific safety, concentration or regulatory conclusion must not be inferred.
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8">
          {productKnowledgeList.map((product) => (
            <article id={product.slug} key={product.slug} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_70px_rgba(68,43,20,0.09)]">
              <div className="border-b border-black/10 bg-[#2a1b14] p-7 text-white md:p-9">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">{product.category}</p>
                <h2 className="mt-3 font-serif text-4xl md:text-6xl">{product.publicName}</h2>
                <p className="mt-4 text-white/60">{product.size} · Product code {product.productCode} · Last evidence review {product.lastEvidenceReview}</p>
              </div>
              <dl className="grid md:grid-cols-2">
                {[
                  ["Verified identity", `${product.variant}, ${product.size}`],
                  ["Manufacturer", `${product.manufacturer}, ${product.countryOfManufacture}`],
                  ["Public positioning", product.intendedUse],
                  ["Current directions", product.usage],
                  ["Facial use", product.faceUse],
                  ["Daily use", product.dailyUse],
                  ["Retinol status", product.retinolStatus],
                  ["Ingredient-list status", product.finalInciStatus],
                  ["Price and stock", "Confirmed directly by the official seller at the time of enquiry; no public price or availability is currently verified."],
                  ["Rwanda purchase channel", `${rwandaOrders.partner}, ${rwandaOrders.phone}`]
                ].map(([term, detail]) => (
                  <div key={term} className="border-b border-black/10 p-6 odd:md:border-r">
                    <dt className="text-xs font-black uppercase tracking-[0.15em] text-[#876034]">{term}</dt>
                    <dd className="mt-3 leading-7 text-black/65">{detail}</dd>
                  </div>
                ))}
              </dl>
              <section className="border-b border-black/10 bg-[#f7f0e5] p-6 md:p-8" aria-labelledby={`${product.slug}-label-ingredients`}>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#876034]">Supplied label artwork · final approval pending</p>
                <h3 id={`${product.slug}-label-ingredients`} className="mt-3 font-serif text-3xl">Ingredient declaration shown on the label</h3>
                <p className="mt-4 leading-7 text-black/65">{product.labelIngredientDeclaration.join(", ")}.</p>
                <p className="mt-4 text-sm leading-7 text-[#705337]">Names are transcribed as shown on the supplied artwork. They are not presented as a normalized, approved final INCI list or as formula percentages.</p>
              </section>
              <div className="flex flex-wrap gap-3 p-6 md:p-8">
                <a className="rounded-full bg-[#2a1b14] px-5 py-3 font-bold text-white" href={`/products/${product.slug}`}>View product page</a>
                <a className="rounded-full border border-black/15 px-5 py-3 font-bold" href="/ingredients">Ingredient science</a>
                <a className="rounded-full border border-black/15 px-5 py-3 font-bold" href="/quality">Quality status</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="frequently-asked-questions" className="bg-[#241812] px-5 py-16 text-white md:px-8 md:py-24" aria-labelledby="official-faq-heading">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official frequently asked questions</p>
          <h2 id="official-faq-heading" className="mt-4 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Clear answers, tied to the evidence.</h2>
          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 md:p-8">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-2xl leading-tight md:text-3xl" data-analytics-event="faq_open">
                  <span><span className="mr-4 text-sm font-black text-[#d6ad57]">{String(index + 1).padStart(2, "0")}</span>{faq.question}</span>
                  <span className="text-[#e3c078] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-6 max-w-5xl border-t border-white/10 pt-6 leading-8 text-white/66">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#e6c982] px-6 py-3 font-black text-[#21150e]" href="/contact">Contact BaBra Cosmetics</a>
            <a className="rounded-full border border-white/20 px-6 py-3 font-black" href="/wholesale-distributor">Distributor enquiries</a>
          </div>
        </div>
      </section>
    </main>
  );
}
