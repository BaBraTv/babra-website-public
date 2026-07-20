"use client";

import { motion } from "framer-motion";
import { YouTubeIcon } from "./components/YouTubeIcon";
import { officialChannels, verifiedExternalLinkProps } from "./data/official-channels";

const groupPillars = [
  {
    title: "BaBra Cosmetics",
    label: "Luxury skincare",
    text: "Premium lotions, serum, daily body care, direct ordering, reviews, inventory, and digital invoices.",
    href: "#cosmetics"
  },
  {
    title: "BaBra School",
    label: "Future education",
    text: "A private school vision for admissions, student records, parent portals, fees, and digital learning.",
    href: "#group"
  },
  {
    title: "BaBra Farm",
    label: "Agriculture network",
    text: "Crop records, livestock management, farmer marketplace, supply chain, and market intelligence.",
    href: "#group"
  },
  {
    title: "LifeTalk TV",
    label: "Media and influence",
    text: "Brand storytelling, interviews, business education, product campaigns, and community content.",
    href: "#group"
  }
];

const topNav = [
  ["About", "/holding"],
  ["Cosmetics", "/cosmetics"],
  ["Mobile Hub", "/rwanda-mobile-hub"],
  ["Schools", "/schools"],
  ["Dental Clinic", "/dental-experts-clinic"],
  ["Store", "/store"],
  ["Contact", "/contact"]
];

const ecosystemCards = [
  {
    title: "EI BaBra Holding Ltd",
    label: "Group structure",
    text: "The parent ecosystem connecting commerce, technology, education, healthcare, agriculture, media, and social impact.",
    href: "/holding",
    image: "/showroom/showroom.png",
    accent: "#f1d58b"
  },
  {
    title: "BaBra Cosmetics",
    label: "Beauty and products",
    text: "BaBra Lotion, soap, pads, pocket fresh, showroom, samples, wholesale, and Rwanda-first store operations.",
    href: "/cosmetics",
    image: "/brand/official-babra-bottle.png",
    accent: "#d6ad57"
  },
  {
    title: "Rwanda Mobile Hub",
    label: "Technology division",
    text: "Mobile commerce, device support, repairs, accessories, spare parts, technicians, and youth technology skills.",
    href: "/rwanda-mobile-hub",
    image: "/photos/mobile-smartphone.jpg",
    accent: "#4ebeff"
  },
  {
    title: "BaBra Schools",
    label: "Education systems",
    text: "Future nursery, primary, secondary, university, digital learning, admissions, teachers, and scholarships.",
    href: "/schools",
    image: "/photos/school-classroom.jpg",
    accent: "#7dd3fc"
  },
  {
    title: "BaBra Hospital",
    label: "Healthcare vision",
    text: "Trusted healthcare systems, patient care access, medical services, and community health planning.",
    href: "/hospital",
    image: "/photos/hospital-doctor.jpg",
    accent: "#38bdf8"
  },
  {
    title: "Dental Experts Clinic",
    label: "Featured healthcare partner",
    text: "Professional dental care in Kimironko, Kigali, with appointments for general, cosmetic, pediatric, orthodontic, implant, and root canal services.",
    href: "/dental-experts-clinic",
    image: "/partners/dental-experts-clinic.svg",
    accent: "#55e6d0"
  },
  {
    title: "BaBra Farm",
    label: "Agriculture network",
    text: "Farmers, suppliers, greenhouse production, livestock roadmap, produce marketplace, and supply chains.",
    href: "/farm",
    image: "/photos/farm-crops.jpg",
    accent: "#4ade80"
  },
  {
    title: "BaBra Foundation",
    label: "Community impact",
    text: "Volunteers, donations, family-based support, vulnerable children support, and community partnerships.",
    href: "/foundation",
    image: "/photos/foundation-community.jpg",
    accent: "#c084fc"
  },
  {
    title: "LifeTalk TV",
    label: "Media and storytelling",
    text: "Brand storytelling, interviews, business education, social impact content, and original productions.",
    href: "/lifetalk-tv",
    image: "/brand/homepage-video-poster.webp",
    accent: "#fb7185"
  },
  {
    title: "Lost & Found Rwanda",
    label: "Public service",
    text: "Independent lost documents, found items, claims, searches, finder process, and support routing.",
    href: "/lost-and-found",
    image: "/photos/mobile-workstation.jpg",
    accent: "#fb923c"
  },
  {
    title: "Investor / Sponsor Access",
    label: "Private review",
    text: "Structured access requests for verified partners, sponsors, investors, and institutional stakeholders.",
    href: "/investor-sponsor-access",
    image: "/photos/foundation-volunteers.jpg",
    accent: "#facc15"
  },
  {
    title: "Store / Products",
    label: "Commerce",
    text: "Product catalog, cart, checkout, Rwanda delivery flow, order tracking, and manual payment review.",
    href: "/store",
    image: "/brand/official-babra-bottle-kids.png",
    accent: "#f1d58b"
  },
  {
    title: "Contact / Forms",
    label: "Operations gateway",
    text: "Division forms, contact messages, job applications, lost/found submissions, and support channels.",
    href: "/forms",
    image: "/photos/mobile-accessories.jpg",
    accent: "#60a5fa"
  }
];

