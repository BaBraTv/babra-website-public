"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const gold = "#d6ad57";

const collection = [
  {
    name: "For Her",
    title: "The signature of elegance.",
    description: "An everyday body-care ritual presented with the refinement of BaBra Lotion Women.",
    image: "/media/products/babra-lotion-women-500ml.png",
    alt: "Official BaBra Lotion Women 500 ml bottle",
    href: "/products/women",
    number: "01",
    category: "BABRA LOTION WOMEN"
  },
  {
    name: "For Him",
    title: "Confidence, quietly expressed.",
    description: "Discover the BaBra Lotion Men edition, designed for a simple daily care experience.",
    image: "/media/products/babra-lotion-men-500ml.png",
    alt: "Official BaBra Lotion Men 500 ml bottle",
    href: "/products/men",
    number: "02",
    category: "BABRA LOTION MEN"
  },
  {
    name: "For Kids",
    title: "Care for little moments.",
    description: "Explore BaBra Soft Care for Kids and read the original label for suitability and directions.",
    image: "/media/products/babra-lotion-babies-500ml.png",
    alt: "Official BaBra Lotion Kids 500 ml bottle",
    href: "/products/babies",
    number: "03",
    category: "BABRA LOTION KIDS"
  }
] as const;

const universe = [
  { title: "BaBra Cosmetics", type: "Beauty & personal care", status: "Our signature collection", href: "/cosmetics", number: "01" },
  { title: "Rwanda Mobile Hub", type: "Technology & service", status: "Discover the mobile hub", href: "/rwanda-mobile-hub", number: "02" },
  { title: "BaBra Schools", type: "Education & opportunity", status: "A growing vision", href: "/schools", number: "03" },
  { title: "BaBra AI Academy", type: "Digital learning", status: "Explore AI education", href: "/academy", number: "04" },
  { title: "BaBra Foundation", type: "Community & care", status: "Our community commitment", href: "/foundation", number: "05" },
  { title: "LifeTalk TV", type: "Ideas, stories & media", status: "Discover our voice", href: "/lifetalk-tv", number: "06" }
] as const;

const navLinks = [
  ["Our Story", "/holding"],
  ["Cosmetics", "/cosmetics"],
  ["Our World", "#our-world"],
  ["Store", "/store"],
  ["Contact", "/contact"]
] as const;

