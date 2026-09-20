import Image from "next/image";
import { divisionContent, type DivisionKey } from "./division-content";
import { officialMediaPendingLabel } from "./data/official-media";

const divisionMenus: Record<DivisionKey, string[][]> = {
  cosmetics: [
    ["Store", "/store"],
    ["Products", "/products"],
    ["Samples", "/sample-request"],
    ["Wholesale", "/wholesale-distributor"],
    ["Showroom", "/showroom"],
    ["Cosmetics Forms", "/forms/cosmetics"],
    ["Contact", "/contact"]
  ],
  farm: [
    ["Home", "/"],
    ["Farm Services", "#services"],
    ["Farm Forms", "/forms/farm"],
    ["Farmers", "#farmers"],
    ["Marketplace", "#marketplace"],
    ["Partnerships", "#partnerships"],
    ["Contact", "/contact"]
  ],
  schools: [
    ["Home", "/"],
    ["Admissions", "#admissions"],
    ["Teachers", "#teachers"],
    ["Scholarships", "#scholarships"],
    ["Digital School", "#digital-school"],
    ["Master Plan", "/schools/masterplan"],
    ["School Forms", "/forms/schools"],
    ["Contact", "/contact"]
  ],
  foundation: [
    ["Home", "/"],
    ["Child Support", "/child-family-support"],
    ["Family Support", "/child-family-support"],
    ["Volunteers", "/forms/foundation"],
    ["Donations", "/forms/foundation"],
    ["Foundation Forms", "/forms/foundation"],
    ["Contact", "/contact"]
  ],
  hospital: [
    ["Home", "/"],
    ["Healthcare Vision", "#services"],
    ["Community Health", "#partnerships"],
    ["Contact", "/contact"]
  ],
  "rwanda-mobile-hub": [
    ["Home", "/"],
    ["Repairs", "#services"],
    ["Accessories", "/forms/rwanda-mobile-hub"],
    ["Spare Parts", "/forms/rwanda-mobile-hub"],
    ["Technicians", "/forms/rwanda-mobile-hub"],
    ["RMH Forms", "/forms/rwanda-mobile-hub"],
    ["Contact", "/contact"]
  ]
};

const serviceAnchors: Partial<Record<DivisionKey, Array<string | undefined>>> = {
  farm: ["farmers", "suppliers", "marketplace", "partnerships"],
  schools: ["admissions", "teachers", "scholarships", "digital-school"],
  hospital: ["roadmap", "systems", "trust", "partnerships"],
  "rwanda-mobile-hub": ["repairs", "accessories", "software", "hardware", "training"]
};

function DivisionImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw"
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <Image className={className} src={src} alt={alt} width={1200} height={675} sizes={sizes} priority={priority} />;
}

export function DivisionPage({ division }: { division: DivisionKey }) {
  const data = divisionContent[division];
  const menu = divisionMenus[division];

  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <header className="border-b border-white/10 bg-[#080606]/95 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">EI BaBra Holding Ltd</a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            {menu.map(([label, href]) => (
              <a key={label} className="rounded-full border border-white/10 px-4 py-2" href={href}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-br ${data.theme} px-5 py-20 md:px-8`}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>{data.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">{data.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{data.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full px-6 py-3 font-black text-[#101010]" href={data.ctaHref} style={{ backgroundColor: data.accent }}>{data.cta}</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href={data.formsHref}>Open {data.name} forms</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30">
            <figure className="border-b border-white/10 bg-black/25">
              {data.image ? (
                <DivisionImage className="h-72 w-full object-cover" src={data.image} alt={data.imageAlt} priority sizes="(max-width: 1024px) 100vw, 44vw" />
              ) : (
                <div className="grid h-72 w-full place-items-center p-6 text-center text-sm font-black uppercase tracking-[0.14em] text-[#f1d58b]">
                  {officialMediaPendingLabel}
                </div>
              )}
            </figure>
            <div className="p-6">
              <h2 className="font-serif text-3xl">Division focus</h2>
              <div className="mt-5 grid gap-3">
                {data.points.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 font-black text-white/82">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {division !== "cosmetics" ? (
        <section id="services" className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Division orientation</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">{data.name} services and routes.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.points.map((point, index) => (
                <article
                  key={point}
                  id={serviceAnchors[division]?.[index]}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055]"
                >
                  {data.serviceImages[index] || data.image ? (
                    <DivisionImage className="h-40 w-full object-cover" src={data.serviceImages[index] || data.image} alt={`${data.name} - ${point}`} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                  ) : (
                    <div className="grid h-40 w-full place-items-center p-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#f1d58b]">
                      {officialMediaPendingLabel}
                    </div>
                  )}
                  <div className="p-6">
                    <span
                      className="inline-flex h-8 items-center rounded-full border border-white/10 bg-black/25 px-3 text-xs font-black uppercase tracking-[0.14em] tabular-nums"
                      style={{ color: data.accent }}
                    >
                      {`Step ${index + 1}`}
                    </span>
                    <h3 className="mt-2 font-serif text-3xl">{point}</h3>
                    <p className="mt-3 leading-7 text-white/62">Use the division-specific forms and contact routes for this service area.</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Admissions / forms</a>
              <a className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Jobs / roles</a>
              <a className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Digital systems</a>
              <a className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Support requests</a>
            </div>
          </div>
        </section>
      ) : null}

      {division === "rwanda-mobile-hub" ? (
        <>
          <section id="about" className="bg-[#f7fbff] px-5 py-16 text-[#081018] md:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#0369a1]">Official media</p>
                <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Rwanda Mobile Hub workspace.</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-black/62">
                  Verified Rwanda Mobile Hub video frames now support this page across the hero, about, service, and gallery sections.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/10">
                <DivisionImage className="h-80 w-full object-cover" src="/media/mobile-hub/rwanda-mobile-hub-about.jpg" alt="Official Rwanda Mobile Hub service workbench and BaBra workspace" sizes="(max-width: 1024px) 100vw, 52vw" />
              </div>
            </div>
          </section>

          <section id="gallery" className="px-5 py-16 md:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Gallery</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Official Rwanda Mobile Hub frames.</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {data.galleryImages.map((image, index) => (
                  <figure key={image} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055]">
                    <DivisionImage className="h-64 w-full object-cover transition duration-500 hover:scale-[1.025]" src={image} alt={`Official Rwanda Mobile Hub gallery frame ${index + 1}`} sizes="(max-width: 768px) 100vw, 50vw" />
                  </figure>
                ))}
              </div>
              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                <video className="aspect-video w-full bg-black" controls preload="metadata" poster="/media/mobile-hub/rwanda-mobile-hub-hero.jpg">
                  <source src={data.videoSources[0]} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {division === "cosmetics" ? (
        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Products", "/products", "Official BaBra Lotion Women, Men, and Babies 500 ml."],
              ["Store", "/store", "Retail checkout, cart, Rwanda delivery flow, and WhatsApp order fallback."],
              ["Showroom", "/showroom", "Premium showroom support, samples, and product verification."],
              ["Quality", "/quality", "Public-safe compliance, manufacturing support, and brand protection."]
            ].map(([title, href, text]) => (
              <a key={title} href={href} className="rounded-2xl border border-[#f1d58b]/20 bg-white/[0.05] p-6 hover:border-[#f1d58b]/55">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 leading-7 text-white/62">{text}</p>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
