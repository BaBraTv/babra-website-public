import { requireAcademyPermission } from "../../../lib/academy/auth";
import { AcademyLogoutButton } from "../AcademyAccountControls";

export const dynamic = "force-dynamic";

export default async function ParentDashboard() {
  const user = await requireAcademyPermission("parent:read");
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#55e6d0]">Parent dashboard</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5"><h1 className="font-serif text-5xl md:text-7xl">Welcome, {user.fullName}.</h1><AcademyLogoutButton /></div>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">Support a learner with clear level guidance, responsible AI habits and progress conversations.</p>
      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[["Learning pathway", "Review the 10 self-paced stages and help the learner begin with Year 1 or the first stage that matches their prior learning."], ["Safety guidance", "Encourage learners never to share passwords, addresses or private family information with AI tools."], ["Progress conversations", "Ask learners to explain what they mastered and how they checked the accuracy of AI-supported work."]].map(([title, text]) => <article key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7"><h2 className="font-serif text-3xl">{title}</h2><p className="mt-4 leading-7 text-white/60">{text}</p></article>)}
      </section>
      <section className="mt-8 rounded-[2rem] border border-[#f1d58b]/20 bg-[#f1d58b]/[0.06] p-7"><h2 className="font-serif text-3xl">Learner connections</h2><p className="mt-3 text-white/60">Learner access is connected through Academy administration after identity and guardian consent checks.</p></section>
    </main>
  );
}
