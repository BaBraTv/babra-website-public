import Image from "next/image";
import { SchoolsNav } from "./SchoolsNav";

const conceptRoot = "/media/schools/concepts";

const educationJourney = [
  ["Nursery", "A planned early-learning environment centred on play, care, language, creativity, and a confident start."],
  ["Primary School", "A future foundation for literacy, numeracy, science, culture, wellbeing, and responsible citizenship."],
  ["Secondary School", "Planned academic pathways connecting science, technology, humanities, enterprise, sport, and creative expression."],
  ["Technical and Vocational Education", "Future practical learning designed around useful skills, enterprise, technology, and pathways into employment."],
  ["University", "A long-term higher-education phase for professional learning, research, leadership, and regional collaboration."],
  ["Innovation and Research Centre", "A future home for applied research, entrepreneurship, digital creation, and solutions shaped for Rwanda."],
  ["Teacher Development Centre", "A planned centre for continuous educator learning, classroom practice, leadership, and shared teaching resources."],
  ["Student Accommodation", "Future residential facilities intended to support safe, inclusive, and well-supervised campus life."],
  ["Sports and Creative Arts", "Planned spaces for physical development, teamwork, performance, Rwandan culture, and creative confidence."],
  ["Agriculture and Environmental Learning", "Hands-on learning planned around food systems, land care, climate awareness, and environmental responsibility."]
] as const;

const campusZones = [
  "Early Childhood Zone",
  "Primary Education Zone",
  "Secondary Education Zone",
  "University and Research Zone",
  "Technical and Innovation Zone",
  "Teaching Hospital Zone",
  "Administration Zone",
  "Library and Digital Learning Centre",
  "Science Laboratories",
  "Multi-purpose and Cultural Hall",
  "Sports Zone",
  "Student Hostels",
  "Staff Housing",
  "Dining and Kitchen Facilities",
  "Agriculture Demonstration Zone",
  "Green Spaces",
  "Security and Transport Access",
  "Water, Sanitation and Waste-management Infrastructure"
] as const;

const facilities = [
  ["Flexible learning blocks", "Proposed 4-classroom and 8-classroom blocks provide a reference for phased academic growth."],
  ["Library and digital learning", "A planned knowledge centre linking reading, research, digital access, and independent study."],
  ["Science and innovation", "Proposed laboratories and future maker spaces support practical science, technology, and experimentation."],
  ["Community gathering", "A multi-purpose and cultural hall is envisioned for learning, performance, dialogue, and community activity."],
  ["Residential support", "Future student hostels and staff residences form part of the long-term campus vision."],
  ["Campus services", "Planned administration, kitchen, dining, sanitation, access, security, utilities, and waste systems support daily life."]
] as const;

const drawings = [
  {
    title: "4-classroom block",
    sourcePage: 2,
    src: `${conceptRoot}/babra-schools-rwanda-four-classroom-concept.webp`,
    alt: "Concept architectural reference showing plans and elevations for a proposed four-classroom block"
  },
  {
    title: "8-classroom block",
    sourcePage: 3,
    src: `${conceptRoot}/babra-schools-rwanda-eight-classroom-concept.webp`,
    alt: "Concept architectural reference showing plans and elevations for a proposed eight-classroom block"
  },
  {
    title: "Administration and library block",
    sourcePage: 4,
    src: `${conceptRoot}/babra-schools-rwanda-administration-library-concept.webp`,
    alt: "Concept architectural reference showing a proposed administration and library block"
  },
  {
    title: "Laboratory block",
    sourcePage: 5,
    src: `${conceptRoot}/babra-schools-rwanda-laboratory-concept.webp`,
    alt: "Concept architectural reference showing plans and elevations for a proposed laboratory block"
  },
  {
    title: "Multi-purpose hall",
    sourcePage: 6,
    src: `${conceptRoot}/babra-schools-rwanda-multipurpose-hall-concept.webp`,
    alt: "Concept architectural reference showing plans and elevations for a proposed multi-purpose hall"
  },
  {
    title: "Student hostel",
    sourcePage: 9,
    src: `${conceptRoot}/babra-schools-rwanda-student-hostel-concept.webp`,
    alt: "Concept architectural reference showing plans and elevations for proposed student accommodation"
  }
] as const;

