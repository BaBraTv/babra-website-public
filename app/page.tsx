"use client";

import { motion } from "framer-motion";
import { OfficialMedia } from "./components/OfficialMedia";
import { approvedProductMedia, officialMediaById, officialMediaPendingLabel } from "./data/official-media";
import { products } from "./commerce-data";

const navItems = [
  ["Cosmetics", "/cosmetics"],
  ["Products", "/products"],
  ["Store", "/store"],
  ["Schools", "/schools"],
  ["Mobile Hub", "/rwanda-mobile-hub"],
  ["Foundation", "/foundation"],
  ["LifeTalk TV", "/lifetalk-tv"],
  ["Contact", "/contact"]
];

const divisions = [
  ["BaBra Cosmetics", "Official product division", "Approved official product media is live.", "/cosmetics"],
  ["BaBra School", "Education division", officialMediaPendingLabel, "/schools"],
  ["Rwanda Mobile Hub", "Mobile technology division", officialMediaPendingLabel, "/rwanda-mobile-hub"],
  ["BaBra Foundation", "Foundation division", officialMediaPendingLabel, "/foundation"],
  ["LifeTalk TV", "Media division", officialMediaPendingLabel, "/lifetalk-tv"],
  ["EI BaBra Holding Ltd", "Holding platform", officialMediaPendingLabel, "/holding"]
];

const pendingMediaPages = [
  "Founder",
  "Rwanda Mobile Hub",
  "BaBra Foundation",
  "BaBra Schools master plan",
  "LifeTalk TV",
  "Holding division media"
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 }
};

