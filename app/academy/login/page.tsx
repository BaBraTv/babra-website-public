import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";

export default function AcademyLoginPage() {
  if (!isAcademyEnabled()) notFound();
  return <main className="mx-auto max-w-md px-6 py-16"><h1 className="text-3xl font-bold">Academy sign in</h1><form action="/api/academy/v1/auth/login" method="post" className="mt-8 space-y-5"><label className="block">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label><label className="block">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3" /></label><button className="w-full rounded-lg bg-amber-300 px-4 py-3 font-semibold text-slate-950">Sign in</button></form></main>;
}
