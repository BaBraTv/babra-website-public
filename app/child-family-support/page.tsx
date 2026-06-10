const supportServices = [
  ["School support", "School fees, uniforms, books, school materials, and practical learning support for vulnerable children."],
  ["Nutrition and basic needs", "Community-based support for food, hygiene, and essential needs when families are facing serious hardship."],
  ["Family strengthening", "Support that helps families stay together safely through guidance, reintegration planning, and community follow-up."],
  ["Mentorship and talent", "Mentorship, life skills, confidence building, talent development, and positive role-model support."],
  ["Inclusive support", "Support for vulnerable children, including children with disabilities, with dignity and practical access needs in mind."],
  ["Partner collaboration", "Work with local authorities, child protection partners, schools, and community leaders for accountable support."],
];

const searchIntentTerms = [
  ["Kimisagara orphanage", "Many people still use this old search phrase when looking for help for vulnerable children in the Kimisagara area."],
  ["BaBra Kimisagara child support", "BaBra directs this need toward family-based care, school support, nutrition, mentorship, and community reintegration."],
  ["Vulnerable children support Rwanda", "The program focuses on protecting children while strengthening families and working with local child-protection partners."],
];

const wordingRules = [
  ["Use", "family-based care"],
  ["Use", "child protection"],
  ["Use", "vulnerable children support"],
  ["Use", "family reintegration"],
  ["Use", "community-based care"],
];

export const metadata = {
  title: "BaBra Child & Family Support | Kimisagara Vulnerable Children Support",
  description:
    "People searching for Kimisagara orphanage can find BaBra Child & Family Support, a Rwanda-aligned family-based care program for education, nutrition, mentorship, vulnerable children support, and family reintegration.",
  keywords: [
    "Kimisagara orphanage",
    "Kimisagara vulnerable children support",
    "BaBra Child & Family Support",
    "family-based care Rwanda",
    "child protection Rwanda",
    "vulnerable children support Rwanda",
    "family reintegration Rwanda"
  ]
};

export default function ChildFamilySupportPage() {
  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra.com</a>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">BaBra Foundation</p>
              <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-none md:text-8xl">BaBra Child & Family Support.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
                BaBra Group is committed to supporting vulnerable children through family-based care, education support, nutrition, school materials, mentorship, and community reintegration. Our mission is not to separate children from families, but to strengthen families so every child can grow in love, protection, dignity, and opportunity.
              </p>
            </div>
            <div className="rounded-lg border border-[#d6ad57]/25 bg-[#fffaf1] p-7 text-[#18110c] shadow-2xl shadow-black/35">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a9141d]">Compliance note</p>
              <h2 className="mt-3 font-serif text-4xl leading-none">Family-based care first.</h2>
              <p className="mt-5 leading-8 text-black/64">
                All BaBra child-support activities will follow Rwanda's child protection laws, NCDA guidance, and family-based care principles. Public communication focuses on family strengthening, reintegration, dignity, protection, and community-based care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#a9141d]">Key services</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-none md:text-7xl">Practical support that strengthens families.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {supportServices.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-black/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120b09] px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Kimisagara search support</p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl leading-none md:text-7xl">If you searched for Kimisagara orphanage, BaBra can guide you to family-based support.</h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/64">
            Some people still search online using the old phrase Kimisagara orphanage when they are looking for help for vulnerable children. BaBra uses that search intent to connect people with a Rwanda-aligned child and family support approach: education support, nutrition, mentorship, family strengthening, reintegration, and collaboration with local child-protection partners.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {searchIntentTerms.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-white/64">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">Public wording standard</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Language must strengthen children and families.</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              BaBra public communication should use child protection and community-based care language. This keeps the project aligned with Rwanda's family-based care direction, child protection principles, and community-based support.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {wordingRules.map(([status, text]) => (
              <div key={text} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#f1d58b]">{status}</span>
                <p className="mt-2 font-bold leading-7 text-white/78">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
