"use client";

import { useMemo, useState } from "react";
import { PRICE_INQUIRY_NOTE, site, whatsappOrderUrl } from "../commerce-data";
import { productPriceLabel, productStockLabel, relatedEditableProducts, type EditableCosmeticsProduct } from "../data/cosmetics-catalog";

function message(product: EditableCosmeticsProduct, intent: string) {
  return [`Hello BaBra Cosmetics, ${intent}.`, `Product: ${product.name} ${product.size}`, `SKU: ${product.sku}`, "Please confirm official price, stock, delivery, and next steps."].join("\n");
}

export function ProductDetailClient({ product }: { product: EditableCosmeticsProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const related = useMemo(() => relatedEditableProducts(product.slug), [product.slug]);

  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <figure className="overflow-hidden rounded-lg border border-[#f1d58b]/25 bg-gradient-to-br from-white via-[#fff8eb] to-[#d6ad57] p-5">
              <img className="h-[560px] w-full cursor-zoom-in object-contain drop-shadow-2xl transition duration-500 hover:scale-110" src={selectedImage.src} alt={selectedImage.alt} />
            </figure>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.gallery.map((image) => (
                <button key={image.src} type="button" onClick={() => setSelectedImage(image)} className="rounded-lg border border-white/10 bg-white p-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#4ebeff]">
                  <img className="h-24 w-full object-contain" src={image.src} alt={image.alt} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/store">BaBra Cosmetics Store</a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">{product.category} / {product.size}</p>
            <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">{product.name}</h1>
            <p className="mt-5 text-xl leading-8 text-white/70">{product.description}</p>
            <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:grid-cols-2">
              <div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">Price</span><p className="mt-1 text-2xl font-black">{productPriceLabel(product)}</p></div>
              <div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">Stock</span><p className="mt-1 text-2xl font-black">{productStockLabel(product)}</p></div>
              <div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">SKU</span><p className="mt-1 font-bold text-white/76">{product.sku}</p></div>
              <div><span className="text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">Barcode</span><p className="mt-1 font-bold text-white/76">{product.barcodePlaceholder}</p></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#080606]" href={whatsappOrderUrl(message(product, "I want to buy this product on WhatsApp"))} target="_blank" rel="noopener noreferrer">Buy on WhatsApp</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href={whatsappOrderUrl(message(product, "I want to request a quotation"))} target="_blank" rel="noopener noreferrer">Request quotation</a>
              <a className="rounded-full border border-[#4ebeff]/35 px-6 py-3 font-black text-[#9be0ff]" href={whatsappOrderUrl(message(product, "I have an international inquiry"))} target="_blank" rel="noopener noreferrer">International inquiry</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#111827] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <article className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5 lg:col-span-2">
            <h2 className="font-serif text-5xl leading-none">Description and benefits</h2>
            <p className="mt-5 leading-8 text-black/64">{product.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{product.features.map((feature) => <div key={feature} className="rounded-lg border border-black/10 bg-[#fffaf1] p-4 font-bold">{feature}</div>)}</div>
          </article>
          <aside className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <h2 className="font-serif text-4xl">Specifications</h2>
            <dl className="mt-5 grid gap-3 text-sm"><div><dt className="font-black uppercase tracking-[0.14em] text-black/48">Brand</dt><dd className="mt-1 font-bold">{product.brand}</dd></div><div><dt className="font-black uppercase tracking-[0.14em] text-black/48">Category</dt><dd className="mt-1 font-bold">{product.category}</dd></div><div><dt className="font-black uppercase tracking-[0.14em] text-black/48">Size</dt><dd className="mt-1 font-bold">{product.size}</dd></div></dl>
          </aside>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[["Ingredients", product.ingredientsPlaceholder], ["Directions", product.directions], ["Shipping", "Shipping options are placeholders until official delivery configuration is approved."], ["Returns", "Returns policy is managed through the official BaBra support process and may be updated by admin."]].map(([title, text]) => <article key={title} className="rounded-lg border border-white/10 bg-[#16100f] p-6"><h2 className="font-serif text-4xl">{title}</h2><p className="mt-4 leading-7 text-white/62">{text}</p></article>)}
        </div>
      </section>

      <section className="bg-[#0b2a5b] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Reviews disabled</p><h2 className="mt-3 font-serif text-5xl leading-none">Official reviews are not published yet.</h2><p className="mt-5 leading-8 text-white/68">Customer reviews will stay disabled until BaBra approves a verified review workflow.</p></div>
          <div className="grid gap-4">{[["Is the price final online?", PRICE_INQUIRY_NOTE], ["Can I buy internationally?", "Use the international inquiry button so BaBra can confirm availability, payment, and delivery."], ["Are full ingredients public?", product.ingredientsPlaceholder]].map(([question, answer]) => <details key={question} className="rounded-lg border border-white/10 bg-white/[0.06] p-5"><summary className="cursor-pointer font-serif text-2xl">{question}</summary><p className="mt-3 leading-7 text-white/64">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl"><h2 className="font-serif text-5xl leading-none">Related products</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{related.map((item) => <a key={item.slug} href={`/products/${item.slug}`} className="rounded-lg border border-white/10 bg-[#16100f] p-5 hover:border-[#f1d58b]/35"><img className="h-72 w-full rounded-lg bg-[#fffaf1] object-contain p-4" src={item.gallery[0].src} alt={item.gallery[0].alt} loading="lazy" /><h3 className="mt-5 font-serif text-3xl">{item.name}</h3><p className="mt-2 text-white/58">{productPriceLabel(item)}</p></a>)}</div></div>
      </section>
    </main>
  );
}