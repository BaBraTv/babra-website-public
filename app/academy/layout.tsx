import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

export const metadata: Metadata = {
  title: { default: "BaBra AI Academy for Kids", template: "%s | BaBra AI Academy" },
  description: "Preparing Africa's Next AI Generation with safe, practical AI learning for ages 10–17.",
  alternates: { canonical: "/academy" },
  openGraph: { title: "BaBra AI Academy for Kids", description: "Preparing Africa's Next AI Generation.", url: "/academy", type: "website" },
  twitter: { card: "summary_large_image", title: "BaBra AI Academy for Kids", description: "Preparing Africa's Next AI Generation." }
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <header className="sticky top-11 z-40 border-b border-white/10 bg-[#060b14]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href={"/academy" as Route} className="font-serif text-xl tracking-wide text-[#f1d58b]">BaBra AI Academy</Link>
          <nav className="flex items-center gap-2 text-sm font-bold">
            <Link href={"/academy" as Route} className="rounded-full border border-white/10 px-4 py-2 text-white/70">Academy</Link>
            <Link href={"/academy/login" as Route} className="hidden rounded-full border border-white/15 px-4 py-2 text-white/80 sm:inline-flex">Injira</Link>
            <Link href={"/academy/register" as Route} className="rounded-full bg-[#f1d58b] px-4 py-2 text-[#130d08]">Iyandikishe</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
