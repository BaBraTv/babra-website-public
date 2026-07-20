import { requireAcademyUser } from "../../../lib/academy/auth";

export const dynamic = "force-dynamic";

export default async function CandidateHome() {
  const user = await requireAcademyUser();
  return <main className="mx-auto max-w-6xl px-6 py-16"><p className="text-amber-300">Candidate workspace</p><h1 className="mt-3 text-4xl font-bold">Welcome, {user.fullName}</h1><p className="mt-4 text-slate-300">Your secure Academy account is ready. Recruitment, learning and exams arrive in later phases.</p><form action="/api/academy/v1/auth/logout" method="post" className="mt-8"><button className="rounded-lg border border-slate-600 px-5 py-2">Sign out</button></form></main>;
}
