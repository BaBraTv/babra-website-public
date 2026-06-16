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
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#fb923c] px-6 py-3 font-black text-[#071426]" href={whatsAppHref("Report Lost Document")} target="_blank" rel="noopener noreferrer">Report lost document</a>
            <a className="rounded-full bg-white px-6 py-3 font-black text-[#071426]" href={whatsAppHref("Report Found Document")} target="_blank" rel="noopener noreferrer">Report found document</a>
            <a className="rounded-full border border-white/30 px-6 py-3 font-black text-white" href="#services">View services</a>
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
