import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById, officialMediaPendingLabel } from "../data/official-media";
import { products } from "../commerce-data";

export const metadata: Metadata = {
  title: "BaBra Cosmetics | Official Products",
  description: "Official BaBra Cosmetics product media for BaBra Lotion Women, Men, and Babies 500 ml."
};

export default function CosmeticsPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <h1 className="mt-8 max-w-5xl font-serif text-6xl leading-none md:text-8xl">BaBra Cosmetics</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
            Only approved official BaBra media is displayed. Missing product details remain marked as official information pending.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-lg border border-white/10 bg-[#18110f]">
                <figure className="bg-[#fffaf1] p-5">
                  <OfficialMedia className="h-96 w-full object-contain" media={officialMediaById[product.mediaId]} sizes="(min-width: 1024px) 30vw, 92vw" />
                </figure>
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{product.category}</p>
                  <h2 className="mt-3 font-serif text-4xl leading-none">{product.name}</h2>
                  <p className="mt-4 leading-7 text-white/62">{product.description}</p>
                  <a className="mt-5 inline-flex rounded-full border border-[#d6ad57]/35 px-5 py-3 font-black text-[#f1d58b]" href={`/products/${product.slug}`}>View product</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-white p-7">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]">Pending official content</p>
          <h2 className="mt-3 font-serif text-5xl leading-none">{officialMediaPendingLabel}</h2>
          <p className="mt-5 max-w-3xl leading-8 text-black/62">
            Prices, ingredients, certifications, medical claims, reviews, testimonials, and production details are not published until approved.
          </p>
        </div>
      </section>
    </main>
  );
}
