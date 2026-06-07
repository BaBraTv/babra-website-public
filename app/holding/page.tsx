const subsidiaries = [
  ["BaBra Cosmetics", "Skincare, lotion, soap, pads, pocket fresh, showroom, and beauty commerce."],
  ["BaBra Pocket Fresh", "Portable fragrance and freshness products for travel, retail, salons, and hospitality."],
  ["BaBra Pads", "Women health, comfort, protection, confidence, and hygiene education."],
  ["BaBra Soap", "Luxury, herbal, rose, men, and baby soap product lines."],
  ["BaBra Showroom", "Retail experience, franchise meetings, product education, and verification station."],
  ["BaBra Farm", "Agriculture, supply chain, farmer marketplace, and East Africa expansion."],
  ["BaBra Schools", "Future nursery, primary, secondary, university, and digital school systems."],
  ["BaBra Hospital", "Long-term healthcare vision connected to community impact."],
  ["Rwanda Mobile Hub", "Future mobile, digital service, and technology commerce arm."],
  ["LifeTalk TV", "Motivation, business, documentaries, films, and success stories."],
  ["BaBra Foundation", "Education, youth opportunity, women support, and community development."],
];

const roadmap = [
  ["Phase 1", "Cosmetics product trust, website, SEO, WhatsApp ordering, showroom concept, and public-safe brand assets."],
  ["Phase 2", "Marketplace, wallet, delivery engine, reseller system, affiliate rewards, and customer database."],
  ["Phase 3", "LifeTalk TV content engine, NZABIGERAHO film project, and media-driven brand growth."],
  ["Phase 4", "BaBra School, BaBra Farm, and enterprise operations dashboards."],
  ["Phase 5", "Holding-level governance, foundation work, international exports, and global partnerships."],
];

export const metadata = {
  title: "EI BaBra Holding Ltd",
  description:
    "EI BaBra Holding Ltd is the future corporate structure for BaBra Cosmetics, BaBra Farm, BaBra Schools, BaBra Hospital, LifeTalk TV, Rwanda Mobile Hub, and BaBra Foundation."
};

export default function HoldingPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra.com</a>
          <div className="mt-12 max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Corporate structure</p>
            <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">EI BaBra Holding Ltd.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              A future holding company structure designed to connect cosmetics, media, education, agriculture, healthcare, technology, and foundation work into one scalable African business group with global ambition.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Subsidiaries</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">One ecosystem, many engines.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {subsidiaries.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Five-year direction</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Built to become one of Africa's largest business groups.</h2>
          <div className="mt-10 grid gap-5">
            {roadmap.map(([phase, text]) => (
              <article key={phase} className="grid gap-4 rounded-lg border border-white/10 bg-[#18110f] p-6 md:grid-cols-[180px_1fr] md:items-center">
                <h3 className="font-serif text-4xl text-[#f1d58b]">{phase}</h3>
                <p className="text-lg leading-8 text-white/66">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
