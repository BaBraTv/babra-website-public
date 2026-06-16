export function SchoolsNav() {
  return (
    <header className="sticky top-[49px] z-40 border-b border-sky-100 bg-white/90 px-5 py-4 text-[#08243c] backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <a className="font-serif text-2xl font-bold" href="/schools">BaBra Schools</a>
        <nav className="flex flex-wrap gap-2 text-sm font-black">
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/">Home</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools#vision">Admissions</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/forms/schools">Teachers</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools/masterplan">Masterplan</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools/masterplan#digital-learning">Digital School</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/forms/schools">School Forms</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