const products = [
  {
    name: "BaBra Soft Care for Kids",
    tag: "Family Care",
    note: "Gentle comfort for children and family skincare routines without exposing full label details online.",
    image: "/products/kids-lotion.jpg",
    fit: "contain"
  },
  {
    name: "BaBra Anti-Wrinkle Serum",
    tag: "Advanced Care",
    note: "A premium serum presentation with bottle and retail box for strong shelf presence.",
    image: "/products/serum-safe-preview.jpg",
    fit: "contain"
  },
  {
    name: "BaBra Lotion for Women",
    tag: "Signature for Her",
    note: "Soft hydration with refined fragrance and a premium daily care feel.",
    image: "/products/women-lotion.jpg",
    fit: "contain"
  },
  {
    name: "BaBra Lotion for Men",
    tag: "Signature for Him",
    note: "Clean freshness and premium body care for a confident routine.",
    image: "/products/men-lotion.jpg",
    fit: "contain"
  }
];

const heroBottles = [
  {
    name: "BaBra Lotion for Women official bottle",
    image: "/brand/official-babra-bottle.png"
  },
  {
    name: "BaBra Lotion for Men official bottle",
    image: "/brand/official-babra-bottle-men.png"
  },
  {
    name: "BaBra Lotion Baby official bottle",
    image: "/brand/official-babra-bottle-kids.png"
  }
];

const skinTypes = [
  ["Dry skin", "Rich moisturizers and emollients help reduce a dry, tight feeling and support longer-lasting comfort."],
  ["Oily skin", "Lightweight hydration supports freshness without a heavy or greasy finish."],
  ["Normal skin", "Daily moisture care helps maintain a balanced, soft, and polished skin feel."]
];

const publicIngredients = [
  ["Shea butter", "Known for a soft, comforting feel and moisture-locking support."],
  ["Aloe vera", "A popular skincare ingredient associated with a soothing, refreshed feeling."],
  ["Botanical care", "Plant-derived care elements help support healthy-looking daily skin."],
  ["Luxury fragrance", "A signature scent experience designed to leave a clean, memorable impression."]
];

const babraDifference = [
  "Suitable for men, women, and kids",
  "Designed for dry, oily, and normal skin routines",
  "Long-lasting hydration feel",
  "Non-greasy daily comfort",
  "Skin barrier support",
  "Premium fragrance experience",
  "Daily-use body care",
  "Hydroquinone free"
];

const languageOptions = [
  ["English", "BaBra Lotion supports daily hydration, skin-barrier comfort, and a premium fragrance experience."],
  ["Francais", "BaBra Lotion aide a garder une peau douce, hydratee et elegante, avec une sensation parfumee haut de gamme."],
  ["Kinyarwanda", "BaBra Lotion ifasha uruhu kugumana ubuhehere, koroha no guhumura neza mu buryo bwa premium."]
];

