import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { Badge, ButtonLink, LightCard, LuxuryCard, Section, TextInput } from "./components/ui";
import { companyCards, featuredProducts, whyChooseBaBra } from "./data/homepage";

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-[#080606] text-white">
      <SiteNav />

      <section className="relative isolate overflow-hidden px-5 py-20 md:px-8 lg:min-h-[calc(100vh-80px)] lg:py-24">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-38"
          src="/videos/skin-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/brand/homepage-video-poster.webp"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,6,6,0.98),rgba(8,6,6,0.84),rgba(10,31,68,0.66)),radial-gradient(circle_at_74%_30%,rgba(241,213,139,0.22),transparent_28rem)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <Badge>Official BaBra Platform</Badge>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.88] tracking-normal md:text-8xl">
              Luxury in Every Touch
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              BaBra Holding Ltd brings products, services, media, technology, education planning, foundation work, forms, and customer access into one premium ecosystem.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#companies">Explore Companies</ButtonLink>
              <ButtonLink href="/store" tone="dark">Visit Store</ButtonLink>
              <ButtonLink href="/contact" tone="blue">Contact BaBra</ButtonLink>
            </div>
          </div>

          <LuxuryCard className="relative overflow-hidden p-4 md:p-6">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f1d58b] to-transparent" />
            <div className="grid gap-4 sm:grid-cols-3">
              {featuredProducts.map((product) => (
                <figure key={product.name} className="rounded-lg border border-white/10 bg-[#fffaf1] p-4 text-[#080606]">
                  <div className="grid aspect-[3/4] place-items-center rounded-md bg-white">
                    <img className="max-h-72 w-full object-contain" src={product.image} alt={`${product.name} placeholder`} loading="eager" />
                  </div>
                  <figcaption className="mt-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b2a5b]">{product.status}</p>
                    <h2 className="mt-2 font-serif text-2xl leading-tight">{product.name}</h2>
                  </figcaption>
                </figure>
              ))}
            </div>
          </LuxuryCard>
        </div>
      </section>

      <Section id="about" eyebrow="About BaBra" title="A premium enterprise platform for the BaBra ecosystem.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <p className="text-xl leading-9 text-white/68">
            This website is the official digital home for BaBra Holding Ltd. It is designed to organize public information, product discovery, service access, forms, ordering workflows, and future enterprise operations without publishing unapproved private details.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Official branding", "Public-safe product structure", "Enterprise-ready routes", "Accessible customer access"].map((item) => (
              <LuxuryCard key={item} className="min-h-28">
                <h2 className="font-serif text-3xl">{item}</h2>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </Section>

      <Section id="companies" eyebrow="Our Companies" title="The BaBra ecosystem is built as connected divisions." dark={false}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {companyCards.map((company) => (
            <a key={company.title} href={company.href} className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.1)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(10,31,68,0.18)]">
              <figure className="relative h-52 overflow-hidden bg-[#080606]">
                <img className="h-full w-full object-cover opacity-82 transition duration-500 group-hover:scale-105" src={company.image} alt={company.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#f1d58b] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#080606]">{company.label}</span>
              </figure>
              <div className="p-5">
                <h3 className="font-serif text-3xl leading-tight">{company.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/62">{company.text}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section id="products" eyebrow="Featured Products" title="Official product placeholders for BaBra Cosmetics.">
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <LuxuryCard key={product.name} className="overflow-hidden p-0">
              <figure className="bg-[#fffaf1] p-5">
                <div className="grid aspect-square place-items-center rounded-lg bg-white">
                  <img className="max-h-80 w-full object-contain" src={product.image} alt={product.name} loading="lazy" />
                </div>
              </figure>
              <div className="p-6">
                <Badge tone="blue">Placeholder</Badge>
                <h3 className="mt-4 font-serif text-4xl leading-none">{product.name}</h3>
                <p className="mt-4 leading-7 text-white/62">{product.note}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/products" tone="dark">View Products</ButtonLink>
                  <ButtonLink href="/store" tone="gold">Order Path</ButtonLink>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </Section>

      <Section id="why-babra" eyebrow="Why Choose BaBra" title="Clear structure, premium presentation, and protected official information." dark={false}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyChooseBaBra.map((item, index) => (
            <LightCard key={item}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#102461] text-sm font-black text-white">{index + 1}</span>
              <p className="mt-5 text-lg font-bold leading-7 text-black/72">{item}</p>
            </LightCard>
          ))}
        </div>
      </Section>

      <section className="bg-[#0b1f44] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-[#f1d58b]/25 bg-[#080606]/54 p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] md:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <Badge>Call To Action</Badge>
            <h2 className="mt-5 font-serif text-5xl leading-none md:text-7xl">Connect with the official BaBra platform.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">Use the official routes for products, forms, partnerships, customer support, and division access.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/forms">Open Forms</ButtonLink>
            <ButtonLink href="/contact" tone="dark">Contact</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#080606] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-white/10 bg-white/[0.045] p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge tone="blue">Newsletter</Badge>
            <h2 className="mt-5 font-serif text-5xl leading-none">BaBra updates, only when official.</h2>
            <p className="mt-5 leading-7 text-white/62">Newsletter delivery is prepared for future configuration. No fake confirmations are sent until email is fully configured.</p>
          </div>
          <form className="grid gap-4 sm:grid-cols-[1fr_auto]" action="/contact">
            <TextInput label="Email address" name="email" type="email" placeholder="you@example.com" />
            <button className="min-h-12 self-end rounded-full bg-[#f1d58b] px-6 font-black text-[#080606] transition hover:bg-white" type="submit">
              Join List
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}