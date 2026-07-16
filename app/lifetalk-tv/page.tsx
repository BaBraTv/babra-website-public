import type { Metadata } from "next";
import { officialMediaPendingLabel } from "../data/official-media";
import { site } from "../commerce-data";

const sections = [
  ["Shows", "Official show information pending approval."],
  ["Movies", "Official movie information pending approval."],
  ["Series", "Official series information pending approval."],
  ["News", "Official news format information pending approval."],
  ["Gallery", officialMediaPendingLabel]
];

export const metadata: Metadata = {
  title: "LifeTalk TV | Official BaBra Media Division",
  description: "Official LifeTalk TV page for shows, movies, series, news, gallery, and YouTube access.",
  alternates: {
    canonical: `${site.url}/lifetalk-tv`
  },
  openGraph: {
    title: "LifeTalk TV | Official BaBra Media Division",
    description: "Official LifeTalk TV content and media are pending approval.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeTalk TV | Official BaBra Media Division",
    description: "Official LifeTalk TV content and media are pending approval.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function LifeTalkPage() {
  return (
    <main className="min-h-screen bg-[#060505] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official media division</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">LifeTalk TV.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                Official LifeTalk TV public content, thumbnails, channel links, and gallery media are pending approval.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/forms/lifetalk-tv">LifeTalk TV forms</a>
                <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/contact">Request YouTube link</a>
              </div>
            </div>
            <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-[#d6ad57]/35 bg-[#18110f] p-6 text-center text-sm font-black uppercase tracking-[0.14em] text-[#f1d58b] shadow-2xl shadow-black/40">
              {officialMediaPendingLabel}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-5xl leading-none">Official content areas.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {sections.map(([title, text]) => (
              <article key={title} className="min-h-48 rounded-lg border border-white/10 bg-[#18110f] p-6 shadow-xl shadow-black/20">
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
