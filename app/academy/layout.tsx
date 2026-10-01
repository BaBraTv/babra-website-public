import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../lib/academy/feature";

export const metadata: Metadata = {
  title: { default: "BaBra AI Academy for Kids", template: "%s | BaBra AI Academy" },
  description: "Preparing Africa's Next AI Generation with safe, practical AI learning for ages 10–17.",
  alternates: { canonical: "/academy" },
  openGraph: { title: "BaBra AI Academy for Kids", description: "Preparing Africa's Next AI Generation.", url: "/academy", type: "website" },
  twitter: { card: "summary_large_image", title: "BaBra AI Academy for Kids", description: "Preparing Africa's Next AI Generation." }
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  if (!isAcademyEnabled()) notFound();
  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <header className="sticky top-11 z-40 border-b border-white/10 bg-[#060b14]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 md:px-8">
          <Link href={"/academy" as Route} className="min-w-0 whitespace-nowrap font-serif text-base tracking-wide text-[#f1d58b] sm:text-xl">BaBra AI Academy</Link>
          <nav className="flex shrink-0 items-center gap-1.5 text-sm font-bold sm:gap-2">
            <Link href={"/academy" as Route} className="hidden rounded-full border border-white/10 px-4 py-2 text-white/70 md:inline-flex">Academy</Link>
            <Link href={"/academy/login" as Route} className="hidden rounded-full border border-white/15 px-4 py-2 text-white/80 sm:inline-flex">Injira</Link>
            <Link href={"/academy/register" as Route} className="rounded-full bg-[#f1d58b] px-3 py-2 text-xs text-[#130d08] sm:px-4 sm:text-sm">Iyandikishe</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
