import { divisionForms, type DivisionFormsKey } from "./division-forms-content";

const emails: Record<DivisionFormsKey, string> = {
  cosmetics: "babracosmeticsltd@gmail.com",
  farm: "babracosmeticsltd@gmail.com",
  schools: "babracosmeticsltd@gmail.com",
  "lifetalk-tv": "babracosmeticsltd@gmail.com",
  "rwanda-mobile-hub": "babracosmeticsltd@gmail.com",
  foundation: "babracosmeticsltd@gmail.com"
};

function mailHref(formName: string, email: string) {
  const subject = encodeURIComponent(formName);
  const body = encodeURIComponent(
    `Hello EI BaBra Holding,\n\nI want to submit this request: ${formName}\n\nFull name:\nPhone / WhatsApp:\nEmail:\nProvince:\nDistrict:\nSector:\nCell:\nVillage:\nLandmark:\nDetails:`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

export function DivisionFormsPage({ division }: { division: DivisionFormsKey }) {
  const data = divisionForms[division];

  return (
    <main className="min-h-screen bg-[#080606] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">EI BaBra Holding Ltd</a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/forms">All forms</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/contact">Contact</a>
          </nav>
        </div>

        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Separated by division</p>
          <h1 className="mt-3 font-serif text-5xl leading-none md:text-7xl">{data.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/64">{data.description}</p>
          <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm font-black text-white/76">
            Notification email route: <a className="text-[#f1d58b]" href={`mailto:${emails[division]}`}>{emails[division]}</a>
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map(([name, href, text]) => {
            const target = href === "whatsapp" ? mailHref(name, emails[division]) : href;
            const external = href === "whatsapp";
            return (
              <a
                key={name}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 hover:border-[#f1d58b]/50"
                href={target}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <h2 className="font-serif text-3xl leading-tight">{name}</h2>
                <p className="mt-3 min-h-20 leading-7 text-white/62">{text}</p>
                <span className="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black text-[#101010]" style={{ backgroundColor: data.accent }}>
                  Submit request
                </span>
                <span className="mt-3 block text-xs font-bold text-white/42">WhatsApp fallback: +250 788 351 482</span>
              </a>
            );
          })}
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <h2 className="font-serif text-3xl">Rwanda address standard</h2>
          <p className="mt-3 max-w-4xl leading-7 text-white/64">
            Where location is needed, BaBra collects province, district, sector, cell, village, phone, landmark, and notes.
            Public pages must not collect formulas, full labels, barcodes, QR codes, batch markers, or supplier-sensitive records.
          </p>
        </section>
      </div>
    </main>
  );
}
