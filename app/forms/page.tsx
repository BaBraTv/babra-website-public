import type { Metadata } from "next";
import { JobApplicationForm, LostDocumentForm } from "./FormsClient";
import { locationSeedNotes } from "./rwanda-location-seed";

export const metadata: Metadata = {
  title: "BaBra Rwanda Address Forms",
  description:
    "Reusable Rwanda cascading address forms for job applications, lost documents, found items, and BaBra service workflows."
};

const adminFilters = ["Intara", "Akarere", "Umurenge", "Akagari", "Umudugudu"];

export default function FormsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/">
          BaBra.com
        </a>
        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Rwanda location module</p>
            <h1 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Simple address selection for rural users.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              Users select one level at a time: Intara, Akarere, Umurenge, Akagari, Umudugudu. Each dropdown only shows valid
              children for the parent selection, reducing mistakes and making admin filtering reliable.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[#4ebeff]/25 bg-white/[0.06] p-6">
            <h2 className="font-serif text-3xl">Database-ready payload</h2>
            <p className="mt-3 leading-7 text-white/62">
              Every form keeps both IDs and names. Backend tables can store province_id, province_name, district_id,
              district_name, sector_id, sector_name, cell_id, cell_name, village_id, and village_name.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {adminFilters.map((item) => (
                <span key={item} className="rounded-full bg-[#f1d58b] px-4 py-3 text-center text-sm font-black text-[#130d08]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 md:grid-cols-2">
          {locationSeedNotes.map((note) => (
            <div key={note} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold leading-6 text-white/68">
              {note}
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-8">
          <JobApplicationForm />
          <LostDocumentForm />
        </div>
      </div>
    </main>
  );
}
