import type { Metadata } from "next";
import { InstallAppButton } from "./InstallAppButton";

export const metadata: Metadata = {
  title: "EI BaBra Holding Ltd | Beauty, Agriculture, Education, Media & Impact",
  description:
    "EI BaBra Holding Ltd is the parent ecosystem for BaBra Cosmetics Rwanda, BaBra Farm, BaBra Schools, LifeTalk TV, BaBra Foundation, Rwanda Mobile Hub, and future hospital systems."
};

const nav = [
  ["Home", "/"],
  ["Companies", "#companies"],
  ["Lost & Found", "/lost-and-found"],
  ["Foundation", "/foundation"],
  ["Investors", "#investors"],
  ["Careers", "/job-application"],
  ["My Account", "/account"],
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
  ["BaBra Pocket Fresh", "/products", "Portable freshness products for modern customers and retail shelves.", "View products"],
  ["BaBra Pads", "/products", "Personal-care products positioned for comfort, confidence, and trusted distribution.", "View products"],
  ["BaBra Soap", "/products", "Future BaBra soap line connected to premium skincare and daily hygiene.", "View products"],
  ["BaBra Showroom", "/showroom", "Customer experience, product verification, samples, and partner onboarding.", "Visit showroom"],
  ["BaBra Hospital", "/hospital", "Future healthcare vision for trusted care, systems, and community service.", "Open hospital"],
  ["Rwanda Mobile Hub", "/rwanda-mobile-hub", "Mobile technology, devices, repair, digital trade, and youth opportunity.", "Open mobile hub"],
  ["BaBra Foundation", "/foundation", "Community impact, family support, volunteers, donations, and partnerships.", "Open foundation"]
];

const formHubs = [
  ["Cosmetics Forms", "/forms/cosmetics", "Wholesale, samples, agents, showroom booking, product support."],
  ["Farm Forms", "/forms/farm", "Farmer, supplier, produce marketplace, agriculture partnership."],
  ["Schools Forms", "/forms/schools", "Student, teacher, scholarship, and digital school registration."],
  ["LifeTalk TV Forms", "/forms/lifetalk-tv", "Presenter, actor, advertiser, story, and documentary requests."],
  ["Rwanda Mobile Hub Forms", "/forms/rwanda-mobile-hub", "Repairs, technicians, suppliers, trade-ins, and accessories sellers."],
  ["Foundation Forms", "/forms/foundation", "Volunteer, family support, donation, and community partner forms."],
  ["Lost & Found Rwanda", "/lost-and-found", "Lost documents, found items, claims, search, and finder reward process."]
];

const publicServices = [
  ["Lost & Found Rwanda", "/lost-and-found", "Independent orange and navy public-service route for lost documents, found items, search, claims, and finder rewards."],
  ["Rwanda Mobile Hub", "/rwanda-mobile-hub", "Technology service route for repairs, technicians, device trade-in, and mobile commerce."],
  ["BaBra Foundation", "/foundation", "Community impact route for volunteers, family support, donations, and partners."]
];

const investorActions = [
  ["Request Investor / Sponsor Access", "/investor-sponsor-access"],
  ["Invest in BaBra Cosmetics", "/forms/cosmetics"],
  ["Partner with BaBra Farm", "/forms/farm"],
  ["Partner with BaBra Schools", "/forms/schools"],
  ["Advertise with LifeTalk TV", "/forms/lifetalk-tv"],
  ["Support BaBra Foundation", "/forms/foundation"]
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

          <div className="flex flex-wrap items-center gap-2">
            <a className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/78 md:inline-flex" href="/login">Login</a>
            <a className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/78 md:inline-flex" href="/signup">Sign Up</a>
            <InstallAppButton />
            <a className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]" href="/store">
              Shop Now
            </a>
          </div>
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
              <a className="rounded-full border border-[#fb923c]/50 px-6 py-3 font-black text-[#fb923c]" href="/lost-and-found">Lost & Found Rwanda</a>
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

      <section className="border-y border-white/10 bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Founder Vision</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">BaBra is bigger than one product.</h2>
          </div>
          <p className="text-xl font-semibold leading-9 text-black/68">
            BaBra is not only a product. It is a long-term African ecosystem built around beauty, farming, education, media,
            technology, family support, and public service.
          </p>
        </div>
      </section>

      <section className="bg-[#0f0a08] px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[#f1d58b]/25 bg-[radial-gradient(circle_at_80%_20%,rgba(241,213,139,0.18),transparent_24rem),linear-gradient(135deg,#18110f,#090706)] p-6 shadow-2xl shadow-black/30 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">BaBra Lotion</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Luxury in Every Touch</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Premium skincare for women, men, and babies.
            </p>
            <p className="mt-5 text-3xl font-black text-[#f1d58b]">Starting from 25,000 RWF</p>
            <a className="mt-8 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/store">Shop Now</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["/brand/official-babra-bottle.png", "BaBra Lotion Women - Premium 500ml - 25,000 RWF"],
              ["/brand/official-babra-bottle-men.png", "BaBra Lotion Men - Premium 500ml - 25,000 RWF"],
              ["/brand/official-babra-bottle-kids.png", "BaBra Lotion Baby - Premium 500ml - 25,000 RWF"]
            ].map(([src, alt]) => (
              <figure key={src} className="rounded-2xl bg-white p-4 shadow-xl shadow-black/20">
                <img className="h-72 w-full object-contain" src={src} alt={alt} loading="lazy" />
                <figcaption className="mt-3 text-center text-sm font-black text-[#130d08]">Premium 500ml<br />25,000 RWF</figcaption>
              </figure>
            ))}
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
            {otherDivisions.map(([name, href, description, button]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-3 min-h-16 leading-7 text-white/62">{description}</p>
                <a className="mt-5 inline-flex rounded-full border border-[#f1d58b]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={href}>{button}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#fb923c]">Public Services</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Independent service routes.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {publicServices.map(([name, href, description]) => (
              <a key={name} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 hover:border-[#fb923c]/60" href={href}>
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-3 leading-7 text-white/64">{description}</p>
              </a>
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

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Investors & Partners</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Partner with the right BaBra division.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {investorActions.map(([name, href]) => (
              <a key={name} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 font-black text-white/82 hover:border-[#4ebeff]/60" href={href}>
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">FAQ</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Common BaBra questions.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["What is EI BaBra Holding Ltd?", "The parent ecosystem for BaBra Cosmetics, Farm, Schools, LifeTalk TV, Rwanda Mobile Hub, Foundation, and public-service platforms."],
              ["Can I buy BaBra Lotion in Rwanda?", "Yes. BaBra Store supports cart, checkout, Rwanda delivery information, WhatsApp fallback, and manual payment confirmation."],
              ["Is Lost & Found part of Cosmetics?", "No. Lost & Found Rwanda is independent and has its own reporting, claim, fee, and status process."],
              ["Are payments automatic?", "Not yet. Payments run in manual confirmation mode until official APIs are connected, so no fake payment success is shown."]
            ].map(([question, answer]) => (
              <article key={question} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{question}</h3>
                <p className="mt-3 leading-7 text-black/62">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm font-bold text-white/64">
          <p>EI BaBra Holding Ltd - babra.store</p>
          <div className="flex flex-wrap gap-2">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/lost-and-found">Lost & Found Rwanda</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/forms">Forms</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
