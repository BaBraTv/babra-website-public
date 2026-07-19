import type { Metadata } from "next";
import Image from "next/image";

const pageUrl = "https://www.babra.store/foundation";
const foundationMedia = "/media/foundation";

export const metadata: Metadata = {
  title: "BaBra Foundation | Community Care in Rwanda",
  description:
    "BaBra Foundation supports children, families, education, health, and community wellbeing through compassionate action in Rwanda.",
  keywords: [
    "BaBra Foundation",
    "Rwanda community support",
    "children support Rwanda",
    "education support Rwanda",
    "community health Rwanda",
    "volunteer Rwanda"
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "BaBra Foundation | Care that reaches the community",
    description: "Supporting children and families through education, health, dignity, and practical community care.",
    url: pageUrl,
    siteName: "BaBra",
    locale: "en_RW",
    type: "website",
    images: [
      {
        url: `${foundationMedia}/babra-foundation-open-graph.webp`,
        width: 1200,
        height: 630,
        alt: "BaBra Foundation community gathering with children, families, and volunteers"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Foundation | Community Care in Rwanda",
    description: "Education, health, dignity, and practical care for children and families.",
    images: [`${foundationMedia}/babra-foundation-twitter-card.webp`]
  }
};

const programs = [
  {
    id: "education",
    eyebrow: "Education",
    title: "Helping children feel ready to learn.",
    copy: "We support learning through practical care, encouragement, and community participation that helps children move forward with confidence.",
    image: `${foundationMedia}/babra-foundation-education-support.webp`,
    alt: "Children and BaBra Foundation community members gathered during an education support activity"
  },
  {
    id: "health",
    eyebrow: "Health",
    title: "Wellbeing begins with everyday care.",
    copy: "Our community-centred approach connects nutrition, dignity, attentive support, and healthier daily routines for children and families.",
    image: `${foundationMedia}/babra-foundation-child-wellbeing.webp`,
    alt: "Children receiving refreshments during a BaBra Foundation wellbeing activity"
  },
  {
    id: "children-support",
    eyebrow: "Children Support",
    title: "Every child deserves to be seen and supported.",
    copy: "We create caring moments where children can gather safely, receive practical support, and experience the strength of a community around them.",
    image: `${foundationMedia}/babra-foundation-children-support.webp`,
    alt: "Children seated together with refreshments during an official BaBra Foundation support visit"
  }
] as const;

const gallery = [
  {
    src: `${foundationMedia}/babra-foundation-community-impact.webp`,
    alt: "BaBra Foundation volunteers, families, and children at an official community gathering"
  },
  {
    src: `${foundationMedia}/babra-foundation-community-outreach.webp`,
    alt: "BaBra Foundation community outreach with children and caregivers outdoors"
  },
  {
    src: `${foundationMedia}/babra-foundation-education-support.webp`,
    alt: "Children and community members together at a BaBra Foundation support activity"
  },
  {
    src: `${foundationMedia}/babra-foundation-child-wellbeing.webp`,
    alt: "Children sharing refreshments during a BaBra Foundation community programme"
  }
] as const;

function FoundationImage({
  src,
  alt,
  className,
  sizes,
  priority = false
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={810}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={84}
    />
  );
}

export default function FoundationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "BaBra Foundation",
    url: pageUrl,
    description:
      "BaBra Foundation supports children, families, education, health, and community wellbeing through compassionate action in Rwanda.",
    parentOrganization: {
      "@type": "Organization",
      name: "EI BaBra Holding Ltd",
      url: "https://www.babra.store"
    },
    areaServed: { "@type": "Country", name: "Rwanda" },
    knowsAbout: ["Community support", "Education support", "Child wellbeing", "Family support", "Community health"],
    image: `${foundationMedia}/babra-foundation-open-graph.webp`
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#090706] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-black/25 px-5 py-5 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="font-serif text-xl md:text-2xl" href="/">EI BaBra Holding Ltd</a>
          <nav aria-label="Foundation navigation" className="hidden items-center gap-5 text-sm font-bold text-white/80 md:flex">
            <a href="#mission">Mission</a>
            <a href="#impact">Impact</a>
            <a href="#gallery">Gallery</a>
            <a className="rounded-full border border-[#f1d58b]/50 px-4 py-2 text-[#f1d58b]" href="/forms/foundation">Get involved</a>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[88vh] items-end px-5 pb-16 pt-36 md:px-8 md:pb-24">
        <FoundationImage
          src={`${foundationMedia}/babra-foundation-community-impact.webp`}
          alt="BaBra Foundation community gathering with children, families, and volunteers in Rwanda"
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-black/35" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#f1d58b]">BaBra Foundation · Rwanda</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] md:text-7xl lg:text-8xl">Care that reaches the community.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
            Standing with children and families through education, health, dignity, and practical community support.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#f1d58b] px-7 py-3.5 font-black text-[#17110a]" href="/forms/foundation">Support the mission</a>
            <a className="rounded-full border border-white/35 bg-black/20 px-7 py-3.5 font-black" href="#impact">See our impact</a>
          </div>
        </div>
      </section>

      <section id="mission" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f1d58b]">Our Mission</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Dignity, opportunity, and belonging.</h2>
          </div>
          <div className="border-l border-[#f1d58b]/35 pl-7 md:pl-10">
            <p className="text-xl leading-9 text-white/70 md:text-2xl md:leading-10">
              BaBra Foundation brings people together around the needs of children and families. We believe meaningful impact grows from listening, showing up, and turning compassion into consistent action.
            </p>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-[#f4efe5] px-5 py-20 text-[#17110a] md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#805e24]">Community Impact</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Support shaped around real lives.</h2>
            <p className="mt-6 text-lg leading-8 text-black/65">Our work begins in community—with care that is practical, respectful, and focused on children and families.</p>
          </div>

          <div className="mt-14 space-y-8 md:space-y-12">
            {programs.map((program, index) => (
              <article key={program.id} id={program.id} className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-black/10 lg:grid-cols-2">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <FoundationImage
                    src={program.image}
                    alt={program.alt}
                    className="h-full min-h-72 w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#805e24]">{program.eyebrow}</p>
                  <h3 className="mt-4 font-serif text-4xl leading-tight">{program.title}</h3>
                  <p className="mt-5 text-lg leading-8 text-black/62">{program.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f1d58b]">Gallery</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Moments from the community.</h2>
            <p className="max-w-md leading-7 text-white/60">Official BaBra Foundation media documenting care, connection, and community participation.</p>
          </div>
          <div className="mt-12 grid auto-rows-[16rem] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <figure key={item.src} className={`group relative overflow-hidden rounded-3xl ${index === 0 ? "md:row-span-2 lg:col-span-2" : ""}`}>
                <FoundationImage
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </figure>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black">
            <video className="aspect-video w-full object-cover" controls preload="metadata">
              <source src={`${foundationMedia}/babra-foundation-vulnerable-community-support.mp4`} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-[#f1d58b] p-8 text-[#17110a] md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-black/60">Donation CTA</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Help care go further.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-black/65">Connect with the Foundation team to discuss donations, in-kind support, or a community partnership.</p>
            <a className="mt-8 inline-flex rounded-full bg-[#17110a] px-7 py-3.5 font-black text-white" href="/forms/foundation">Make a donation enquiry</a>
          </article>
          <article className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f1d58b]">Volunteer CTA</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Bring your time and heart.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Share your skills, take part in community activities, and help us build a dependable network of care.</p>
            <a className="mt-8 inline-flex rounded-full border border-[#f1d58b]/60 px-7 py-3.5 font-black text-[#f1d58b]" href="/forms/foundation">Register to volunteer</a>
          </article>
        </div>
      </section>
    </main>
  );
}
