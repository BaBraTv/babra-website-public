import { site } from "../commerce-data";

export const metadata = {
  title: "Privacy Policy | babra.store",
  description: "Privacy policy for BaBra Store customer data, delivery details, WhatsApp orders, and support requests."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-16 text-white md:px-8">
      <section className="mx-auto max-w-4xl">
        <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
        <h1 className="mt-8 font-serif text-6xl leading-none">Privacy Policy</h1>
        <p className="mt-6 leading-8 text-white/66">
          {site.company} collects only the customer information needed to process orders, respond to support requests, confirm delivery, and improve official BaBra Store service.
        </p>
        {[
          ["Information we collect", "Name, phone number, email, delivery location, order details, payment confirmation status, and customer support messages."],
          ["How we use it", "To confirm orders, arrange Rwanda-first delivery, provide WhatsApp support, prepare invoices, and prevent fraud or product misuse."],
          ["What we protect", "We do not publish private formulas, full label files, QR or barcode records, supplier-sensitive documents, or customer private data online."],
          ["Contact", `Privacy questions can be sent to ${site.email} or WhatsApp ${site.phone}.`]
        ].map(([title, text]) => (
          <article key={title} className="mt-6 rounded-lg border border-white/10 bg-[#18110f] p-6">
            <h2 className="font-serif text-3xl">{title}</h2>
            <p className="mt-3 leading-7 text-white/64">{text}</p>
          </article>
        ))}
        <article id="analytics" className="mt-6 rounded-lg border border-white/10 bg-[#18110f] p-6">
          <h2 className="font-serif text-3xl">Optional visitor analytics</h2>
          <p className="mt-3 leading-7 text-white/64">When enabled, analytics starts only after you choose Allow analytics. We use first-party browser storage, not third-party tracking cookies. A random browser identifier expires after 30 days; a visit ends after 30 minutes of inactivity. Your preference is remembered for 180 days. Use Analytics privacy settings at the bottom of this website to decline or withdraw permission. Withdrawing deletes the browser identifiers and stops future collection; earlier de-identified counts expire under our retention policy.</p>
          <p className="mt-3 leading-7 text-white/64">We measure approved public page paths, button actions, broad device categories, known traffic sources, approved campaign codes and country where available. We do not collect form contents, messages, passwords, payment credentials, exact addresses or precise GPS location. Raw IP addresses are not stored in the analytics database. A daily keyed hash is used briefly for abuse prevention. Do Not Track and Global Privacy Control signals disable collection.</p>
          <p className="mt-3 leading-7 text-white/64">Analytics is available only to authorized BaBra administrators and staff. Visit summaries are retained for up to 90 days, and duplicate-prevention and rate-limit records for 24 hours, with daily scheduled cleanup. Country information is approximate. Hosting and existing account/security systems have separate operational logs. Contact {site.email} about privacy.</p>
        </article>
      </section>
    </main>
  );
}
