"use client";

import { useEffect, useMemo, useState } from "react";
import { cosmeticsCategories, editableCosmeticsProducts, productPriceLabel, productSortOptions, productStockLabel, type EditableCosmeticsProduct } from "../data/cosmetics-catalog";
import { PRICE_INQUIRY_NOTE, rwandaLocations, site, whatsappOrderUrl } from "../commerce-data";

type ViewMode = "grid" | "list";
type CartItem = { slug: string; quantity: number };
type SortOption = (typeof productSortOptions)[number];
type CategoryOption = (typeof cosmeticsCategories)[number];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function productMessage(product: EditableCosmeticsProduct, action: string) {
  return [
    `Hello BaBra Cosmetics, ${action}.`,
    `Product: ${product.name} ${product.size}`,
    `SKU: ${product.sku}`,
    "Please confirm official price, stock, delivery, and payment options."
  ].join("\n");
}

function ProductCard({ product, view, wished, compared, onAddCart, onWishlist, onCompare, onViewed }: { product: EditableCosmeticsProduct; view: ViewMode; wished: boolean; compared: boolean; onAddCart: (slug: string) => void; onWishlist: (slug: string) => void; onCompare: (slug: string) => void; onViewed: (slug: string) => void }) {
  return (
    <article className={view === "grid" ? "group overflow-hidden rounded-lg border border-white/10 bg-[#16100f] shadow-2xl shadow-black/20" : "grid overflow-hidden rounded-lg border border-white/10 bg-[#16100f] shadow-2xl shadow-black/20 md:grid-cols-[280px_1fr]"}>
      <a href={`/products/${product.slug}`} onClick={() => onViewed(product.slug)} className="block bg-gradient-to-br from-white via-[#fff8eb] to-[#d6ad57] p-5">
        <img className="h-80 w-full object-contain transition duration-500 group-hover:scale-[1.03]" src={product.gallery[0].src} alt={product.gallery[0].alt} loading="lazy" />
      </a>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#f1d58b]/35 bg-[#f1d58b]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b]">{product.category}</span>
          <span className="rounded-full border border-[#4ebeff]/30 bg-[#4ebeff]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#9be0ff]">Editable</span>
        </div>
        <h2 className="mt-4 font-serif text-4xl leading-none">{product.name}</h2>
        <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/46">{product.sku}</p>
        <p className="mt-4 leading-7 text-white/64">{product.description}</p>
        <div className="mt-5 grid gap-2 text-sm font-bold text-white/70">
          <span>{productPriceLabel(product)}</span>
          <span>{productStockLabel(product)}</span>
          <span>{product.barcodePlaceholder}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => onAddCart(product.slug)} className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#080606]">Add to cart</button>
          <a className="rounded-full border border-[#f1d58b]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={`/products/${product.slug}`}>View</a>
          <button type="button" onClick={() => onWishlist(product.slug)} className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/80">{wished ? "Wishlisted" : "Wishlist"}</button>
          <button type="button" onClick={() => onCompare(product.slug)} className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/80">{compared ? "Comparing" : "Compare"}</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a className="text-sm font-black text-[#9be0ff] underline-offset-4 hover:underline" href={whatsappOrderUrl(productMessage(product, "I want to buy this product on WhatsApp"))} target="_blank" rel="noopener noreferrer">Buy on WhatsApp</a>
          <a className="text-sm font-black text-[#9be0ff] underline-offset-4 hover:underline" href={whatsappOrderUrl(productMessage(product, "I want to request a quotation"))} target="_blank" rel="noopener noreferrer">Request quotation</a>
          <a className="text-sm font-black text-[#9be0ff] underline-offset-4 hover:underline" href={whatsappOrderUrl(productMessage(product, "I have an international inquiry"))} target="_blank" rel="noopener noreferrer">International inquiry</a>
        </div>
      </div>
    </article>
  );
}

