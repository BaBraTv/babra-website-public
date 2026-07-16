import type { Metadata } from "next";
import { campusExperience, developmentPhases, galleryPages, investorAccessRoute, partnerTracks, pdfFacilityPlans, planCategories } from "../masterplan-data";
import { SchoolsNav } from "../SchoolsNav";
import { officialMediaPendingLabel } from "../../data/official-media";

export const metadata: Metadata = {
  title: "BaBra Schools Masterplan | Future Campus Vision",
  description:
    "BaBra Schools Masterplan for nursery, primary, secondary, university, digital learning, library, laboratories, ICT, sports, administration, accommodation, and future expansion."
};

export default function SchoolsMasterplanPage() {
  return (
    <main className="min-h-screen bg-[#f5fbff] text-[#08243c]">
      <SchoolsNav />

      <section className="bg-[linear-gradient(135deg,#dff4ff,#ffffff_48%,#bfdbfe)] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">BaBra Schools planning system</p>
            <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">BaBra Schools Masterplan</h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-[#16456a]">
              A long-term vision for nursery, primary, secondary, university, digital learning, research, innovation, and community development.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-sky-500 px-6 py-3 font-black text-white" href="#gallery">View Public Gallery</a>
              <a className="rounded-full border border-sky-300 bg-white px-6 py-3 font-black text-[#08243c]" href={investorAccessRoute}>Request Investor / Sponsor Access</a>
              <a className="rounded-full border border-sky-300 bg-white/70 px-6 py-3 font-black text-[#08243c]" href="/forms/schools">School Forms</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-sky-100 bg-white/80 p-6 shadow-2xl shadow-sky-200/50">
            <h2 className="font-serif text-4xl leading-none">Explore the Future BaBra Schools Campus</h2>
            <p className="mt-5 leading-8 text-[#42647d]">
              Public visitors see safe campus concepts and planning categories. Full PDFs, budgets, technical drawings,
              detailed construction phases, and partnership documents require approved access.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Public master plan gallery</p>
              <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Public-safe campus concepts.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="rounded-full bg-sky-500 px-5 py-3 font-black text-white" href={investorAccessRoute}>Request private package</a>
              <a className="rounded-full border border-sky-300 bg-white px-5 py-3 font-black text-[#08243c]" href="/forms/schools">School forms</a>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {galleryPages.map(([title, caption]) => (
              <article key={title} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg shadow-sky-100/50">
                <figure className="mb-5 overflow-hidden rounded-2xl border border-sky-100 bg-white">
                  <div className="grid h-32 w-full place-items-center p-4 text-center text-xs font-black uppercase tracking-[0.12em] text-sky-700">
                    {officialMediaPendingLabel}
                  </div>
                </figure>
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4b6b82]">{caption}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-sky-100 bg-white px-5 py-4 text-sm font-bold text-[#42647d]">
            The full master plan PDF is not public. Approved investors and sponsors can request access to protected documents.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Campus vision section</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Plans, elevations, sections, and support facilities.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {pdfFacilityPlans.map((item) => (
              <div key={item} className="rounded-2xl border border-sky-100 bg-white px-5 py-4 font-black text-[#16456a] shadow-lg shadow-sky-100/40">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e0f2fe] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-700">Future facilities section</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Every BaBra Schools category stays visible.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planCategories.map((item) => (
              <article key={item.title} id={item.title === "Digital Learning Center" ? "digital-learning" : undefined} className="rounded-2xl border border-white bg-white/80 p-6 shadow-lg shadow-sky-200/50">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#42647d]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Future campus experience</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Learning, research, sport, and community life.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {campusExperience.map((item) => (
              <div key={item} className="rounded-2xl border border-sky-100 bg-white p-6 font-black text-[#16456a] shadow-lg shadow-sky-100/50">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Timeline and development phases</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">A phased route from campus works to institution growth.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {developmentPhases.map(([phase, text]) => (
              <article key={phase} className="rounded-2xl border border-sky-100 bg-[#f8fcff] p-5 shadow-lg shadow-sky-100/40">
                <h3 className="font-serif text-3xl">{phase}</h3>
                <p className="mt-3 text-sm leading-6 text-[#42647d]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#08243c] px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-300">Founder Vision</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">World-class education opportunities for Rwanda and Africa.</h2>
          </div>
          <p className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-lg font-semibold leading-9 text-white/74">
            BaBra Schools is designed as a future education ecosystem connecting nursery, primary, secondary, university,
            digital learning, research, innovation, and community impact. The vision is to provide world-class education
            opportunities for future generations across Rwanda and Africa.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Investor and partner section</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Help build the BaBra Schools future.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {partnerTracks.map((item) => (
              <a key={item} className="rounded-2xl border border-sky-100 bg-white p-6 font-black text-[#16456a] shadow-lg shadow-sky-100/50" href={investorAccessRoute}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

