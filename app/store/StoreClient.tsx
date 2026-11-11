"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { trackAnalytics } from "../analytics-client";
import { PRICE_INQUIRY_LABEL, PRICE_INQUIRY_NOTE, products, rwandaOrderUrl, whatsappOrderUrl, rwandaOrders, site } from "../commerce-data";
import { InstallAppButton } from "../InstallAppButton";

type CartItem = {
  slug: string;
  quantity: number;
};

const translations = {
  en: {
    hero: "Premium skincare shopping for Rwanda and global BaBra customers.",
    cart: "Cart",
    checkout: "Checkout",
    profile: "Customer profile",
    tracking: "Order tracking",
    add: "Add to enquiry",
    fallback: "Ask on WhatsApp"
  },
  rw: {
    hero: "Gura skincare ya BaBra mu Rwanda no ku bakiriya mpuzamahanga.",
    cart: "Agaseke",
    checkout: "Kwishyura",
    profile: "Umwirondoro",
    tracking: "Gukurikirana commande",
    add: "Add to enquiry",
    fallback: "Baza kuri WhatsApp"
  },
  fr: {
    hero: "Achat skincare premium pour le Rwanda et les clients BaBra du monde.",
    cart: "Panier",
    checkout: "Commande",
    profile: "Profil client",
    tracking: "Suivi commande",
    add: "Add to enquiry",
    fallback: "Demander sur WhatsApp"
  }
};

type Lang = keyof typeof translations;

