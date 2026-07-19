const qualitySignals = [
  ["Approved public media", "Only verified BaBra logo and official BaBra Lotion bottle media are displayed publicly."],
  ["Pending documentation", "Official certifications and quality documents are pending approval before public display."],
  ["Protected details", "Ingredients, production details, batch records, and private labels are not published until approved."],
  ["Partner review", "Verified partners can request official documentation through BaBra contact channels when available."]
];

export const metadata = {
  title: "BaBra Quality & Official Information",
  description: "BaBra quality page with approved public media and pending official documentation status."
};

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Quality and official information</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Official information pending.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                This page avoids publishing unapproved certifications, ingredients, medical claims, production details, reviews, or testimonials.
              </p>
            </div>
            <div className="rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-7 text-[#18110c] shadow-2xl shadow-black/35">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a9141d]">Public wording rule</p>
              <h2 className="mt-3 font-serif text-4xl leading-none">Approved evidence only.</h2>
              <p className="mt-5 leading-8 text-black/64">
                Official BaBra documentation will be added after approval. Until then, sensitive or unverified information stays private.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Current status</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">No unapproved claims are published.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {qualitySignals.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
