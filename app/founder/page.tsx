import type { Metadata } from "next";
import { site } from "../commerce-data";

export const metadata: Metadata = {
  title: "Founder & CEO | BaBra Holding Ltd",
  description: "Official Founder and CEO page for BaBra Holding Ltd.",
  alternates: {
    canonical: `${site.url}/founder`
  },
  openGraph: {
    title: "Founder & CEO | BaBra Holding Ltd",
    description: "Official Founder and CEO page for BaBra Holding Ltd.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder & CEO | BaBra Holding Ltd",
    description: "Official Founder and CEO page for BaBra Holding Ltd.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">
            BaBra Holding Ltd
          </a>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Founder & CEO</p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">Official founder profile.</h1>
        </div>
      </section>
    </main>
  );
}
