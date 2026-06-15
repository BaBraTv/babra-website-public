import { site } from "../commerce-data";

export const metadata = {
  title: "Return Policy | babra.store",
  description: "BaBra Store return policy for damaged, incorrect, or unresolved delivery orders."
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-16 text-white md:px-8">
      <section className="mx-auto max-w-4xl">
        <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
        <h1 className="mt-8 font-serif text-6xl leading-none">Return Policy</h1>
        <p className="mt-6 leading-8 text-white/66">
          BaBra Store reviews return requests for damaged, incorrect, or delivery-affected orders when the customer contacts support quickly with order evidence.
        </p>
        {[
          ["Eligible cases", "Wrong product, visible delivery damage, missing confirmed item, or order issue reported with photos and order details."],
          ["Non-returnable cases", "Opened personal-care products may be refused for hygiene and safety unless BaBra confirms a product or delivery fault."],
          ["Resolution", "BaBra may replace the item, correct delivery, issue store credit, or agree another fair resolution after review."],
          ["Support route", `Contact ${site.phone} on WhatsApp or ${site.email} with your order code.`]
        ].map(([title, text]) => (
          <article key={title} className="mt-6 rounded-lg border border-white/10 bg-[#18110f] p-6">
            <h2 className="font-serif text-3xl">{title}</h2>
            <p className="mt-3 leading-7 text-white/64">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
