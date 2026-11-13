import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById } from "../data/official-media";
import { cosmetics, products, rwandaOrderUrl, rwandaOrders, site, whatsappOrderUrl } from "../commerce-data";
import styles from "./cosmetics.module.css";
import { ProductFilms } from "../components/ProductFilms";

const description = "BaBra Cosmetics — Luxury in Every Touch. Explore BaBra Lotion Signature for Her, Signature for Him and Soft Care for Kids, all 500 mL, with official ordering channels.";
export const metadata: Metadata = {
  title: "BaBra Cosmetics | Luxury in Every Touch",
  description,
  alternates: { canonical: `${site.url}/cosmetics`, languages: { "en-RW": `${site.url}/cosmetics`, "x-default": `${site.url}/cosmetics` } },
  openGraph: { title: "BaBra Cosmetics | Luxury in Every Touch", description, url: "https://www.babra.store/cosmetics", images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] },
  twitter: { card: "summary_large_image", title: "BaBra Cosmetics | Luxury in Every Touch", description, images: ["/media/logos/babra-logo.jpeg"] }
};
const internationalEnquiry = whatsappOrderUrl("Hello BaBra Cosmetics, I would like to order BaBra Lotion outside Rwanda or discuss an international partnership. Please help me choose Women, Men or Kids and confirm the available options.");
const rwandaEnquiry = rwandaOrderUrl("Hello VIDAPHARMA, I would like to order BaBra Lotion in Rwanda. Please help me choose Women, Men or Kids and confirm the current price, stock and delivery options.");

const campaigns = [
  { mediaId: "babra-lotion-women-500ml", title: "Signature for Her", slug: "women" },
  { mediaId: "babra-lotion-men-500ml", title: "Signature for Him", slug: "men" },
  { mediaId: "babra-lotion-babies-500ml", title: "Soft Care for Kids", slug: "babies" }
];

