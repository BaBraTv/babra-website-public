import { divisionContent, type DivisionKey } from "./division-content";

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
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30">
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
                  id={index === 0 ? "farmers" : index === 1 ? "marketplace" : index === 2 ? "partnerships" : undefined}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-6"
                >
                  <span
                    className="inline-flex h-8 items-center rounded-full border border-white/10 bg-black/25 px-3 text-xs font-black uppercase tracking-[0.14em] tabular-nums"
                    style={{ color: data.accent }}
                  >
                    {`Step ${index + 1}`}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl">{point}</h3>
                  <p className="mt-3 leading-7 text-white/62">Use the division-specific forms and contact routes for this service area.</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a id="admissions" className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Admissions / forms</a>
              <a id="teachers" className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Jobs / roles</a>
              <a id="digital-school" className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Digital systems</a>
              <a id="scholarships" className="rounded-full border border-white/15 px-5 py-3 font-black text-white/75" href={data.formsHref}>Support requests</a>
            </div>
          </div>
        </section>
      ) : null}

      {division === "cosmetics" ? (
        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Products", "/products", "Women, men, kids, serum, pocket fresh, pads, soap, and safe product previews."],
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
