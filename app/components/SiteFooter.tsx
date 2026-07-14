const footerGroups = [
  {
    title: "Company",
    links: [["About", "#about"], ["Our Companies", "#companies"], ["Investor Access", "/investor-sponsor-access"], ["Contact", "/contact"]]
  },
  {
    title: "Products",
    links: [["Store", "/store"], ["Products", "/products"], ["Cosmetics", "/cosmetics"], ["Wholesale", "/wholesale-distributor"]]
  },
  {
    title: "Support",
    links: [["Forms", "/forms"], ["Lost & Found", "/lost-and-found"], ["Delivery", "/delivery"], ["Returns", "/returns"]]
  },
  {
    title: "Legal",
    links: [["Privacy Policy", "/privacy"], ["Terms", "/terms"]]
  }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-3" aria-label="BaBra homepage footer link">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#f1d58b] font-black text-[#080606]">EI</span>
            <span>
              <strong className="block font-serif text-2xl">BaBra Holding Ltd</strong>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#f1d58b]">Luxury in Every Touch</span>
            </span>
          </a>
          <p className="mt-6 max-w-md leading-7 text-white/62">
            Official BaBra ecosystem platform for products, services, forms, customer access, and enterprise operations.
          </p>
          <address className="mt-6 not-italic leading-7 text-white/62">
            Kigali, Rwanda<br />
            <a className="hover:text-[#f1d58b]" href="mailto:support@babra.store">support@babra.store</a><br />
            <a className="hover:text-[#f1d58b]" href="tel:+250788351482">+250 788 351 482</a>
          </address>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">{group.title}</h2>
              <ul className="mt-4 grid gap-3 text-sm text-white/66">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a className="hover:text-white" href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>(c) {new Date().getFullYear()} BaBra Holding Ltd. All rights reserved.</p>
        <div className="flex flex-wrap gap-3" aria-label="Social links placeholders">
          {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map((label) => (
            <span key={label} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em]">{label}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}