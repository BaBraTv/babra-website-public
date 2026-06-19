import type { Metadata } from "next";
import { ContentStudioClient } from "./ContentStudioClient";

export const metadata: Metadata = {
  title: "BaBra Content Studio | Post Images, Videos & Text",
  description:
    "BaBra Content Studio lets approved contributors prepare image, video, testimonial, announcement, and text posts for website and social media review."
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
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d58b]">BaBra Publishing Hub</p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none md:text-7xl">
                Post videos, images, and text for BaBra.
              </h1>
            </div>
            <p className="max-w-3xl text-lg font-semibold leading-8 text-white/62">
              Prepare content for BaBra Cosmetics, LifeTalk TV, NZABIGERAHO, Foundation updates, customer testimonials,
              and announcements. Every post should pass review before going public.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <ContentStudioClient />
        </div>
      </section>
    </main>
  );
}
