import type { Metadata } from "next";
import Image from "next/image";
import { site } from "../commerce-data";

const founderImage = "/media/founder/founder-ceo-384.webp";
const founderImageAlt = "Official portrait of the BaBra Founder and CEO";

const verifiedProfile = [
  ["Role", "Founder & CEO"],
  ["Organization", "EI BaBra Holding Ltd"],
  ["Public platform", "babra.store"]
];

const verifiedJourney = [
  {
    label: "Founder leadership",
    detail: "Founder and CEO of EI BaBra Holding Ltd."
  },
  {
    label: "BaBra ecosystem",
    detail: "Leadership across BaBra's public business, education, health, technology, media, agriculture, and community-impact divisions."
  },
  {
    label: "Current public platform",
    detail: "The official BaBra public platform is published through babra.store."
  }
];

export const metadata: Metadata = {
  title: "Founder & CEO | EI BaBra Holding Ltd",
  description: "Official Founder and CEO page for EI BaBra Holding Ltd with verified official founder portrait.",
  alternates: {
    canonical: `${site.url}/founder`
  },
  openGraph: {
    title: "Founder & CEO | EI BaBra Holding Ltd",
    description: "Official Founder and CEO page for EI BaBra Holding Ltd.",
    images: [{ url: founderImage, width: 384, height: 384, alt: founderImageAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder & CEO | EI BaBra Holding Ltd",
    description: "Official Founder and CEO page for EI BaBra Holding Ltd.",
    images: [founderImage]
  }
};

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <section className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_12%,rgba(241,213,139,0.18),transparent_28rem),radial-gradient(circle_at_82%_18%,rgba(29,78,216,0.18),transparent_30rem),linear-gradient(180deg,#070504,#110d0b_68%,#070504)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <a className="rounded-full text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1d58b]" href="/">
              EI BaBra Holding Ltd
            </a>
            <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Founder & CEO</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Official founder profile.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
              The official public leadership profile for EI BaBra Holding Ltd and the BaBra ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" aria-label="Founder page actions">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#101010] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1d58b]" href="/holding">
                Explore Holding
              </a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:border-[#f1d58b]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1d58b]" href="/contact">
                Contact BaBra
              </a>
            </div>
          </div>

          <figure className="rounded-[2rem] border border-[#d6ad57]/25 bg-white/[0.055] p-6 shadow-2xl shadow-black/35">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d6ad57]/30 bg-black/35 p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(241,213,139,0.18),transparent_18rem),linear-gradient(145deg,rgba(7,5,4,0.12),rgba(7,5,4,0.72))]" aria-hidden="true" />
              <Image
                className="relative mx-auto aspect-square w-full max-w-[384px] rounded-[1.25rem] object-cover shadow-2xl shadow-black/35"
                src={founderImage}
                alt={founderImageAlt}
                width={384}
                height={384}
                sizes="(max-width: 768px) 82vw, 384px"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[#f1d58b]">
              Official Founder & CEO portrait
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Verified profile</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {verifiedProfile.map(([label, value]) => (
              <article key={label} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-black/45">{label}</h2>
                <p className="mt-3 font-serif text-3xl leading-tight">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1627] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Journey</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Verified timeline.</h2>
          <div className="mt-10 grid gap-5">
            {verifiedJourney.map((item, index) => (
              <article key={item.label} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-6 md:grid-cols-[120px_1fr] md:items-center">
                <span className="font-serif text-4xl text-[#f1d58b]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-3xl">{item.label}</h3>
                  <p className="mt-2 leading-7 text-white/62">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
