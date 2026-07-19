const footerGroups = [
  {
    title: "Company",
    links: [
      ["Holding", "/holding"],
      ["Founder", "/founder"],
      ["Careers", "/job-application"],
      ["Contact", "/contact"]
    ]
  },
  {
    title: "Products",
    links: [
      ["Products", "/products"],
      ["Store", "/store"],
      ["Samples", "/sample-request"],
      ["Cosmetics", "/cosmetics"]
    ]
  },
  {
    title: "Support",
    links: [
      ["Support", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Delivery", "/delivery"]
    ]
  }
];

export function OfficialFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070504] px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_1.9fr]">
        <div>
          <p className="font-serif text-3xl">BaBra Holding Ltd</p>
          <p className="mt-4 max-w-md leading-7 text-white/58">
            Official BaBra public platform. Only approved media and official-safe information are published.
          </p>
        </div>
        <nav className="grid gap-6 sm:grid-cols-3" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#d6ad57]">{group.title}</h2>
              <div className="mt-4 grid gap-3">
                {group.links.map(([label, href]) => (
                  <a key={label} className="text-sm font-bold text-white/62 transition hover:text-[#f1d58b]" href={href}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
