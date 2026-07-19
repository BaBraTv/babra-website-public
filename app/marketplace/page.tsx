export default function MarketplacePage() {
  const products = ["BaBra Lotion Women — 500 ml", "BaBra Lotion Men — 500 ml", "BaBra Lotion Babies — 500 ml"];

  return (
    <main className="min-h-screen bg-[#fffaf1] px-6 py-10 text-[#161313] md:px-12">
      <a className="text-sm font-black uppercase tracking-[0.18em] text-[#a9141d]" href="/">Back to babra.store</a>
      <h1 className="mt-6 font-serif text-6xl">BaBra Marketplace</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
        Official BaBra marketplace modules are being prepared. Only approved BaBra product information is shown publicly.
      </p>
      <section className="mt-10 grid gap-4 md:grid-cols-4">
        {products.map((item) => (
          <article key={item} className="rounded-xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <span className="text-sm font-black text-[#a9141d]">BaBra Cosmetics</span>
            <h2 className="mt-3 font-serif text-3xl">{item}</h2>
            <p className="mt-3 text-black/60">Official price, ingredients, stock, and product details are pending approval.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
