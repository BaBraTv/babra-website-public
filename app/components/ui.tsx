import type { ElementType, ReactNode } from "react";

type Tone = "gold" | "blue" | "dark" | "light";

const toneClasses: Record<Tone, string> = {
  gold: "border-[#f1d58b]/40 bg-[#f1d58b] text-[#080606] shadow-[0_18px_60px_rgba(241,213,139,0.22)] hover:bg-white",
  blue: "border-[#3d6bff]/45 bg-[#102461] text-white shadow-[0_18px_60px_rgba(16,36,97,0.28)] hover:bg-[#17337f]",
  dark: "border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]",
  light: "border-black/10 bg-white text-[#090706] hover:bg-[#fff7df]"
};

export function ButtonLink({ href, children, tone = "gold", className = "", ariaLabel }: { href: string; children: ReactNode; tone?: Tone; className?: string; ariaLabel?: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-sm font-black transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#4ebeff] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "blue" | "white" }) {
  const classes = {
    gold: "border-[#f1d58b]/35 bg-[#f1d58b]/12 text-[#f1d58b]",
    blue: "border-[#4ebeff]/35 bg-[#4ebeff]/12 text-[#9be0ff]",
    white: "border-white/20 bg-white/10 text-white"
  }[tone];

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${classes}`}>{children}</span>;
}

export function Section({ id, eyebrow, title, children, dark = true }: { id?: string; eyebrow?: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={dark ? "bg-[#080606] px-5 py-20 text-white md:px-8" : "bg-[#fffaf1] px-5 py-20 text-[#111827] md:px-8"}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {eyebrow ? <Badge tone={dark ? "gold" : "blue"}>{eyebrow}</Badge> : null}
          <h2 className="mt-5 font-serif text-4xl leading-[0.98] tracking-normal md:text-6xl">{title}</h2>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function LuxuryCard({ children, className = "", as }: { children: ReactNode; className?: string; as?: ElementType }) {
  const Component = as ?? "article";
  return <Component className={`rounded-lg border border-white/12 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] ${className}`}>{children}</Component>;
}

export function LightCard({ children, className = "", as }: { children: ReactNode; className?: string; as?: ElementType }) {
  const Component = as ?? "article";
  return <Component className={`rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] ${className}`}>{children}</Component>;
}

export function TextInput({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/78">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="min-h-12 rounded-lg border border-white/14 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/38 focus:border-[#4ebeff] focus:ring-4 focus:ring-[#4ebeff]/20"
      />
    </label>
  );
}