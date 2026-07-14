import type { Metadata } from "next";
import { editableCosmeticsProducts, productPriceLabel, productStockLabel } from "../data/cosmetics-catalog";
import { site } from "../commerce-data";

export const metadata: Metadata = {
  title: "BaBra Cosmetics Products | Women, Men, Babies Lotion 500ml",
  description: "Official editable product structure for BaBra Lotion Women 500ml, Men 500ml, and Babies 500ml.",
  openGraph: {
    title: "BaBra Cosmetics Products",
    description: "Official editable BaBra lotion product catalog.",
    images: [{ url: "/brand/official-babra-bottle.png", width: 1200, height: 630, alt: "BaBra Cosmetics official bottle" }]
  }
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <section className="border-b border-white/10 px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/store">{site.domain} store</a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official product structure</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">BaBra Cosmetics editable catalog.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">Only the approved 500ml lotion product structure is shown. Price, ingredients, stock, barcode, gallery, and product content remain editable by admin.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {editableCosmeticsProducts.map((product) => <img key={product.slug} className="h-80 rounded-lg bg-[#fffaf1] object-contain p-5" src={product.gallery[0].src} alt={product.gallery[0].alt} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {editableCosmeticsProducts.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-lg border border-white/10 bg-[#16100f] shadow-2xl shadow-black/20">
              <a href={`/products/${product.slug}`} className="block bg-gradient-to-br from-white via-[#fff8eb] to-[#d6ad57] p-5">
                <img className="h-96 w-full object-contain" src={product.gallery[0].src} alt={product.gallery[0].alt} loading="lazy" />
              </a>
              <div className="p-6">
                <span className="rounded-full border border-[#f1d58b]/35 bg-[#f1d58b]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">{product.category}</span>
                <h2 className="mt-4 font-serif text-4xl leading-none">{product.name}</h2>
                <p className="mt-4 leading-7 text-white/62">{product.description}</p>
                <dl className="mt-5 grid gap-2 text-sm text-white/70">
                  <div><dt className="font-black text-[#f1d58b]">SKU</dt><dd>{product.sku}</dd></div>
                  <div><dt className="font-black text-[#f1d58b]">Price</dt><dd>{productPriceLabel(product)}</dd></div>
                  <div><dt className="font-black text-[#f1d58b]">Stock</dt><dd>{productStockLabel(product)}</dd></div>
                </dl>
                <a className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-5 py-3 font-black text-[#080606]" href={`/products/${product.slug}`}>Open product page</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}