export function SchoolsNav() {
  return (
    <header className="sticky top-[49px] z-40 border-b border-sky-100 bg-white/90 px-5 py-4 text-[#08243c] backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <a className="font-serif text-2xl font-bold" href="/schools">BaBra Schools Rwanda</a>
        <nav className="flex flex-wrap gap-2 text-sm font-black">
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/">Home</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools#vision">Vision</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools#education">Education</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools/masterplan#master-plan">Master Plan</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/schools#health">Health</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/forms/schools">School Forms</a>
          <a className="rounded-full border border-sky-200 bg-white px-4 py-2" href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
