import type { Metadata } from "next";
import { editableCosmeticsProducts } from "../data/cosmetics-catalog";

export const metadata: Metadata = {
  title: "BaBra Cosmetics | Enterprise Store",
  description: "Professional BaBra Cosmetics ecommerce section for editable Women, Men, and Babies 500ml lotion products."
};

export default function CosmeticsPage() {
  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra Holding Ltd</a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Luxury lotion commerce with editable product control.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">The cosmetics section now focuses on the three approved 500ml BaBra lotion product structures. Official content can be edited through the product architecture before public launch.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#080606]" href="/store">Open Store</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/products">Product Catalog</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {editableCosmeticsProducts.map((product) => <img key={product.slug} className="h-96 rounded-lg bg-[#fffaf1] object-contain p-5" src={product.gallery[0].src} alt={product.gallery[0].alt} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#111827] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#0b2a5b]">Editable products</p>
          <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Admin-ready product fields.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {editableCosmeticsProducts.map((product) => <article key={product.slug} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5"><h3 className="font-serif text-4xl">{product.name}</h3><p className="mt-4 text-black/62">Supports name, description, features, ingredients placeholder, directions, gallery, price, discount, stock, SKU, and barcode placeholder.</p><a className="mt-6 inline-flex rounded-full bg-[#0b2a5b] px-5 py-3 font-black text-white" href={`/products/${product.slug}`}>Review page</a></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}