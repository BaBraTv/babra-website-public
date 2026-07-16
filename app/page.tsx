"use client";

import { motion } from "framer-motion";
import { OfficialMedia } from "./components/OfficialMedia";
import { approvedProductMedia, officialMediaById, officialMediaPendingLabel } from "./data/official-media";
import { products } from "./commerce-data";

const divisions = [
  ["BaBra Cosmetics", "Official product division", "Official BaBra Lotion media is approved."],
  ["BaBra School", "Education division", officialMediaPendingLabel],
  ["Rwanda Mobile Hub", "Mobile technology division", officialMediaPendingLabel],
  ["BaBra Foundation", "Foundation division", officialMediaPendingLabel],
  ["LifeTalk TV", "Media division", officialMediaPendingLabel],
  ["EI BaBra Holding Ltd", "Holding platform", officialMediaPendingLabel]
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
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

function PendingPanel({ label }: { label: string }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-lg border border-dashed border-[#d6ad57]/40 bg-black/25 p-5 text-center text-sm font-black uppercase tracking-[0.14em] text-[#f1d58b]">
      {label}: {officialMediaPendingLabel}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#090706]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
          <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="babra.store home">
            <span className="grid h-12 w-28 shrink-0 place-items-center rounded-md border border-[#d6ad57]/40 bg-white p-2">
              <OfficialMedia className="h-full w-full object-contain" media={officialMediaById["babra-logo-primary"]} priority sizes="112px" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <strong className="block font-serif text-xl leading-tight">babra.store</strong>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#d6ad57]">Group ecosystem</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {[
              ["Products", "/products"],
              ["Store", "/store"],
              ["LifeTalk TV", "/lifetalk-tv"],
              ["Holding", "/holding"],
              ["Contact", "/contact"]
            ].map(([item, href]) => (
              <a key={item} className="rounded-full px-4 py-2 text-sm font-semibold text-white/68 hover:bg-white/10 hover:text-white" href={href}>
                {item}
              </a>
            ))}
          </div>

          <a className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]" href="/store">
            Store
          </a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <motion.div initial="hidden" animate="show" transition={{ duration: 0.8, ease: "easeOut" }} variants={fadeUp}>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">EI BaBra Holding Ltd</p>
            <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.9] md:text-8xl">
              Luxury in Every Touch.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Official BaBra platform using approved media only. Missing founder, division, school, foundation, LifeTalk TV, and holding media remains pending approval.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/products">Explore products</a>
              <a className="rounded-full border border-white/24 bg-white/5 px-6 py-3 font-black text-white" href="/contact">Contact BaBra</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
            className="rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-5 text-[#1b130c] shadow-2xl shadow-black/35"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <OfficialMedia className="h-96 w-full object-contain drop-shadow-2xl" media={approvedProductMedia.women} priority />
              <OfficialMedia className="h-96 w-full object-contain drop-shadow-2xl" media={approvedProductMedia.men} priority />
              <OfficialMedia className="h-96 w-full object-contain drop-shadow-2xl" media={approvedProductMedia.babies} priority />
            </div>
            <p className="mt-5 text-center text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]">Approved official product media</p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#120b09] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Featured products</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Official BaBra Lotion products.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-lg border border-white/10 bg-[#1d1512] shadow-xl shadow-black/20">
                <figure className="h-96 bg-gradient-to-br from-white via-[#fff8eb] to-[#d3a83b] p-5">
                  <OfficialMedia className="h-full w-full object-contain drop-shadow-2xl" media={officialMediaById[product.mediaId]} sizes="(min-width: 1024px) 30vw, 92vw" />
                </figure>
                <div className="p-5">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{product.category}</span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h3>
                  <p className="mt-3 leading-7 text-white/62">{product.description}</p>
                  <a className="mt-5 inline-flex rounded-full border border-[#d6ad57]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={`/products/${product.slug}`}>
                    View product
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">BaBra ecosystem</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Official divisions, pending media where approval is missing.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {divisions.map(([title, label, text]) => (
              <article key={title} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">{label}</span>
                <h3 className="mt-4 font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official media still pending</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">No fake images are displayed.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pendingMediaPages.map((item) => <PendingPanel key={item} label={item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
