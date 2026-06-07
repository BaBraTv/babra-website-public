const challenges = ["Poverty", "Rejection", "Betrayal", "Humiliation", "Lack of opportunities", "Hard work without recognition"];
const endings = ["Company success", "Personal transformation", "Employee lessons", "Respect and forgiveness", "Wedding and legacy"];
const seasons = [
  ["Season 1", "Extreme Poverty"],
  ["Season 2", "Searching for Opportunities"],
  ["Season 3", "Building the Dream"],
  ["Season 4", "Hidden Success"],
  ["Season 5", "The Secret Boss"],
  ["Season 6", "The Revelation"],
  ["Season 7", "The Wedding & Legacy"],
];

export const metadata = {
  title: "NZABIGERAHO Film",
  description:
    "NZABIGERAHO is a LifeTalk TV drama, motivation, entrepreneurship, romance, and success story about a hidden founder, rejection, forgiveness, and legacy."
};

export default function NzabigerahoPage() {
  return (
    <main className="min-h-screen bg-[#070505] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/lifetalk-tv">LifeTalk TV</a>
          <div className="mt-12 max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Original film project</p>
            <h1 className="mt-4 font-serif text-7xl leading-none md:text-9xl">NZABIGERAHO</h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/66">
              Drama, motivation, entrepreneurship, romance, and success story. A poor young man is underestimated by everyone, secretly builds a successful company, and later reveals that the ordinary worker they mocked is the founder.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Drama", "Motivation", "Entrepreneurship", "Romance", "Success Story"].map((genre) => (
                <span key={genre} className="rounded-full border border-[#d6ad57]/35 bg-white/[0.06] px-4 py-2 text-sm font-black text-[#f1d58b]">{genre}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Story overview</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">A hidden founder story.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-black/66">
            <p>A young poor man starts life with nothing. He faces poverty, rejection, betrayal, humiliation, and a lack of opportunities, but he keeps working extremely hard every day.</p>
            <p>Years later he secretly builds a successful company. Nobody knows he is the owner. Employees and managers mistreat him because they think he is an ordinary worker.</p>
            <p>Several women reject him because of his apparent social status. Only one humble young woman in a low-ranking position shows kindness, respects him, and supports him during difficult moments.</p>
            <p>The founder later asks HR to promote her because of her dedication and good heart. When the company grows, everyone discovers that the humble worker they underestimated is actually the owner of the entire company.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-[#18110f] p-7">
              <h2 className="font-serif text-5xl leading-none">Conflict</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {challenges.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 font-bold text-white/78">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#d6ad57]/25 bg-[#18110f] p-7">
              <h2 className="font-serif text-5xl leading-none">Resolution</h2>
              <div className="mt-8 grid gap-3">
                {endings.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 font-bold text-white/78">{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Seven-season roadmap</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">From poverty to legacy.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {seasons.map(([season, title]) => (
                <article key={season} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
                  <span className="text-sm font-black text-[#f1d58b]">{season}</span>
                  <h3 className="mt-2 font-serif text-3xl">{title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
