const subsidiaries = [
  ["BaBra Cosmetics", "Official BaBra Lotion Women, Men, and Babies 500 ml media is approved."],
  ["Rwanda Mobile Hub", "Official information pending."],
  ["BaBra Schools", "Official information pending."],
  ["BaBra Hospital", "Official information pending."],
  ["LifeTalk TV", "Official information pending."],
  ["BaBra Foundation", "Official information pending."],
];

const roadmap = [
  ["Phase 1", "Official BaBra media and product catalog foundation."],
  ["Phase 2", "Official information pending."],
  ["Phase 3", "Official information pending."],
];

export const metadata = {
  title: "EI BaBra Holding Ltd",
  description:
    "EI BaBra Holding Ltd official platform. Additional holding information pending approval."
};

export default function HoldingPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-12 max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Corporate structure</p>
            <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">EI BaBra Holding Ltd.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              Official EI BaBra Holding Ltd platform. Additional company information pending approval.
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

      <section className="bg-[#090706] px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#d6ad57]/25 bg-[#18110f] p-7 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Child & Family Support</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-none md:text-6xl">Family-based care first.</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/64">Official information pending.</p>
          <a className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/child-family-support">Open support program</a>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Five-year direction</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Official roadmap pending approval.</h2>
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
