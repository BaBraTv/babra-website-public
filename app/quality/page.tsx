const qualitySignals = [
  {
    title: "GMP manufacturing environment",
    label: "Intertek GMP documentation",
    text: "BaBra production is supported by a manufacturing partner with cosmetics Good Manufacturing Practice documentation. This helps customers and retailers trust that production discipline, hygiene, and quality systems are taken seriously."
  },
  {
    title: "ISO cosmetics manufacturing standard",
    label: "ISO 22716 cosmetics GMP",
    text: "ISO 22716 is a cosmetics manufacturing guideline focused on controlled production, quality handling, storage, and documentation discipline."
  },
  {
    title: "Rwanda documentation path",
    label: "Local registration and permit evidence",
    text: "BaBra keeps Rwanda business and product documentation ready for regulator, retailer, distributor, and partner verification."
  },
  {
    title: "COA and product checks",
    label: "Certificate of Analysis available privately",
    text: "COA and technical product documents can be shared with verified business partners, regulators, and formal distributors without exposing sensitive product details publicly."
  }
];

const publicClaims = [
  ["Public trust signal", "Quality documentation available for verified partners."],
  ["Public trust signal", "Manufactured with GMP and ISO cosmetics manufacturing support."],
  ["Public trust signal", "Product authenticity verification system planned."],
  ["Protected document", "Full COA, full label files, certificate QR codes, batch details, and formula records are shared only through verified channels."],
  ["Protected document", "Regulatory and distributor documents are handled privately to protect the brand and customers."],
  ["Customer safety", "BaBra uses careful wording and avoids unsupported medical treatment claims."],
];

const verificationSteps = [
  ["Customer trust", "Customers see quality badges, safe product education, and a clear authenticity-verification direction."],
  ["Retailer trust", "Retailers can request official documents through a verified business contact process."],
  ["Regulator trust", "Regulators and formal distributors can receive full documents through private channels."],
  ["Brand protection", "Public pages build confidence without giving competitors full technical material to copy."],
];

export const metadata = {
  title: "BaBra Quality & Compliance",
  description:
    "BaBra quality and compliance trust page covering GMP manufacturing support, ISO cosmetics manufacturing documentation, Rwanda documentation readiness, and protected COA verification."
};

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra.com</a>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Quality and compliance</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Trust that can be verified.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                BaBra Lotion is positioned with quality documentation, manufacturing discipline, and protected verification systems. Public pages show trust signals; full certificates, COA, QR codes, batch details, and formula-sensitive documents stay private for verified partners.
              </p>
            </div>
            <div className="rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-7 text-[#18110c] shadow-2xl shadow-black/35">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a9141d]">Important wording rule</p>
              <h2 className="mt-3 font-serif text-4xl leading-none">Use evidence-based claims only.</h2>
              <p className="mt-5 leading-8 text-black/64">
                The strongest public position is quality documented, GMP-supported, ISO cosmetics manufacturing support, COA available for verified partners, and Rwanda documentation ready. Any future clinical or dermatology claim should be added only after a matching formal report is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Trust signals</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Premium quality story without exposing private documents.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {qualitySignals.map((signal) => (
              <article key={signal.title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">{signal.label}</span>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{signal.title}</h3>
                <p className="mt-4 leading-7 text-black/62">{signal.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Claim control</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Strong claims must be legally defensible.</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              This protects BaBra from customer complaints, regulator issues, and competitors challenging the brand. It also makes the website more credible because every public statement can be supported.
            </p>
          </div>
          <div className="grid gap-3">
            {publicClaims.map(([status, text]) => (
              <div key={text} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{status}</span>
                <p className="mt-2 font-bold leading-7 text-white/78">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Verification model</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Public confidence, private proof.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {verificationSteps.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-[#1d1512] p-6">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
