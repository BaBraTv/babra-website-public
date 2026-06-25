import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost & Found Rwanda | Report Lost or Found Documents",
  description:
    "Independent Lost & Found Rwanda public service for lost documents, found items, searches, claims, and finder reward process."
};

const services = [
  ["Report Lost Document", "Tell us what document was lost, owner name, phone, and where it was lost."],
  ["Report Found Document", "Report a document or item you found so the owner can be contacted safely."],
  ["Search Lost Document", "Ask whether a National ID, driving permit, passport, card, certificate, or other document has been reported."],
  ["Claim Found Item", "Start a claim with identity verification before item handover."],
  ["Finder Reward Process", "Request guidance for a fair finder reward process without exposing private details."]
];

const documentTypes = ["National ID", "Driving Permit", "Passport", "Student Card", "ATM Card", "Certificate", "Insurance Card", "Other document"];
const lostFoundStatuses = ["Lost report submitted", "Payment pending", "Published", "Found", "Claimed", "Completed"];
const paymentFees = [
  ["Report lost document", "1000 RWF posting fee", "Paid manually by MTN MoMo, Airtel Money, bank transfer, or cash confirmation before publishing."],
  ["Claim found document", "Claim / service fee", "Claim payment is verified separately from the finder reward process."],
  ["Finder reward process", "Separate agreement", "Finder reward is handled separately and never shown as automatic payment success."]
];

function whatsAppHref(service: string) {
  return `https://wa.me/250788351482?text=${encodeURIComponent(`Hello Lost & Found Rwanda, I need this service: ${service}`)}`;
}

export default function LostAndFoundPage() {
  return (
    <main className="min-h-screen bg-[#071426] text-white">
      <header className="border-b border-white/10 bg-[#071426]/95 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">Lost & Found Rwanda</a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/">Home</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="#services">Services</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="#report">Report</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="#search">Search</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="#documents">Documents</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/forms">Forms</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="bg-[radial-gradient(circle_at_25%_20%,rgba(251,146,60,0.28),transparent_24rem),linear-gradient(135deg,#071426,#0b1f3d_55%,#fb923c)] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#fb923c]">Independent public service</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-none md:text-7xl">Lost & Found Rwanda</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
            Report lost documents, report found documents, search safely, claim found items, and handle finder reward guidance.
            This service is independent from BaBra Cosmetics, Farm, Schools, and LifeTalk TV.
          </p>
          <p className="mt-4 max-w-3xl rounded-2xl border border-white/15 bg-black/25 px-5 py-4 text-sm font-black text-white/80">
            Notification email route: <a className="text-[#fb923c]" href="mailto:babracosmeticsltd@gmail.com?subject=Lost%20and%20Found%20Rwanda">babracosmeticsltd@gmail.com</a>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#fb923c] px-6 py-3 font-black text-[#071426]" href={whatsAppHref("Report Lost Document")} target="_blank" rel="noopener noreferrer">Report lost document</a>
            <a className="rounded-full bg-white px-6 py-3 font-black text-[#071426]" href={whatsAppHref("Report Found Document")} target="_blank" rel="noopener noreferrer">Report found document</a>
            <a className="rounded-full border border-white/30 px-6 py-3 font-black text-white" href="#report">Open report form</a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b1f3d] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#fb923c]">Manual payment flow</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">No fake payment success.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {paymentFees.map(([title, fee, text]) => (
              <article key={title} className="rounded-2xl border border-[#fb923c]/30 bg-white/[0.055] p-6">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 text-xl font-black text-[#fb923c]">{fee}</p>
                <p className="mt-3 leading-7 text-white/64">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-6">
            {lostFoundStatuses.map((status) => (
              <div key={status} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm font-black text-white/76">
                {status}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl leading-none md:text-6xl">Lost & Found services.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {services.map(([title, text]) => (
              <a key={title} className="rounded-2xl border border-[#fb923c]/30 bg-white/[0.055] p-5 hover:border-[#fb923c]" href={whatsAppHref(title)} target="_blank" rel="noopener noreferrer">
                <h3 className="font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="border-y border-white/10 bg-[#0b1f3d] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#fb923c]">Lost & Found forms</p>
            <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Report, search, or claim safely.</h2>
            <p className="mt-5 leading-8 text-white/64">
              Use this public-safe form structure for lost documents, found documents, search requests, claims, and finder reward guidance.
              Payment is manually reviewed before any report is published.
            </p>
          </div>
          <form className="rounded-[2rem] border border-white/10 bg-white p-6 text-[#071426] md:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-black">
                Service type
                <select className="rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3">
                  {services.map(([service]) => <option key={service}>{service}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black">
                Document type
                <select className="rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3">
                  {documentTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              {["Full name", "Phone / WhatsApp", "Email", "Province", "District", "Sector", "Cell", "Village", "Landmark"].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-black">
                  {label}
                  <input className="rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3" />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-black md:col-span-2">
                Notes
                <textarea className="min-h-28 rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3" />
              </label>
            </div>
            <a
              className="mt-6 inline-flex rounded-full bg-[#fb923c] px-6 py-3 font-black text-[#071426]"
              href="mailto:babracosmeticsltd@gmail.com?subject=Lost%20and%20Found%20Rwanda%20Request"
            >
              Submit to BaBra email
            </a>
            <p className="mt-4 text-sm font-semibold text-[#516579]">
              Posting fee: 1,000 RWF. Claim/service fee and finder reward process are editable in admin.
            </p>
          </form>
        </div>
      </section>

      <section id="search" className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {["Search Documents", "Claim Document", "Payment Pending", "Published"].map((item) => (
            <a key={item} className="rounded-2xl border border-[#fb923c]/30 bg-white/[0.055] p-6 font-black text-white/82" href={whatsAppHref(item)} target="_blank" rel="noopener noreferrer">
              {item}
            </a>
          ))}
        </div>
      </section>

      <section id="documents" className="bg-white px-5 py-16 text-[#071426] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#fb923c]">Document types</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Supported lost document categories.</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {documentTypes.map((item) => (
              <div key={item} className="rounded-2xl border border-[#071426]/10 bg-[#f8fafc] px-5 py-4 font-black">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
