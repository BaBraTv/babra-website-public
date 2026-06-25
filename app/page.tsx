import type { Metadata } from "next";
import Image from "next/image";
import { InstallAppButton } from "./InstallAppButton";

export const metadata: Metadata = {
  title: "BaBra Store | Global BaBra Cosmetics, Media, Farm, Schools & Impact",
  description:
    "Official BaBra Store for BaBra Cosmetics, premium BaBra Lotion, LifeTalk TV, BaBra Farm, BaBra Schools, BaBra Foundation, Rwanda Mobile Hub, samples, wholesale, and partnerships."
};

const nav = [
  ["Home", "/"],
  ["Companies", "#companies"],
  ["Lost & Found", "/lost-and-found"],
  ["Foundation", "/foundation"],
  ["Investors", "#investors"],
  ["Careers", "/job-application"],
  ["Content Studio", "/content-studio"],
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

const cosmeticsFamilies = [
  ["BaBra Lotion", "/cosmetics", "Women, Men, and Kids 500ml lotion editions under the BaBra Cosmetics premium skincare line.", "Explore lotion"],
  ["BaBra Pocket Fresh", "/products", "Portable freshness products for modern customers, retail shelves, travel, and daily confidence.", "View pocket fresh"],
  ["BaBra Pads", "/products", "Personal-care products positioned for comfort, confidence, and trusted BaBra Cosmetics distribution.", "View pads"],
  ["BaBra Soap", "/products", "BaBra soap line connected to premium skincare, daily hygiene, herbal care, and family use.", "View soap"],
  ["BaBra Showroom", "/showroom", "Cosmetics customer experience, product verification, samples, retail display, and partner onboarding.", "Visit showroom"]
];

const ecosystemPlatforms = [
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

const contentActions = [
  ["Post Image", "/content-studio", "Prepare product photos, showroom shots, event photos, and customer visuals for review."],
  ["Post Video", "/content-studio", "Prepare factory clips, founder messages, LifeTalk TV videos, or product videos for publishing."],
  ["Post Text", "/content-studio", "Prepare announcements, testimonials, captions, and BaBra updates for website and social media."]
];

const heroHighlights = [
  ["Premium feel", "Luxury finish, non-greasy comfort, and a clean daily skincare experience."],
  ["3 lotion editions", "Women, Men, and Kids 500ml lines prepared for retail and online ordering."],
  ["Global-ready brand", "A Rwanda-built ecosystem positioned for East Africa and worldwide customers."]
];

const brandPromises = [
  ["Refined fragrance", "A memorable premium scent experience designed around confidence and daily freshness."],
  ["Smooth hydration", "Comfort-focused body care built around softness, skin-barrier support, and consistency."],
  ["Professional presentation", "Product pages, showroom flow, samples, and partner forms built for real commerce."],
  ["Fast customer action", "WhatsApp, forms, store routes, and contact pages make buying or partnering simple."]
];

const dedicationPoints = [
  ["To customers", "Build products and digital experiences that feel premium, trustworthy, simple to understand, and easy to buy."],
  ["To quality", "Protect private formula details while showing public-safe quality signals, responsible claims, and clear product benefits."],
  ["To families", "Grow BaBra with respect for family-based support, education, opportunity, dignity, and community reintegration."],
  ["To Rwanda's digital vision", "Respect the national direction of H.E. President Paul Kagame, whose leadership has positioned technology, connectivity, and innovation as key drivers of Rwanda's future."],
  ["To AI and execution", "Use modern AI tools such as ChatGPT responsibly to improve planning, content, software, customer service, and business systems."],
  ["To Dr. Leon", "Recognize Dr. Leon as a valued friend and supporter who celebrates progress, encourages discipline, and stands behind the positive growth of BaBra."],
  ["To the future", "Create a scalable BaBra ecosystem that can move from Rwanda to regional and global markets without losing discipline."]
];

const testimonials = [
  {
    quote:
      "The lotion feels premium from the first touch. The packaging, scent, and smooth finish make it feel like a serious international brand.",
    name: "Customer feedback",
    location: "Kigali, Rwanda"
  },
  {
    quote:
      "BaBra looks ready for retail shelves. The product presentation makes it easier to trust the brand and recommend it to others.",
    name: "Retail partner feedback",
    location: "Rwanda market"
  },
  {
    quote:
      "The brand story is clear: beauty, confidence, and a bigger ecosystem. It feels built for long-term growth, not only one product.",
    name: "Community feedback",
    location: "BaBra network"
  }
];

const launchChannels = [
  {
    title: "Google Search ready",
    text: "Homepage, product routes, sitemap, semantic content, and public-safe brand language are prepared for search discovery.",
    action: "Inspect BaBra Store",
    href: "https://www.babra.store"
  },
  {
    title: "Social media ready",
    text: "Product visuals, short story angles, production video placement, and share copy can support Facebook, Instagram, TikTok, YouTube, and X.",
    action: "Open Content Studio",
    href: "/content-studio"
  },
  {
    title: "WhatsApp sales ready",
    text: "Customers can move from interest to direct conversation, samples, wholesale, and cosmetics support without confusion.",
    action: "Request samples",
    href: "/forms/cosmetics"
  },
  {
    title: "Partner ready",
    text: "Investors, distributors, showrooms, creators, and business partners get clear routes into the right BaBra division.",
    action: "Partner with BaBra",
    href: "#investors"
  }
];

const growthSteps = [
  "Share the official website link first: https://www.babra.store",
  "Use product photos and short videos before long explanations.",
  "Send visitors to samples, WhatsApp order, Content Studio, or partner forms.",
  "Keep formulas, full certificates, barcodes, and private supplier details off public posts."
];

export default function HoldingHomePage() {
  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <header className="sticky top-[49px] z-50 border-b border-white/10 bg-[#080606]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 pr-4" href="/">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#f1d58b]/55 bg-[#fff8eb]">
              <Image
                className="object-cover"
                src="/brand/logo.jpeg"
                alt="EI BaBra Holding Ltd logo"
                fill
                sizes="44px"
                priority
              />
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
              Building Beauty, Agriculture, Education, Media & Community Impact for Global Markets.
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
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroHighlights.map(([title, text]) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-xl shadow-black/20">
                  <h2 className="text-base font-black text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#f1d58b]/24 bg-white/[0.055] shadow-2xl shadow-black/35">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f1d58b]">Watch BaBra production</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight">From production care to premium skincare.</h2>
            </div>
            <video
              className="aspect-video w-full bg-black object-cover"
              src="/videos/babra-production-ad.mp4"
              muted
              playsInline
              controls
              preload="none"
              poster="/brand/homepage-video-poster.webp"
            />
            <div className="grid gap-3 p-5 sm:grid-cols-3">
              {["Production story", "Quality control", "Premium packaging"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-black text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0807] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">BaBra Brand Promise</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Luxury people can feel fast.</h2>
            </div>
            <p className="text-lg font-semibold leading-8 text-white/64">
              BaBra must be easy to trust, easy to buy, and easy to remember. These customer promises came from the first
              BaBra website direction, now upgraded into the current EI BaBra ecosystem.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {brandPromises.map(([title, text]) => (
              <article key={title} className="rounded-[1.35rem] border border-[#f1d58b]/18 bg-white/[0.045] p-6 shadow-xl shadow-black/20">
                <span className="inline-flex rounded-full border border-[#f1d58b]/30 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#f1d58b]">
                  Promise
                </span>
                <h3 className="mt-5 font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090706] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Our Dedication</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Dedicated to trust, technology, support, and long-term impact.</h2>
            </div>
            <p className="text-lg font-semibold leading-8 text-white/64">
              BaBra is being built with a clear standard: every product, service, platform, and public message must protect
              customer trust and strengthen the brand for the future.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dedicationPoints.map(([title, text]) => (
              <article key={title} className="rounded-[1.35rem] border border-[#f1d58b]/20 bg-[#fffaf1] p-6 text-[#18110c] shadow-xl shadow-black/20">
                <span className="inline-flex rounded-full bg-[#a9141d] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  Dedication
                </span>
                <h3 className="mt-5 font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-black/62">{text}</p>
              </article>
            ))}
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
            BaBra is not only a product. It is a long-term global ecosystem built around beauty, farming, education, media,
            technology, family support, public service, and business innovation.
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
            <p className="mt-5 text-3xl font-black text-[#f1d58b]">Ask today&apos;s BaBra price</p>
            <a className="mt-8 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/store">Baza igiciro</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["/brand/official-babra-bottle.png", "BaBra Lotion Women - Premium 500ml"],
              ["/brand/official-babra-bottle-men.png", "BaBra Lotion Men - Premium 500ml"],
              ["/brand/official-babra-bottle-kids.png", "BaBra Lotion Baby - Premium 500ml"]
            ].map(([src, alt]) => (
              <figure key={src} className="rounded-2xl bg-white p-4 shadow-xl shadow-black/20">
                <Image
                  className="h-72 w-full object-contain"
                  src={src}
                  alt={alt}
                  width={518}
                  height={1024}
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 86vw"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-center text-sm font-black text-[#130d08]">Premium 500ml<br />Baza igiciro</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Testimonials</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Early trust around BaBra.</h2>
            </div>
            <p className="text-lg font-semibold leading-8 text-black/62">
              Public testimonials are written as verified-style feedback placeholders until named customer reviews are approved.
              This gives social proof without exposing private customer information.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[1.35rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <div className="flex gap-1 text-2xl text-[#d6ad57]" aria-label="Five star feedback">
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                </div>
                <p className="mt-5 min-h-32 text-lg font-semibold leading-8 text-black/72">"{testimonial.quote}"</p>
                <div className="mt-6 border-t border-black/10 pt-4">
                  <p className="font-black text-[#18110c]">{testimonial.name}</p>
                  <p className="mt-1 text-sm font-bold text-black/45">{testimonial.location}</p>
                </div>
              </article>
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
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">BaBra Cosmetics product families</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">One cosmetics division, multiple premium product lines.</h2>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/62">
            Lotion, Pocket Fresh, Pads, Soap, and the Showroom belong inside BaBra Cosmetics. They are not separate
            platforms; they are product families and customer-experience routes under the same beauty business.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {cosmeticsFamilies.map(([name, href, description, button]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-3 min-h-16 leading-7 text-white/62">{description}</p>
                <a className="mt-5 inline-flex rounded-full border border-[#f1d58b]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href={href}>{button}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0807] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Future ecosystem platforms</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Platforms outside the cosmetics division.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ecosystemPlatforms.map(([name, href, description, button]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-3 min-h-16 leading-7 text-white/62">{description}</p>
                <a className="mt-5 inline-flex rounded-full border border-[#4ebeff]/35 px-4 py-2 text-sm font-black text-[#9be2ff]" href={href}>{button}</a>
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

      <section className="border-y border-white/10 bg-[#0b0807] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Content Studio</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Post content for BaBra.</h2>
            </div>
            <p className="text-lg font-semibold leading-8 text-white/62">
              Images, videos, and text updates can be prepared in one place before public approval. This protects the brand
              while making content creation faster for BaBra teams and contributors.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contentActions.map(([title, href, text]) => (
              <a key={title} className="rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20 hover:border-[#4ebeff]/50" href={href}>
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-7 text-white/62">{text}</p>
                <span className="mt-5 inline-flex rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]">
                  Open studio
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-5 py-16 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(78,190,255,0.16),transparent_24rem),radial-gradient(circle_at_82%_20%,rgba(241,213,139,0.18),transparent_25rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Global launch engine</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Built to turn attention into orders.</h2>
            </div>
            <p className="text-lg font-semibold leading-8 text-white/66">
              BaBra now has a public route for discovery, trust, samples, wholesale, media content, and partnerships. The
              goal is simple: every visitor should know what BaBra is, trust the brand, and take the next action.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {launchChannels.map((channel) => (
              <article key={channel.title} className="rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/25">
                <h3 className="font-serif text-3xl">{channel.title}</h3>
                <p className="mt-3 min-h-28 text-sm leading-7 text-white/62">{channel.text}</p>
                <a className="mt-5 inline-flex rounded-full border border-[#f1d58b]/40 px-4 py-2 text-sm font-black text-[#f1d58b]" href={channel.href}>
                  {channel.action}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 rounded-[1.65rem] border border-[#f1d58b]/25 bg-[#100b08]/82 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl">Share BaBra with one clean message.</h3>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-white/68 md:grid-cols-2">
                {growthSteps.map((step) => (
                  <li key={step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">{step}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:min-w-60">
              <a
                className="rounded-full bg-[#f1d58b] px-6 py-3 text-center font-black text-[#130d08]"
                href="https://wa.me/?text=Discover%20BaBra%20Store%3A%20premium%20BaBra%20Cosmetics%2C%20BaBra%20Lotion%2C%20samples%2C%20wholesale%2C%20and%20partnerships%20at%20https%3A%2F%2Fwww.babra.store"
              >
                Share on WhatsApp
              </a>
              <a className="rounded-full border border-white/20 px-6 py-3 text-center font-black text-white" href="/content-studio">
                Prepare content
              </a>
              <a className="rounded-full border border-[#4ebeff]/30 px-6 py-3 text-center font-black text-[#4ebeff]" href="/cosmetics#production">
                Watch production story
              </a>
            </div>
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

      <section className="bg-[#0f0a08] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-[#f1d58b]/25 bg-[radial-gradient(circle_at_18%_20%,rgba(241,213,139,0.2),transparent_22rem),linear-gradient(135deg,#18110f,#080606)] p-6 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Fast customer route</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Samples, wholesale, partnership.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/64">
              A visitor should not search for how to act. BaBra now routes sample requests, wholesale interest, cosmetics
              support, and general contact through clear public forms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/forms/cosmetics">Request samples</a>
            <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/contact">Contact BaBra</a>
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
