import type { Metadata } from "next";

const officialWebsite = "https://dentalexpertsclinic.rw/";
const appointmentUrl = "https://dentalexpertsclinic.rw/appointment.php";

export const metadata: Metadata = {
  title: "Dental Experts Clinic Kigali | Featured Healthcare Partner",
  description: "Discover Dental Experts Clinic in Kimironko, Kigali. Explore professional dental services, call the clinic, or book through its official website.",
  alternates: { canonical: "https://www.babra.store/dental-experts-clinic" },
  openGraph: {
    title: "Dental Experts Clinic | Professional Dental Care in Kigali",
    description: "Modern, patient-focused dental care for adults and children in Kimironko, Kigali.",
    url: "https://www.babra.store/dental-experts-clinic",
    siteName: "BaBra",
    type: "website",
    images: [{ url: "/partners/dental-experts-clinic.svg", width: 1600, height: 1000, alt: "Dental Experts Clinic" }]
  }
};

const services = [
  ["General Dentistry", "Routine checkups, professional cleaning, fillings, and preventive dental care."],
  ["Cosmetic Dentistry", "Teeth whitening, reshaping, and aesthetic solutions for a confident smile."],
  ["Root Canal Treatment", "Care for infected or damaged tooth pulp designed to preserve the natural tooth."],
  ["Dental Implants", "Permanent tooth-replacement solutions focused on restoring function and appearance."],
  ["Orthodontics", "Teeth alignment and correction using braces and other orthodontic approaches."],
  ["Pediatric Dentistry", "Gentle, specialized dental care for children in a friendly environment."]
] as const;

export default function DentalExpertsClinicPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Dental Experts Clinic",
    url: officialWebsite,
    telephone: "+250790719688",
    email: "info@dentalexpertsclinic.rw",
    address: {
      "@type": "PostalAddress",
      streetAddress: "KG 4 St",
      addressLocality: "Kimironko, Kigali",
      addressCountry: "RW"
    },
    openingHours: "Mo-Sa 08:00-20:00"
  };

  return (
    <main className="min-h-screen bg-[#06191b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="border-b border-white/10 bg-[#06191b]/95 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a className="font-serif text-xl" href="/">EI BaBra Holding Ltd</a>
          <a className="rounded-full bg-[#55e6d0] px-5 py-2.5 text-sm font-black text-[#06191b]" href={appointmentUrl} target="_blank" rel="noopener noreferrer">Book appointment</a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#55e6d0]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#55e6d0]">Featured healthcare partner</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.9] md:text-8xl">Professional dental care you can trust.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">Dental Experts Clinic is a modern dental healthcare facility in Kimironko, Kigali, offering patient-focused care for adults and children.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#55e6d0] px-6 py-3 font-black text-[#06191b]" href={appointmentUrl} target="_blank" rel="noopener noreferrer">Book appointment</a>
              <a className="rounded-full border border-white/25 px-6 py-3 font-black" href="tel:+250790719688">Call +250 790 719 688</a>
              <a className="rounded-full border border-white/25 px-6 py-3 font-black" href={officialWebsite} target="_blank" rel="noopener noreferrer">Official website</a>
            </div>
          </div>
          <img className="w-full rounded-lg border border-white/15 shadow-2xl shadow-black/40" src="/partners/dental-experts-clinic.svg" alt="Dental Experts Clinic professional dental care in Kigali" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#fffaf1] px-5 py-20 text-[#102628] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#087d72]">Dental services</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Care for every stage of your smile.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map(([title, text], index) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-7 shadow-xl shadow-black/5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#087d72]">0{index + 1}</span>
                <h3 className="mt-4 font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <article className="rounded-lg border border-white/12 bg-white/[0.05] p-7"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Opening hours</p><h2 className="mt-4 font-serif text-3xl">Monday–Saturday</h2><p className="mt-3 text-white/65">8:00 AM–8:00 PM</p></article>
          <article className="rounded-lg border border-white/12 bg-white/[0.05] p-7"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Clinic location</p><h2 className="mt-4 font-serif text-3xl">Kimironko, Kigali</h2><p className="mt-3 text-white/65">Kigali City · Gasabo · KG 4 St</p></article>
          <article className="rounded-lg border border-white/12 bg-white/[0.05] p-7"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Email</p><h2 className="mt-4 font-serif text-3xl">Contact the clinic</h2><a className="mt-3 inline-block text-[#55e6d0]" href="mailto:info@dentalexpertsclinic.rw">info@dentalexpertsclinic.rw</a></article>
        </div>
      </section>

      <section className="bg-[#55e6d0] px-5 py-16 text-[#06191b] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-sm font-black uppercase tracking-[0.2em]">Ready to speak with the clinic?</p><h2 className="mt-2 font-serif text-4xl md:text-5xl">Book your dental appointment.</h2></div>
          <a className="rounded-full bg-[#06191b] px-7 py-3.5 text-center font-black text-white" href={appointmentUrl} target="_blank" rel="noopener noreferrer">Continue to official booking</a>
        </div>
      </section>
    </main>
  );
}