const phases = [
  ["01", "Rwanda-based feasibility", "Site, community, education, health, environmental, infrastructure, financial, and regulatory studies."],
  ["02", "Local design development", "Qualified Rwanda-based professionals adapt the vision to a verified site, programme, budget, and applicable requirements."],
  ["03", "Core learning campus", "Potential first-phase administration, early-years, primary, secondary, sanitation, access, and essential campus services."],
  ["04", "Specialist facilities", "Potential laboratories, technical learning, digital resources, library, sports, culture, and residential support."],
  ["05", "Higher education and health", "Long-term university, research, teacher development, and teaching hospital components, subject to separate approvals."]
] as const;

function Drawing({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={2185}
      height={1569}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="h-full w-full object-contain"
      priority={priority}
      quality={86}
    />
  );
}

export function SchoolsRwandaExperience() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "BaBra Schools Rwanda",
    url: "https://www.babra.store/schools",
    description:
      "A future integrated education, health and innovation campus designed to serve Rwanda and the wider East African region.",
    areaServed: [
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Place", name: "East Africa" }
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "EI BaBra Holding Ltd",
      url: "https://www.babra.store"
    }
  };

  return (
    <main className="min-h-screen bg-[#f6fbff] text-[#08243c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SchoolsNav />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#dff4ff,#ffffff_48%,#d7f4e5)] px-5 py-20 md:px-8 md:py-28">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-sky-700">Education · Health · Innovation · Rwanda</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] md:text-7xl">BaBra Schools Rwanda</h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-9 text-[#164f73]">
              A future integrated education, health and innovation campus designed to serve Rwanda and the wider East African region.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="rounded-full bg-sky-600 px-7 py-3.5 font-black text-white" href="#master-plan">Explore the campus vision</a>
              <a className="rounded-full border border-[#a9863a]/45 bg-white/80 px-7 py-3.5 font-black text-[#5d461c]" href="/investor-sponsor-access">Partnership access</a>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-sky-900/15">
            <div className="aspect-[1.39/1] overflow-hidden rounded-[1.4rem] bg-white">
              <Drawing src={drawings[4].src} alt={drawings[4].alt} priority />
            </div>
            <figcaption className="px-2 pb-1 pt-4 text-sm font-bold text-[#496b80]">
              Concept architectural reference · Proposed multi-purpose and cultural hall
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="vision" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Our Vision</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Learning connected to life.</h2>
          </div>
          <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-xl shadow-sky-100/70 md:p-12">
            <p className="text-xl leading-9 text-[#365d76]">
              BaBra Schools Rwanda is a long-term vision for child-centred learning, science and technology, entrepreneurship, agriculture, inclusion, community health, local employment, and Rwandan culture and values.
            </p>
            <p className="mt-5 leading-8 text-[#567489]">
              The project is in concept development. Its facilities, phases, partnerships, site adaptation, and delivery pathway remain subject to feasibility work, qualified professional design, resources, and approvals in Rwanda.
            </p>
          </div>
        </div>
      </section>

      <section id="why-rwanda" className="bg-[#082f49] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-300">Why Rwanda</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">A Rwandan platform with regional ambition.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Young people first", "The vision places learners, teachers, families, safety, inclusion, and opportunity at the centre of campus planning."],
              ["Knowledge into enterprise", "Academic, technical, digital, agricultural, and entrepreneurial learning can connect education to Rwanda's future workforce."],
              ["Community as a partner", "Health, culture, environmental care, local employment, and shared facilities can extend value beyond the classroom."]
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-7">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-8 text-white/68">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Education Journey</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">A long-term pathway from early learning to research.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#567489]">Each stage below is planned or envisioned for a future phase; none is presented as currently operational.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {educationJourney.map(([title, text], index) => (
              <article key={title} className="rounded-3xl border border-sky-100 bg-white p-6 shadow-lg shadow-sky-100/60">
                <span className="text-xs font-black tabular-nums tracking-[0.2em] text-[#a9863a]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#567489]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="master-plan" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Proposed Campus Master Plan</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">One campus. Connected zones.</h2>
              <p className="mt-6 leading-8 text-[#567489]">A preliminary development concept for coordinated learning, health, innovation, residential life, culture, sport, agriculture, and essential infrastructure.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {campusZones.map((zone) => (
                <div key={zone} className="rounded-2xl border border-sky-100 bg-[#f6fbff] px-5 py-4 font-bold text-[#234f6b]">{zone}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facilities" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Academic and Innovation Facilities</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Spaces designed around purpose.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-sky-100 bg-white p-7 shadow-lg shadow-sky-100/50">
                <div className="h-1 w-14 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" />
                <h3 className="mt-6 font-serif text-3xl">{title}</h3>
                <p className="mt-4 leading-8 text-[#567489]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="health" className="bg-[#e9f8f0] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.26em] text-emerald-700">Teaching Hospital Vision</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">BaBra Teaching and Community Hospital</h2>
            <p className="mt-6 text-lg leading-8 text-[#426b5b]">
              Envisioned as a future institution supporting community healthcare, student and staff health, nursing and medical education, maternal and child health, preventive healthcare, health research, and practical training.
            </p>
            <p className="mt-5 rounded-2xl border border-emerald-200 bg-white/75 px-5 py-4 text-sm font-bold leading-6 text-emerald-900">
              This health component is a long-term concept. It is not presented as operating, licensed, funded, or under construction.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Community healthcare", "Student and staff health", "Nursing and medical education", "Maternal and child health", "Preventive healthcare", "Health research and training"].map((item) => (
              <div key={item} className="rounded-2xl border border-white bg-white/80 p-5 font-black text-[#285b48] shadow-lg shadow-emerald-100">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="student-life" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            ["Student Life", "A future campus culture shaped by safe accommodation, sport, creative arts, clubs, wellbeing, leadership, and belonging."],
            ["Community Impact", "The vision supports shared learning, community health, local skills, employment pathways, family participation, and regional connection."],
            ["Sustainability", "Site planning will need to consider water, sanitation, waste, energy, landscape, agriculture, climate resilience, access, and responsible operations."]
          ].map(([title, text], index) => (
            <article key={title} className={`rounded-[2rem] p-8 md:p-10 ${index === 1 ? "bg-sky-600 text-white" : index === 2 ? "bg-emerald-700 text-white" : "border border-sky-100 bg-white"}`}>
              <h2 className="font-serif text-4xl">{title}</h2>
              <p className={`mt-5 text-lg leading-8 ${index === 0 ? "text-[#567489]" : "text-white/78"}`}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="phases" className="bg-[#e0f2fe] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Development Phases</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">A careful path from vision to delivery.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {phases.map(([number, title, text]) => (
              <article key={number} className="rounded-3xl border border-white bg-white/80 p-6 shadow-lg shadow-sky-200/50">
                <span className="text-sm font-black tracking-[0.2em] text-sky-600">PHASE {number}</span>
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#567489]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partnership" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#082f49] text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-[#e9ce83]">Partnership and Investment</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Build responsibly, together.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">BaBra welcomes serious conversations with education, health, research, technology, sustainability, community-development, and responsible investment partners.</p>
            <a className="mt-8 inline-flex rounded-full bg-[#e9ce83] px-7 py-3.5 font-black text-[#172434]" href="/investor-sponsor-access">Request partnership access</a>
          </div>
          <div className="grid content-center gap-3 bg-white/[0.06] p-8 md:p-12">
            {["Education and research", "Health and training", "Technology and innovation", "Campus and sustainability", "Scholarships and inclusion"].map((track) => (
              <div key={track} className="rounded-2xl border border-white/10 px-5 py-4 font-bold text-white/80">{track}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-700">Gallery</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Preliminary architectural concepts.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#567489]">Selected building drawings are shown only as architectural and planning references. They are not an approved Rwanda master plan.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {drawings.map((drawing) => (
              <figure key={drawing.src} className="overflow-hidden rounded-3xl border border-sky-100 bg-[#f8fcff] shadow-lg shadow-sky-100/50">
                <div className="aspect-[1.39/1] bg-white p-3">
                  <Drawing src={drawing.src} alt={drawing.alt} />
                </div>
                <figcaption className="border-t border-sky-100 p-5">
                  <p className="font-serif text-2xl">{drawing.title}</p>
                  <p className="mt-2 text-sm font-bold text-[#668398]">Concept architectural reference · Source PDF page {drawing.sourcePage}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-200 bg-amber-50 p-7 text-[#4d3b1e] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8a692e]">Rwanda Regulatory Disclaimer</p>
          <p className="mt-4 text-lg font-semibold leading-8">
            The BaBra Schools campus materials shown on this website represent a development vision and preliminary architectural concepts. Final designs, site adaptation, construction, education, healthcare and environmental implementation will be subject to review and approval by the relevant authorities and qualified professionals in Rwanda.
          </p>
        </div>
      </section>

      <section id="contact" className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-gradient-to-r from-sky-600 to-sky-700 p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-100">Contact CTA</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Start a thoughtful conversation.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">Contact BaBra about the Rwanda education vision, future participation, or institutional collaboration.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full bg-white px-6 py-3 font-black text-sky-800" href="/contact">Contact BaBra</a>
            <a className="rounded-full border border-white/35 px-6 py-3 font-black" href="/forms/schools">Schools forms</a>
          </div>
        </div>
      </section>
    </main>
  );
}
