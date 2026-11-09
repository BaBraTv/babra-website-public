import { ContactForm } from "./ContactForm";

const contactOptions = [
  ["Samples", "Request product samples for testing, shop display, salon use, or launch review."],
  ["Wholesale", "Start reseller, shop, salon, distributor, or bulk-order discussion."],
  ["Partnership", "Discuss showroom, franchise, media, school, farm, or BaBra Group opportunities."],
  ["Customer support", "Ask about product use, delivery, order status, or official verification."],
];

const quickFacts = [
  ["Rwanda orders · VIDAPHARMA", "0734 299 777"],
  ["BaBra Call / WhatsApp", "+250 788 351 482"],
  ["Email", "babracosmeticsltd@gmail.com"],
  ["Office", "UBUMWE HOUSE · Room B1-62, Nyabugogo, Kigali"],
  ["Best contact", "WhatsApp for personal assistance"],
];

const companyEmail = "babracosmeticsltd@gmail.com";
export const metadata = {
  title: "Contact BaBra Cosmetics",
  description:
    "Contact BaBra Cosmetics Ltd for samples, wholesale, partnership, reseller, showroom, and customer support through WhatsApp or email.",
  alternates: {
    canonical: "https://www.babra.store/contact"
  },
  openGraph: {
    title: "Contact BaBra",
    description: "Official BaBra contact page for phone, email, WhatsApp, business hours, and support.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact BaBra",
    description: "Official BaBra contact page.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Samples, wholesale, support</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Talk to BaBra directly.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                Contact BaBra for lotion orders, samples, wholesale opportunities and personal assistance. Our team will help you find the right next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="https://wa.me/250788351482?text=Hello%20BaBra%2C%20I%20want%20samples%20or%20wholesale%20information." target="_blank" rel="noopener noreferrer">WhatsApp now</a>
                <a className="rounded-full bg-white px-6 py-3 font-black text-[#130d08]" href="/contact-showroom">Showroom form</a>
                <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href={`mailto:${companyEmail}?subject=BaBra%20website%20message`}>Email BaBra</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Quick routes</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Choose the right conversation.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contactOptions.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-[#18110f] p-7 md:p-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {quickFacts.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#d6ad57]">{label}</span>
                <p className="mt-3 text-lg font-black text-white/86">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
