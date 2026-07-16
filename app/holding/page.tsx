import type { Metadata } from "next";
import { site } from "../commerce-data";
import { officialMediaPendingLabel } from "../data/official-media";

const companies = [
  ["BaBra Cosmetics", "Official cosmetics division with approved 500 ml BaBra Lotion product media.", "/cosmetics"],
  ["Rwanda Mobile Hub", "Official information pending.", "/rwanda-mobile-hub"],
  ["BaBra Schools", "Official information pending.", "/schools"],
  ["BaBra Foundation", "Official information pending.", "/foundation"],
  ["LifeTalk TV", "Official information pending.", "/lifetalk-tv"]
];

const pillars = [
  ["About", "Official company profile pending approval."],
  ["Vision", "Official vision statement pending approval."],
  ["Mission", "Official mission statement pending approval."],
  ["Values", "Official values pending approval."]
];

const roadmap = [
  ["Current", "Official public platform, approved product media, and official content intake foundation."],
  ["Next", "Official division media, founder content, and approved company information."],
  ["Future", "Official roadmap pending approval."]
];

export const metadata: Metadata = {
  title: "BaBra Holding Ltd | Official Companies",
  description: "Official BaBra Holding Ltd page for BaBra Cosmetics, Rwanda Mobile Hub, BaBra Schools, BaBra Foundation, and LifeTalk TV.",
  alternates: {
    canonical: `${site.url}/holding`
  },
  openGraph: {
    title: "BaBra Holding Ltd | Official Companies",
    description: "Official BaBra Holding Ltd company structure.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Holding Ltd | Official Companies",
    description: "Official BaBra Holding Ltd company structure.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function HoldingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BaBra Holding Ltd",
    url: site.url,
    logo: `${site.url}/media/logos/babra-logo.jpeg`,
    subOrganization: companies.map(([name, description, route]) => ({
      "@type": "Organization",
      name,
      description,
      url: `${site.url}${route}`
    }))
  };

  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-12 max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official holding platform</p>
            <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">BaBra Holding Ltd.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              Official public page for the BaBra company ecosystem. Detailed company history and leadership information are pending approval.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">About, vision, mission, values</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h2 className="font-serif text-3xl">{title}</h2>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Companies</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Official BaBra companies.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {companies.map(([title, text, href]) => (
              <a key={title} href={href} className="rounded-lg border border-white/10 bg-[#18110f] p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-[#d6ad57]/45">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090706] px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Future roadmap</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Official roadmap status.</h2>
          <div className="mt-10 grid gap-5">
            {roadmap.map(([phase, text]) => (
              <article key={phase} className="grid gap-4 rounded-lg border border-white/10 bg-[#18110f] p-6 md:grid-cols-[180px_1fr] md:items-center">
                <h3 className="font-serif text-4xl text-[#f1d58b]">{phase}</h3>
                <p className="text-lg leading-8 text-white/66">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-dashed border-[#d6ad57]/35 p-5 text-sm font-black uppercase tracking-[0.14em] text-[#f1d58b]">
            {officialMediaPendingLabel}
          </p>
        </div>
      </section>
    </main>
  );
}
