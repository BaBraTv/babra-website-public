import type { Metadata } from "next";
import { cosmetics, rwandaOrderUrl, rwandaOrders, site, whatsappOrderUrl } from "../commerce-data";

const canonical = `${site.url}/where-to-buy`;
export const metadata: Metadata = {
  title: "Where to Buy BaBra Lotion | Official Purchase Channels",
  description: "Discover BaBra Lotion's official Rwanda ordering channel, distribution partners and direct international enquiries.",
  alternates: { canonical },
  openGraph: { title: "Where to Buy BaBra Lotion", description: "Official BaBra Lotion ordering and distribution information.", url: canonical, images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] }
};

const rwandaLink = rwandaOrderUrl("Hello VIDAPHARMA, I would like to buy genuine BaBra Lotion. Please confirm the available editions, current price, collection point and delivery options.");
const partnerLink = whatsappOrderUrl("Hello BaBra Cosmetics, please help me find a current BaBra Lotion pharmacy or authorized stockist near my location in Rwanda. My location is: ");
const internationalLink = whatsappOrderUrl("Hello BaBra Cosmetics, I would like to order genuine BaBra Lotion outside Rwanda. My country and city are: ");

export default function WhereToBuyPage() {
  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <header className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(214,173,87,0.2),transparent_34rem)]" />
        <div className="mx-auto max-w-7xl">
          <a href="/cosmetics" className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]">BaBra Cosmetics</a>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Official purchase channels</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Find your <em className="font-normal text-[#d8b77c]">BaBra.</em></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">Choose an official ordering channel and enjoy personal assistance finding the right BaBra Lotion edition, stock location and delivery option.</p>
        </div>
      </header>
      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Rwanda & international enquiries</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Your collection. Your choice.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#946522]">Official Rwanda order channel</p>
              <h3 className="mt-4 font-serif text-4xl">VIDAPHARMA</h3>
              <p className="mt-5 leading-8 text-black/65">Contact VIDAPHARMA for BaBra Lotion Signature for Her, Signature for Him or Soft Care for Kids. Confirm current prices, stock and your collection or delivery arrangements directly.</p>
              <p className="mt-4 font-bold">{rwandaOrders.phone}</p>
              <a href={rwandaLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#26180d] px-6 py-4 font-bold text-white">Order via VIDAPHARMA</a>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#946522]">Pharmacy & stockist enquiries</p>
              <h3 className="mt-4 font-serif text-4xl">Find a nearby partner.</h3>
              <p className="mt-5 leading-8 text-black/65">BaBra works with professional pharmacy and distribution partners. Share your location with our team to confirm which nearby partner currently has your preferred edition available.</p>
              <a href={partnerLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#26180d] px-6 py-4 font-bold text-white">Ask for nearby stock</a>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(68,43,20,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#946522]">Global BaBra enquiries</p>
              <h3 className="mt-4 font-serif text-4xl">Order internationally.</h3>
              <p className="mt-5 leading-8 text-black/65">For international orders, wholesale and distribution enquiries, speak directly with BaBra Cosmetics Ltd about available options for your destination.</p>
              <p className="mt-4 font-bold">{cosmetics.phone}</p>
              <a href={internationalLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#26180d] px-6 py-4 font-bold text-white">Contact BaBra</a>
            </article>
          </div>
        </div>
      </section>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.24em] text-[#d6ad57]">Luxury in Every Touch</p><h2 className="mt-3 font-serif text-4xl md:text-5xl">Discover the signature collection.</h2></div>
          <a href="/cosmetics#collection" className="inline-flex justify-center rounded-full bg-[#e7c681] px-7 py-4 font-bold text-[#26180d]">Explore the collection</a>
        </div>
      </section>
    </main>
  );
}
