import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../lib/academy/feature";

export default function AcademyHome() {
  if (!isAcademyEnabled()) notFound();
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Learn. Practice. Get Hired.</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">A secure foundation for learning and recruitment.</h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-300">The Academy is being released in controlled phases. Secure accounts and role-based workspaces are now ready.</p>
      <div className="mt-10 flex gap-4">
        <Link href={"/academy/register" as Route} className="rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950">Create account</Link>
        <Link href={"/academy/login" as Route} className="rounded-full border border-slate-500 px-6 py-3 font-semibold">Sign in</Link>
      </div>
    </main>
  );
}