function PendingPanel({ label }: { label: string }) {
  return (
    <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-[#d6ad57]/35 bg-[#120d0a]/72 p-6 text-center text-xs font-black uppercase tracking-[0.16em] text-[#f1d58b] shadow-inner shadow-black/30">
      <span>
        <span className="block text-white/60">{label}</span>
        <span className="mt-3 block">{officialMediaPendingLabel}</span>
      </span>
    </div>
  );
}

export default function HomePage() {
  const productSchema = products.map((product) => ({
    "@type": "Product",
    name: product.name,
    image: product.image,
    brand: { "@type": "Brand", name: "BaBra Cosmetics" },
    description: "Official information pending"
  }));

  return (
    <main className="min-h-screen overflow-hidden bg-[#070504] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": productSchema }) }} />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070504]/88 backdrop-blur-2xl" aria-label="Primary navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a className="group flex min-w-0 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1d58b]" href="#top" aria-label="BaBra Holding homepage">
            <span className="grid h-12 w-24 shrink-0 place-items-center rounded-xl border border-[#d6ad57]/45 bg-white p-2 shadow-lg shadow-[#d6ad57]/10 transition-transform duration-300 group-hover:-translate-y-0.5">
              <OfficialMedia className="h-full w-full object-contain" media={officialMediaById["babra-logo-primary"]} priority sizes="96px" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <strong className="block font-serif text-xl leading-tight">BaBra Holding Ltd</strong>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d6ad57]">Luxury. Innovation. African Excellence.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map(([item, href]) => (
              <a key={item} className="rounded-full px-3 py-2 text-sm font-semibold text-white/68 transition-colors hover:bg-white/10 hover:text-white" href={href}>
                {item}
              </a>
            ))}
          </div>

          <a className="rounded-full bg-[#f1d58b] px-5 py-3 text-sm font-black text-[#130d08] shadow-lg shadow-[#d6ad57]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white" href="/store">
            Shop Now
          </a>
        </div>
      </nav>

      <section id="top" className="relative px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(241,213,139,0.18),transparent_28rem),radial-gradient(circle_at_82%_16%,rgba(29,78,216,0.22),transparent_30rem),linear-gradient(180deg,#070504,#100b09_62%,#070504)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="hidden" animate="show" transition={{ duration: 0.75, ease: "easeOut" }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">BaBra Holding Ltd</p>
            <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.86] md:text-8xl xl:text-9xl">
              Luxury.
              <span className="block text-[#f1d58b]">Innovation.</span>
              <span className="block">African Excellence.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/72 md:text-xl md:leading-9">
              Official BaBra beauty and enterprise presence, presented with approved media only.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f1d58b] px-7 py-3 font-black text-[#130d08] shadow-xl shadow-[#d6ad57]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white" href="/products">
                Shop Now
              </a>
              <a className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/24 bg-white/5 px-7 py-3 font-black text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#f1d58b]/60 hover:text-[#f1d58b]" href="/sample-request">
                Request Samples
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-x-8 bottom-3 h-16 rounded-full bg-[#d6ad57]/25 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-[#d6ad57]/25 bg-[linear-gradient(135deg,#fffaf1,#ffffff_48%,#d5ad49)] p-4 text-[#1b130c] shadow-2xl shadow-black/45 md:p-6">
              <div className="grid min-h-[460px] items-end gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/55 p-3 shadow-xl shadow-black/10 transition duration-500 hover:-translate-y-2">
                  <OfficialMedia className="h-[420px] w-full object-contain drop-shadow-2xl" media={approvedProductMedia.women} priority sizes="(min-width: 1024px) 16vw, 30vw" />
                </div>
                <div className="rounded-3xl bg-white/75 p-3 shadow-2xl shadow-black/15 transition duration-500 hover:-translate-y-2 sm:-translate-y-8">
                  <OfficialMedia className="h-[470px] w-full object-contain drop-shadow-2xl" media={approvedProductMedia.men} priority sizes="(min-width: 1024px) 18vw, 32vw" />
                </div>
                <div className="rounded-3xl bg-white/55 p-3 shadow-xl shadow-black/10 transition duration-500 hover:-translate-y-2">
                  <OfficialMedia className="h-[420px] w-full object-contain drop-shadow-2xl" media={approvedProductMedia.babies} priority sizes="(min-width: 1024px) 16vw, 30vw" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#070504] px-5 py-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">Approved official product media</p>
                <p className="text-sm font-semibold text-white/68">No stock or AI product imagery.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#100b09] px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.65 }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Featured products</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Official BaBra Lotion products.</h2>
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.article
                key={product.slug}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                variants={fadeUp}
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#18110f] shadow-xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-[#d6ad57]/45"
              >
                <a href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <figure className="relative h-[390px] overflow-hidden bg-[radial-gradient(circle_at_50%_12%,#ffffff,#fff7df_45%,#c59b34)] p-5">
                    <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-black/18 blur-2xl" aria-hidden="true" />
                    <OfficialMedia className="relative h-full w-full object-contain drop-shadow-2xl transition duration-700 group-hover:scale-[1.04]" media={officialMediaById[product.mediaId]} sizes="(min-width: 1024px) 30vw, 92vw" />
                  </figure>
                </a>
                <div className="p-6">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">{product.category}</span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{product.name}</h3>
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white/55">{product.size}</p>
                  <a className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#d6ad57]/35 px-5 py-2 text-sm font-black text-[#f1d58b] transition hover:bg-[#f1d58b] hover:text-[#130d08]" href={`/products/${product.slug}`}>
                    View Details
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-4 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a9141d]">BaBra ecosystem</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Official divisions. Clear paths.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {divisions.map(([title, label, text, href]) => (
              <a key={title} href={href} className="group rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">{label}</span>
                <h3 className="mt-4 font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
                <span className="mt-6 inline-flex text-sm font-black text-[#8a651d] transition group-hover:translate-x-1">Open division</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Official media status</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Text-only placeholders until approval.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pendingMediaPages.map((item) => <PendingPanel key={item} label={item} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#f1d58b] px-4 py-14 text-[#130d08] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em]">BaBra Holding Ltd</p>
            <h2 className="mt-2 font-serif text-4xl leading-none md:text-6xl">Connect with the official platform.</h2>
          </div>
          <a className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#070504] px-7 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1f1712]" href="/sample-request">
            Request Samples
          </a>
        </div>
      </section>
    </main>
  );
}
