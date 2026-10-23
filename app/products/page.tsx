import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById } from "../data/official-media";
import { whatsappOrderUrl, rwandaOrderUrl, PRICE_INQUIRY_LABEL, PRICE_INQUIRY_NOTE, products, rwandaOrders, site } from "../commerce-data";

const commerceBlocks = [
  ["Three verified identities", "Explore Signature for Her, Signature for Him and Soft Care for Kids, each in a 500 mL presentation."],
  ["Pricing", PRICE_INQUIRY_NOTE],
  ["Evidence-labelled guidance", "Each product page separates current document matches from facts that still need final approval."],
  ["Personal assistance", "Contact BaBra for product-specific guidance, current label information and ordering support."]
];

const description = "Official BaBra Lotion catalog: Signature for Her, Signature for Him and Soft Care for Kids, all 500 mL, with evidence-labelled product information.";
export const metadata: Metadata = {
  title: "BaBra Lotion Collection | 500 mL Products",
  description,
  alternates: { canonical: `${site.url}/products`, languages: { "en-RW": `${site.url}/products`, "x-default": `${site.url}/products` } },
  openGraph: { title: "BaBra Lotion Collection", description, url: `${site.url}/products`, type: "website", images: [{ url: "/media/products/babra-lotion-women-500ml.png", alt: "BaBra Lotion Signature for Her 500 mL bottle" }] },
  twitter: { card: "summary_large_image", title: "BaBra Lotion Collection", description, images: ["/media/products/babra-lotion-women-500ml.png"] }
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <section className="relative border-b border-white/10 px-5 py-16 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_10%,rgba(29,78,216,0.18),transparent_28rem)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
            <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics Division</p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.05] md:text-7xl">Official BaBra Lotion catalog.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/66">
              Discover Signature for Her, Signature for Him and Soft Care for Kids. Read clear product facts, then ask our team about current prices, availability and delivery.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-[#d6ad57]/25 bg-[radial-gradient(circle_at_50%_15%,#ffffff,#fff8e6_52%,#c99f37)] p-6 shadow-2xl shadow-black/40">
            <OfficialMedia className="h-[440px] w-full object-contain drop-shadow-2xl" media={officialMediaById["babra-lotion-women-500ml"]} priority sizes="(min-width: 1024px) 46vw, 92vw" />
          </figure>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#18110f] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-[#d6ad57]/45">
              <figure className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_12%,#ffffff,#fff8eb_45%,#d5ad49)] p-5">
                <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-black/18 blur-2xl" aria-hidden="true" />
                <OfficialMedia className="relative h-[420px] w-full object-contain drop-shadow-2xl transition duration-700 group-hover:scale-[1.04]" media={officialMediaById[product.mediaId]} sizes="(min-width: 1024px) 30vw, 92vw" />
              </figure>
              <div className="p-6">
                <span className="inline-flex whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">{product.category}</span>
                <h2 className="mt-3 font-serif text-4xl leading-tight">{product.name}</h2>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-white/55">{product.size}</p>
                <p className="mt-3 text-xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
                <a className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[#f1d58b] px-5 py-3 text-center font-bold text-[#130d08]" href={rwandaOrderUrl(`Hello ${rwandaOrders.partner}, I would like to order ${product.name} from BaBra. Quantity: __. Delivery location: __. Please confirm price, stock and delivery fee.`)} target="_blank" rel="noopener noreferrer" data-analytics-event="rwanda_order_click">Rwanda order · {rwandaOrders.partner}</a>
                <a className="mt-3 flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-center font-bold text-white" href={whatsappOrderUrl(`Hello BaBra Cosmetics, I would like to order ${product.name} internationally. Quantity: __. Destination country/city: __. Please confirm price, stock and delivery options.`)} target="_blank" rel="noopener noreferrer">International order · BaBra</a>
                <a className="mt-3 inline-flex min-h-11 items-center rounded-full border border-[#d6ad57]/35 px-5 py-3 font-black text-[#f1d58b] transition hover:bg-[#f1d58b] hover:text-[#130d08]" href={`/products/${product.slug}`}>View Details</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Care and ordering</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-7xl">A little guidance for your order.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {commerceBlocks.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#130d0b] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Ingredients & Science", "/ingredients", "Understand cosmetic functions without confusing ingredient research with finished-product proof."],
            ["Public product facts", "/product-facts", "Read the compact, AI-friendly facts record and evidence status for every variant."],
            ["Factual FAQ", "/faq", "Get careful answers about face use, daily use, retinol, age guidance and official buying channels."]
          ].map(([title, href, text]) => (
            <a key={href} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 transition hover:border-[#d6ad57]/45" href={href}>
              <h2 className="font-serif text-3xl text-[#fff4e3]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
