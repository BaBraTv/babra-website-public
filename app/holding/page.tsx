import type { Metadata } from "next";
import { site } from "../commerce-data";

const companies = [
  ["BaBra Cosmetics", "Official cosmetics division with approved 500 ml BaBra Lotion product media.", "/cosmetics"],
  ["Rwanda Mobile Hub", "Repairs, accessories, software, hardware, and training routes.", "/rwanda-mobile-hub"],
  ["BaBra Schools", "Nursery, primary, secondary, university, innovation, scholarship, and masterplan access.", "/schools"],
  ["BaBra Foundation", "Mission, education, health, community, and donation access.", "/foundation"],
  ["LifeTalk TV", "Shows, movies, series, news, gallery, and YouTube access.", "/lifetalk-tv"]
];

const pillars = [
  ["About", "BaBra Holding Ltd is the public platform for the official BaBra company ecosystem."],
  ["Portfolio", "Public routes connect BaBra's commerce, technology, education, healthcare, agriculture, media, and community-impact work."],
  ["Digital access", "Customers, applicants, partners, and communities can reach the appropriate BaBra division through official forms and contact routes."],
  ["Trust", "The platform publishes approved information and clearly labels services that require manual verification."]
];

const roadmap = [
  ["Explore", "Open the official page for each BaBra company or public service."],
  ["Request", "Use the relevant form, account flow, or WhatsApp contact for your request."],
  ["Verify", "Wait for BaBra staff to confirm prices, availability, payments, appointments, or application status."]
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
              The official public gateway to BaBra companies, products, services, forms, and verified contact routes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">About the platform</p>
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
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">How to use BaBra</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Clear routes from interest to confirmation.</h2>
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
