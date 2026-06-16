import type { Metadata } from "next";
import { divisionForms } from "./division-forms-content";

export const metadata: Metadata = {
  title: "EI BaBra Holding Forms Gateway | Choose Your Division",
  description:
    "Clean EI BaBra Holding forms gateway for BaBra Cosmetics, BaBra Farm, BaBra Schools, LifeTalk TV, Rwanda Mobile Hub, BaBra Foundation, and Lost & Found Rwanda."
};

const divisionRoutes = [
  ["BaBra Cosmetics Forms", "/forms/cosmetics", divisionForms.cosmetics.description, "#f1d58b"],
  ["BaBra Farm Forms", "/forms/farm", divisionForms.farm.description, "#4ade80"],
  ["BaBra Schools Forms", "/forms/schools", divisionForms.schools.description, "#7dd3fc"],
  ["LifeTalk TV Forms", "/forms/lifetalk-tv", divisionForms["lifetalk-tv"].description, "#ef4444"],
  ["Rwanda Mobile Hub Forms", "/forms/rwanda-mobile-hub", divisionForms["rwanda-mobile-hub"].description, "#60a5fa"],
  ["BaBra Foundation Forms", "/forms/foundation", divisionForms.foundation.description, "#c084fc"],
  ["Lost & Found Rwanda", "/lost-and-found", "Independent public service for lost documents, found items, claims, and finder reward process.", "#fb923c"]
];

export default function FormsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/">
          EI BaBra Holding Ltd
        </a>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Forms gateway</p>
          <h1 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Choose the correct BaBra division.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
            Each division has its own forms, jobs, services, and orientation. Lost & Found Rwanda is independent and is not part of Cosmetics, Farm, Schools, or LifeTalk TV.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {divisionRoutes.map(([title, href, text, accent]) => (
            <a key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 hover:border-white/30" href={href}>
              <span className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: accent }}>Open section</span>
              <h2 className="mt-3 font-serif text-3xl leading-tight">{title}</h2>
              <p className="mt-3 min-h-20 text-sm leading-6 text-white/62">{text}</p>
              <span className="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black text-[#101010]" style={{ backgroundColor: accent }}>
                Open forms
              </span>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
