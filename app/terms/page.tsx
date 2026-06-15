import { site } from "../commerce-data";

export const metadata = {
  title: "Terms of Use | babra.store",
  description: "Terms of Use for BaBra Store website, product information, orders, and protected brand content."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-16 text-white md:px-8">
      <section className="mx-auto max-w-4xl">
        <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
        <h1 className="mt-8 font-serif text-6xl leading-none">Terms of Use</h1>
        <p className="mt-6 leading-8 text-white/66">
          By using babra.store, customers and partners agree to use official BaBra Store information responsibly and to complete orders through approved checkout or WhatsApp support channels.
        </p>
        {[
          ["Official store", `${site.domain} is the official public commerce and information website for ${site.company}.`],
          ["Product information", "Public product pages provide safe benefits, usage direction, pricing, and ordering paths. Complete formulas and supplier-sensitive records are not published."],
          ["Orders", "Orders are confirmed after customer details, delivery location, availability, and payment status are verified by BaBra Store."],
          ["Intellectual property", "BaBra names, product visuals, copy, and brand assets may not be copied, repackaged, or used to misrepresent unofficial products."]
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
