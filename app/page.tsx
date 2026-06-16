import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EI BaBra Holding Ltd | Beauty, Agriculture, Education, Media & Impact",
  description:
    "EI BaBra Holding Ltd is the parent ecosystem for BaBra Cosmetics Rwanda, BaBra Farm, BaBra Schools, LifeTalk TV, BaBra Foundation, Rwanda Mobile Hub, and future hospital systems."
};

const nav = [
  ["Home", "/"],
  ["Companies", "#companies"],
  ["Foundation", "/foundation"],
  ["Investors", "#investors"],
  ["Careers", "/job-application"],
  ["Contact", "/contact"]
];

const companies = [
  {
    name: "BaBra Cosmetics",
    href: "/cosmetics",
    theme: "from-[#f1d58b] via-[#fff8db] to-[#090706]",
    border: "border-[#f1d58b]/35",
    label: "Premium beauty commerce",
    description: "Skincare, lotion, soap, pads, pocket fresh, showroom, beauty commerce.",
    button: "Enter BaBra Cosmetics"
  },
  {
    name: "BaBra Farm",
    href: "/farm",
    theme: "from-[#4ade80] via-[#d9f99d] to-[#0b1d12]",
    border: "border-[#4ade80]/35",
    label: "Agriculture and supply chain",
    description: "Agriculture, supply chain, farmer marketplace, livestock, and East Africa expansion.",
    button: "Enter BaBra Farm"
  },
  {
    name: "BaBra Schools",
    href: "/schools",
    theme: "from-[#7dd3fc] via-[#e0f2fe] to-[#06152f]",
    border: "border-[#7dd3fc]/35",
    label: "Future education systems",
    description: "Future nursery, primary, secondary, university, digital learning, and school systems.",
    button: "Enter BaBra Schools"
  },
  {
    name: "LifeTalk TV",
    href: "/lifetalk-tv",
    theme: "from-[#ef4444] via-[#cbd5e1] to-[#090706]",
    border: "border-[#ef4444]/35",
    label: "Media and storytelling",
    description: "Motivation, business, documentaries, films, interviews, and success stories.",
    button: "Enter LifeTalk TV"
  }
];

const otherDivisions = [
  ["BaBra Pocket Fresh", "/products", "Portable freshness products for modern customers and retail shelves."],
  ["BaBra Pads", "/products", "Personal-care products positioned for comfort, confidence, and trusted distribution."],
  ["BaBra Soap", "/products", "Future BaBra soap line connected to premium skincare and daily hygiene."],
  ["BaBra Showroom", "/showroom", "Customer experience, product verification, samples, and partner onboarding."],
  ["BaBra Hospital", "/hospital", "Future healthcare vision for trusted care, systems, and community service."],
  ["Rwanda Mobile Hub", "/rwanda-mobile-hub", "Mobile technology, devices, repair, digital trade, and youth opportunity."],
  ["BaBra Foundation", "/foundation", "Community impact, family support, volunteers, donations, and partnerships."]
];

const formHubs = [
  ["Cosmetics Forms", "/forms/cosmetics", "Wholesale, samples, agents, showroom booking, product support."],
  ["Farm Forms", "/forms/farm", "Farmer, supplier, produce marketplace, agriculture partnership."],
  ["Schools Forms", "/forms/schools", "Student, teacher, scholarship, and digital school registration."],
  ["LifeTalk TV Forms", "/forms/lifetalk-tv", "Presenter, actor, advertiser, story, and documentary requests."],
  ["Foundation Forms", "/forms/foundation", "Volunteer, family support, donation, and community partner forms."]
];

export default function HoldingHomePage() {
  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <header className="sticky top-[49px] z-50 border-b border-white/10 bg-[#080606]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 pr-4" href="/">
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#f1d58b]/55 bg-[#fff8eb]">
              <img className="h-full w-full object-cover" src="/brand/logo.jpeg" alt="EI BaBra Holding Ltd logo" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate font-serif text-lg leading-tight">EI BaBra Holding Ltd</strong>
              <span className="block truncate text-[10px] font-black uppercase tracking-[0.16em] text-[#f1d58b]">babra.store ecosystem</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map(([label, href]) => (
              <a key={label} className="rounded-full px-4 py-2 text-sm font-bold text-white/68 hover:bg-white/10 hover:text-white" href={href}>
                {label}
              </a>
            ))}
          </nav>

          <a className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]" href="/store">
            Shop Now
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(241,213,139,0.22),transparent_28rem),radial-gradient(circle_at_80%_20%,rgba(78,190,255,0.17),transparent_26rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Parent company portal</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-none md:text-7xl">
              EI BaBra Holding Ltd
            </h1>
            <p className="mt-6 max-w-3xl text-2xl font-semibold leading-9 text-white/82">
              Building Beauty, Agriculture, Education, Media & Community Impact Across Africa.
            </p>
            <p className="mt-5 max-w-3xl leading-8 text-white/62">
              One corporate ecosystem for premium skincare, agriculture growth, future schools, media influence, technology,
              healthcare vision, and community support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="#companies">Explore companies</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/forms">Open forms</a>
              <a className="rounded-full border border-[#4ebeff]/45 px-6 py-3 font-black text-[#9be2ff]" href="/contact">Contact EI BaBra</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#f1d58b]/24 bg-white/[0.055] p-6 shadow-2xl shadow-black/35">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f1d58b]">Corporate gateway</p>
            <div className="mt-5 grid gap-3">
              {["Beauty commerce", "Agriculture supply chain", "Education systems", "Media production", "Foundation impact"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 font-black text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="companies" className="border-y border-white/10 bg-[#0f0a08] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Main divisions</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Choose a BaBra company.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {companies.map((company) => (
              <a key={company.name} href={company.href} className={`group overflow-hidden rounded-[1.5rem] border ${company.border} bg-white/[0.045] shadow-xl shadow-black/20`}>
                <div className={`h-32 bg-gradient-to-br ${company.theme}`} />
                <div className="p-6">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{company.label}</span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">{company.name}</h3>
                  <p className="mt-4 min-h-24 text-sm leading-6 text-white/62">{company.description}</p>
                  <span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#130d08] group-hover:bg-[#f1d58b]">
                    {company.button}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Other BaBra Divisions</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">More platforms in the BaBra ecosystem.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherDivisions.map(([name, href, description]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-3 min-h-16 leading-7 text-white/62">{description}</p>
                <a className="mt-5 inline-flex rounded-full border border-[#f1d58b]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={href}>Open division</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="investors" className="border-y border-white/10 bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Corporate systems</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Separated forms by division.</h2>
            <p className="mt-5 leading-8 text-black/62">
              Customers, farmers, students, media talent, volunteers, partners, and investors should not land in one confusing form.
              EI BaBra Holding routes each request to the right division.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {formHubs.map(([name, href, description]) => (
              <a key={name} className="rounded-2xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 hover:border-[#4ebeff]/45" href={href}>
                <h3 className="font-serif text-2xl">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-black/62">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