export default function CosmeticsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <nav className={styles.nav} aria-label="Cosmetics navigation">
          <a href="/" aria-label="BaBra Holding home"><OfficialMedia media={officialMediaById["babra-logo-primary"]} className={styles.logo} sizes="100px" /></a>
          <div className={styles.navLinks}><a href="/">BaBra Holding</a><a href="#collection">The collection</a><a href="/ingredients">Ingredients</a><a href="#order">Contact &amp; order</a></div>
        </nav>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>EI BaBra Holding Ltd · Cosmetics</p>
            <h1>BaBra<br />Cosmetics.</h1>
            <p className={styles.slogan}>Luxury in Every Touch.</p>
            <p className={styles.intro}>Discover Signature for Her, Signature for Him and Soft Care for Kids. Discover each edition, explore its ingredients and arrange your order with our team.</p>
            <div className={styles.actions}><a href="#collection" className={styles.primary}>Explore the collection <span aria-hidden="true">&nbsp;↗</span></a><a href={rwandaEnquiry} className={styles.secondary} target="_blank" rel="noopener noreferrer">Rwanda order · VIDAPHARMA</a><a href={internationalEnquiry} className={styles.secondary} target="_blank" rel="noopener noreferrer">International · BaBra</a></div>
          </div>
          <figure className={styles.heroVisual}>
            <OfficialMedia className={styles.heroImage} media={officialMediaById["babra-lotion-women-500ml"]} priority sizes="(min-width: 768px) 46vw, 92vw" />
            <figcaption className={styles.heroCaption}>The BaBra Lotion collection · 500 ml</figcaption>
          </figure>
        </section>
        <div className={styles.strip}><span>Women · Men · Kids</span><span>Direct ordering & personal assistance</span><span>BaBra Cosmetics Ltd · TIN {cosmetics.tin}</span></div>
        <section id="collection" className={styles.section}>
          <p className={styles.eyebrow}>The collection</p>
          <h2 className={styles.heading}>Find your BaBra.</h2>
          <p className={styles.sectionIntro}>Three 500 mL body-lotion editions, each presented in original BaBra packaging. Explore each edition's ingredients and follow the directions printed on your bottle.</p>
          <div className={styles.grid}>
            {products.map((product) => (
              <article key={product.slug} className={styles.card}>
                <a href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><figure className={styles.productPhoto}><OfficialMedia className={styles.productImage} media={officialMediaById[product.mediaId]} sizes="(min-width: 768px) 30vw, 92vw" /></figure></a>
                <div className={styles.productMeta}><span>{product.category}</span><span>{product.size}</span></div>
                <h3>BaBra Lotion {product.shortName}</h3>
                <p>{product.description} Explore ingredients and see the bottle for product-specific directions.</p>
                <a className={styles.primary} href={rwandaOrderUrl(`Hello VIDAPHARMA, I would like to order ${product.name} from BaBra. Quantity: __. Delivery location in Rwanda: __. Please confirm price, stock and delivery fee.`)} target="_blank" rel="noopener noreferrer">Rwanda order · {rwandaOrders.partner}</a>
                <a className={styles.secondary} href={whatsappOrderUrl(`Hello BaBra Cosmetics, I would like to order ${product.name} internationally. Quantity: __. Destination country/city: __. Please confirm price, stock and delivery options.`)} target="_blank" rel="noopener noreferrer">International order · BaBra</a>
                <a className={styles.detail} href={`/products/${product.slug}`}>View product details <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>
      </div>
      <section id="campaigns" className={`${styles.wrap} ${styles.section}`} aria-labelledby="campaigns-title">
        <p className={styles.eyebrow}>BaBra campaigns</p>
        <h2 id="campaigns-title" className={styles.heading}>The original BaBra collection.</h2>
        <div className={styles.campaignGrid}>
          {campaigns.map((campaign) => (
            <figure key={campaign.mediaId} className={styles.campaign}>
              <a href={`/products/${campaign.slug}`} aria-label={`Explore ${campaign.title}`}>
                <OfficialMedia media={officialMediaById[campaign.mediaId]} sizes="(min-width: 1240px) 29vw, (min-width: 768px) 43vw, 92vw" className={styles.campaignImage} />
              </a>
              <figcaption><a href={`/products/${campaign.slug}`}>{campaign.title} <span aria-hidden="true">↗</span></a></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="knowledge" className={`${styles.wrap} ${styles.section}`} aria-labelledby="knowledge-title">
        <p className={styles.eyebrow}>Product knowledge</p>
        <h2 id="knowledge-title" className={styles.heading}>Discover thoughtful care.</h2>
        <p className={styles.sectionIntro}>Explore cosmetic ingredients, their functions and the BaBra skincare experience.</p>
        <div className={styles.partnerGrid}>
          <article className={styles.card}><h3>Ingredients &amp; Science</h3><p>Discover ingredient highlights and their cosmetic functions.</p><a className={styles.detail} href="/ingredients" data-analytics-event="ingredient_science_view">Explore ingredient science <span aria-hidden="true">↗</span></a></article>
          <article className={styles.card}><h3>Questions &amp; care</h3><p>Find answers about product use, ingredients, choosing an edition and ordering.</p><a className={styles.detail} href="/faq">Read the BaBra FAQ <span aria-hidden="true">↗</span></a></article>
        </div>
      </section>
      <section id="product-care" className={`${styles.wrap} ${styles.section}`} aria-labelledby="product-care-title">
        <p className={styles.eyebrow}>Product care &amp; usage guidelines</p>
        <h2 id="product-care-title" className={styles.heading}>Preserve the original formula.</h2>
        <p className={styles.sectionIntro}>A principle worth keeping: use BaBra Lotion exactly as supplied and follow the directions on your specific bottle.</p>
        <div className={styles.partnerGrid}>
          <article className={styles.card}>
            <h3>Keep the formula original</h3>
            <p>Do not open the bottle to alter its contents, dilute the lotion, or add water, glycerin, oils, fragrances or any other substances. These changes may affect the product's stability, safety, performance and overall quality.</p>
          </article>
          <article className={styles.card}>
            <h3>Use your BaBra bottle as intended</h3>
            <p>Normal use of the pump dispenser is permitted. Apply the lotion according to the product label; for Soft Care for Kids, follow the age-specific directions on the bottle or ask the BaBra team.</p>
          </article>
        </div>
      </section>
      <section id="product-films" className={`${styles.wrap} ${styles.section}`} aria-labelledby="product-films-title">
        <p className={styles.eyebrow}>BaBra on film</p>
        <h2 id="product-films-title" className={styles.heading}>Signature for Her. A closer look.</h2>
        <p className={styles.sectionIntro}>Two short views of the original BaBra Body Lotion bottle: the front packaging and the back label. Read the physical label for complete product information.</p>
        <ProductFilms />
        <div className={styles.actions}><a className={styles.primary} href="/products/women">Explore Signature for Her <span aria-hidden="true">↗</span></a></div>
      </section>
      <section id="stories" className={`${styles.wrap} ${styles.section}`} aria-labelledby="stories-title">
        <p className={styles.eyebrow}>Real BaBra Stories</p>
        <h2 id="stories-title" className={styles.heading}>Your experience matters.</h2>
        <p className={styles.sectionIntro}>
          Share your BaBra experience. Customer stories are published only with permission and review.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href="/testimonials">Read & share Real BaBra Stories</a>
          <a
            className={styles.secondary}
            href={whatsappOrderUrl("Hello BaBra Cosmetics, I would like to share my genuine BaBra Lotion experience.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share by WhatsApp
          </a>
        </div>
      </section>
      <section id="order" className={styles.section}>
        <div className={`${styles.wrap} ${styles.orderGrid}`}>
          <div><p className={styles.eyebrow}>Let’s make it personal</p><h2 className={styles.heading}>Your next order.<br />One conversation away.</h2><ol className={styles.steps}><li>Choose Women, Men or Kids.</li><li>For Rwanda orders, contact VIDAPHARMA. For international orders or partnerships, contact BaBra directly.</li><li>Share quantity and delivery location, then review the confirmed price, stock and delivery details. Opening WhatsApp does not place or pay for an order.</li></ol><p className={`${styles.sectionIntro} mt-6`}>Rwanda orders: VIDAPHARMA — {rwandaOrders.phone}. Official BaBra Call/WhatsApp and international partnerships: {cosmetics.phone}.</p></div>
          <aside className={styles.contact}><p className={styles.eyebrow}>Official contact</p><h3>BaBra Cosmetics Ltd</h3><p>TIN {cosmetics.tin}</p><p>Rwanda orders · {rwandaOrders.partner}</p><a className={styles.contactLink} href={rwandaEnquiry} target="_blank" rel="noopener noreferrer">{rwandaOrders.phone}</a><p>BaBra Call / WhatsApp & international partnerships</p><a className={styles.contactLink} href={`tel:${cosmetics.phone}`}>{cosmetics.phone}</a><a className={styles.contactLink} href={`mailto:${cosmetics.email}`}>{cosmetics.email}</a><div className={styles.actions}><a href={rwandaEnquiry} className={styles.primary} target="_blank" rel="noopener noreferrer">Rwanda order</a><a href={internationalEnquiry} className={styles.secondary} target="_blank" rel="noopener noreferrer">International enquiry</a></div><div className={styles.business}><p>Wholesale, distributor or international enquiry?</p><a href="/wholesale-distributor">Request a wholesale quote <span aria-hidden="true">&nbsp;↗</span></a></div></aside>
        </div>
      </section>
      <div className={styles.mobileBar} aria-label="Quick ordering"><a className={styles.secondary} href={internationalEnquiry} target="_blank" rel="noopener noreferrer">International · BaBra</a><a className={styles.primary} href={rwandaEnquiry} target="_blank" rel="noopener noreferrer">Rwanda · VIDAPHARMA</a></div>
    </main>
  );
}
