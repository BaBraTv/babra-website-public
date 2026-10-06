import Link from "next/link";
import Image from "next/image";
import { OfficialMedia } from "./components/OfficialMedia";
import { officialMediaById } from "./data/official-media";
import styles from "./luxury-home.module.css";

const collection = [
  {
    title: "For Her",
    sub: "Signature Women",
    slug: "women",
    mediaId: "babra-lotion-women-500ml",
    description: "A refined daily body-care ritual. Explore the original BaBra Lotion Women, 500 ml."
  },
  {
    title: "For Him",
    sub: "Signature Men",
    slug: "men",
    mediaId: "babra-lotion-men-500ml",
    description: "An assured approach to everyday care. Discover BaBra Lotion Men, 500 ml."
  },
  {
    title: "For Kids",
    sub: "Soft Care",
    slug: "babies",
    mediaId: "babra-lotion-babies-500ml",
    description: "Thoughtful everyday body care for families. Explore BaBra Lotion Kids, 500 ml."
  }
] as const;

const primaryVentures = [
  {
    number: "01",
    heading: "Cosmetics",
    status: "Our signature collection",
    text: "A Rwanda-led beauty business with original BaBra Lotion products and direct customer care.",
    href: "/cosmetics",
    linkText: "Discover BaBra Cosmetics"
  },
  {
    number: "02",
    heading: "Rwanda Mobile Hub",
    status: "Technology & service",
    text: "A dedicated destination for devices, repairs, mobile technology, and practical expertise.",
    href: "/rwanda-mobile-hub",
    linkText: "Explore Mobile Hub"
  },
  {
    number: "03",
    heading: "Foundation",
    status: "Community & responsibility",
    text: "Our commitment to dignity, care, and meaningful opportunities for children and families.",
    href: "/foundation",
    linkText: "Meet BaBra Foundation"
  }
] as const;

const moreDestinations = [
  { label: "AI Academy", href: "/academy", status: "Digital learning" },
  { label: "BaBra Schools", href: "/schools", status: "Long-term vision" },
  { label: "BaBra Farm", href: "/farm", status: "Agriculture vision" },
  { label: "BaBra Hospital", href: "/hospital", status: "Healthcare vision" },
  { label: "LifeTalk TV", href: "/lifetalk-tv", status: "Media" },
  { label: "BaBra TV", href: "/babra-tv", status: "Media" },
  { label: "Dental Experts Clinic", href: "/dental-experts-clinic", status: "Healthcare partner" },
  { label: "Lost & Found Rwanda", href: "/lost-and-found", status: "Public service" }
] as const;