export function StoreClient() {
  const [language, setLanguage] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const copy = translations[language];

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("babra-cart");
      const savedLanguage = window.localStorage.getItem("babra-store-language") as Lang | null;
      if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
      if (savedLanguage && translations[savedLanguage]) setLanguage(savedLanguage);
    } catch {
      // Local storage is optional; WhatsApp ordering still works without it.
    }
  }, []);

  function saveCart(next: CartItem[]) {
    setCart(next);
    window.localStorage.setItem("babra-cart", JSON.stringify(next));
  }

  function saveLanguage(next: Lang) {
    setLanguage(next);
    window.localStorage.setItem("babra-store-language", next);
  }

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.slug === item.slug);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [cart]
  );

  function addToCart(slug: string) {
    const existing = cart.find((item) => item.slug === slug);
    const next = existing ? cart.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)) : [...cart, { slug, quantity: 1 }];
    saveCart(next);
    trackAnalytics("add_to_cart");
  }

  function updateQuantity(slug: string, quantityValue: number) {
    const safeQuantity = Math.max(0, quantityValue);
    const next = safeQuantity === 0 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => (item.slug === slug ? { ...item, quantity: safeQuantity } : item));
    saveCart(next);
  }

  const selectedItems = cartLines.map((item) => `${item!.product.shortName} x${item!.quantity}`).join(", ") || "Please help me choose a BaBra Lotion edition";
  const rwandaMessage = [
    `Hello ${rwandaOrders.partner}, I would like a BaBra Lotion quotation for delivery in Rwanda.`,
    `Products: ${selectedItems}.`,
    "Delivery location: __.",
    "Please confirm the current retail price, stock availability, delivery fee and next steps."
  ].join("\n");
  const internationalMessage = [
    "Hello BaBra Cosmetics, I would like an international BaBra Lotion quotation.",
    `Products: ${selectedItems}.`,
    "Destination country and city: __.",
    "Please confirm availability, international shipping, total price and payment instructions."
  ].join("\n");

  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <section className="relative border-b border-white/10 px-5 py-14 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_10%,rgba(241,213,139,0.16),transparent_28rem),radial-gradient(circle_at_12%_18%,rgba(29,78,216,0.18),transparent_26rem)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">
              {site.domain}
            </a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Signature Store</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-[0.9] md:text-8xl">Shop official BaBra products.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">Discover the BaBra Lotion collection. Our official team confirms price, stock and delivery before your order is placed.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {(["en", "rw", "fr"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  className={`rounded-full px-4 py-2 text-sm font-black uppercase ${language === lang ? "bg-[#f1d58b] text-[#130d08]" : "border border-white/20 text-white"}`}
                  onClick={() => saveLanguage(lang)}
                  type="button"
                >
                  {lang}
                </button>
              ))}
              <InstallAppButton />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                ["Cart", "/cart"],
                ["Checkout", "/checkout"],
                ["Orders", "/orders"],
                ["Profile", "/profile"]
              ].map(([label, href]) => (
                <a key={label} className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/72 hover:border-[#f1d58b]/60 hover:text-[#f1d58b]" href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#d6ad57]/25 bg-[linear-gradient(135deg,#fffaf1,#ffffff_50%,#d6ad57)] p-5 text-[#18110c] shadow-2xl shadow-black/35">
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <Image key={product.slug} className="h-52 w-full rounded-2xl bg-white/70 object-contain p-3 drop-shadow-xl" src={product.image} alt={product.alt} width={520} height={1024} sizes="(min-width: 1024px) 24vw, 45vw" />
              ))}
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]">Official BaBra Lotion collection · Price confirmed by BaBra support.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Product pages</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">For Her. For Him. For Kids.</h2>
            </div>
              <a className="rounded-full border border-white/20 px-5 py-3 font-black text-white transition hover:border-[#f1d58b]/60 hover:text-[#f1d58b]" href="/sample-request">
              Request Samples
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.slug} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#18110f] transition duration-500 hover:-translate-y-1 hover:border-[#d6ad57]/45">
                <a href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <figure className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_12%,#ffffff,#fff8eb_45%,#d6ad57)] p-4">
                    <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-black/18 blur-2xl" aria-hidden="true" />
                    <Image className="relative h-80 w-full object-contain drop-shadow-2xl transition duration-700 group-hover:scale-[1.04]" src={product.image} alt={product.alt} width={520} height={1024} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw" />
                  </figure>
                </a>
                <div className="p-5">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{product.category}</span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h3>
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#d6ad57]">{product.size}</p>
                  <p className="mt-1 text-xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
                  <p className="mt-1 text-xs font-bold text-white/48">{PRICE_INQUIRY_NOTE}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]" onClick={() => addToCart(product.slug)} type="button">
                      {copy.add}
                    </button>
                    <a className="rounded-full border border-[#d6ad57]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={`/products/${product.slug}`}>
                      View Details
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-14 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">{copy.cart}</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">Quote request.</h2>
              <p className="mt-5 leading-8 text-black/64">
                Add products you want. Rwanda retail orders are routed to VIDAPHARMA for current price, stock and delivery confirmation; wholesale and international enquiries remain with BaBra.
              </p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            {cartLines.length === 0 ? (
              <p className="leading-7 text-black/62">Cart is empty. Add a product above or use WhatsApp fallback for manual ordering.</p>
            ) : (
              <div className="grid gap-4">
                {cartLines.map((item) => (
                  <div key={item!.slug} className="grid gap-3 rounded-lg border border-black/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h3 className="font-serif text-2xl">{item!.product.name}</h3>
                      <p className="text-sm text-black/60">Price confirmed by BaBra support</p>
                    </div>
                    <input
                      aria-label={`Quantity for ${item!.product.name}`}
                      className="w-24 rounded-lg border border-black/15 px-3 py-2"
                      min="0"
                      onChange={(event) => updateQuantity(item!.slug, Number(event.target.value))}
                      type="number"
                      value={item!.quantity}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 rounded-lg bg-[#090706] p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">Price confirmation</p>
              <p className="mt-2 text-white/62">For Rwanda retail orders, VIDAPHARMA confirms current price, stock and delivery. BaBra handles wholesale and international enquiries.</p>
              <p className="mt-4 text-3xl font-black">{PRICE_INQUIRY_LABEL}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#d6ad57]/30 bg-[#18110f] p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Personal ordering assistance</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Your BaBra selection. One simple conversation.</h2>
          <p className="mt-6 max-w-3xl leading-8 text-white/70">Select products and quantities, then choose your destination. VIDAPHARMA handles Rwanda retail enquiries; BaBra Cosmetics assists with international orders. Prices and payment instructions are confirmed before any order or payment.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#f1d58b] px-7 py-4 font-bold text-[#130d08]" href={rwandaOrderUrl(rwandaMessage)} target="_blank" rel="noopener noreferrer">Rwanda order · VIDAPHARMA</a>
            <a className="rounded-full border border-white/30 px-7 py-4 font-bold text-white" href={whatsappOrderUrl(internationalMessage)} target="_blank" rel="noopener noreferrer">International order · BaBra</a>
          </div>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            [site.company, site.address],
            ["Rwanda orders · VIDAPHARMA", rwandaOrders.phone],
            ["BaBra Call / WhatsApp · international", site.phone],
            ["Email", site.email]
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-[#18110f] p-6">
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-white/62">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
