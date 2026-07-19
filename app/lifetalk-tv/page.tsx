import type { Metadata } from "next";
import { YouTubeIcon } from "../components/YouTubeIcon";
import { officialChannels, verifiedExternalLinkProps } from "../data/official-channels";

const channel = officialChannels.lifetalk;

const contentLanes = [
  ["Movies and Series", "Original and selected narrative work built around memorable characters and meaningful stories."],
  ["Interviews", "Thoughtful conversations with people whose experiences, ideas, and work can inform and inspire."],
  ["Documentaries", "Human-centred documentary storytelling grounded in people, communities, and lived experience."],
  ["Inspirational Stories", "Stories of resilience, purpose, progress, creativity, and positive change."],
  ["News and Features", "Credible features and public-interest storytelling presented with context and care."],
  ["Community Stories", "A space for social stories, local voices, and experiences that deserve attention."]
] as const;

export const metadata: Metadata = {
  title: "LifeTalk TV | Stories That Inspire Life",
  description: "LifeTalk TV is a Rwanda-based media platform for films, series, interviews, documentaries, inspirational stories, and meaningful conversations.",
  alternates: { canonical: "https://www.babra.store/lifetalk-tv" },
  openGraph: {
    title: "LifeTalk TV | Stories That Inspire Life",
    description: "Cinematic, human-centred storytelling from Rwanda for audiences in Africa and around the world.",
    url: "https://www.babra.store/lifetalk-tv",
    siteName: "BaBra",
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "LifeTalk TV | Stories That Inspire Life",
    description: "Films, series, interviews, documentaries, and human stories from Rwanda."
  }
};

export default function LifeTalkPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: channel.name,
    url: "https://www.babra.store/lifetalk-tv",
    slogan: channel.tagline,
    sameAs: [channel.youtubeUrl],
    parentOrganization: { "@type": "Organization", name: "EI BaBra Holding Ltd", url: "https://www.babra.store" }
  };

  return (
    <main className="min-h-screen bg-[#070506] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(169,20,29,0.34),transparent_30rem),radial-gradient(circle_at_12%_75%,rgba(214,173,87,0.15),transparent_28rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/">BaBra ecosystem</a>
          <p className="mt-16 text-sm font-black uppercase tracking-[0.28em] text-[#df4751]">Rwanda-based media platform</p>
          <h1 className="mt-5 max-w-5xl font-serif text-6xl leading-[0.9] md:text-8xl">LifeTalk TV</h1>
          <p className="mt-6 font-serif text-3xl text-[#f1d58b] md:text-4xl">{channel.tagline}</p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
            Films, series, interviews, documentaries, inspirational stories, and meaningful conversations designed to inform, entertain, and inspire.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a {...verifiedExternalLinkProps} className="inline-flex items-center gap-2 rounded-full bg-[#e5222d] px-7 py-3.5 font-black text-white" href={channel.youtubeUrl}>
              <YouTubeIcon /> Visit official channel
            </a>
            <a className="rounded-full border border-white/20 px-7 py-3.5 font-black" href="/forms/lifetalk-tv">Work with LifeTalk TV</a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#df4751]">About LifeTalk TV</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Stories with feeling, purpose, and credibility.</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 md:p-12">
            <p className="text-xl leading-9 text-white/70">LifeTalk TV is the BaBra ecosystem's storytelling channel: cinematic in presentation, human-centred in perspective, and open to East African and global audiences.</p>
            <p className="mt-5 leading-8 text-white/55">It remains distinct from BaBra TV, which focuses on the corporate ecosystem, products, projects, leadership, and business progress.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#120d0e] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f1d58b]">Programming Direction</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">A clear home for every kind of story.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {contentLanes.map(([title, description]) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-black/25 p-7">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-8 text-white/58">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#f1d58b]/25 bg-[linear-gradient(135deg,#211517,#0b0809)] p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Featured Story World</p>
            <h2 className="mt-4 font-serif text-5xl">Nzabigeraho</h2>
            <p className="mt-5 leading-8 text-white/62">Explore the official LifeTalk TV story concept centred on resilience, ambition, dignity, forgiveness, and legacy.</p>
            <a className="mt-8 inline-flex rounded-full border border-white/20 px-6 py-3 font-black" href="/lifetalk-tv/nzabigeraho">Explore Nzabigeraho</a>
          </article>
          <article className="rounded-[2rem] bg-[#e5222d] p-8 md:p-12">
            <YouTubeIcon className="h-10 w-10" />
            <h2 className="mt-5 font-serif text-5xl">Watch on YouTube</h2>
            <p className="mt-5 leading-8 text-white/80">Follow the verified LifeTalk TV channel for published films, interviews, series, documentaries, features, and future releases.</p>
            <a {...verifiedExternalLinkProps} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#9d1119]" href={channel.youtubeUrl}>Open {channel.handle}</a>
          </article>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Production and Partnership</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Bring a meaningful project to the table.</h2>
          </div>
          <a className="rounded-full bg-[#f1d58b] px-7 py-3.5 font-black text-[#17110a]" href="/forms/lifetalk-tv">Open LifeTalk TV forms</a>
        </div>
      </section>
    </main>
  );
}
