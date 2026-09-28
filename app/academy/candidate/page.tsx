import { requireAcademyUser } from "../../../lib/academy/auth";
import { getPrisma } from "../../../lib/db";
import { academyCurriculum, academyCurriculumStats } from "../../../lib/academy/curriculum";
import Link from "next/link";
import type { Route } from "next";

export const dynamic = "force-dynamic";

export default async function CandidateHome() {
  const user = await requireAcademyUser();
  const records = await getPrisma().academyLessonProgress.findMany({ where: { userId: user.id, completedAt: { not: null } }, select: { lessonId: true, score: true } });
  const completed = new Map(records.map((item) => [item.lessonId, item.score]));
  const nextLesson = academyCurriculum.flatMap((module) => module.lessons).find((lesson) => !completed.has(lesson.id));
  const progress = Math.round((completed.size / academyCurriculumStats.lessons) * 100);

  return <main className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
    <p className="text-sm font-black uppercase tracking-[0.2em] text-[#55e6d0]">Urubuga rw&apos;umunyeshuri · Learner dashboard</p>
    <div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h1 className="font-serif text-5xl md:text-7xl">Murakaza neza, {user.fullName}.</h1><p className="mt-4 max-w-2xl text-white/60">Komeza aho wari ugeze. Progress yawe ibikwa muri konti yawe, ntabwo iri muri browser gusa.</p></div><form action="/api/academy/v1/auth/logout" method="post"><button className="rounded-full border border-white/15 px-5 py-3 font-black">Sohoka</button></form></div>
    <section className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><div className="flex items-end justify-between"><span className="font-black uppercase tracking-[0.16em] text-white/45">Aho ugeze</span><strong className="font-serif text-6xl text-[#f1d58b]">{progress}%</strong></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-[#55e6d0] to-[#f1d58b]" style={{ width: `${progress}%` }} /></div><p className="mt-4 text-white/55">{completed.size} / {academyCurriculumStats.lessons} lessons completed</p></div>
      {nextLesson ? <Link href={`/academy/learn/${nextLesson.id}` as Route} className="flex flex-col justify-between rounded-[2rem] bg-[#f1d58b] p-7 text-[#130d08]"><span className="text-xs font-black uppercase tracking-[0.16em]">Isomo rikurikira</span><strong className="mt-8 font-serif text-3xl">{nextLesson.title.rw}</strong><span className="mt-4 font-black">Komeza →</span></Link> : <div className="rounded-[2rem] border border-[#55e6d0]/30 bg-[#55e6d0]/10 p-7"><strong className="font-serif text-3xl">Warangije amasomo yose.</strong></div>}
    </section>
    <section className="mt-14"><h2 className="font-serif text-4xl">Amasomo yawe</h2><div className="mt-7 grid gap-5 lg:grid-cols-2">{academyCurriculum.map((module) => { const done = module.lessons.filter((lesson) => completed.has(lesson.id)).length; return <article key={module.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between gap-3"><span className="text-xs font-black uppercase tracking-[0.16em] text-[#55e6d0]">Year {module.year} · Term {module.term}</span><span className="text-sm text-white/45">{done}/{module.lessons.length}</span></div><h3 className="mt-3 font-serif text-3xl">{module.title.rw}</h3><p className="mt-2 text-sm text-white/45">{module.title.en}</p><div className="mt-5 grid gap-2">{module.lessons.map((lesson) => <Link key={lesson.id} href={`/academy/learn/${lesson.id}` as Route} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-[#f1d58b]/40"><span>{lesson.number}. {lesson.title.rw}</span><span className={completed.has(lesson.id) ? "text-[#55e6d0]" : "text-white/35"}>{completed.has(lesson.id) ? `✓ ${completed.get(lesson.id)}%` : "Fungura"}</span></Link>)}</div></article>; })}</div></section>
    <details className="mt-14 rounded-2xl border border-rose-300/15 bg-rose-400/[0.04] p-6"><summary className="cursor-pointer font-bold text-rose-100">Delete Academy account</summary><p className="mt-4 text-sm leading-6 text-white/55">This permanently removes your Academy account, sessions and saved progress. This cannot be undone.</p><form action="/api/academy/v1/account/delete" method="post" className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row"><input name="password" type="password" required autoComplete="current-password" placeholder="Confirm password" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" /><button className="rounded-full border border-rose-300/30 px-5 py-3 font-black text-rose-100">Permanently delete</button></form></details>
  </main>;
}
