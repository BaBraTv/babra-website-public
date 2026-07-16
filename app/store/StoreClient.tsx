"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PRICE_INQUIRY_LABEL, PRICE_INQUIRY_NOTE, products, rwandaLocations, site, whatsappOrderUrl } from "../commerce-data";
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
    add: "Ask price",
    fallback: "Ask on WhatsApp"
  },
  rw: {
    hero: "Gura skincare ya BaBra mu Rwanda no ku bakiriya mpuzamahanga.",
    cart: "Agaseke",
    checkout: "Kwishyura",
    profile: "Umwirondoro",
    tracking: "Gukurikirana commande",
    add: "Baza igiciro",
    fallback: "Baza kuri WhatsApp"
  },
  fr: {
    hero: "Achat skincare premium pour le Rwanda et les clients BaBra du monde.",
    cart: "Panier",
    checkout: "Commande",
    profile: "Profil client",
    tracking: "Suivi commande",
    add: "Demander le prix",
    fallback: "Demander sur WhatsApp"
  }
};

type Lang = keyof typeof translations;

export function StoreClient() {
  const [language, setLanguage] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerType, setCustomerType] = useState("Retail");
  const [orderCode, setOrderCode] = useState("BABRA-STORE-0001");
  const [selectedProvince, setSelectedProvince] = useState("Kigali City");
  const copy = translations[language];

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("babra-cart");
      const savedLanguage = window.localStorage.getItem("babra-store-language") as Lang | null;
      const savedCustomerType = window.localStorage.getItem("babra-customer-type");
      if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
      if (savedLanguage && translations[savedLanguage]) setLanguage(savedLanguage);
      if (savedCustomerType) setCustomerType(savedCustomerType);
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

  function saveCustomerType(next: string) {
    setCustomerType(next);
    window.localStorage.setItem("babra-customer-type", next);
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
  }

  function updateQuantity(slug: string, quantityValue: number) {
    const safeQuantity = Math.max(0, quantityValue);
    const next = safeQuantity === 0 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => (item.slug === slug ? { ...item, quantity: safeQuantity } : item));
    saveCart(next);
  }

  function saveDraftOrder() {
    const nextOrderCode = `BABRA-${Date.now().toString().slice(-6)}`;
    setOrderCode(nextOrderCode);
    window.localStorage.setItem(
      "babra-draft-order",
      JSON.stringify({
        code: nextOrderCode,
        customerType,
        province: selectedProvince,
        items: cartLines.map((item) => ({ slug: item!.slug, quantity: item!.quantity })),
        createdAt: new Date().toLocaleString()
      })
    );
  }

  const whatsappMessage = [
    `Hello ${site.name}, I want to place an order on ${site.domain}.`,
    `Items: ${cartLines.map((item) => `${item!.product.shortName} x${item!.quantity}`).join(", ") || "Please advise"}.`,
    "Please confirm today's price, delivery cost, and availability.",
    "If I qualify for reseller, wholesale, or distributor pricing, please advise me.",
    "Delivery: Rwanda address will be confirmed by province, district, sector, cell, village, phone, landmark, and notes."
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
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Store commerce app</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-[0.9] md:text-8xl">Shop official BaBra products.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{copy.hero}</p>
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
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]">Official product information pending approval.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Product pages</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Women, men, and babies.</h2>
            </div>
            <a className="rounded-full border border-white/20 px-5 py-3 font-black text-white" href="/products">
              View full catalog
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
                  <p className="mt-3 leading-7 text-white/62">{product.description}</p>
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#d6ad57]">{product.size}</p>
                  <p className="mt-1 text-xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
                  <p className="mt-1 text-xs font-bold text-white/48">{PRICE_INQUIRY_NOTE}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]" onClick={() => addToCart(product.slug)} type="button">
                      {copy.add}
                    </button>
                    <a className="rounded-full border border-[#d6ad57]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={`/products/${product.slug}`}>
                      Details
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
                Add products you want, then ask BaBra to confirm today&apos;s price, delivery, reseller, wholesale, or distributor offer.
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
              <p className="mt-2 text-white/62">BaBra support confirms price after checking product, quantity, delivery location, and customer type.</p>
              <p className="mt-4 text-3xl font-black">{PRICE_INQUIRY_LABEL}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <form className="rounded-lg border border-white/10 bg-[#18110f] p-6 lg:col-span-2">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">{copy.checkout}</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">Rwanda-first delivery.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white/78">
                Customer type
                <select className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" value={customerType} onChange={(event) => saveCustomerType(event.target.value)}>
                  {["Retail", "Reseller", "Wholesale", "Distributor"].map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/78">
                Province
                <select className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" value={selectedProvince} onChange={(event) => setSelectedProvince(event.target.value)}>
                  {Object.keys(rwandaLocations).map((province) => (
                    <option key={province}>{province}</option>
                  ))}
                </select>
              </label>
              {["District", "Sector", "Cell", "Village", "Phone / WhatsApp", "Nearest landmark"].map((field) => (
                <label key={field} className="grid gap-2 text-sm font-bold text-white/78">
                  {field}
                  {field === "District" ? (
                    <select className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white">
                      {rwandaLocations[selectedProvince as keyof typeof rwandaLocations].map((district) => (
                        <option key={district}>{district}</option>
                      ))}
                    </select>
                  ) : (
                    <input className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder={field} />
                  )}
                </label>
              ))}
              <label className="grid gap-2 text-sm font-bold text-white/78 md:col-span-2">
                Delivery notes
                <textarea className="min-h-28 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Building color, gate number, preferred delivery time, or rider instructions" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href={whatsappOrderUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                {copy.fallback}
              </a>
              <button className="rounded-full border border-white/20 px-6 py-3 font-black text-white" type="button" onClick={saveDraftOrder}>
                Save draft order
              </button>
            </div>
          </form>

          <aside className="grid gap-5">
            <section className="rounded-lg border border-white/10 bg-[#18110f] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#d6ad57]">{copy.profile}</p>
              <div className="mt-5 grid gap-3">
                {["Full name", "Phone", "Email", "Preferred language"].map((field) => (
                  <input key={field} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder={field} />
                ))}
              </div>
            </section>
            <section className="rounded-lg border border-white/10 bg-[#18110f] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#d6ad57]">{copy.tracking}</p>
              <input className="mt-5 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white" value={orderCode} onChange={(event) => setOrderCode(event.target.value)} />
              <div className="mt-5 grid gap-3">
                {["Order received", "Payment confirmation", "Packing", "Out for delivery"].map((step, index) => (
                  <div key={step} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-white/78">
                    <span className="whitespace-nowrap">Step {index + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            [site.company, site.address],
            ["Phone / WhatsApp", site.phone],
            ["Email", site.email],
            ["Trust status", `${site.license} ${site.manufacturing} ${site.positioning}`]
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