export function StoreClient() {
  const [view, setView] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryOption>("All");
  const [sort, setSort] = useState<SortOption>("Featured");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [province, setProvince] = useState("Kigali City");
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setCart(readJson<CartItem[]>("babra-cart", []));
    setWishlist(readJson<string[]>("babra-wishlist", []));
    setCompare(readJson<string[]>("babra-compare", []));
    setRecent(readJson<string[]>("babra-recent-products", []));
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = editableCosmeticsProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = !normalizedQuery || [product.name, product.sku, product.category, product.size].join(" ").toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "Name A-Z") return a.name.localeCompare(b.name);
      if (sort === "Category") return a.category.localeCompare(b.category);
      return Number(b.isFeatured) - Number(a.isFeatured);
    });
  }, [category, query, sort]);

  const cartLines = cart.map((line) => ({ ...line, product: editableCosmeticsProducts.find((product) => product.slug === line.slug) })).filter((line): line is CartItem & { product: EditableCosmeticsProduct } => Boolean(line.product));
  const recentProducts = recent.map((slug) => editableCosmeticsProducts.find((product) => product.slug === slug)).filter((product): product is EditableCosmeticsProduct => Boolean(product));
  const compareProducts = compare.map((slug) => editableCosmeticsProducts.find((product) => product.slug === slug)).filter((product): product is EditableCosmeticsProduct => Boolean(product));

  function persistCart(next: CartItem[]) {
    setCart(next);
    saveJson("babra-cart", next);
  }

  function addCart(slug: string) {
    const found = cart.find((item) => item.slug === slug);
    persistCart(found ? cart.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)) : [...cart, { slug, quantity: 1 }]);
    markViewed(slug);
  }

  function updateQuantity(slug: string, quantity: number) {
    const safe = Math.max(0, quantity);
    persistCart(safe === 0 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => (item.slug === slug ? { ...item, quantity: safe } : item)));
  }

  function toggleStored(key: "babra-wishlist" | "babra-compare", slug: string, setter: (value: string[]) => void, current: string[], limit?: number) {
    const exists = current.includes(slug);
    const next = exists ? current.filter((item) => item !== slug) : [slug, ...current.filter((item) => item !== slug)].slice(0, limit ?? 20);
    setter(next);
    saveJson(key, next);
  }

  function markViewed(slug: string) {
    const next = [slug, ...recent.filter((item) => item !== slug)].slice(0, 4);
    setRecent(next);
    saveJson("babra-recent-products", next);
  }

  const quoteMessage = [
    `Hello ${site.name}, I want a cosmetics order quote.`,
    `Items: ${cartLines.map((line) => `${line.product.name} x${line.quantity}`).join(", ") || "Please advise"}.`,
    `Delivery province: ${province}.`,
    coupon ? `Coupon/reference: ${coupon}.` : "No coupon/reference yet.",
    "Please confirm official price, discount, stock, delivery options, and payment workflow."
  ].join("\n");

  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_78%_12%,rgba(16,36,97,0.58),transparent_34rem)] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics Enterprise Store</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Luxury cosmetics commerce, ready for official data.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">Search, compare, wishlist, request quotations, and prepare checkout for the three approved editable 500ml lotion products.</p>
          </div>
          <aside className="rounded-lg border border-[#f1d58b]/20 bg-white/[0.06] p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Mini cart</p>
            <p className="mt-2 text-4xl font-serif">{cartLines.reduce((sum, item) => sum + item.quantity, 0)} items</p>
            <p className="mt-2 text-sm text-white/58">{PRICE_INQUIRY_NOTE}</p>
            <a className="mt-5 inline-flex rounded-full bg-[#f1d58b] px-5 py-3 font-black text-[#080606]" href="#checkout">Checkout summary</a>
          </aside>
        </div>
      </section>

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-lg border border-white/10 bg-[#14100f] p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
          <label className="grid gap-2 text-sm font-bold text-white/72">Search
            <input className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, SKU, category" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-white/72">Category
            <select className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white" value={category} onChange={(event) => setCategory(event.target.value as CategoryOption)}>
              {cosmeticsCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-white/72">Sort
            <select className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              {productSortOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="flex rounded-lg border border-white/10 p-1">
            {(["grid", "list"] as ViewMode[]).map((mode) => (
              <button key={mode} type="button" className={`rounded-md px-4 py-3 text-sm font-black capitalize ${view === mode ? "bg-[#f1d58b] text-[#080606]" : "text-white/70"}`} onClick={() => setView(mode)}>{mode}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className={`mx-auto max-w-7xl ${view === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-5"}`}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} view={view} wished={wishlist.includes(product.slug)} compared={compare.includes(product.slug)} onAddCart={addCart} onWishlist={(slug) => toggleStored("babra-wishlist", slug, setWishlist, wishlist)} onCompare={(slug) => toggleStored("babra-compare", slug, setCompare, compare, 3)} onViewed={markViewed} />
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#111827] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#0b2a5b]">Compare</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">Compare editable product fields.</h2>
            <div className="mt-8 overflow-x-auto rounded-lg border border-black/10 bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0b2a5b] text-white"><tr><th className="p-4">Field</th>{compareProducts.map((product) => <th className="p-4" key={product.slug}>{product.shortName}</th>)}</tr></thead>
                <tbody>{["size", "sku", "price", "stock", "barcode"].map((field) => <tr className="border-t border-black/10" key={field}><th className="p-4 capitalize">{field}</th>{compareProducts.map((product) => <td className="p-4" key={`${product.slug}-${field}`}>{field === "size" ? product.size : field === "sku" ? product.sku : field === "price" ? productPriceLabel(product) : field === "stock" ? productStockLabel(product) : product.barcodePlaceholder}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
          <aside className="rounded-lg border border-black/10 bg-white p-6">
            <h2 className="font-serif text-4xl">Recently viewed</h2>
            <div className="mt-5 grid gap-3">{recentProducts.length ? recentProducts.map((product) => <a className="rounded-lg border border-black/10 p-3 font-bold hover:bg-[#fffaf1]" href={`/products/${product.slug}`} key={product.slug}>{product.name}</a>) : <p className="text-black/58">Recently viewed products will appear here.</p>}</div>
          </aside>
        </div>
      </section>

      <section id="checkout" className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-[#14100f] p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Checkout</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">Order summary and delivery options.</h2>
            <div className="mt-8 grid gap-4">
              {cartLines.length ? cartLines.map((line) => <div className="grid gap-3 rounded-lg border border-white/10 p-4 md:grid-cols-[1fr_auto_auto] md:items-center" key={line.slug}><div><h3 className="font-serif text-2xl">{line.product.name}</h3><p className="text-sm text-white/54">{line.product.sku}</p></div><input aria-label={`Quantity for ${line.product.name}`} className="w-24 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white" type="number" min="0" value={line.quantity} onChange={(event) => updateQuantity(line.slug, Number(event.target.value))} /><button type="button" className="rounded-full border border-white/15 px-4 py-2 text-sm font-black" onClick={() => updateQuantity(line.slug, 0)}>Remove</button></div>) : <p className="rounded-lg border border-white/10 p-4 text-white/62">Cart is empty.</p>}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white/72">Delivery province<select className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white" value={province} onChange={(event) => setProvince(event.target.value)}>{Object.keys(rwandaLocations).map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold text-white/72">Coupon / reference architecture<input className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Optional code, disabled until official" /></label>
            </div>
          </div>
          <aside className="rounded-lg border border-[#f1d58b]/20 bg-[#0b2a5b] p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Quote total</p>
            <p className="mt-4 font-serif text-5xl">Price on request</p>
            <p className="mt-4 leading-7 text-white/68">No fake total is calculated. BaBra confirms price, discount, stock, and delivery manually or through configured payment workflows.</p>
            <a className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#080606]" href={whatsappOrderUrl(quoteMessage)} target="_blank" rel="noopener noreferrer">Buy on WhatsApp</a>
          </aside>
        </div>
      </section>
    </main>
  );
}