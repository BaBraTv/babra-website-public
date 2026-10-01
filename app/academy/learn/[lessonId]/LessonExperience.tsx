"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import type { AcademyLesson, AcademyModule, AcademyLanguage } from "../../../../lib/academy/curriculum";

export function LessonExperience({ module, lesson, initialScore }: { module: AcademyModule; lesson: AcademyLesson; initialScore: number | null }) {
  const [language, setLanguage] = useState<AcademyLanguage>("rw");
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(initialScore);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [tutorReply, setTutorReply] = useState("");
  const [tutorBusy, setTutorBusy] = useState(false);

  async function submitAnswer() {
    if (answer === null) return;
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/academy/v1/progress", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lessonId: lesson.id, answer }) });
    const body = await response.json().catch(() => ({}));
    if (response.ok) setScore(body.score);
    setMessage(response.ok ? (language === "rw" ? "Progress yawe yabitswe." : "Your progress was saved.") : (body.error || "Progress could not be saved."));
    setSaving(false);
  }

  async function askTutor() {
    if (question.trim().length < 3) return;
    setTutorBusy(true);
    setTutorReply("");
    const response = await fetch("/api/academy/v1/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lessonId: lesson.id, question, locale: language }) }).catch(() => null);
    const body = response ? await response.json().catch(() => ({})) : {};
    setTutorReply(response?.ok ? body.answer : (body.error || (language === "rw" ? "Umufasha ntari kuboneka ubu." : "The assistant is unavailable right now.")));
    setTutorBusy(false);
  }

  const t = <T,>(value: Record<AcademyLanguage, T>) => value[language];
  return <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
    <div className="flex flex-wrap items-center justify-between gap-4"><Link href={"/academy/candidate" as Route} className="font-black text-[#55e6d0]">← Dashboard</Link><label className="flex items-center gap-2 text-sm font-bold">Ururimi<select value={language} onChange={(event) => setLanguage(event.target.value as AcademyLanguage)} className="rounded-full border border-white/15 bg-[#0a111f] px-4 py-2"><option value="rw">Kinyarwanda</option><option value="en">English</option></select></label></div>
    <article className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 md:p-10">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{t(module.level)} · Lesson {lesson.number}</p><h1 className="mt-4 font-serif text-5xl md:text-7xl">{t(lesson.title)}</h1>
      {[[(language === "rw" ? "Ibisobanuro" : "Explanation"),t(lesson.explanation)],[(language === "rw" ? "Urugero rwakozwe" : "Worked example"),t(lesson.workedExample)],[(language === "rw" ? "Igikorwa cyawe" : "Practice activity"),t(lesson.practice)]].map(([heading,text]) => <section key={heading} className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6"><h2 className="font-serif text-3xl">{heading}</h2><p className="mt-4 text-lg leading-8 text-white/70">{text}</p></section>)}
      <section className="mt-8"><h2 className="font-serif text-4xl">{language === "rw" ? "Ikizamini kigufi" : "Knowledge check"}</h2><p className="mt-4 text-lg font-bold">{t(lesson.check.question)}</p><div className="mt-5 grid gap-3">{t(lesson.check.options).map((option,index) => <button key={option} onClick={() => { setAnswer(index); setScore(null); }} className={`rounded-2xl border p-4 text-left font-bold ${answer === index ? "border-[#f1d58b] bg-[#f1d58b]/15" : "border-white/10 bg-black/20"}`}>{String.fromCharCode(65 + index)}. {option}</button>)}</div><button disabled={answer === null || saving} onClick={submitAnswer} className="mt-5 rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08] disabled:opacity-40">{saving ? "Saving…" : language === "rw" ? "Ohereza igisubizo" : "Submit answer"}</button>{score !== null && <div role="status" className={`mt-4 rounded-xl p-4 ${score === 100 ? "bg-emerald-400/15 text-emerald-100" : "bg-rose-400/15 text-rose-100"}`}><strong>{score === 100 ? (language === "rw" ? "Ni byo!" : "Correct!") : (language === "rw" ? "Ongera ugerageze." : "Try again.")}</strong> <span>{t(lesson.check.feedback)}</span></div>}{message && <p role="status" className="mt-3 text-sm text-white/55">{message}</p>}</section>
      <section className="mt-10 rounded-2xl border border-[#55e6d0]/25 bg-[#07191c] p-6"><h2 className="font-serif text-3xl">{t(module.project.title)}</h2><p className="mt-4 leading-7 text-white/70">{t(module.project.instructions)}</p><ul className="mt-4 grid gap-2 text-sm text-white/60">{t(module.project.rubric).map((item) => <li key={item}>✓ {item}</li>)}</ul></section>
      <section className="mt-8"><h2 className="font-serif text-3xl">Resources</h2><div className="mt-3 flex flex-wrap gap-3">{module.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold">{resource.label} ↗</a>)}</div></section>
      <section className="mt-8 rounded-2xl border border-[#55e6d0]/25 bg-[#07191c] p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#55e6d0]">AI learning assistant</p><h2 className="mt-3 font-serif text-3xl">{language === "rw" ? "Baza ikibazo kuri iri somo" : "Ask about this lesson"}</h2><p className="mt-3 text-sm leading-6 text-white/55">{language === "rw" ? "Ntugashyiremo password, aderesi cyangwa andi makuru yawe bwite." : "Never share passwords, addresses or other private information."}</p><textarea value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={500} className="mt-5 min-h-28 w-full rounded-xl border border-white/10 bg-black/30 p-4" /><button disabled={tutorBusy || question.trim().length < 3} onClick={askTutor} className="mt-3 rounded-full bg-[#55e6d0] px-5 py-3 font-black text-[#06191b] disabled:opacity-40">{tutorBusy ? "Thinking…" : language === "rw" ? "Baza umufasha" : "Ask assistant"}</button>{tutorReply && <p role="status" className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 leading-7 text-white/70">{tutorReply}</p>}</section>
    </article>
  </main>;
}
