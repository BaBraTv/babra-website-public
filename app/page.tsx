import Image from "next/image";
import { productKnowledge, productKnowledgeList } from "../lib/product-knowledge";

const heroBottles = [productKnowledge.men, productKnowledge.women, productKnowledge.babies];

const navLinks = [
  ["The collection", "#collection"],
  ["Ingredients & Science", "/ingredients"],
  ["Where to Buy", "/where-to-buy"],
  ["Our Story", "#our-story"],
  ["Our World", "#our-world"],
  ["Store", "/store"],
  ["Gallery", "/gallery"],
  ["Community", "/community"],
  ["Contact", "/contact"]
] as const;

const divisions = [
  ["BaBra Cosmetics", "Beauty and personal care", "/cosmetics"],
  ["Rwanda Mobile Hub", "Technology and service", "/rwanda-mobile-hub"],
  ["BaBra Schools", "Education", "/schools"],
  ["BaBra AI Academy", "AI education", "/academy"],
  ["BaBra Foundation", "Community care", "/foundation"],
  ["LifeTalk TV", "Media and storytelling", "/lifetalk-tv"]
] as const;

const resources = [
  ["Ingredients & Science", "See what helps the lotion hold moisture and leave skin feeling soft.", "/ingredients"],
  ["Compare Body Lotions", "See BaBra alongside 10 body lotions using the same criteria.", "/compare-body-lotions"],
  ["Quality & Documentation", "Find manufacturing records and learn how to verify your bottle.", "/quality"],
  ["Where to Buy", "Find a pharmacy or retail partner and check availability.", "/where-to-buy"],
  ["Real BaBra Stories", "Read experiences shared by our customers.", "/testimonials"]
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f0e6] text-[#302017]">
      <header className="sticky top-11 z-50 border-b border-white/10 bg-[#1d1410]/95 text-[#fff7e9] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1500px] items-center justify-between gap-4 px-5 md:px-9">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="BaBra home">
            <Image
              src="/media/logos/babra-logo.jpeg"
              width={48}
              height={48}
              alt="Official BaBra logo"
              className="h-10 w-10 rounded-full border border-[#d6ad57]/40 bg-white object-contain md:h-12 md:w-12"
            />
            <span className="font-serif text-xl">BaBra</span>
          </a>
          <nav aria-label="Homepage navigation" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-sm text-white/80 transition hover:text-[#f5d495]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a className="shrink-0 text-sm text-white/80 transition hover:text-[#f5d495]" href="/login">My Account</a>
            <details className="relative xl:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-white/25 px-4 text-sm font-semibold">
                Menu
              </summary>
              <nav aria-label="Mobile homepage navigation" className="absolute right-0 top-[calc(100%+10px)] z-50 grid max-h-[70vh] w-56 gap-1 overflow-auto rounded-xl border border-[#d6ad57]/30 bg-[#21160f] p-2 shadow-xl">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="rounded-lg px-4 py-3 text-sm hover:bg-white/10">{label}</a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[#825a39]/20 bg-[#f2e5d4]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_38%,#fff7e8_0%,transparent_53%),linear-gradient(117deg,#fbf4e9_0%,#f4e8d8_52%,#e0c5a3_100%)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-5 pb-9 pt-12 md:px-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:py-16">
          <div className="relative z-10 lg:py-8">
            <h1 className="font-serif text-[clamp(3.8rem,7.4vw,7.35rem)] leading-[0.94] tracking-[-0.07em] text-[#312017]">
              BaBra Lotion
            </h1>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-[#855425] md:text-3xl">Luxury in Every Touch.</p>
            <p className="mt-7 max-w-lg font-serif text-2xl leading-snug text-[#442c20] md:text-3xl">
              You make time for the people you love. This moment is yours.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#624a3a] md:text-lg md:leading-8">
              Three signature 500 mL body lotions for the everyday feeling of soft, moisturized skin.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#collection" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#38241a] px-6 text-sm font-semibold text-[#fff7e9] transition hover:bg-[#583a27]">
                Explore the collection
              </a>
              <a href="/where-to-buy" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#96704e] px-6 text-sm font-semibold text-[#4d3322] transition hover:bg-[#fbf1e4]">
                Where to Buy
              </a>
            </div>
          </div>

          <figure className="relative isolate mx-auto w-full max-w-[710px]">
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[13%] top-[2%] -z-10 rounded-t-[50%] border border-[#b1845b]/40 bg-[radial-gradient(ellipse_at_50%_38%,#fffbf2_5%,#e8cda9_100%)]" />
            <div className="pointer-events-none absolute inset-x-[6%] bottom-[9%] -z-10 h-16 rounded-[50%] bg-[#ae835f]/35 blur-lg" />
            <div className="grid grid-cols-[1fr_1.13fr_1fr] items-end px-1 pb-3 pt-5 md:px-4">
              {heroBottles.map((product) => {
                const center = product.slug === "women";
                return (
                  <Image
                    key={product.slug}
                    src={product.image}
                    alt={product.imageAlt}
                    width={518}
                    height={1024}
                    priority={center}
                    sizes="(min-width: 1024px) 19vw, 33vw"
                    className={center
                      ? "relative z-10 h-[clamp(12rem,37vw,31rem)] w-full object-contain drop-shadow-[12px_21px_12px_rgba(66,42,26,0.25)]"
                      : "h-[clamp(10rem,32vw,26rem)] w-full object-contain drop-shadow-[10px_18px_12px_rgba(66,42,26,0.22)]"}
                  />
                );
              })}
            </div>
            <figcaption className="mt-2 text-center text-sm font-medium text-[#654632]">The BaBra Signature Collection · 500 mL</figcaption>
          </figure>
        </div>
      </section>

      <section id="collection" className="scroll-mt-32 bg-[#fbf6ee] px-5 py-16 md:px-9 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.04em] md:text-6xl">The Signature Collection</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {productKnowledgeList.map((product) => (
              <a
                key={product.slug}
                href={"/products/" + product.slug}
                className="group block overflow-hidden border border-[#d7c6ae] bg-[#fffaf4] transition hover:-translate-y-1 hover:border-[#a98551] hover:shadow-[0_24px_54px_rgba(75,47,26,0.12)]"
              >
                <div className="flex h-[290px] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#fff7e9_0%,#e7d6bd_78%)] p-6 lg:h-[350px]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={518}
                    height={1024}
                    sizes="(min-width: 768px) 29vw, 90vw"
                    className="h-full w-full object-contain drop-shadow-[10px_15px_12px_rgba(70,48,33,0.22)] transition duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="px-6 pb-7 pt-6">
                  <h3 className="font-serif text-3xl text-[#342219] lg:text-4xl">{product.variant}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#765432]">{product.size} · {product.category}</p>
                  <p className="mt-3 leading-7 text-[#675044]">{product.careMoment}</p>
                  <span className="mt-5 inline-block border-b border-[#916e45] pb-1 text-sm font-semibold text-[#513820]">
                    Explore product
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="our-story" className="scroll-mt-32 bg-[#48252b] px-5 py-16 text-[#fff3e8] md:px-9 md:py-24">
        <div className="mx-auto grid max-w-[1220px] items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <h2 className="max-w-xl font-serif text-5xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
            A name that began with family.
          </h2>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-[#faebdf]">
              BaBra takes its name from our founder's family. The care we give the people closest to us is often quiet. It is in the time we make for them and the little things we remember.
            </p>
            <p className="mt-4 max-w-2xl leading-8 text-[#f2ded3]">
              We wanted that same feeling in the care you give your own skin. From Kigali, we are building a new Rwandan skincare brand with the ambition to become a global leader in body care.
            </p>
            <a href="/founder" className="mt-6 inline-block border-b border-[#eccd9a] pb-1 text-sm font-semibold text-[#ffe2ae]">Meet our founder</a>
          </div>
        </div>
      </section>

      <section className="bg-[#eee1cf] px-5 py-16 md:px-9 md:py-24">
        <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-5xl leading-[1.04] tracking-[-0.04em] md:text-6xl">The science of soft skin.</h2>
            <p className="mt-5 max-w-lg leading-8 text-[#5d4637]">
              Glycerin and hyaluronic acid help retain water in the skin's outer layer. Shea butter and jojoba seed oil are emollients that help the surface feel softer and smoother.
            </p>
          </div>
          <div className="divide-y divide-[#ba9b7a]/60 border-y border-[#ba9b7a]/60">
            {resources.map(([label, description, href]) => (
              <a key={href} href={href} className="group flex items-center justify-between gap-4 py-4 transition hover:text-[#87592c]">
                <div>
                  <h3 className="font-serif text-2xl">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#634b3a]">{description}</p>
                </div>
                <span className="mr-1 h-2.5 w-2.5 shrink-0 rotate-45 border-r border-t border-[#815831]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="our-world" className="scroll-mt-32 bg-[#1d1410] px-5 py-16 text-[#fff5e8] md:px-9 md:py-20">
        <div className="mx-auto max-w-[1220px]">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#d6ad57]/30 pb-6">
            <h2 className="font-serif text-4xl tracking-[-0.035em] md:text-5xl">Our World</h2>
            <a href="/holding" className="border-b border-[#e5c381]/60 pb-1 text-sm font-semibold text-[#f2e0b9]">EI BaBra Holding Ltd</a>
          </div>
          <div className="grid gap-x-9 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map(([title, description, href]) => (
              <a key={href} href={href} className="border-b border-white/15 py-5 transition hover:text-[#f5d495]">
                <h3 className="font-serif text-2xl">{title}</h3>
                <p className="mt-1 text-sm text-[#f5ece2]/70">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
