import type { Metadata } from "next";
import Image from "next/image";
import { rwandaOrderUrl, rwandaOrders, site, whatsappOrderUrl } from "../commerce-data";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById } from "../data/official-media";
import PartnerLocator from "./PartnerLocator";

const canonical = `${site.url}/where-to-buy`;
const description = "Find confirmed BaBra Lotion ordering channels and authorized pharmacy or retail partners in Rwanda without unverified listings.";
const rwandaOrderMessage = "Hello VIDAPHARMA, I would like to order BaBra Lotion in Rwanda. Please confirm the current price, stock, collection or delivery options, and the nearest available stock point.";
const internationalMessage = "Hello BaBra Cosmetics, I would like to order BaBra Lotion outside Rwanda. Please confirm the available editions, price and delivery options for my destination.";

export const metadata: Metadata = {
  title: "Authorized Pharmacy & Retail Partners | BaBra Lotion",
  description,
  alternates: { canonical, languages: { "en-RW": canonical, "x-default": canonical } },
  openGraph: { title: "Where to Buy BaBra Lotion", description, url: canonical, type: "website", images: [{ url: "/media/products/babra-lotion-women-luxury-500ml.webp", alt: "BaBra Lotion Signature for Her 500 mL bottle" }] },
  twitter: { card: "summary_large_image", title: "Where to Buy BaBra Lotion", description, images: ["/media/products/babra-lotion-women-luxury-500ml.webp"] }
};

export default function WhereToBuyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: "Authorized Pharmacy and Retail Partners",
    description,
    inLanguage: "en-RW",
    mainEntity: {
      "@type": "Organization",
      name: rwandaOrders.legalName,
      url: rwandaOrders.website,
      telephone: `+${rwandaOrders.whatsapp}`,
      logo: `${site.url}${rwandaOrders.logo}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kiyovu, Nyarugenge",
        addressRegion: "Kigali City",
        addressCountry: "RW"
      }
    }
  };

  const candidateMapUrl = process.env.NEXT_PUBLIC_BABRA_PARTNER_MAP_URL?.trim();
  const projectMapUrl = candidateMapUrl && /^https:\/\/(earth\.google\.com\/|www\.google\.com\/maps\/d\/)/i.test(candidateMapUrl)
    ? candidateMapUrl
    : undefined;

  return (
    <main className="min-h-screen bg-[#0b0807] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_12%,rgba(214,173,87,0.22),transparent_32rem),radial-gradient(circle_at_10%_85%,rgba(111,49,37,0.22),transparent_30rem)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <a className="text-xs font-black uppercase tracking-[0.2em] text-[#e5c67f]" href="/cosmetics">BaBra Cosmetics</a>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Authorized pharmacy &amp; retail partners</p>
            <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.96] tracking-[-0.045em] md:text-8xl">Find your <em className="font-normal text-[#d8b77c]">BaBra.</em></h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">Use the confirmed Rwanda ordering channel below for current stock, collection and delivery assistance. Partner details appear only when the business name, logo, telephone and location are supported by official sources.</p>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-[#d6ad57]/25 bg-[radial-gradient(circle_at_50%_15%,#ffffff,#fff8e6_52%,#c99f37)] p-6 shadow-2xl shadow-black/40">
            <OfficialMedia className="h-[430px] w-full object-contain drop-shadow-2xl" media={officialMediaById["babra-lotion-women-500ml"]} priority sizes="(min-width: 1024px) 42vw, 92vw" />
          </figure>
        </div>
      </header>

      <section className="bg-[#f7f0e5] px-5 py-16 text-[#251a13] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b5c28]">Confirmed Rwanda order channel</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-6xl">Professional service through VIDAPHARMA.</h2>

          <article className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(68,43,20,0.12)]">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="flex min-h-80 items-center justify-center bg-[#f5f7f3] p-8">
                <Image src={rwandaOrders.logo} alt="Official VIDAPHARMA LTD logo" width={1024} height={1024} className="h-64 w-full object-contain" sizes="(min-width: 1024px) 28vw, 70vw" />
              </div>
              <div className="p-7 md:p-10">
                <span className="inline-flex rounded-full bg-[#e8f1eb] px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-[#075b36]">Rwanda ordering &amp; distribution partner</span>
                <h3 className="mt-5 font-serif text-5xl">{rwandaOrders.legalName}</h3>
                <p className="mt-5 max-w-2xl leading-8 text-black/64">Contact VIDAPHARMA for BaBra Lotion Signature for Her, Signature for Him or Soft Care for Kids. Confirm current price, stock and collection or delivery arrangements directly.</p>

                <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl border border-black/10 p-5">
                    <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#8b5c28]">Order telephone</dt>
                    <dd className="mt-3 text-2xl font-black"><a href={`tel:+${rwandaOrders.whatsapp}`}>{rwandaOrders.phone}</a></dd>
                  </div>
                  <div className="rounded-xl border border-black/10 p-5">
                    <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#8b5c28]">Licensed premises location</dt>
                    <dd className="mt-3 leading-7 font-bold">{rwandaOrders.location}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a className="rounded-full bg-[#25170f] px-7 py-4 font-bold text-white" href={rwandaOrderUrl(rwandaOrderMessage)} target="_blank" rel="noopener noreferrer">Order via VIDAPHARMA</a>
                  <a className="rounded-full border border-black/20 px-7 py-4 font-bold" href={rwandaOrders.website} target="_blank" rel="noopener noreferrer">Official partner website</a>
                </div>
                <p className="mt-6 text-sm leading-7 text-black/52">VIDAPHARMA LTD and its Kiyovu premises appear in the <a className="font-bold underline underline-offset-4" href={rwandaOrders.rwandaFdaListing} target="_blank" rel="noopener noreferrer">Rwanda FDA licensed wholesale pharmacies list</a>. Confirm the collection point before travelling.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <PartnerLocator projectMapUrl={projectMapUrl} />

      <section className="bg-[#211610] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d6ad57]">Nearby pharmacy or stockist</p>
            <h2 className="mt-4 font-serif text-4xl">Ask before you travel.</h2>
            <p className="mt-5 leading-8 text-white/68">Share your location and preferred BaBra edition with VIDAPHARMA. They will confirm current availability, collection or delivery options without directing you to an unconfirmed retailer.</p>
            <a className="mt-7 inline-flex rounded-full bg-[#e7c681] px-7 py-4 font-bold text-[#26180d]" href={rwandaOrderUrl(rwandaOrderMessage)} target="_blank" rel="noopener noreferrer">Ask for current stock</a>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d6ad57]">Outside Rwanda</p>
            <h2 className="mt-4 font-serif text-4xl">Speak directly with BaBra.</h2>
            <p className="mt-5 leading-8 text-white/68">International orders, wholesale and distribution enquiries remain with BaBra Cosmetics. The team confirms current availability, shipping and payment instructions for your destination.</p>
            <a className="mt-7 inline-flex rounded-full border border-white/25 px-7 py-4 font-bold text-white" href={whatsappOrderUrl(internationalMessage)} target="_blank" rel="noopener noreferrer">International enquiry</a>
          </article>
        </div>
      </section>
    </main>
  );
}