const eleganceEase = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0908] text-[#f9f5ed]">
      <header className="sticky top-10 z-50 border-b border-white/10 bg-[#100c0b]/95 shadow-[0_10px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="mx-auto flex h-[80px] w-full max-w-[1500px] items-center justify-between gap-5 px-5 md:px-9">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="EI BaBra Holding Ltd · Home">
            <Image
              src="/media/logos/babra-logo.jpeg"
              width={56}
              height={56}
              alt="Official BaBra logo"
              className="h-12 w-12 rounded-full border border-[#d6ad57]/40 bg-white object-contain"
              priority
            />
            <span className="block">
              <span className="block font-serif text-lg tracking-[0.015em] text-[#fff9ee] md:text-xl">BaBra</span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.19em] text-[#d6ad57] md:text-[10px]">EI BaBra Holding Ltd</span>
            </span>
          </a>
          <nav aria-label="Homepage navigation" className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className="text-[12px] font-semibold uppercase tracking-[0.13em] text-white/72 transition hover:text-[#eacb89]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white sm:inline" href="/login">
              My account
            </a>
            <a className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ecd192] px-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#23180e] transition hover:bg-[#f8e3b5] md:px-6" href="/cosmetics">
              Discover BaBra <span className="ml-2 text-base" aria-hidden="true">↗</span>
            </a>
            <details className="group relative lg:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/20 px-4 text-[11px] font-bold uppercase tracking-widest text-white">
                Menu
              </summary>
              <nav aria-label="Mobile homepage navigation" className="absolute right-0 top-[calc(100%+12px)] z-50 grid w-56 gap-1 rounded-2xl border border-[#d6ad57]/30 bg-[#16100e] p-2 shadow-2xl">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="rounded-lg px-4 py-3 text-sm text-white/90 hover:bg-white/10">
                    {label}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[760px] overflow-hidden border-b border-[#d6ad57]/15 bg-[#120d0d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_76%_46%,rgba(130,70,37,0.25),transparent_38%),radial-gradient(ellipse_at_18%_22%,rgba(98,26,32,0.22),transparent_36%),linear-gradient(115deg,#160d0e_0%,#0b0909_62%,#25170f_100%)]" />
        <div className="pointer-events-none absolute -right-40 -top-56 h-[650px] w-[650px] rounded-full border border-[#d6ad57]/[0.07]" />
        <div className="pointer-events-none absolute -right-24 -top-44 h-[520px] w-[520px] rounded-full border border-[#d6ad57]/[0.11]" />
        <div className="relative mx-auto grid min-h-[760px] w-full max-w-[1500px] items-center gap-5 px-5 pb-16 pt-16 md:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: eleganceEase }}
            className="relative z-10 py-6 lg:py-12"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#d6ad57]" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e5c179] md:text-xs">Born from African ambition</span>
            </div>
            <h1 className="mt-8 max-w-3xl font-serif text-[clamp(4rem,8vw,8.2rem)] leading-[0.92] tracking-[-0.055em] text-[#fbf4e9]">
              BaBra.
              <span className="mt-1 block bg-gradient-to-r from-[#f6e7c2] via-[#c99a55] to-[#f1d69b] bg-clip-text text-transparent">A legacy</span>
              <span className="block">in the making.</span>
            </h1>
            <p className="mt-7 font-serif text-2xl italic tracking-[0.01em] text-[#e3c48f] md:text-3xl">
              Luxury in Every Touch.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f1e5d5]/68 md:text-lg">
              Rooted in Rwanda. Inspired by possibility. Discover a world where
              premium beauty, innovation and purpose share one name.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#collection" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ebcf8a] px-7 text-xs font-black uppercase tracking-[0.12em] text-[#21150f] transition hover:bg-[#fff1c8]">
                Explore the collection <span className="ml-3 text-lg" aria-hidden="true">↗</span>
              </a>
              <a href="/holding" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#f5e8d0]/35 px-7 text-xs font-bold uppercase tracking-[0.12em] text-[#f5e8d0] transition hover:border-[#d6ad57] hover:text-[#e5c179]">
                Our story
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#d6ad57]/20 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5b879]">Rwanda · Global ambition</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#eadfd1]/55">Women · Men · Kids</span>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: eleganceEase }}
            className="relative isolate mx-auto flex min-h-[490px] w-full max-w-[710px] items-end justify-center pb-10 pt-14 sm:min-h-[570px] lg:min-h-[680px]"
            aria-label="The official BaBra Lotion collection: Women, Men and Kids"
          >
            <div className="pointer-events-none absolute inset-x-[7%] bottom-[4%] top-[5%] rounded-[48%_48%_12%_12%] border border-[#d6ad57]/20 bg-[radial-gradient(ellipse_at_50%_42%,rgba(242,208,154,0.34),rgba(123,69,38,0.18)_42%,rgba(18,12,12,0.04)_70%)] shadow-[inset_0_0_130px_rgba(217,165,88,0.08)]" />
            <div className="pointer-events-none absolute inset-x-[14%] bottom-[16%] top-[12%] rounded-[50%] border border-[#d6ad57]/20" />
            <div className="pointer-events-none absolute inset-x-[3%] bottom-10 h-20 rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.65),transparent_70%)] blur-xl" />
            <div className="pointer-events-none absolute bottom-[6%] left-[9%] right-[9%] h-16 rounded-[50%] border-t border-[#e6c488]/60 bg-gradient-to-b from-[#b28a59]/30 to-transparent" />

            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 -mr-[7%] w-[39%] translate-y-3 -rotate-[4deg] sm:w-[37%]"
            >
              <Image
                src="/media/products/babra-lotion-men-500ml.png"
                width={516}
                height={1024}
                alt="Official BaBra Lotion Men 500 ml bottle"
                className="h-[310px] w-full object-contain drop-shadow-[12px_24px_22px_rgba(0,0,0,0.65)] sm:h-[390px] lg:h-[470px]"
                priority
                sizes="(min-width: 1024px) 18vw, 34vw"
              />
            </motion.div>
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -11, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="relative z-20 w-[44%] sm:w-[42%]"
            >
              <Image
                src="/media/products/babra-lotion-women-500ml.png"
                width={518}
                height={1024}
                alt="Official BaBra Lotion Women 500 ml bottle"
                className="h-[370px] w-full object-contain drop-shadow-[18px_30px_24px_rgba(0,0,0,0.65)] sm:h-[475px] lg:h-[550px]"
                priority
                sizes="(min-width: 1024px) 22vw, 42vw"
              />
            </motion.div>
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6.9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="relative z-10 -ml-[7%] w-[39%] translate-y-4 rotate-[4deg] sm:w-[37%]"
            >
              <Image
                src="/media/products/babra-lotion-babies-500ml.png"
                width={512}
                height={1024}
                alt="Official BaBra Lotion Kids 500 ml bottle"
                className="h-[310px] w-full object-contain drop-shadow-[18px_24px_22px_rgba(0,0,0,0.65)] sm:h-[390px] lg:h-[470px]"
                priority
                sizes="(min-width: 1024px) 18vw, 34vw"
              />
            </motion.div>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e4c78d]/70">
              The BaBra Signature Collection
            </span>
          </motion.div>
        </div>
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#d6ad57]/70 to-transparent" />
      </section>

      <section id="collection" className="relative bg-[#f6f0e6] px-5 py-20 text-[#241b17] md:px-9 md:py-28">
        <div className="mx-auto max-w-[1390px]">
          <div className="mb-12 grid items-end gap-6 border-b border-[#8f7048]/25 pb-10 md:grid-cols-[1fr_0.8fr] md:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.27em] text-[#947442]">The Collection · 500 ml</p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.03] tracking-[-0.04em] md:text-7xl">
                A touch that<br /><em className="font-normal text-[#967346]">feels like BaBra.</em>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#51463f] md:pb-2">
              Meet the three BaBra Lotion editions in their original packaging.
              Elegant presentation, thoughtful daily care and an experience worth discovering.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {collection.map((product, index) => (
              <motion.a
                key={product.name}
                href={product.href}
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.09 }}
                className="group block overflow-hidden border border-[#d2c1a7]/75 bg-[#fffaf1] transition duration-500 hover:-translate-y-1 hover:border-[#a98551] hover:shadow-[0_30px_70px_rgba(75,47,26,0.12)]"
              >
                <div className="relative flex h-[340px] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#f9f2e3_0%,#e6d6bf_75%)] p-7 sm:h-[410px]">
                  <span className="absolute left-6 top-5 font-serif text-lg text-[#997445]">{product.number} / 03</span>
                  <div className="absolute inset-x-5 bottom-5 h-px bg-[#a98551]/30" />
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={520}
                    height={1024}
                    className="h-full max-h-[345px] w-full object-contain drop-shadow-[12px_20px_12px_rgba(70,48,33,0.24)] transition duration-700 group-hover:scale-[1.035]"
                    sizes="(min-width: 1024px) 29vw, (min-width: 768px) 32vw, 85vw"
                  />
                </div>
                <div className="px-7 pb-8 pt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#947442]">{product.category}</p>
                  <h3 className="mt-3 font-serif text-4xl text-[#2a1c16]">{product.name}</h3>
                  <p className="mt-2 font-serif text-xl italic text-[#937046]">{product.title}</p>
                  <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#6b5c4f]">{product.description}</p>
                  <span className="mt-5 inline-flex items-center gap-3 border-b border-[#916e45] pb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#513820]">
                    Explore product <span className="text-xl" aria-hidden="true">↗</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a href="/cosmetics" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#3b291e] px-8 text-xs font-bold uppercase tracking-[0.14em] text-[#3b291e] transition hover:bg-[#3b291e] hover:text-[#fffaf1]">
              The BaBra Cosmetics story <span className="ml-3 text-lg" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#481b26] px-5 py-24 md:px-9 md:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-[720px] w-[720px] rounded-full border border-[#efcf89]/15" />
        <div className="pointer-events-none absolute -right-20 top-16 h-[550px] w-[550px] rounded-full border border-[#efcf89]/15" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f0d391]">Our philosophy</p>
            <h2 className="mt-7 max-w-3xl font-serif text-5xl leading-[1.06] tracking-[-0.045em] text-[#fff4e4] md:text-7xl">
              Beauty with<br />a deeper <em className="font-normal text-[#f0cf92]">purpose.</em>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-[#fff0e3]/75">
              BaBra is more than a collection. It is a commitment to build lasting
              value through creativity, responsible enterprise and care for the people we serve.
            </p>
          </div>
          <div className="border-l border-[#f2d49c]/30 pl-8 lg:pl-14">
            <p className="font-serif text-[clamp(2.5rem,4vw,4.4rem)] leading-[1.1] text-[#fff4e4]">
              “One vision.<br /><em className="font-normal text-[#f0cf92]">Lasting impact.</em>”
            </p>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.23em] text-[#f0cf92]/85">EI BaBra Holding Ltd · Rwanda</p>
            <div className="mt-11 h-px w-full bg-[#f0cf92]/25" />
            <a href="/founder" className="mt-8 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-[#fff4e4] transition hover:text-[#f0cf92]">
              Explore our founder's story <span className="text-xl" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="our-world" className="bg-[#100d0d] px-5 py-20 md:px-9 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-9 border-b border-[#d6ad57]/25 pb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d6ad57]">The BaBra Universe</p>
              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.08] tracking-[-0.04em] md:text-7xl">
                One name.<br /><em className="font-normal text-[#d7b37a]">Many possibilities.</em>
              </h2>
            </div>
            <a href="/holding" className="inline-flex min-h-[45px] items-center gap-3 border-b border-[#d6ad57]/55 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#f2e0b9] transition hover:text-white">
              View the Holding <span className="text-xl" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="mt-5">
            {universe.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group grid gap-3 border-b border-white/10 px-2 py-6 transition hover:border-[#d6ad57]/50 hover:bg-white/[0.025] sm:grid-cols-[50px_1fr_1fr_30px] sm:items-center sm:gap-7 sm:py-8"
              >
                <span className="font-serif text-lg text-[#b4935b]">{item.number}</span>
                <h3 className="font-serif text-3xl text-[#fff4e4] transition group-hover:translate-x-1 md:text-4xl">{item.title}</h3>
                <div>
                  <p className="text-sm text-[#f5ece2]/65">{item.type}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d2b074]/65">{item.status}</p>
                </div>
                <span className="hidden text-2xl text-[#e5c381] sm:block" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#f5ece2]/55">
            Some BaBra divisions are operating, while others are in development. We present our ambitions as ambitions, not as completed facilities.
          </p>
        </div>
      </section>

      <section className="bg-[#eae0d1] px-5 py-20 text-[#291c15] md:px-9 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#85602e]">The BaBra Difference</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.08] tracking-[-0.04em] md:text-6xl">
              Beauty should feel personal.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#655447]">
              Find your BaBra Lotion edition, connect with our team, or learn from customer experiences reviewed before publication.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/testimonials" className="inline-flex min-h-12 items-center rounded-full bg-[#2d1f17] px-7 text-xs font-bold uppercase tracking-[0.11em] text-[#fff5e8] transition hover:bg-[#5d3327]">Real BaBra Stories ↗</a>
              <a href="/store" className="inline-flex min-h-12 items-center rounded-full border border-[#9e8465] px-7 text-xs font-bold uppercase tracking-[0.11em] transition hover:border-[#291c15]">Explore the store</a>
            </div>
          </div>
          <div className="relative grid min-h-[440px] overflow-hidden border border-[#b89e77]/50 bg-[#f7f0e4] p-7 shadow-[0_30px_80px_rgba(80,50,26,0.13)] sm:grid-cols-[1fr_1fr] sm:gap-8 sm:p-10">
            <div className="relative z-10 flex items-center justify-center">
              <Image src="/media/products/babra-lotion-women-500ml.png" alt="Original BaBra Lotion Women 500 ml packaging" width={518} height={1024} className="h-[350px] w-full object-contain drop-shadow-[16px_24px_14px_rgba(55,33,18,0.2)]" sizes="(min-width: 768px) 28vw, 70vw" />
            </div>
            <div className="relative z-10 flex flex-col justify-center border-t border-[#bba17c]/40 py-8 sm:border-l sm:border-t-0 sm:py-0 sm:pl-9">
              <p className="font-serif text-4xl leading-[1.1] text-[#33261e]">Original.<br />Considered.<br /><em className="font-normal text-[#a07742]">Distinctly BaBra.</em></p>
              <p className="mt-6 text-sm leading-7 text-[#685749]">The official bottle and label are the reference for product directions and suitability. Contact BaBra for confirmed pricing and availability.</p>
              <a href="/quality" className="mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#80603a] underline decoration-[#a88a5f] underline-offset-8">Quality & product information ↗</a>
            </div>
            <div className="pointer-events-none absolute -right-36 -top-40 h-[450px] w-[450px] rounded-full border border-[#bc9862]/30" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#130d0d] px-5 py-24 md:px-9 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,66,41,0.23),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#d6ad57]">From Kigali to the world</p>
          <h2 className="mt-7 font-serif text-5xl leading-[1.08] tracking-[-0.04em] text-[#fff3e6] md:text-7xl">
            The next chapter<br />starts with <em className="font-normal text-[#deb980]">connection.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#f7ecdc]/65">
            For orders, partnerships and meaningful opportunities, speak directly with BaBra.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/250788351482" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#eccf90] px-8 text-xs font-black uppercase tracking-[0.14em] text-[#291b10] transition hover:bg-[#fff1c6]">Official BaBra WhatsApp ↗</a>
            <a href="/contact" className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#ead6b4]/40 px-8 text-xs font-bold uppercase tracking-[0.14em] text-[#fff2df] transition hover:border-[#ead6b4]">Contact BaBra</a>
          </div>
        </div>
      </section>
    </main>
  );
}
