const dashboardCards = [
  ["Shopping Wallet", "RWF 0", "For product purchases and marketplace spending"],
  ["Referral Wallet", "RWF 0", "Direct and matrix commissions from verified transactions"],
  ["Earnings Wallet", "RWF 0", "Vendor sales, farm sales, teaching, and services"],
  ["Rank Progress", "Standard", "Next target: Silver"]
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#080606] px-6 py-8 text-white md:px-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">User dashboard</p>
          <h1 className="mt-2 font-serif text-5xl">Welcome to BaBra.com</h1>
        </div>
        <button className="rounded-full bg-[#c79a3d] px-5 py-3 font-black text-black">AI Assistant</button>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map(([label, value, helper]) => (
          <article key={label} className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
            <p className="text-sm text-white/55">{label}</p>
            <strong className="mt-2 block text-3xl">{value}</strong>
            <span className="mt-3 block text-sm text-white/50">{helper}</span>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <article className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="font-serif text-3xl">Referral Matrix</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Team A", "Team B", "Team C"].map((team) => (
              <div key={team} className="rounded-xl border border-[#c79a3d]/30 bg-black/30 p-5">
                <strong>{team}</strong>
                <p className="mt-2 text-sm text-white/55">Active users, sales volume, rank progress</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="font-serif text-3xl">Notifications</h2>
          <ul className="mt-5 space-y-3 text-white/65">
            <li>Payment verification pending</li>
            <li>No rewards are released before real transaction confirmation</li>
            <li>Fraud checks protect the ecosystem</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

