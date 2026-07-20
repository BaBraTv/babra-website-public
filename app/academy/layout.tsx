import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

export const metadata: Metadata = { title: "BaBra AI Academy", robots: { index: false, follow: false } };

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-amber-200/20 bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={"/academy" as Route} className="font-semibold tracking-wide text-amber-200">BaBra AI Academy</Link>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Phase 1 Foundation</span>
        </div>
      </header>
      {children}
    </div>
  );
}
