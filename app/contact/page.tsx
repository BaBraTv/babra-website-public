import { ContactForm } from "./ContactForm";

const contactOptions = [
  ["Samples", "Request product samples for testing, shop display, salon use, or launch review."],
  ["Wholesale", "Start reseller, shop, salon, distributor, or bulk-order discussion."],
  ["Partnership", "Discuss showroom, franchise, media, school, farm, or BaBra Group opportunities."],
  ["Customer support", "Ask about product use, delivery, order status, or official verification."],
];

const quickFacts = [
  ["Phone / WhatsApp", "+250 788 351 482"],
  ["Company email", "info@babra.store"],
  ["Backup email", "babracosmeticsltd@gmail.com"],
  ["Location", "Kigali, Rwanda"],
  ["Best route", "WhatsApp for fastest response"],
];

const companyEmail = "info@babra.store";
const backupEmail = "babracosmeticsltd@gmail.com";

const businessEmails = [
  ["General information", "info@babra.store", "General information"],
  ["Customer support", "support@babra.store", "Customer support"],
  ["Cosmetics", "sales@babra.store", "BaBra Cosmetics"],
  ["Farm", "info@babra.store", "BaBra Farm"],
  ["Schools", "info@babra.store", "BaBra Schools"],
  ["LifeTalk TV", "info@babra.store", "LifeTalk TV"],
  ["Foundation", "support@babra.store", "BaBra Foundation"],
  ["Lost & Found", "support@babra.store", "Lost and Found Rwanda"],
  ["Sales", "sales@babra.store", "BaBra Sales"],
  ["Investors", "info@babra.store", "Investor and partner request"]
];

export const metadata = {
  title: "Contact BaBra Cosmetics",
  description:
    "Contact BaBra Cosmetics Ltd for samples, wholesale, partnership, reseller, showroom, and customer support through WhatsApp or email."
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
                Use this page for product samples, wholesale orders, reseller discussions, showroom partnerships, and customer support. The form sends your message directly to BaBra WhatsApp with no server required.
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

      <section className="bg-[#071426] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4ebeff]">Business email readiness</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Company email routes for every BaBra division.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-white/62">
            BaBra uses verified babra.store mailboxes for official customer, support, sales, and partnership communication. Gmail remains a backup route.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {businessEmails.map(([label, email, subject]) => (
              <a key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 hover:border-[#4ebeff]/60" href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#4ebeff]">{label}</span>
                <p className="mt-3 break-words font-black text-white/82">{email}</p>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm font-bold text-white/50">
            Backup email: <a className="text-[#f1d58b]" href={`mailto:${backupEmail}?subject=BaBra%20backup%20contact`}>{backupEmail}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
