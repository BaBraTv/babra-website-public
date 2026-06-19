import type { Metadata } from "next";
import { ContentStudioClient } from "./ContentStudioClient";

export const metadata: Metadata = {
  title: "BaBra Content Studio | Stories That Build Trust",
  description:
    "BaBra Content Studio creates powerful stories, videos, campaigns, and digital experiences that build trust, strengthen brands, and drive growth."
};

export default function ContentStudioPage() {
  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <section className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(241,213,139,0.22),transparent_28rem),radial-gradient(circle_at_82%_18%,rgba(78,190,255,0.16),transparent_26rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <a className="rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/70 hover:text-white" href="/">
            Back to BaBra
          </a>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">BaBra Content Studio</p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">
                Stories That Build Trust. Content That Builds Brands.
              </h1>
            </div>
            <p className="max-w-3xl text-lg font-semibold leading-8 text-white/62">
              From premium skincare to business innovation, BaBra Content Studio creates powerful stories, videos,
              campaigns, and digital experiences that inspire people, build confidence, and drive growth.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08] shadow-xl shadow-[#f1d58b]/10" href="/lifetalk-tv">
              Watch Our Story
            </a>
            <a className="rounded-full border border-[#4ebeff]/45 px-6 py-3 font-black text-[#9be2ff] hover:bg-[#4ebeff]/10" href="#content-form">
              Start Your Project
            </a>
          </div>
          <p className="mt-7 max-w-4xl rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 text-base font-semibold leading-8 text-white/68 shadow-2xl shadow-black/20 md:text-lg">
            At BaBra Content Studio, we transform ideas into compelling content. From product launches and brand
            storytelling to educational media and community impact campaigns, every piece of content is designed to
            create trust, influence decisions, and strengthen brands.
          </p>
        </div>
      </section>

      <section id="content-form" className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <ContentStudioClient />
        </div>
      </section>
    </main>
  );
}
