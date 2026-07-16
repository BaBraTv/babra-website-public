import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById } from "../data/official-media";
import { PRICE_INQUIRY_LABEL, PRICE_INQUIRY_NOTE, products } from "../commerce-data";

const commerceBlocks = [
  ["Official products only", "This catalog displays only approved BaBra product media currently verified in the repository."],
  ["Pricing", PRICE_INQUIRY_NOTE],
  ["Ingredients", "Official information pending"],
  ["Reviews", "Official information pending"]
];

export const metadata: Metadata = {
  title: "BaBra Cosmetics Products | babra.store",
  description: "Official BaBra Lotion Women, Men, and Babies 500 ml product catalog."
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="border-b border-white/10 px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
            <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics Division</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Official BaBra Lotion catalog.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
              Only approved BaBra media is shown. Missing product details remain marked as official information pending.
            </p>
          </div>
          <figure className="overflow-hidden rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-4 shadow-2xl shadow-black/40">
            <OfficialMedia className="h-[420px] w-full object-contain" media={officialMediaById["babra-lotion-women-500ml"]} priority sizes="(min-width: 1024px) 46vw, 92vw" />
          </figure>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-lg border border-white/10 bg-[#18110f] shadow-2xl shadow-black/20">
              <figure className="bg-gradient-to-br from-white via-[#fff8eb] to-[#d5ad49] p-5">
                <OfficialMedia className="h-[420px] w-full object-contain drop-shadow-2xl" media={officialMediaById[product.mediaId]} sizes="(min-width: 1024px) 30vw, 92vw" />
              </figure>
              <div className="p-6">
                <span className="inline-flex whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">{product.category}</span>
                <h2 className="mt-3 font-serif text-5xl leading-none">{product.name}</h2>
                <p className="mt-5 leading-8 text-white/66">{product.description}</p>
                <p className="mt-5 text-xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
                <a className="mt-6 inline-flex rounded-full border border-[#d6ad57]/35 px-5 py-3 font-black text-[#f1d58b]" href={`/products/${product.slug}`}>View product</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Official data status</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Approved media now, pending details later.</h2>
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
    </main>
  );
}
