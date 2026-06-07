const showroomFeatures = [
  ["Luxury product displays", "Clean shelves, gold accents, and grouped product families help customers understand the full BaBra line quickly."],
  ["Customer waiting area", "A calm premium space for consultation, wholesale appointments, and customer support."],
  ["Digital product screens", "Screens can show product videos, founder messages, factory trust footage, and LifeTalk TV campaigns."],
  ["QR verification station", "A future station where customers verify official products without exposing private barcode data online."],
  ["Support desk", "Order support, reseller onboarding, delivery help, and product education in one place."],
  ["Franchise opportunities", "A structured path for salons, stores, and partners who want to represent BaBra products."],
];

export const metadata = {
  title: "BaBra Showroom",
  description:
    "BaBra Showroom is the premium retail and franchise experience for BaBra Cosmetics, product displays, QR verification, customer support, and future gallery content."
};

export default function ShowroomPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="relative overflow-hidden px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra.com</a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Retail experience</p>
              <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">BaBra Showroom.</h1>
              <p className="mt-6 text-lg leading-8 text-white/66">
                A future premium showroom for product discovery, customer support, wholesale meetings, franchise onboarding, digital screens, and official product verification.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="https://wa.me/250788351482" target="_blank">Book showroom support</a>
                <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/products">View products</a>
              </div>
            </div>
            <figure className="overflow-hidden rounded-lg border border-[#d6ad57]/25 shadow-2xl shadow-black/40">
              <img className="h-[520px] w-full object-cover" src="/showroom/showroom.png" alt="BaBra luxury showroom concept" />
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Showroom system</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">A physical brand experience built for trust.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {showroomFeatures.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#d6ad57]/25 bg-[#18110f] p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Gallery ready</p>
              <h2 className="mt-3 font-serif text-5xl leading-none">Photos, videos, and franchise proof.</h2>
            </div>
            <p className="text-lg leading-8 text-white/66">
              This page is ready for future showroom photos, customer videos, product testing clips, and partner testimonials. Sensitive QR/barcode data should remain private; the public showroom only explains that official verification exists.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
