import type { Metadata } from "next";
import { ContactShowroomForm, JobApplicationForm, LostDocumentForm, SampleRequestForm, WholesaleDistributorForm } from "./FormsClient";
import { divisionForms } from "./division-forms-content";

export const metadata: Metadata = {
  title: "EI BaBra Holding Forms | Cosmetics, Farm, Schools, LifeTalk TV & Foundation",
  description:
    "Separated EI BaBra Holding forms for BaBra Cosmetics, BaBra Farm, BaBra Schools, LifeTalk TV, BaBra Foundation, jobs, samples, wholesale, and Rwanda address flow."
};

const divisionRoutes = [
  ["BaBra Cosmetics", "/forms/cosmetics", divisionForms.cosmetics.description],
  ["BaBra Farm", "/forms/farm", divisionForms.farm.description],
  ["BaBra Schools", "/forms/schools", divisionForms.schools.description],
  ["LifeTalk TV", "/forms/lifetalk-tv", divisionForms["lifetalk-tv"].description],
  ["BaBra Foundation", "/forms/foundation", divisionForms.foundation.description]
];

const formRoutes = [
  ["Apply for job", "#job-application", "Send your name, phone, role, and Rwanda address to BaBra."],
  ["Report lost document", "#lost-documents", "Tell BaBra what was lost and where it happened."],
  ["Report found document", "#lost-documents", "Help the owner find a document or item you found."],
  ["Request sample", "#sample-request", "Ask for official BaBra samples for personal or business use."],
  ["Request wholesale", "#wholesale-distributor", "Start reseller, wholesale, or distributor verification."]
];

const addressSteps = ["Province", "District", "Sector", "Cell", "Village", "Phone", "Landmark", "Notes"];

export default function FormsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <a className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]" href="/">
          babra.store
        </a>
        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">EI BaBra Holding forms</p>
            <h1 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Choose the division first, then send the right request.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              BaBra Cosmetics, Farm, Schools, LifeTalk TV, and Foundation requests are separated so visitors reach the correct team.
              Existing cosmetics, jobs, lost-document, sample, wholesale, and showroom forms remain available below.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/forms/cosmetics">Cosmetics forms</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/forms/farm">Farm forms</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/forms/lifetalk-tv">LifeTalk TV forms</a>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[#d6ad57]/25 bg-white/[0.06] p-6">
            <h2 className="font-serif text-3xl">Rwanda address flow</h2>
            <p className="mt-3 leading-7 text-white/62">
              BaBra uses province, district, sector, cell, village, phone, landmark, and notes so requests are easy to confirm,
              deliver, or follow up by WhatsApp.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {addressSteps.map((item) => (
                <span key={item} className="rounded-full bg-[#f1d58b] px-4 py-3 text-center text-sm font-black text-[#130d08]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {divisionRoutes.map(([title, href, text]) => (
            <a key={title} className="rounded-2xl border border-[#4ebeff]/18 bg-white/[0.055] p-5 hover:border-[#4ebeff]/55" href={href}>
              <h2 className="font-serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
            </a>
          ))}
        </section>

        <div className="mt-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">Quick public actions</p>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {formRoutes.map(([title, href, text]) => (
            <a key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 hover:border-[#d6ad57]/50" href={href}>
              <h2 className="font-serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
            </a>
          ))}
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
          <h2 className="font-serif text-3xl">Before you submit</h2>
          <p className="mt-3 max-w-4xl leading-7 text-white/64">
            These are public-safe forms. Do not upload or send full formulas, complete product labels, barcodes, QR codes,
            batch markers, supplier documents, or other private manufacturing details through the website.
          </p>
        </section>

        <div className="mt-10 grid gap-8">
          <div id="job-application"><JobApplicationForm /></div>
          <div id="lost-documents"><LostDocumentForm /></div>
          <SampleRequestForm />
          <WholesaleDistributorForm />
          <ContactShowroomForm />
        </div>
      </div>
    </main>
  );
}
