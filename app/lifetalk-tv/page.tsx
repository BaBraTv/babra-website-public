const categories = [
  ["Motivation", "Short talks, mindset content, discipline, hope, and daily growth stories."],
  ["Business", "Practical business lessons, market education, sales thinking, and brand-building episodes."],
  ["Entrepreneurship", "Founder journeys, startup lessons, product development, and practical execution."],
  ["Documentaries", "Factory stories, community stories, education, agriculture, and transformation documentaries."],
  ["Success Stories", "Real people, resilience, business growth, and lessons from difficult beginnings."],
  ["Films & Series", "Original drama, motivation, romance, entrepreneurship, and family-friendly entertainment."],
];

const upcoming = ["NZABIGERAHO", "BaBra Founder Story", "Factory To Shelf", "Women In Business", "Youth Opportunity Series"];

const featuredMedia = [
  {
    title: "BaBra Production Story",
    label: "Factory to shelf",
    description:
      "A public-safe BaBra production media feature showing the product journey, premium brand standards, and customer trust without exposing formulas, QR codes, barcodes, or supplier-sensitive details.",
    video: "/videos/babra-production-ad.mp4",
    poster: "/brand/logo.jpeg"
  }
];

export const metadata = {
  title: "LifeTalk TV",
  description:
    "LifeTalk TV is the BaBra Group media division for motivation, business, entrepreneurship, documentaries, success stories, films, and series."
};

export default function LifeTalkPage() {
  return (
    <main className="min-h-screen bg-[#060505] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Media Division</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">LifeTalk TV.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                A streaming-style platform for motivation, entrepreneurship, business education, documentaries, success stories, and original films under the BaBra Group ecosystem.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/lifetalk-tv/nzabigeraho">Open NZABIGERAHO</a>
                <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/holding">Group structure</a>
              </div>
            </div>
            <div className="rounded-lg border border-[#d6ad57]/25 bg-gradient-to-br from-[#2a1512] via-[#100907] to-black p-6 shadow-2xl shadow-black/40">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Featured original</p>
              <h2 className="mt-4 font-serif text-6xl leading-none">NZABIGERAHO</h2>
              <p className="mt-5 text-lg leading-8 text-white/66">A drama about poverty, rejection, hidden success, leadership, forgiveness, and a love that sees character before status.</p>
              <a className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#130d08]" href="/lifetalk-tv/nzabigeraho">View film page</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <h2 className="font-serif text-5xl leading-none">Channels</h2>
            <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/70">Streaming-ready layout</span>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map(([title, text]) => (
              <article key={title} className="min-h-56 rounded-lg border border-white/10 bg-[#18110f] p-6 shadow-xl shadow-black/20">
                <h3 className="font-serif text-4xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Featured media</p>
              <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">BaBra videos visitors can watch.</h2>
            </div>
            <a className="rounded-full border border-white/20 px-5 py-3 font-black text-white" href="/store">
              Shop BaBra Store
            </a>
          </div>

          <div className="mt-10 grid gap-6">
            {featuredMedia.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border border-[#d6ad57]/25 bg-[#18110f] shadow-2xl shadow-black/30">
                <video
                  className="aspect-video w-full bg-black object-cover"
                  src={item.video}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
                <div className="p-6 md:p-8">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d6ad57]">{item.label}</span>
                  <h3 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{item.title}</h3>
                  <p className="mt-4 max-w-3xl leading-8 text-white/64">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Upcoming productions</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Media that grows the BaBra brand.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {upcoming.map((item) => (
              <div key={item} className="rounded-lg border border-black/10 bg-white p-5 font-black shadow-xl shadow-black/5">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
