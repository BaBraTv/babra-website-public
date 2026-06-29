import type { Metadata } from "next";
import { campusExperience, developmentPhases, galleryPages, investorAccessRoute, partnerTracks, planCategories } from "./masterplan-data";
import { SchoolsNav } from "./SchoolsNav";

export const metadata: Metadata = {
  title: "BaBra Schools | Masterplan, Digital Learning & Future Campus",
  description:
    "BaBra Schools future education ecosystem for nursery, primary, secondary, university, digital learning, research, innovation, and community development."
};

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-[#f5fbff] text-[#08243c]">
      <SchoolsNav />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#e0f2fe,#ffffff_45%,#bae6fd)] px-5 py-20 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.45),transparent_24rem),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.86),transparent_20rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Sky Blue Inspiration</p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-none md:text-7xl">BaBra Schools</h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-[#16456a]">
              A long-term vision for nursery, primary, secondary, university, digital learning, research, innovation, and community development.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-sky-500 px-6 py-3 font-black text-white" href="/schools/masterplan">Explore Masterplan</a>
              <a className="rounded-full bg-white px-6 py-3 font-black text-[#08243c] shadow-lg shadow-sky-100" href={investorAccessRoute}>Request Investor Access</a>
              <a className="rounded-full border border-sky-300 bg-white/60 px-6 py-3 font-black text-[#08243c]" href="/forms/schools">School Forms</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-sky-100 bg-white/78 p-6 shadow-2xl shadow-sky-200/50">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-600">Campus vision</p>
            <h2 className="mt-3 font-serif text-4xl leading-none">Open sky. Learning. Future. Trust.</h2>
            <p className="mt-5 leading-8 text-[#42647d]">
              BaBra Schools is designed as a serious future educational institution with a clear long-term campus path,
              practical facilities, digital learning, and community impact.
            </p>
          </div>
        </div>
      </section>

      <section id="vision" className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Founder Vision</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Education ecosystem for future generations.</h2>
          </div>
          <p className="rounded-[2rem] border border-sky-100 bg-white p-6 text-lg font-semibold leading-9 text-[#42647d] shadow-xl shadow-sky-100/60">
            BaBra Schools is designed as a future education ecosystem connecting nursery, primary, secondary, university,
            digital learning, research, innovation, and community impact. The vision is to provide world-class education
            opportunities for future generations across Rwanda and Africa.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">School plans</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Full BaBra Schools planning categories.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planCategories.map((item) => (
              <article key={item.title} id={item.title === "Digital Learning Center" ? "digital-learning" : undefined} className="rounded-2xl border border-sky-100 bg-[#f8fcff] p-6 shadow-lg shadow-sky-100/40">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#4b6b82]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Public master plan gallery</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Public-safe campus concepts.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {galleryPages.map(([title, caption]) => (
              <article key={title} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg shadow-sky-100/50">
                <figure className="mb-5 overflow-hidden rounded-2xl border border-sky-100 bg-white">
                  <img className="h-28 w-full object-contain p-3" src="/brand/logo.jpeg" alt="Official BaBra Schools brand image" />
                </figure>
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4b6b82]">{caption}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-sky-100 bg-white px-5 py-4 text-sm font-bold text-[#42647d]">
            Full PDFs, budgets, technical drawings, construction phases, and private partnership documents require approved Investor / Sponsor Access.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Future campus experience</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Built for learning, innovation, and community.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {campusExperience.map((item) => (
              <div key={item} className="rounded-2xl border border-sky-100 bg-white p-6 font-black text-[#16456a] shadow-lg shadow-sky-100/50">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e0f2fe] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-700">Development phases</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">From first campus works to long-term university vision.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {developmentPhases.map(([phase, text]) => (
              <article key={phase} className="rounded-2xl border border-white bg-white/78 p-5 shadow-lg shadow-sky-200/50">
                <h3 className="font-serif text-3xl">{phase}</h3>
                <p className="mt-3 text-sm leading-6 text-[#42647d]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-600">Investors and partners</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Partner with the BaBra Schools vision.</h2>
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