export default function LuxuryHomepage() {
  return (
    <main className={styles.page} id="top">
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main BaBra navigation">
          <Link href="/" className={styles.identity} aria-label="EI BaBra Holding Ltd home">
            <Image
              src="/media/logos/babra-logo.jpeg"
              alt="BaBra official logo"
              width={60}
              height={60}
              priority
              className={styles.logo}
            />
            <span className={styles.identityText}>
              <span className={styles.identityName}>EI BaBra Holding Ltd</span>
              <span className={styles.identityTag}>One vision. Lasting impact.</span>
            </span>
          </Link>
          <div className={styles.navigationLinks}>
            <Link href="/holding">Our story</Link>
            <Link href="#collection">Cosmetics</Link>
            <Link href="#ventures">Our companies</Link>
            <Link href="/testimonials">Real stories</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.headerActions}>
            <Link className={styles.accountLink} href="/login">My account</Link>
            <Link className={styles.headerShop} href="/store">Explore collection <span aria-hidden="true">↗</span></Link>
            <details className={styles.mobileMenu}>
              <summary aria-label="Open navigation">Menu <span aria-hidden="true">☰</span></summary>
              <div className={styles.mobileMenuPanel}>
                <Link href="/holding">Our story</Link>
                <Link href="/cosmetics">Cosmetics</Link>
                <Link href="/store">Store</Link>
                <Link href="#ventures">Our companies</Link>
                <Link href="/academy">AI Academy</Link>
                <Link href="/testimonials">Real stories</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/login">My account</Link>
              </div>
            </details>
          </div>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.rule} /> Rwanda-led. Globally minded.</p>
            <h1 id="hero-title">One vision.<span>A lasting legacy.</span></h1>
            <p className={styles.heroLead}>
              Beauty, enterprise, innovation and care—brought together by a purpose-driven Rwandan group.
            </p>
            <p className={styles.heroSecondary}>
              Discover the people, products and ideas shaping the BaBra story.
            </p>
            <div className={styles.heroButtons}>
              <Link href="#collection" className={styles.goldButton}>Discover BaBra Lotion <span aria-hidden="true">↗</span></Link>
              <Link href="/holding" className={styles.outlineButton}>The BaBra story</Link>
            </div>
            <div className={styles.heroSignature}>
              <span>Luxury in Every Touch</span>
              <span className={styles.signatureLine} aria-hidden="true" />
              <span>BaBra Cosmetics</span>
            </div>
          </div>
          <div className={styles.heroArtwork} aria-label="BaBra original lotion collection">
            <div className={styles.heroHalo} aria-hidden="true" />
            <span className={styles.heroArtworkEyebrow}>The signature collection</span>
            <div className={styles.bottles}>
              <OfficialMedia media={officialMediaById["babra-lotion-men-500ml"]} className={styles.sideBottle} sizes="(min-width: 1024px) 12vw, 20vw" />
              <OfficialMedia media={officialMediaById["babra-lotion-women-500ml"]} className={styles.centerBottle} priority sizes="(min-width: 1024px) 22vw, 35vw" />
              <OfficialMedia media={officialMediaById["babra-lotion-babies-500ml"]} className={styles.sideBottle} sizes="(min-width: 1024px) 12vw, 20vw" />
            </div>
            <span className={styles.heroArtworkFoot}>WOMEN <span>—</span> MEN <span>—</span> KIDS · 500 ML</span>
          </div>
        </div>
      </section>

      <div className={styles.valueStrip} aria-label="BaBra business commitments">
        <span>Rwandan enterprise</span>
        <span className={styles.valueDivider} />
        <span>Original BaBra products</span>
        <span className={styles.valueDivider} />
        <span>Customer care</span>
        <span className={styles.valueDivider} />
        <span>Global ambition</span>
      </div>

      <section className={styles.collection} id="collection" aria-labelledby="collection-title">
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.eyebrowDark}>BaBra Cosmetics · The collection</p>
            <h2 id="collection-title" className={styles.sectionHeadingDark}>A signature for <em>every touch.</em></h2>
          </div>
          <p className={styles.sectionIntroDark}>
            Three editions. One unmistakable identity. Original BaBra Lotion bottles, presented with the simplicity a premium product deserves.
          </p>
        </div>
        <div className={styles.productGrid}>
          {collection.map((item, index) => (
            <article className={styles.productCard} key={item.slug}>
              <Link href={"/products/" + item.slug} className={styles.productImageLink} aria-label={"Explore BaBra Lotion " + item.title}>
                <span className={styles.productNumber}>0{index + 1} / 03</span>
                <OfficialMedia media={officialMediaById[item.mediaId]} className={styles.productImage} sizes="(min-width: 1100px) 28vw, (min-width: 640px) 42vw, 80vw" />
                <span className={styles.productImageLabel}>BABRA · 500 ML</span>
              </Link>
              <div className={styles.productDetails}>
                <span className={styles.productSub}>{item.sub}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={"/products/" + item.slug} className={styles.productLink}>
                  Explore this edition <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.collectionFooter}>
          <p>Full product directions and suitability information are available from the label and the BaBra team.</p>
          <Link href="/store">Visit the BaBra Store <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <p className={styles.eyebrow}>The philosophy</p>
        <h2 id="manifesto-title">Beyond a product.<br /><em>Built with purpose.</em></h2>
        <p>
          BaBra is more than a collection of companies. It is an evolving vision that
          brings commercial ambition together with responsibility, education and opportunity.
        </p>
        <Link href="/founder">Explore the founder&apos;s story <span aria-hidden="true">↗</span></Link>
      </section>

      <section className={styles.ventures} id="ventures" aria-labelledby="ventures-title">
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.eyebrowDark}>EI BaBra Holding Ltd</p>
            <h2 className={styles.sectionHeadingDark} id="ventures-title">One group. <em>Many possibilities.</em></h2>
          </div>
          <p className={styles.sectionIntroDark}>
            Explore the work under way today and the longer-term ventures shaping the BaBra vision. Future projects are identified as plans, not operating facilities.
          </p>
        </div>
        <div className={styles.ventureGrid}>
          {primaryVentures.map((venture) => (
            <Link className={styles.ventureCard} href={venture.href} key={venture.heading}>
              <div className={styles.ventureCardTop}>
                <span>{venture.number}</span><span aria-hidden="true">↗</span>
              </div>
              <div>
                <p className={styles.ventureStatus}>{venture.status}</p>
                <h3>{venture.heading}</h3>
                <p className={styles.ventureCopy}>{venture.text}</p>
                <span className={styles.ventureMore}>{venture.linkText} <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.moreVentures}>
          <p className={styles.moreVenturesLabel}>Explore the wider BaBra ecosystem</p>
          <div className={styles.moreVenturesGrid}>
            {moreDestinations.map((item) => (
              <Link href={item.href} key={item.label}>
                <span>{item.label}<small>{item.status}</small></span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-title">
        <div className={styles.trustInner}>
          <div className={styles.trustCopy}>
            <p className={styles.eyebrow}>Real BaBra Stories</p>
            <h2 id="trust-title">Real voices.<br /><em>Earned trust.</em></h2>
            <p>Read experiences submitted by customers and reviewed before publication. Stories appear only with the contributor&apos;s permission.</p>
            <Link href="/testimonials" className={styles.goldButton}>Discover customer stories <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.trustPanel}>
            <p>What matters to us</p>
            <blockquote>Authenticity is part of luxury.</blockquote>
            <span>Real products. Real experiences. No invented testimonials.</span>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <span className={styles.closingEyebrow}>EI BaBra Holding Ltd · Kigali, Rwanda</span>
        <h2 id="closing-title">The next chapter<br /><em>starts here.</em></h2>
        <p>From our signature lotion to new business partnerships, BaBra is building for the future.</p>
        <div className={styles.closingActions}>
          <Link className={styles.goldButton} href="/contact">Contact BaBra <span aria-hidden="true">↗</span></Link>
          <Link className={styles.outlineButton} href="/investor-sponsor-access">Partnership enquiries</Link>
          <Link className={styles.outlineButton} href="/wholesale-distributor">Wholesale & distribution</Link>
        </div>
      </section>
    </main>
  );
}
