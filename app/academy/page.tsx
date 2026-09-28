import Link from "next/link";
import type { Metadata, Route } from "next";
import { academyCurriculumStats, academyYears } from "../../lib/academy/curriculum";

export const metadata: Metadata = {
  title: "Learn AI — 10-Year Self-Paced Curriculum",
  description: "Explore BaBra AI Academy's public 10-year roadmap: 40 modules and 240 lessons. Registration is required for full lessons.",
  alternates: { canonical: "/academy" }
};

export default function AcademyHome() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#55e6d0]/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-[#55e6d0]/35 bg-[#55e6d0]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">Imyaka 10+ · Self-paced</span>
          <p className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-[#f1d58b]">Preparing Africa&apos;s Next AI Generation.</p>
          <h1 className="mt-4 max-w-6xl font-serif text-6xl leading-[0.9] md:text-8xl">Iga AI mu rugendo rw&apos;imyaka 10.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">Tangira ku bumenyi bwa digital na AI, ukomeze kuri coding, data, machine learning, generative AI, deployment na research. “Umwaka” ni urwego rw&apos;amasomo; buri wese yiga ku muvuduko we.</p>
          <p className="mt-3 max-w-3xl leading-7 text-white/50">Start with digital and AI literacy, then advance through coding, data, machine learning, generative AI, deployment and research. Each “Year” is a self-paced stage.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={"/academy/register" as Route} className="rounded-full bg-[#f1d58b] px-7 py-3.5 font-black text-[#130d08]">Iyandikishe utangire</Link>
            <Link href={"/academy/login" as Route} className="rounded-full border border-white/20 px-7 py-3.5 font-black">Injira</Link>
            <a href="#roadmap" className="rounded-full border border-white/10 px-7 py-3.5 font-black text-white/70">Reba gahunda yose</a>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[[academyCurriculumStats.years,"Imyaka / Years"],[academyCurriculumStats.modules,"Modules"],[academyCurriculumStats.lessons,"Amasomo / Lessons"]].map(([value,label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6"><strong className="font-serif text-5xl text-[#f1d58b]">{value}</strong><span className="mt-2 block text-sm font-bold text-white/55">{label}</span></div>)}
          </div>
        </div>
      </section>

      <section id="roadmap" className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Public curriculum roadmap</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Reba inzira yose mbere yo kwiyandikisha.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">Titles, levels, outcomes, study time and resources are public. Full explanations, examples, activities, quizzes, answers and projects open only after secure registration and sign-in.</p>
          <div className="mt-12 grid gap-5">
            {academyYears.map(({ year, modules }) => (
              <details key={year} open={year === 1} className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span><small className="font-black uppercase tracking-[0.18em] text-[#a9141d]">Stage {year} of 10</small><strong className="mt-2 block font-serif text-4xl">Umwaka {year} · Year {year}</strong></span>
                  <span className="rounded-full bg-[#18110c] px-4 py-2 text-sm font-black text-[#f1d58b]">4 modules</span>
                </summary>
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {modules.map((module) => (
                    <article key={module.id} className="rounded-2xl border border-black/10 bg-[#fffaf1] p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-black uppercase tracking-[0.16em] text-[#a9141d]">Term {module.term}</span><span className="text-sm font-bold text-black/45">{module.estimatedHours} hours · {module.lessons.length} lessons</span></div>
                      <h3 className="mt-4 font-serif text-3xl">{module.title.rw}</h3>
                      <p className="mt-1 font-bold text-black/45">{module.title.en}</p>
                      <p className="mt-4 leading-7 text-black/62">{module.description.rw}</p>
                      <ul className="mt-5 grid gap-2 text-sm text-black/65">{module.outcomes.rw.map((outcome) => <li key={outcome}>✓ {outcome}</li>)}</ul>
                      <div className="mt-5 rounded-xl border border-black/10 bg-white p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-black/40">Sample preview</p><p className="mt-2 font-bold">Isomo 1: {module.lessons[0].title.rw}</p><p className="mt-2 text-sm leading-6 text-black/55">{module.lessons[0].explanation.rw.split(". ")[0]}.</p></div>
                      <div className="mt-5 flex items-center justify-between gap-4"><span className="text-xs font-bold text-black/45">{module.review === "annual" ? "Review yearly: changing technology" : "Stable foundation"}</span><Link href={"/academy/register" as Route} className="rounded-full bg-[#18110c] px-4 py-2 text-sm font-black text-[#f1d58b]">Iyandikishe 🔒</Link></div>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-[#a9141d]/20 bg-[#a9141d]/5 p-5 text-sm leading-6 text-black/65">BaBra AI Academy ni gahunda yo kwigira ku muvuduko wawe. Ntabwo ivuga ko yemewe nk&apos;ishuri ritanga impamyabumenyi ya Leta, kandi ntabwo isezeranya akazi. Learners and parents should review fast-changing materials marked for annual review.</p>
        </div>
      </section>
    </main>
  );
}
