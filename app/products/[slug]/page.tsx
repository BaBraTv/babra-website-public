import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  cosmetics,
  PRICE_INQUIRY_LABEL,
  PRICE_INQUIRY_NOTE,
  getProduct,
  products,
  rwandaOrderUrl,
  rwandaOrders,
  site,
  whatsappOrderUrl
} from "../../commerce-data";
import { OfficialMedia } from "../../components/OfficialMedia";
import { officialMediaById } from "../../data/official-media";
import { getProductKnowledge, productJsonLd } from "../../../lib/product-knowledge";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getProductKnowledge(slug);

  if (!record) return { title: "Product not found" };

  const canonical = `${site.url}/products/${record.slug}`;
  const description = `${record.publicName}, ${record.size}. Read evidence-labelled ingredient highlights, current usage guidance, precautions and official ordering channels.`;

  return {
    title: `${record.publicName} — ${record.size}`,
    description,
    alternates: {
      canonical,
      languages: { "en-RW": canonical, "x-default": canonical }
    },
    openGraph: {
      title: `${record.publicName} — ${record.size}`,
      description,
      url: canonical,
      type: "website",
      images: [{ url: record.image, alt: record.imageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${record.publicName} — ${record.size}`,
      description,
      images: [record.image]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  const record = getProductKnowledge(slug);

  if (!product || !record) notFound();

  const canonical = `${site.url}/products/${record.slug}`;
  const productSchema = productJsonLd(record, site.url);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { ...productSchema, "@context": undefined },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
          { "@type": "ListItem", position: 3, name: record.variant, item: canonical }
        ]
      }
    ]
  };

  const orderMessage = `Hello BaBra Cosmetics, I would like to order ${record.publicName}, ${record.size}. Quantity: __. Delivery location: __. Please confirm current price, stock, delivery fee and payment instructions.`;

  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="border-b border-white/10 px-5 py-4 md:px-8" aria-label="Product information">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm">
          <a className="font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/products">BaBra collection</a>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/70">
            <a href="/ingredients" data-analytics-event="ingredient_science_view">Ingredients &amp; Science</a>
            <a href="/product-facts" data-analytics-event="product_facts_view">Product facts</a>
            <a href="/faq">FAQ</a>
            <a href="/quality">Quality</a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_12%,rgba(214,173,87,0.2),transparent_30rem),radial-gradient(circle_at_8%_35%,rgba(126,54,40,0.22),transparent_28rem)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <figure className="relative overflow-hidden rounded-[2.5rem_2.5rem_0.75rem_0.75rem] border border-[#d6ad57]/30 bg-[radial-gradient(circle_at_50%_15%,#fffdf8,#f4ead8_55%,#c49a43)] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-x-12 bottom-12 h-12 rounded-full bg-black/20 blur-2xl" aria-hidden="true" />
            <OfficialMedia className="relative h-[430px] w-full object-contain drop-shadow-2xl sm:h-[610px]" media={officialMediaById[product.mediaId]} priority sizes="(min-width: 1024px) 44vw, 92vw" />
            <figcaption className="sr-only">{record.imageAlt}</figcaption>
          </figure>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">BaBra Cosmetics · {record.category}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-8xl">{record.variant}</h1>
            <p className="mt-5 font-serif text-2xl italic text-[#e6c98e]">Luxury in Every Touch</p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">{record.overview}</p>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em]">
              <span className="rounded-full border border-[#e7c77d]/35 bg-[#e7c77d]/10 px-4 py-2 text-[#f3d997]">Verified identity</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">{record.size}</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">Made in {record.countryOfManufacture}</span>
            </div>

            <div className="mt-8 rounded-2xl border border-[#f1d58b]/25 bg-white/[0.055] p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Current price &amp; availability</p>
                  <p className="mt-2 text-3xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
                </div>
                <p className="max-w-md text-sm leading-6 text-white/58">{PRICE_INQUIRY_NOTE}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href={rwandaOrderUrl(orderMessage)} target="_blank" rel="noopener noreferrer" data-analytics-event="rwanda_order_click">
                Rwanda order · {rwandaOrders.partner}
              </a>
              <a className="rounded-full border border-white/25 px-6 py-3 font-black text-white" href={whatsappOrderUrl(orderMessage)} target="_blank" rel="noopener noreferrer" data-analytics-event="order_channel_click">
                International order · BaBra
              </a>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/62">Manufactured by {record.manufacturer}. Distributed through official BaBra channels. {cosmetics.company} · TIN {cosmetics.tin}.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Evidence-labelled product guidance</p>
            <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.035em] md:text-7xl">What the records support.</h2>
            <p className="mt-6 leading-8 text-black/65">These facts separate what is verified from what still requires final label or safety confirmation. The physical label supplied with the product remains the controlling direction.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              ["Intended use", record.intendedUse],
              ["How to use", record.usage],
              ["Face use", record.faceUse],
              ["Daily use", record.dailyUse]
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/64">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#130d0b] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Ingredient highlights</p>
              <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.035em] md:text-6xl">Function, not fantasy.</h2>
              <p className="mt-6 leading-8 text-white/62">Highlights below match the current manufacturer MSDS and label artwork. They are not presented as a final approved INCI list, formula disclosure or clinical proof of the finished product.</p>
              <a className="mt-8 inline-flex border-b border-[#d6ad57] pb-2 font-bold text-[#f1d58b]" href="/ingredients" data-analytics-event="ingredient_science_view">Explore Ingredients &amp; Science →</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {record.ingredientHighlights.map((ingredient) => (
                <article key={ingredient.name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl text-[#fff6e9]">{ingredient.displayName || ingredient.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${ingredient.state === "requires-product-specific-review" ? "bg-[#8e2f27] text-white" : "bg-[#d6ad57]/15 text-[#e7c77d]"}`}>
                      {ingredient.state === "requires-product-specific-review" ? "Under review" : "Document match"}
                    </span>
                  </div>
                  {ingredient.displayName ? <p className="mt-1 text-xs text-white/45">Label/MSDS name: {ingredient.name}</p> : null}
                  <p className="mt-4 text-sm font-bold text-[#e1c282]">{ingredient.function}</p>
                  <p className="mt-2 text-sm leading-7 text-white/58">{ingredient.explanation}</p>
                  {ingredient.caution ? <p className="mt-3 border-l-2 border-[#b34d3e] pl-3 text-xs leading-6 text-[#efc8bf]">{ingredient.caution}</p> : null}
                </article>
              ))}
            </div>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#d6ad57]/25 bg-[#1b120f] p-7 md:p-10" aria-labelledby="label-declaration-heading">
            <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Supplied label declaration</p>
                <h2 id="label-declaration-heading" className="mt-4 font-serif text-4xl leading-none text-[#fff6e9] md:text-5xl">What the artwork currently lists.</h2>
                <p className="mt-5 text-sm leading-7 text-white/58">Transcribed from the variant label artwork supplied on 23 October 2026. Names are reproduced as shown and have not been silently converted into regulatory INCI terminology. This is not a formula-percentage disclosure or confirmation that the artwork is approved for printing.</p>
              </div>
              <div>
                <ol className="flex flex-wrap gap-2" aria-label={`Ingredients shown on the supplied ${record.variant} label artwork`}>
                  {record.labelIngredientDeclaration.map((ingredient, index) => (
                    <li key={`${ingredient}-${index}`} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-2 text-xs leading-5 text-white/72">
                      <span className="sr-only">{index + 1}. </span>{ingredient}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-l-2 border-[#d6ad57] pl-4 text-sm leading-7 text-[#e7d3ac]">{record.finalInciStatus}</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#241910] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <article>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9a582c]">Precautions &amp; open questions</p>
            <h2 className="mt-4 font-serif text-5xl leading-none">Use with the right context.</h2>
            <ul className="mt-8 grid gap-4">
              {record.precautions.map((precaution) => (
                <li key={precaution} className="rounded-xl border border-black/10 bg-white p-5 leading-7 text-black/66">{precaution}</li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-[#b67b3d]/30 bg-[#f4e7d1] p-5 text-sm leading-7 text-[#5d422a]">
              <strong>INCI publication status:</strong> {record.finalInciStatus}
            </div>
          </article>

          <article className="rounded-[2rem] bg-[#241812] p-7 text-white md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Evidence basis</p>
            <h2 className="mt-4 font-serif text-4xl">Records reviewed for this variant.</h2>
            <div className="mt-8 grid gap-5">
              {record.evidence.map((source) => (
                <section key={source.id} className="border-t border-white/12 pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-[#fff3dd]">{source.reference}</h3>
                    <span className="text-xs text-white/45">Reviewed {source.reviewed}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/58">{source.publicSummary}</p>
                </section>
              ))}
            </div>
            <p className="mt-7 text-xs leading-6 text-white/42">Evidence summaries protect confidential formula percentages and do not replace the original controlled documents.</p>
          </article>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["Plain-language facts", "/product-facts", "A compact record for people, search engines and AI systems."],
            ["Common questions", "/faq", "Face use, daily use, variants, ingredients and buying channels."],
            ["Quality status", "/quality", "Manufacturing certificates, company licence and registration status kept separate."]
          ].map(([title, href, text]) => (
            <a key={href} href={href} className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(68,43,20,0.07)] transition hover:-translate-y-1">
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-3 leading-7 text-black/60">{text}</p>
              <span className="mt-5 inline-block font-bold text-[#81552c]">Explore →</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
