import { rwandaLocations, site } from "../commerce-data";

export const metadata = {
  title: "Delivery Policy | babra.store",
  description: "BaBra Store delivery policy with Rwanda-first province, district, sector, cell, village, phone, landmark, and delivery notes."
};

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-[#090706] px-5 py-16 text-white md:px-8">
      <section className="mx-auto max-w-6xl">
        <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">babra.store</a>
        <h1 className="mt-8 font-serif text-6xl leading-none">Delivery Policy</h1>
        <p className="mt-6 max-w-3xl leading-8 text-white/66">
          BaBra Store uses a Rwanda-first delivery flow: province, district, sector, cell, village, phone, landmark, and delivery notes. International delivery can be reviewed manually by support.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {Object.entries(rwandaLocations).map(([province, districts]) => (
            <article key={province} className="rounded-lg border border-white/10 bg-[#18110f] p-6">
              <h2 className="font-serif text-3xl">{province}</h2>
              <p className="mt-3 leading-7 text-white/64">{districts.join(", ")}</p>
            </article>
          ))}
        </div>
        <article className="mt-8 rounded-lg border border-[#d6ad57]/25 bg-[#18110f] p-6">
          <h2 className="font-serif text-3xl">Delivery support</h2>
          <p className="mt-3 leading-7 text-white/64">
            Customers should keep their phone reachable. BaBra Store confirms order status and delivery updates through checkout, order tracking, or WhatsApp {site.phone}.
          </p>
        </article>
      </section>
    </main>
  );
}
