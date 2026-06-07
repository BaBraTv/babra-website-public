export default function WalletPage() {
  return (
    <main className="min-h-screen bg-[#080606] px-6 py-10 text-white md:px-12">
      <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">Back to BaBra.com</a>
      <h1 className="mt-6 font-serif text-6xl">BaBra Wallet Hub</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
        One wallet system for shopping, earnings, referrals, deposits, withdrawals, escrow, receipts, and payment notifications.
      </p>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {["Shopping Wallet", "Referral Wallet", "Earnings Wallet"].map((item) => (
          <article key={item} className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
            <h2 className="font-serif text-3xl">{item}</h2>
            <strong className="mt-5 block text-4xl">RWF 0</strong>
            <p className="mt-3 text-white/58">Live balances connect after database and payment provider integration.</p>
          </article>
        ))}
      </section>
    </main>
  );
}

