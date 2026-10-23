import type { Metadata } from "next";
import { buildPublicProductFaqs } from "../../lib/product-knowledge";
import { cosmetics, rwandaOrders, site } from "../commerce-data";

const canonical = `${site.url}/faq`;
const description = "Factual answers about BaBra Lotion face use, ingredients, variants, daily use, retinol, children's guidance, quality records and official purchase channels.";

export const metadata: Metadata = {
  title: "BaBra Lotion FAQ",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "BaBra Lotion FAQ", description, url: canonical, type: "website", images: [{ url: "/media/products/babra-lotion-women-500ml.png", alt: "BaBra Lotion Signature for Her 500 mL bottle" }] },
  twitter: { card: "summary_large_image", title: "BaBra Lotion FAQ", description, images: ["/media/products/babra-lotion-women-500ml.png"] }
};

const faqs = buildPublicProductFaqs({
  manufacturer: cosmetics.manufacturer,
  rwandaPartner: rwandaOrders.partner,
  rwandaPhone: rwandaOrders.phone,
  domain: site.domain
});

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    url: canonical,
    inLanguage: "en-RW",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <main className="min-h-screen bg-[#0d0908] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_15%,rgba(214,173,87,0.22),transparent_32rem)]" />
        <div className="mx-auto max-w-6xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/cosmetics">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Factual FAQ</p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Questions deserve<br /><em className="font-normal text-[#d8b77c]">precise answers.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/66">Every answer distinguishes product evidence from general cosmetic science. No medical, universal-safety or approval claim is implied.</p>
        </div>
      </header>

      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(68,43,20,0.07)] md:p-8">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-2xl leading-tight md:text-3xl" data-analytics-event="faq_open">
                  <span><span className="mr-4 text-sm font-black text-[#a06c32]">{String(index + 1).padStart(2, "0")}</span>{faq.question}</span>
                  <span className="text-[#9a6d37] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-6 max-w-4xl border-t border-black/10 pt-6 leading-8 text-black/64">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a className="rounded-xl bg-[#2a1b14] p-5 font-bold text-white" href="/products">Explore the collection →</a>
            <a className="rounded-xl border border-black/12 bg-white p-5 font-bold" href="/ingredients">Ingredients &amp; Science →</a>
            <a className="rounded-xl border border-black/12 bg-white p-5 font-bold" href="/quality">Quality status →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
