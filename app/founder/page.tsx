import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaPendingLabel } from "../data/official-media";
import { site } from "../commerce-data";

const sections = [
  ["Founder & CEO", "Official founder profile information pending approval."],
  ["Vision", "Official founder vision statement pending approval."],
  ["Mission", "Official founder mission statement pending approval."],
  ["Leadership", "Official leadership statement pending approval."]
];

export const metadata: Metadata = {
  title: "Founder & CEO | BaBra Holding Ltd",
  description: "Official Founder and CEO page for BaBra Holding Ltd. Founder profile content and media are pending official approval.",
  alternates: {
    canonical: `${site.url}/founder`
  },
  openGraph: {
    title: "Founder & CEO | BaBra Holding Ltd",
    description: "Official Founder and CEO page for BaBra Holding Ltd.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder & CEO | BaBra Holding Ltd",
    description: "Official Founder and CEO page for BaBra Holding Ltd.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function FounderPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Official information pending",
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: "BaBra Holding Ltd",
      url: site.url
    }
  };

  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">
              BaBra Holding Ltd
            </a>
            <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Founder & CEO</p>
            <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Official founder profile.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
              Founder photo, biography, vision, mission, and leadership message are pending official approval.
            </p>
          </div>
          <figure className="rounded-[2rem] border border-[#d6ad57]/25 bg-white/[0.055] p-6 shadow-2xl shadow-black/35">
            <OfficialMedia media={null} className="min-h-[420px] rounded-[1.5rem]" />
            <figcaption className="mt-4 text-center text-sm font-black uppercase tracking-[0.16em] text-[#f1d58b]">
              {officialMediaPendingLabel}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sections.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
              <h2 className="font-serif text-3xl">{title}</h2>
              <p className="mt-4 leading-7 text-black/62">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
