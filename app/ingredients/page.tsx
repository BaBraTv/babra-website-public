import type { Metadata } from "next";
import { productKnowledgeList } from "../../lib/product-knowledge";
import { site } from "../commerce-data";

const canonical = `${site.url}/ingredients`;
const description = "Evidence-labelled BaBra Lotion ingredient highlights and plain-language cosmetic functions, separated from finished-product clinical claims.";

export const metadata: Metadata = {
  title: "Ingredients & Science | BaBra Lotion",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "BaBra Ingredients & Science", description, url: canonical, type: "website", images: [{ url: "/media/products/babra-lotion-women-500ml.png", alt: "BaBra Lotion Signature for Her 500 mL bottle" }] },
  twitter: { card: "summary_large_image", title: "BaBra Ingredients & Science", description, images: ["/media/products/babra-lotion-women-500ml.png"] }
};

const ingredientIndex = new Map<
  string,
  {
    name: string;
    displayName?: string;
    function: string;
    explanation: string;
    caution?: string;
    underReview: boolean;
    products: { slug: string; variant: string }[];
  }
>();

for (const product of productKnowledgeList) {
  for (const ingredient of product.ingredientHighlights) {
    const entry = ingredientIndex.get(ingredient.name) || {
      name: ingredient.name,
      displayName: ingredient.displayName,
      function: ingredient.function,
      explanation: ingredient.explanation,
      caution: ingredient.caution,
      underReview: ingredient.state === "requires-product-specific-review",
      products: []
    };
    entry.products.push({ slug: product.slug, variant: product.variant });
    entry.underReview ||= ingredient.state === "requires-product-specific-review";
    ingredientIndex.set(ingredient.name, entry);
  }
}

const ingredients = Array.from(ingredientIndex.values()).sort((a, b) => (a.displayName || a.name).localeCompare(b.displayName || b.name));

export default function IngredientsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: "BaBra Ingredients & Science",
    description,
    inLanguage: "en-RW",
    about: { "@type": "Brand", "@id": `${site.url}/#babra-cosmetics-brand`, name: "BaBra Cosmetics" },
    dateModified: "2026-10-23"
  };

  return (
    <main className="min-h-screen bg-[#0d0908] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_10%,rgba(214,173,87,0.2),transparent_34rem),radial-gradient(circle_at_8%_85%,rgba(115,51,38,0.22),transparent_30rem)]" />
        <div className="mx-auto max-w-7xl">
          <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/cosmetics">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Ingredients &amp; Science</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Useful science.<br /><em className="font-normal text-[#d8b77c]">Clear limits.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/68">BaBra explains what cosmetic ingredients generally do without turning ingredient studies into clinical proof of a finished product. Formula percentages and supplier-confidential information are not published.</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17100d] px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Document match", "A highlight appears only when the current manufacturer MSDS and label artwork agree for that variant."],
            ["Label declaration", "Each product page now carries the complete declaration transcribed from its supplied label artwork. Controlled approval and INCI-name normalization are still pending."],
            ["Finished product", "An ingredient's known cosmetic function does not prove the complete lotion delivers a clinical, therapeutic or universal result."]
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
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Current verified highlights</p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.035em] md:text-7xl">What each ingredient contributes.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ingredients.map((ingredient) => (
              <article key={ingredient.name} className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-serif text-3xl">{ingredient.displayName || ingredient.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${ingredient.underReview ? "bg-[#8e2f27] text-white" : "bg-[#eee0c7] text-[#775328]"}`}>{ingredient.underReview ? "Under review" : "Document match"}</span>
                </div>
                {ingredient.displayName ? <p className="mt-1 text-xs text-black/45">Current document name: {ingredient.name}</p> : null}
                <p className="mt-5 text-sm font-black uppercase tracking-[0.12em] text-[#8b5c28]">{ingredient.function}</p>
                <p className="mt-3 leading-7 text-black/62">{ingredient.explanation}</p>
                {ingredient.caution ? <p className="mt-4 border-l-2 border-[#a34032] pl-4 text-sm leading-7 text-[#713a32]">{ingredient.caution}</p> : null}
                <div className="mt-auto pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-black/42">Current document match</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ingredient.products.map((product) => (
                      <a key={product.slug} className="rounded-full border border-black/12 px-3 py-2 text-xs font-bold text-[#684925]" href={`/products/${product.slug}`}>{product.variant}</a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#281a14] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Retinol review</p>
            <h2 className="mt-4 font-serif text-5xl leading-none">Product-specific, never assumed.</h2>
          </div>
          <div className="grid gap-4 text-sm leading-7 text-white/65">
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-5">Current adult MSDS reports and label artwork list retinol. The documents do not establish whether the reported amount is pure retinol or a carrier-blend addition rate, so BaBra does not publish an active concentration or efficacy claim.</p>
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-5">The reviewed Soft Care for Kids MSDS and label artwork do not list retinol. Adult formula information is never transferred to the children's record.</p>
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-5">Face use, pregnancy-related questions and other sensitive-use decisions require product-specific label and safety review. This page is cosmetic information, not medical advice.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-12 text-[#251a13] md:px-8 md:py-16" aria-labelledby="science-reference-heading">
        <div className="mx-auto max-w-7xl rounded-2xl border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(68,43,20,0.06)] md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b5c28]">How to read this page</p>
          <h2 id="science-reference-heading" className="mt-3 font-serif text-4xl">Ingredient function is context, not product approval.</h2>
          <p className="mt-5 max-w-5xl leading-8 text-black/64">Function terms such as humectant, emollient and skin conditioning follow established cosmetic terminology and the reviewed product records. The European Commission explains that its CosIng database is informative, is not itself an authorization list and does not replace finished-product safety assessment.</p>
          <a className="mt-6 inline-flex border-b border-[#8b5c28] pb-2 font-bold text-[#704719]" href="https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database_en" target="_blank" rel="noopener noreferrer">European Commission cosmetic ingredient database →</a>
        </div>
      </section>
    </main>
  );
}
