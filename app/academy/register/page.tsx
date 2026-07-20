import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";

export default function AcademyRegisterPage() {
  if (!isAcademyEnabled()) notFound();
  return <main className="mx-auto max-w-md px-6 py-16"><h1 className="text-3xl font-bold">Create Academy account</h1><form action="/api/academy/v1/auth/register" method="post" className="mt-8 space-y-5"><label className="block">Full name<input name="fullName" required autoComplete="name" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label><label className="block">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label><label className="block">Password<input name="password" type="password" minLength={12} required autoComplete="new-password" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /><span className="mt-2 block text-xs text-slate-400">At least 12 characters, including uppercase, lowercase and a number.</span></label><button className="w-full rounded-lg bg-amber-300 px-4 py-3 font-semibold text-slate-950">Create account</button></form></main>;
}
