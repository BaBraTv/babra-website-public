"use client";

import { useEffect, useState } from "react";

const languages = [
  ["RW", "Kinyarwanda"],
  ["EN", "English"],
  ["FR", "Francais"],
  ["SW", "Kiswahili"],
  ["CN", "Chinese"]
];

export function LanguageBar() {
  const [selected, setSelected] = useState("EN");

  useEffect(() => {
    const saved = window.localStorage.getItem("babra-language");
    if (saved) setSelected(saved);
  }, []);

  function chooseLanguage(code: string) {
    setSelected(code);
    window.localStorage.setItem("babra-language", code);
    document.documentElement.lang = code.toLowerCase();
  }

  return (
    <div className="sticky top-0 z-[60] border-b border-white/10 bg-[#050404]/96 px-4 py-2 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">Language</span>
        <div className="flex flex-wrap items-center gap-1 text-xs font-black">
          {languages.map(([code, label]) => (
            <button
              key={code}
              type="button"
              aria-label={`Choose ${label}`}
              aria-pressed={selected === code}
              onClick={() => chooseLanguage(code)}
              className={`rounded-full border px-3 py-1.5 transition ${
                selected === code
                  ? "border-[#4ebeff] bg-[#4ebeff] text-[#061017]"
                  : "border-white/12 bg-white/[0.04] text-white/72 hover:border-[#d6ad57]/60 hover:text-[#f1d58b]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
