import type { Metadata } from "next";
import { ContactShowroomForm, JobApplicationForm, LostDocumentForm, SampleRequestForm, WholesaleDistributorForm } from "./FormsClient";

export const metadata: Metadata = {
  title: "BaBra Service Forms | Jobs, Samples, Wholesale & Showroom",
  description:
    "Official babra.store forms for job applications, lost documents announcements, sample requests, wholesale distributor requests, showroom contact, and Rwanda address flow."
};

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
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Official BaBra actions</p>
            <h1 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Choose what you need and send it directly to BaBra.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
              Apply for work, report a lost or found document, request samples, request wholesale, or contact the showroom.
              Each form opens WhatsApp with the right information already organized.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="#sample-request">Request samples</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="#wholesale-distributor">Wholesale request</a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="#contact-showroom">Contact showroom</a>
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
