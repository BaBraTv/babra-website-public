const productFamilies = [
  {
    name: "BaBra Lotion",
    slogan: "Luxury in Every Touch",
    image: "/products/kids-bottle-original.jpeg",
    editions: ["Women Edition", "Men Edition", "Babies Edition"],
    description:
      "A premium body lotion family created for daily hydration, refined fragrance, and a polished skincare routine.",
    benefits: ["Long-lasting hydration feel", "Smooth daily skin comfort", "Premium fragrance direction", "Retail and wholesale ready"],
    usage: "Apply to clean skin after bathing or whenever skin needs comfort. Avoid contact with eyes. For children, use under adult supervision.",
    privateNote: "Full label files, barcode records, supplier documents, and complete formula stay private for verified partners only."
  },
  {
    name: "BaBra Pocket Fresh",
    slogan: "Fresh confidence anywhere",
    image: "/products/pocket-fresh-rose.png",
    editions: ["Women Pocket Fresh", "Men Pocket Fresh", "Rose Edition", "Travel Size", "Luxury Packaging"],
    description:
      "A portable fragrance and freshness product line for travel, bags, offices, salons, retail counters, and hospitality partnerships.",
    benefits: ["Travel-friendly format", "Rose-led flagship positioning", "Modern pocket packaging", "Future QR verification ready"],
    usage: "Keep sealed until use. Open one pad, use gently as directed, then dispose responsibly.",
    privateNote: "The public website explains benefits and verification direction without publishing real verification codes."
  },
  {
    name: "BaBra Pads",
    slogan: "Comfort, protection, confidence",
    image: "/products/pads.png",
    editions: ["BaBra Comfort Pads", "BaBra Ultra Pads", "BaBra Night Pads", "BaBra Rose Edition Pads"],
    description:
      "A women-health product family positioned around comfort, hygiene, daily confidence, and reliable protection.",
    benefits: ["Comfort-focused positioning", "Day and night product ladder", "Clear hygiene education", "Retail sample-pack strategy"],
    usage: "Choose the right pad type for daily need, change regularly, and follow personal hygiene guidance.",
    privateNote: "Medical claims, compliance documents, and full technical specifications should be managed privately before launch."
  },
  {
    name: "BaBra Soap",
    slogan: "Seka, Sukura, Uhumure",
    image: "/products/soap-2.png",
    editions: ["BaBra Luxury Soap", "BaBra Herbal Soap", "BaBra Rose Soap", "BaBra Men Soap", "BaBra Baby Soap"],
    description:
      "A premium soap line with herbal, rose, men, baby, and luxury variants for daily cleansing and soft skin feel.",
    benefits: ["Herbal glow positioning", "Turmeric and aloe visual story", "150g retail pack direction", "Family and salon-ready line"],
    usage: "Lather with clean water, massage gently, rinse well, and keep the bar dry between uses.",
    privateNote: "Ingredient storytelling remains general online; full production details stay protected."
  }
];

const commerceBlocks = [
  ["Product landing pages", "Every category can become its own sales page with gallery, order button, reviews, FAQ, and wholesale pricing."],
  ["Future QR verification", "Customers can later scan official packaging to confirm authenticity without public exposure of real barcode data."],
  ["Wholesale engine", "Retail, reseller, wholesale, and distributor pricing can be attached by MOQ and verified account type."],
  ["AI product advisor", "The site structure is ready for a future assistant that recommends lotion, soap, pads, or pocket fresh by customer need."]
];

export const metadata = {
  title: "BaBra Cosmetics Products",
  description:
    "Explore BaBra Lotion, BaBra Pocket Fresh, BaBra Pads, and BaBra Soap product families with premium packaging, benefits, usage guidance, and future e-commerce readiness."
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="border-b border-white/10 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra.com</a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics Division</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">A complete premium product house.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                BaBra Cosmetics now includes lotion, pocket fresh, pads, and soap as future-ready product categories. Public content is designed to sell trust while protecting sensitive label, barcode, and formula details.
              </p>
            </div>
            <figure className="overflow-hidden rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-4 shadow-2xl shadow-black/40">
              <img className="h-[420px] w-full object-contain" src="/products/pocket-fresh-com.png" alt="BaBra Pocket Fresh and Pads product packaging" />
            </figure>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6">
          {productFamilies.map((family, index) => (
            <article key={family.name} className="grid overflow-hidden rounded-lg border border-white/10 bg-[#18110f] shadow-2xl shadow-black/20 lg:grid-cols-[0.95fr_1.05fr]">
              <figure className="bg-gradient-to-br from-white via-[#fff8eb] to-[#d5ad49] p-5">
                <img className="h-[420px] w-full object-contain drop-shadow-2xl" src={family.image} alt={`${family.name} packaging`} />
              </figure>
              <div className="p-6 md:p-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">Category 0{index + 1}</span>
                <h2 className="mt-3 font-serif text-5xl leading-none">{family.name}</h2>
                <p className="mt-2 text-lg font-black text-[#f1d58b]">{family.slogan}</p>
                <p className="mt-5 leading-8 text-white/66">{family.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {family.editions.map((edition) => (
                    <span key={edition} className="rounded-full border border-[#d6ad57]/30 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/82">
                      {edition}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {family.benefits.map((benefit) => (
                    <div key={benefit} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm font-bold text-white/78">
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-[#fffaf1] p-5 text-[#18110c]">
                    <h3 className="font-serif text-3xl">Usage</h3>
                    <p className="mt-3 leading-7 text-black/62">{family.usage}</p>
                  </div>
                  <div className="rounded-lg border border-[#d6ad57]/25 p-5">
                    <h3 className="font-serif text-3xl">Protected details</h3>
                    <p className="mt-3 leading-7 text-white/62">{family.privateNote}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#d6ad57]/25 bg-[#18110f] p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Samples and partnerships</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Launch-ready for shops, salons, and distributors.</h2>
              <p className="mt-6 text-lg leading-8 text-white/64">BaBra supports product samples, wholesale discussions, reseller onboarding, and partnership requests through a direct WhatsApp contact flow.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/contact">Request samples</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/quality">View quality proof</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Future e-commerce structure</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Ready for ordering, verification, and scale.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {commerceBlocks.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