const brandProtection = [
  ["Visible to customers", "Product benefits, skin-type suitability, bottle visuals, safe product previews, usage direction in general terms, and buying/contact paths."],
  ["Protected from copycats", "Complete formula, full label files, QR/barcode, supplier-sensitive details, batch markers, and one reserved verification element."],
  ["Verified partners only", "Full compliance documents, wholesale verification, official packaging details, and private manufacturing records are shared only after business verification."]
];

const rwandaAddressCoverage = [
  ["Kigali City", "Gasabo, Kicukiro, Nyarugenge"],
  ["Eastern Province", "Bugesera, Gatsibo, Kayonza, Kirehe, Ngoma, Nyagatare, Rwamagana"],
  ["Northern Province", "Burera, Gakenke, Gicumbi, Musanze, Rulindo"],
  ["Southern Province", "Gisagara, Huye, Kamonyi, Muhanga, Nyamagabe, Nyanza, Nyaruguru, Ruhango"],
  ["Western Province", "Karongi, Ngororero, Nyabihu, Nyamasheke, Rubavu, Rusizi, Rutsiro"]
];

const addressLevels = [
  "Province / Intara",
  "District / Akarere",
  "Sector / Umurenge",
  "Cell / Akagari",
  "Village / Umudugudu",
  "Phone, landmark, delivery notes"
];

const platformSystems = [
  ["Marketplace", "Retail, wholesale, vendor onboarding, product discovery, and order tracking."],
  ["Payment Hub", "MTN MoMo, Airtel Money, USDT-ready checkout, wallets, escrow, PIN confirmation, and EBM receipts."],
  ["Affiliate Matrix", "Legal transaction-based rewards, rank progress, referral wallets, and fraud controls."],
  ["Delivery Engine", "Location-first Rwanda address flow by province, district, sector, cell, village, plus global addresses."],
  ["AI Command", "Shopping support, customer care, analytics, fraud alerts, and business automation."],
  ["Admin Control", "Sales, users, payments, school, farm, media, inventory, and growth dashboards."]
];

const paymentFlows = [
  ["Wallet balance", "Customers can keep money in BaBra Wallet, withdraw it, or use it to buy BaBra products."],
  ["Phone money", "MTN MoMo or Airtel Money checkout sends a confirmation popup before payment is approved."],
  ["USDT-ready", "Crypto checkout can be routed through a verified provider before order confirmation."],
  ["PIN + EBM", "After PIN/password confirmation, the system verifies payment and generates an EBM-ready receipt."]
];

const deliverySteps = [
  ["Detect location", "The system asks for customer location and starts with Rwanda address structure."],
  ["Rwanda address", "Province, district, sector, cell, village, phone number, and landmark are confirmed step by step."],
  ["Global address", "Customers outside Rwanda enter country, city, postal code, street, and delivery notes."],
  ["Delivery proof", "The order keeps address, payment status, EBM receipt, and delivery confirmation in one record."]
];

const wholesaleTiers = [
  ["Retail", "1-11 units", "Standard price with simple MoMo or wallet checkout."],
  ["Starter reseller", "12+ units", "Small discount for first-time resellers."],
  ["Wholesale", "48+ units", "MOQ-based pricing for shops and salons."],
  ["Distributor", "120+ units", "Best margin, invoice, payment confirmation, and EBM-ready receipt."]
];

