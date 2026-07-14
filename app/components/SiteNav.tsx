"use client";

import { useState } from "react";
import { ButtonLink } from "./ui";
import { homepageNav } from "../data/homepage";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/88 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8" aria-label="Primary navigation">
        <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label="BaBra homepage">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#f1d58b]/45 bg-[#f1d58b] text-base font-black text-[#080606] shadow-lg shadow-[#f1d58b]/20">EI</span>
          <span className="min-w-0">
            <strong className="block truncate font-serif text-lg leading-tight text-white md:text-xl">BaBra Holding Ltd</strong>
            <span className="block text-[0.66rem] font-black uppercase tracking-[0.18em] text-[#f1d58b]">Luxury in Every Touch</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {homepageNav.map(([label, href]) => (
            <a key={label} href={href} className="rounded-full px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/store" tone="gold" className="px-4 py-2">Store</ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/14 bg-white/[0.06] text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="grid gap-1.5" aria-hidden="true">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" className={open ? "border-t border-white/10 bg-[#050505] px-5 py-4 lg:hidden" : "hidden"}>
        <div className="mx-auto grid max-w-7xl gap-2">
          {homepageNav.map(([label, href]) => (
            <a key={label} href={href} className="rounded-lg px-4 py-3 text-base font-bold text-white/82 hover:bg-white/10" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/store" className="mt-2 rounded-lg bg-[#f1d58b] px-4 py-3 text-center font-black text-[#080606]" onClick={() => setOpen(false)}>
            Store / Products
          </a>
        </div>
      </div>
    </header>
  );
}