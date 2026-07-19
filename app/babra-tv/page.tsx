import type { Metadata } from "next";
import { YouTubeIcon } from "../components/YouTubeIcon";
import { officialChannels, verifiedExternalLinkProps } from "../data/official-channels";

const channel = officialChannels.babra;
const divisions = ["Founder and Leadership", "BaBra Cosmetics", "Rwanda Mobile Hub", "BaBra Schools", "BaBra Foundation", "Business and Innovation"] as const;

export const metadata: Metadata = {
  title: "BaBra TV | Building a Better Future",
  description: "BaBra TV is the official corporate media channel for the BaBra ecosystem, sharing its journey, products, projects, innovation, and community impact.",
  alternates: { canonical: "https://www.babra.store/babra-tv" },
  openGraph: {
    title: "BaBra TV | Building a Better Future",
    description: "Official updates, projects, products, people, and vision from across the BaBra ecosystem.",
    url: "https://www.babra.store/babra-tv",
    siteName: "BaBra",
    locale: "en_RW",
    type: "website"
  },
  twitter: { card: "summary", title: "BaBra TV | Building a Better Future", description: "The official corporate media channel of the BaBra ecosystem." }
};

export default function BaBraTvPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: channel.name,
    url: "https://www.babra.store/babra-tv",
    slogan: channel.tagline,
    sameAs: [channel.youtubeUrl],
    parentOrganization: { "@type": "Organization", name: "EI BaBra Holding Ltd", url: "https://www.babra.store" }
  };

  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(241,213,139,0.22),transparent_30rem),linear-gradient(135deg,#080606,#17100c)]" />
        <div className="relative mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/">EI BaBra Holding Ltd</a>
          <p className="mt-16 text-sm font-black uppercase tracking-[0.28em] text-[#d6ad57]">Official corporate channel</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.9] md:text-8xl">BaBra TV</h1>
          <p className="mt-6 font-serif text-3xl text-[#f1d58b] md:text-4xl">{channel.tagline}</p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">The founder journey, company developments, products, innovation, education, community impact, and the long-term vision behind the BaBra ecosystem.</p>
          <a {...verifiedExternalLinkProps} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#f1d58b] px-7 py-3.5 font-black text-[#17110a]" href={channel.youtubeUrl}><YouTubeIcon /> Visit official channel</a>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#120d0b] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Corporate Content</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">One channel for the work behind BaBra.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">BaBra TV documents the business ecosystem. Entertainment, dramatic stories, interviews, documentaries, and human-interest programming belong on LifeTalk TV.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => <div key={division} className="rounded-3xl border border-[#f1d58b]/15 bg-white/[0.05] p-7 font-serif text-3xl">{division}</div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-[#f1d58b] p-8 text-[#17110a] md:p-12">
            <h2 className="font-serif text-5xl">Follow the official journey.</h2>
            <p className="mt-5 leading-8 text-black/65">Watch published BaBra updates, project stories, product work, leadership perspectives, and behind-the-scenes company content.</p>
            <a {...verifiedExternalLinkProps} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17110a] px-6 py-3 font-black text-white" href={channel.youtubeUrl}><YouTubeIcon /> Open {channel.handle}</a>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-12">
            <h2 className="font-serif text-5xl">Corporate enquiries.</h2>
            <p className="mt-5 leading-8 text-white/60">For official business, project, media, or production conversations, use BaBra's verified website contact route.</p>
            <a className="mt-8 inline-flex rounded-full border border-[#f1d58b]/50 px-6 py-3 font-black text-[#f1d58b]" href="/contact">Contact BaBra</a>
          </article>
        </div>
      </section>
    </main>
  );
}
