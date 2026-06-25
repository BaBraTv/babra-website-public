import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor / Sponsor Access Request | EI BaBra Holding Ltd",
  description:
    "Request reviewed access to BaBra investor and sponsor materials including school master plan documents, construction phases, budgets, and partnership files."
};

const protectedDocuments = [
  "Master Plan PDF",
  "Detailed construction phases",
  "Detailed budgets",
  "Development timeline",
  "Partnership documents"
];

const statuses = ["Pending Review", "Approved", "Rejected"];

const projectOptions = [
  "BaBra Schools",
  "BaBra Cosmetics",
  "BaBra Farm",
  "LifeTalk TV",
  "BaBra Foundation",
  "Rwanda Mobile Hub",
  "BaBra Hospital"
];

const budgetBlocks = [
  ["Estimated Cost", "Editable in Admin Dashboard"],
  ["Funding Secured", "Editable in Admin Dashboard"],
  ["Funding Gap", "Editable in Admin Dashboard"]
];

export default function InvestorSponsorAccessPage() {
  return (
    <main className="min-h-screen bg-[#071426] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">EI BaBra Holding Ltd</a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/schools">Schools</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/schools/masterplan">Masterplan</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/contact">Contact</a>
          </nav>
        </header>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] border border-sky-300/20 bg-white/[0.06] p-6 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-300">Private access request</p>
            <h1 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Investor / Sponsor Access Request</h1>
            <p className="mt-6 leading-8 text-white/68">
              Full PDFs, construction details, budgets, timelines, and partnership files are not public. Submit a request
              for review before any protected BaBra Schools or EI BaBra Holding materials are shared.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {statuses.map((status) => (
                <div key={status} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm font-black text-white/76">
                  {status}
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[2rem] border border-white/10 bg-white p-6 text-[#071426] shadow-2xl shadow-black/25 md:p-10">
            <h2 className="font-serif text-4xl">Submit access request</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {["Full name", "Organization", "Position", "Country", "Email", "Phone"].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-black">
                  {label}
                  <input className="rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3" required />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-black md:col-span-2">
                Which project do you want to support?
                <select className="rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3">
                  {projectOptions.map((project) => <option key={project}>{project}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black md:col-span-2">
                Purpose of request
                <textarea className="min-h-32 rounded-xl border border-[#071426]/12 bg-[#f8fafc] px-4 py-3" required />
              </label>
            </div>
            <a
              className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 font-black text-white"
              href="mailto:info@babra.store?subject=Investor%20Sponsor%20Access%20Request"
            >
              Submit to BaBra email
            </a>
            <p className="mt-4 text-sm font-semibold text-[#516579]">
              Manual review mode: BaBra marks requests as Pending Review, Approved, or Rejected in the admin dashboard.
            </p>
          </form>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {protectedDocuments.map((item) => (
            <article key={item} className="rounded-2xl border border-sky-300/20 bg-white/[0.06] p-5">
              <h3 className="font-serif text-2xl">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">Protected until approved access is granted.</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-300">Budgets in RWF</p>
          <h2 className="mt-3 font-serif text-4xl leading-none md:text-6xl">Funding overview controls.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {budgetBlocks.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-black/25 p-6">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-3 text-white/62">{text}</p>
                <p className="mt-4 text-sm font-black text-sky-300">RWF primary, optional USD estimate</p>
              </article>
            ))}
          </div>
          <a className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#071426]" href="mailto:info@babra.store?subject=Sponsor%20BaBra%20Project">
            Sponsor This Project
          </a>
        </section>
      </div>
    </main>
  );
}