const proofPoints = [
  ["Rwanda", "Rooted at home"],
  ["East Africa", "Built to expand"],
  ["Global", "Designed to endure"]
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <nav className="sticky top-11 z-50 border-b border-white/10 bg-[#090706]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-3 md:px-8">
          <a className="flex shrink-0 items-center gap-3" href="#top" aria-label="EI BaBra Holding Ltd home">
            <img className="h-11 w-11 rounded-full border border-[#d6ad57]/45 object-cover shadow-lg shadow-[#d6ad57]/15" src="/media/logos/babra-logo.jpeg" alt="BaBra official logo" />
            <span className="hidden sm:block">
              <strong className="block whitespace-nowrap font-serif text-lg leading-none tracking-wide">EI BaBra Holding Ltd</strong>
              <span className="mt-1.5 block whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#d6ad57]">One vision · lasting impact</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 xl:flex">
            {topNav.map(([item, href]) => (
              <a key={item} className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/68 transition hover:bg-white/10 hover:text-white" href={href}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <details className="group relative">
              <summary className="cursor-pointer list-none rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-black text-white transition hover:border-[#d6ad57]/55 hover:text-[#f1d58b]">
                My Account
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-white/12 bg-[#100c0a] p-2 shadow-2xl shadow-black/60">
                <a className="block rounded-xl px-4 py-3 text-sm font-black text-white hover:bg-white/[0.08]" href="/login">Login</a>
                <a className="block rounded-xl bg-[#f1d58b] px-4 py-3 text-sm font-black text-[#130d08]" href="/signup">Sign Up</a>
                <div className="my-2 h-px bg-white/10" />
                <a className="block rounded-xl px-4 py-3 text-sm font-semibold text-white/65 hover:bg-white/[0.08] hover:text-white" href="/dashboard">Dashboard</a>
                <a className="block rounded-xl px-4 py-3 text-sm font-semibold text-white/65 hover:bg-white/[0.08] hover:text-white" href="/profile">Profile</a>
              </div>
            </details>
            <a className="hidden rounded-full bg-[#f1d58b] px-5 py-2.5 text-sm font-black text-[#130d08] shadow-lg shadow-[#d6ad57]/10 md:inline-flex" href="#ecosystem">
              Explore BaBra
            </a>
          </div>
        </div>
      </nav>

      <section id="top" className="relative min-h-[calc(100vh-69px)] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/skin-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/products/kids-lotion.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090706]/95 via-[#090706]/76 to-[#090706]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-[#090706]/45" />

        <div className="relative mx-auto grid min-h-[calc(100vh-69px)] max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <motion.div initial="hidden" animate="show" transition={{ duration: 0.8, ease: "easeOut" }} variants={fadeUp}>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#d6ad57]" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f1d58b]">EI BaBra Holding Ltd</p>
            </div>
            <h1 className="mt-7 max-w-3xl font-serif text-5xl leading-[0.96] tracking-[-0.035em] sm:text-6xl md:text-7xl">
              One vision.<br />A growing legacy.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
              A Rwandan enterprise building premium beauty, technology, education, healthcare, agriculture, media, and community impact for generations.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-7 py-3.5 font-black text-[#130d08] shadow-xl shadow-[#f1d58b]/20" href="#ecosystem">
                Discover our ecosystem
              </a>
              <a className="rounded-full border border-white/24 bg-white/5 px-7 py-3.5 font-black text-white backdrop-blur" href="/holding">
                Our story
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-white/12 py-5">
              {proofPoints.map(([title, text], index) => (
                <div key={title} className={index ? "border-l border-white/12 px-5" : "pr-5"}>
                  <p className="font-serif text-xl text-[#f1d58b] md:text-2xl">{title}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/45">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0c0908]/70 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-9"
          >
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d6ad57]/12 blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f1d58b]">The BaBra promise</p>
                  <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight md:text-5xl">Purpose in every enterprise.</h2>
                </div>
                <img className="h-16 w-16 shrink-0 rounded-full border border-[#d6ad57]/35 object-cover" src="/media/logos/babra-logo.jpeg" alt="BaBra" />
              </div>
              <p className="mt-5 max-w-lg leading-7 text-white/58">
                We connect business growth with human progress—creating trusted brands, useful services, opportunity, and a future Baine and Brandon can be proud of.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {ecosystemCards.slice(1, 5).map((item) => (
                  <a key={item.title} href={item.href} className="group rounded-2xl border border-white/10 bg-white/[0.055] p-5 transition hover:border-[#d6ad57]/45 hover:bg-white/[0.09]">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.18em]" style={{ color: item.accent }}>{item.label}</p>
                    <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
                    <span className="mt-4 inline-flex text-sm font-black text-white/48 transition group-hover:text-[#f1d58b]">Explore →</span>
                  </a>
                ))}
              </div>

              <a className="mt-6 flex items-center justify-between rounded-2xl bg-[#f1d58b] px-5 py-4 font-black text-[#130d08]" href="#ecosystem">
                <span>View all BaBra divisions</span><span aria-hidden="true">↘</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="ecosystem" className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">EI BaBra Holding Ltd</p>
              <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">The full BaBra ecosystem is the homepage.</h2>
            </div>
            <p className="text-lg leading-8 text-black/64">
              BaBra Lotion is one strong product line, but babra.store must represent the whole enterprise:
              divisions, public services, forms, commerce, partners, and future operating systems.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ecosystemCards.map((item) => (
              <a key={item.title} href={item.href} className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl">
                <figure className="relative h-56 overflow-hidden bg-[#090706]">
                  <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" src={item.image} alt={item.title} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/18 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                    {item.label}
                  </span>
                </figure>
                <div className="p-6">
                  <h3 className="font-serif text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-4 leading-7 text-black/62">{item.text}</p>
                  <span className="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black text-[#090706]" style={{ backgroundColor: item.accent }}>
                    Open division
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#55e6d0]/20 bg-[#06191b] px-5 py-20 md:px-8">
        <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#55e6d0]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#55e6d0]">Featured healthcare partner</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">A healthier smile starts with trusted care.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Dental Experts Clinic provides modern, patient-focused dental care for adults and children in Kimironko, Kigali.
              Discover services, call the clinic, or book directly through its official website.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#55e6d0] px-6 py-3 font-black text-[#06191b]" href="/dental-experts-clinic">Explore the clinic</a>
              <a className="rounded-full border border-white/25 px-6 py-3 font-black text-white" href="https://dentalexpertsclinic.rw/appointment.php" target="_blank" rel="noopener noreferrer">Book appointment</a>
              <a className="rounded-full border border-white/25 px-6 py-3 font-black text-white" href="tel:+250790719688">Call clinic</a>
            </div>
          </div>
          <a href="/dental-experts-clinic" className="group overflow-hidden rounded-lg border border-white/15 bg-white/[0.06] p-5 shadow-2xl shadow-black/30">
            <img className="h-[390px] w-full rounded-md object-cover transition duration-700 group-hover:scale-[1.02]" src="/partners/dental-experts-clinic.svg" alt="Dental Experts Clinic in Kigali" />
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Kimironko · Kigali</p>
                <p className="mt-1 font-serif text-3xl">Dental Experts Clinic</p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#06191b]">Open clinic page</span>
            </div>
          </a>
        </div>
      </section>

      <section id="cosmetics" className="border-y border-white/10 bg-[#120b09] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Cosmetics</p>
              <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Luxury skincare people can feel before they buy.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
                The product section should work like a premium counter display: clear, calm, polished, and focused on trust.
                Uploaded product photos can be refreshed as new studio shots arrive without changing the website structure.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#d6ad57]/25 bg-[#fff8eb] p-5 text-[#1b130c] shadow-2xl shadow-black/25">
              <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
                <figure className="rounded-2xl bg-gradient-to-br from-white via-[#fff8eb] to-[#d6ad57] p-3">
                  <img className="h-80 w-full object-contain drop-shadow-2xl" src="/products/kids-bottle-original.jpeg" alt="Real BaBra luxury body lotion bottle front and back" />
                </figure>
                <div className="p-2">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">Real product proof</p>
                  <h3 className="mt-3 font-serif text-4xl leading-none">Show the product. Protect the formula.</h3>
                  <p className="mt-4 leading-7 text-black/62">
                    The website should prove the product exists without publishing full label data, barcode, QR, or complete ingredient details that can help copycats.
                    Full package information stays available on the physical product and for verified business partners.
                  </p>
                  <a className="mt-6 inline-flex rounded-full bg-[#090706] px-5 py-3 font-black text-[#f1d58b]" href="/contact">
                    Request samples
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <motion.article
                key={product.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                variants={fadeUp}
                className="overflow-hidden rounded-lg border border-white/10 bg-[#1d1512] shadow-xl shadow-black/20"
              >
                <figure className="h-72 bg-gradient-to-br from-white via-[#fff7e6] to-[#d3a83b] p-5">
                  <img className="h-full w-full object-contain drop-shadow-2xl" src={product.image} alt={product.name} />
                </figure>
                <div className="p-5">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{product.tag}</span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h3>
                  <p className="mt-3 leading-7 text-white/62">{product.note}</p>
                  <a className="mt-5 inline-flex rounded-full border border-[#d6ad57]/35 px-4 py-2 text-sm font-black text-[#f1d58b]" href="/contact">
                    Request samples
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="science-of-babra" className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} variants={fadeUp}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Science of BaBra</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Why BaBra Lotion feels different.</h2>
              <p className="mt-6 text-lg leading-8 text-black/64">
                Skin has protective layers that need consistent care, not just a short surface feel. BaBra Lotion is positioned
                to support daily hydration, skin-barrier comfort, and a long-lasting luxury fragrance experience while keeping
                proprietary label and formula details protected.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {skinTypes.map(([title, text]) => (
                <motion.article
                  key={title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  variants={fadeUp}
                  className="rounded-lg border border-black/10 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur"
                >
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-3 leading-7 text-black/62">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              ["Skin barrier layers", "/science/skin-layers-luxury.jpg", "A premium visual of layered skin structure and hydration barrier support."],
              ["Hydration and fragrance", "/science/hydration-fragrance-luxury.jpg", "A luxury visual showing moisture, smoothness, botanical care, and signature fragrance."]
            ].map(([title, image, text], index) => (
              <motion.figure
                key={title}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl shadow-black/10"
              >
                <div className="relative h-[310px] overflow-hidden md:h-[430px]">
                  <img className="parallax-soft h-full w-full object-cover transition duration-700 hover:scale-[1.04]" src={image} alt={title} loading="lazy" />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-3 leading-7 text-black/62">{text}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {publicIngredients.map(([title, text]) => (
              <motion.article
                key={title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                variants={fadeUp}
                className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5"
              >
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-[#090706] p-7 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">The BaBra difference</p>
                <h3 className="mt-3 font-serif text-5xl leading-none">Luxury in every touch.</h3>
                <p className="mt-5 leading-8 text-white/62">
                  BaBra Lotion is presented as a complete daily body-care experience: softness, freshness, confidence,
                  and premium fragrance without publishing copy-sensitive production details online.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {babraDifference.map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black text-white/82">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#090706] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} variants={fadeUp}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Brand protection</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Enough to trust. Not enough to copy.</h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                babra.store should help customers understand the product while keeping copy-sensitive information offline.
                A protected verification marker stays out of the public website, so a duplicated product page cannot reproduce everything.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {brandProtection.map(([title, text]) => (
                <motion.article
                  key={title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  variants={fadeUp}
                  className="luxury-glass rounded-lg p-6"
                >
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-3 leading-7 text-white/64">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Language access</p>
              <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">English, French, and Kinyarwanda ready.</h2>
            </div>
            <div className="flex rounded-full border border-black/10 bg-white p-1 shadow-xl shadow-black/5">
              {["EN", "FR", "RW"].map((lang) => (
                <span key={lang} className="rounded-full px-4 py-2 text-sm font-black text-black/70 first:bg-[#090706] first:text-[#f1d58b]">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {languageOptions.map(([title, text]) => (
              <motion.article
                key={title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                variants={fadeUp}
                className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5"
              >
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="group" className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">BaBra Group</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">
            Division structure, routes, and operating focus stay visible.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemCards.slice(1, 9).map((pillar) => (
              <a key={pillar.title} href={pillar.href} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5 hover:border-[#a9141d]/35">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#a9141d]">{pillar.label}</span>
                <h3 className="mt-4 font-serif text-3xl">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-black/62">{pillar.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="production" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Production story</p>
          <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">From formulation to shelf-ready confidence.</h2>
          <p className="mt-6 text-lg leading-8 text-white/66">
            Factory footage, product mockups, and founder storytelling should work together as a premium trust signal.
            The hosted montage presents BaBra production without Alibaba branding; the raw CEO video is too large for direct hosting and should be compressed or embedded through LifeTalk TV.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d6ad57]/25 bg-black shadow-2xl shadow-black/40">
          <video className="aspect-video w-full object-cover" src="/videos/babra-production-ad.mp4" muted controls playsInline poster="/brand/homepage-video-poster.webp" />
        </div>
      </section>

      <section id="platform" className="bg-[#151110] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">babra.store platform</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">
            Commerce, payments, rewards, delivery, and intelligence in one account.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformSystems.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-20 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Smart payment logic</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">
            Wallet, phone money, USDT-ready checkout, and EBM receipts.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {paymentFlows.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Delivery intelligence</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Rwanda address flow first. Global delivery ready.</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              Checkout should guide the customer instead of forcing them to type everything. Rwanda users confirm structured location;
              international customers complete their address manually.
            </p>
          </div>
          <div className="grid gap-4">
            {deliverySteps.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                <span className="inline-flex whitespace-nowrap text-sm font-black text-[#d6ad57]">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-serif text-3xl">{title}</h3>
                <p className="mt-3 leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl rounded-lg border border-white/10 bg-white/[0.055] p-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Rwanda address ladder</p>
              <h3 className="mt-3 font-serif text-4xl leading-none">From province to village.</h3>
              <p className="mt-5 leading-8 text-white/62">
                The checkout architecture supports province, district, sector, cell, and village selection. District coverage is listed here;
                sector, cell, and village records should be loaded from an official Rwanda administrative dataset in the database so they stay accurate.
              </p>
              <div className="mt-6 grid gap-2">
                {addressLevels.map((level) => (
                  <div key={level} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm font-black text-white/78">
                    {level}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {rwandaAddressCoverage.map(([province, districts]) => (
                <article key={province} className="rounded-lg border border-white/10 bg-black/20 p-5">
                  <h4 className="font-serif text-3xl">{province}</h4>
                  <p className="mt-3 leading-7 text-white/64">{districts}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Wholesale and reseller engine</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">
            Retail buyers, resellers, wholesalers, and distributors each get the right path.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {wholesaleTiers.map(([title, quantity, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-[#1d1512] p-6">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{quantity}</span>
                <h3 className="mt-4 font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0909] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d6ad57]">Official YouTube channels</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Two channels. Two clear roles.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[officialChannels.lifetalk, officialChannels.babra].map((channel, index) => (
              <article key={channel.name} className={`rounded-[2rem] border p-7 md:p-10 ${index === 0 ? "border-[#a9141d]/40 bg-[#181012]" : "border-[#d6ad57]/35 bg-[#17110d]"}`}>
                <div className="flex items-center gap-3 text-[#f1d58b]"><YouTubeIcon className="h-7 w-7" /><span className="text-sm font-black uppercase tracking-[0.2em]">{channel.handle}</span></div>
                <h3 className="mt-5 font-serif text-4xl md:text-5xl">{channel.name}</h3>
                <p className="mt-2 text-xl font-bold text-[#f1d58b]">{channel.tagline}</p>
                <p className="mt-5 max-w-xl leading-7 text-white/60">{channel.role}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a className="rounded-full border border-white/15 px-5 py-3 text-sm font-black" href={channel.websiteUrl}>Explore channel</a>
                  <a {...verifiedExternalLinkProps} className="rounded-full bg-[#e5222d] px-5 py-3 text-sm font-black text-white" href={channel.youtubeUrl}>Watch on YouTube</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="growth" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#d6ad57]/30 bg-[#fffaf1] p-7 text-[#18110c] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Worldwide readiness</p>
              <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Premium presentation first. Scalable systems behind it.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/64">
                babra.store should sell trust before it sells a product: clear brand pillars, strong product visuals,
                verified payment flows, clean delivery logic, and a roadmap that can support Rwanda, East Africa, and global markets.
              </p>
            </div>
            <div className="grid gap-3">
              {["SEO-ready structure", "Global brand language", "Payment and wallet architecture", "Private school roadmap protected", "Media pillar included"].map((item) => (
                <div key={item} className="rounded-xl border border-black/10 bg-white px-5 py-4 font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#090706] px-6 py-3 font-black text-[#f1d58b]" href="/products">
              Products
            </a>
            <a className="rounded-full border border-black/15 px-6 py-3 font-black text-[#18110c]" href="/showroom">
              Showroom
            </a>
            <a className="rounded-full border border-black/15 px-6 py-3 font-black text-[#18110c]" href="/lifetalk-tv">
              LifeTalk TV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
