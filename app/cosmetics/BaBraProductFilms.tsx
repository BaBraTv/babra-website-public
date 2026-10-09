"use client";

import { useState } from "react";

const films = [
  {
    id: "signature",
    tab: "Signature Film",
    title: "The BaBra Signature Film",
    src: "/videos/babra-lotion-luxury-film.mp4",
    poster: "/media/videos/babra-film-poster.jpg",
    description: "A real BaBra Lotion bottle captured from both sides. Our original bottle, original label and original product footage."
  },
  {
    id: "front",
    tab: "Front Label",
    title: "The Signature For Her Bottle",
    src: "/videos/babra-lotion-front.mp4",
    poster: "/media/videos/babra-front-poster.jpg",
    description: "A close look at the official front label of the BaBra Lotion 500 ml bottle."
  },
  {
    id: "back",
    tab: "Back Label",
    title: "Behind the Bottle",
    src: "/videos/babra-lotion-back.mp4",
    poster: "/media/videos/babra-back-poster.jpg",
    description: "A real view of the back of the packaging. Always refer to the physical bottle for complete ingredient and usage details."
  }
] as const;

export function BaBraProductFilms() {
  const [selected, setSelected] = useState<(typeof films)[number]["id"]>("signature");
  const film = films.find((item) => item.id === selected) ?? films[0];

  return (
    <section id="behind-the-bottle" className="relative overflow-hidden bg-[#120b0d] px-5 py-20 text-[#f8eee0] md:py-28" aria-labelledby="bottle-film-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_35%,rgba(153,91,41,0.19),transparent_45%),radial-gradient(circle_at_14%_80%,rgba(90,16,33,0.19),transparent_52%)]" />
      <div className="relative mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
        <div className="space-y-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#dfbe82]">Original BaBra footage · Real bottle</p>
          <h2 id="bottle-film-title" className="font-serif text-5xl leading-[1.08] tracking-[-0.035em] md:text-6xl">
            Behind the <em className="font-normal text-[#dfbe82]">bottle.</em>
          </h2>
          <p className="max-w-xl text-base leading-8 text-[#f5e9d9]/70">
            Take a closer look at the original BaBra Lotion 500 ml bottle.
            Discover its design and packaging through real, unaltered product-label footage,
            presented in the signature BaBra luxury aesthetic.
          </p>
          <p className="text-sm leading-7 text-[#efdfc5]/55">
            The video shows the Women / For Her bottle. No ingredients, label claims or certification marks were digitally added.
            Always read the packaging for current product information.
          </p>
          <div className="h-px w-32 bg-[#c39c62]/65" />
          <p className="font-serif text-2xl italic text-[#dfbe82]">Luxury in Every Touch.</p>
        </div>
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[22px] border border-[#c9a36b]/35 bg-[#100a0b] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-3">
            <video
              key={film.id}
              controls
              playsInline
              preload="none"
              poster={film.poster}
              aria-label={film.title}
              className="aspect-video w-full rounded-[14px] bg-[#100a0b] object-contain"
            >
              <source src={film.src} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose the BaBra product video">
            {films.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={film.id === item.id}
                onClick={() => setSelected(item.id)}
                className={`rounded-full border px-4 py-3 text-xs font-bold tracking-[0.08em] transition ${
                  film.id === item.id
                    ? "border-[#e8c98c] bg-[#e8c98c] text-[#21150e]"
                    : "border-[#b39164]/40 text-[#e7d3b7] hover:border-[#e8c98c]"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-[#f1e5d5]/65">{film.description}</p>
        </div>
      </div>
    </section>
  );
}
