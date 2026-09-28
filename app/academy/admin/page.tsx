import { academyCurriculum, academyCurriculumStats } from "../../../lib/academy/curriculum";
import { requireAcademyPermission } from "../../../lib/academy/auth";

export const dynamic = "force-dynamic";

export default async function AcademyAdminPage() {
  const user = await requireAcademyPermission("academy:admin");
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]">Academy administration</p>
      <h1 className="mt-3 font-serif text-5xl md:text-7xl">Learning operations.</h1>
      <p className="mt-4 text-white/60">Signed in as {user.fullName}. Access is enforced by Academy role permissions and recorded through the audit system.</p>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[["Years", academyCurriculumStats.years], ["Modules", academyCurriculumStats.modules], ["Lessons", academyCurriculumStats.lessons], ["Languages", 2]].map(([label, value]) => <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">{label}</p><strong className="mt-3 block font-serif text-5xl text-[#f1d58b]">{value}</strong></article>)}
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-2">{academyCurriculum.map((module) => <article key={module.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Year {module.year} · Term {module.term}</p><h2 className="mt-3 font-serif text-3xl">{module.title.rw}</h2><p className="mt-2 text-sm text-white/45">{module.title.en}</p><p className="mt-5 text-sm text-white/65">6 lessons · quiz and project configured · {module.review === "annual" ? "annual content review" : "stable foundation"}</p></article>)}</section>
      <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-7"><h2 className="font-serif text-3xl">Translation registry</h2><div className="mt-5 flex flex-wrap gap-3"><span className="rounded-full border border-[#55e6d0]/25 px-4 py-2 text-sm font-bold text-[#55e6d0]">Kinyarwanda · default</span><span className="rounded-full border border-[#55e6d0]/25 px-4 py-2 text-sm font-bold text-[#55e6d0]">English</span></div></section>
    </main>
  );
}
