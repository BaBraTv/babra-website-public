import type { Metadata } from "next";
import { OfficialMedia } from "../components/OfficialMedia";
import { officialMediaById } from "../data/official-media";
import { cosmetics, products, whatsappOrderUrl } from "../commerce-data";
import styles from "./cosmetics.module.css";

const description = "BaBra Cosmetics — Luxury in Every Touch. Explore BaBra Lotion Women, Men and Kids, meet our manufacturing and development partners, and order directly by phone or WhatsApp.";
export const metadata: Metadata = {
  title: "BaBra Cosmetics | Luxury in Every Touch",
  description,
  alternates: { canonical: "https://www.babra.store/cosmetics" },
  openGraph: { title: "BaBra Cosmetics | Luxury in Every Touch", description, url: "https://www.babra.store/cosmetics", images: [{ url: "/media/logos/babra-logo.jpeg", alt: "Official BaBra logo" }] },
  twitter: { card: "summary_large_image", title: "BaBra Cosmetics | Luxury in Every Touch", description, images: ["/media/logos/babra-logo.jpeg"] }
};
const enquiry = whatsappOrderUrl("Hello BaBra Cosmetics, I would like to order BaBra Lotion. Please help me choose Women, Men or Kids and confirm the price, stock and delivery options.");

export default function CosmeticsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <nav className={styles.nav} aria-label="Cosmetics navigation">
          <a href="/" aria-label="BaBra Holding home"><OfficialMedia media={officialMediaById["babra-logo-primary"]} className={styles.logo} sizes="100px" /></a>
          <div className={styles.navLinks}><a href="/">BaBra Holding</a><a href="#collection">The collection</a><a href="#order">Contact & order</a></div>
        </nav>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>EI BaBra Holding Ltd · Cosmetics</p>
            <h1>BaBra<br />Cosmetics.</h1>
            <p className={styles.slogan}>Luxury in Every Touch.</p>
            <p className={styles.intro}>Discover the BaBra Lotion collection for Women, Men and Kids. A personal touch, from choosing your lotion to arranging your order with our team.</p>
            <div className={styles.actions}><a href="#collection" className={styles.primary}>Explore the collection <span aria-hidden="true">&nbsp;↗</span></a><a href={enquiry} className={styles.secondary} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a></div>
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
          <p className={styles.sectionIntro}>Three lotion editions, each presented in its original BaBra packaging. Contact our team for current prices, availability and delivery before confirming your order.</p>
          <div className={styles.grid}>
            {products.map((product) => (
              <article key={product.slug} className={styles.card}>
                <a href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><figure className={styles.productPhoto}><OfficialMedia className={styles.productImage} media={officialMediaById[product.mediaId]} sizes="(min-width: 768px) 30vw, 92vw" /></figure></a>
                <div className={styles.productMeta}><span>{product.category}</span><span>{product.size}</span></div>
                <h3>BaBra Lotion {product.category}</h3>
                <p>{product.slug === "babies" ? "Soft Care for Kids, as shown on the BaBra packaging. Check the label and ask our team about age suitability before use." : `Explore the ${product.category.toLowerCase()} edition. See the product label for directions and contact our team for help choosing your lotion.`}</p>
                <a className={styles.primary} href={whatsappOrderUrl(`Hello BaBra Cosmetics, I would like to order ${product.name}. Quantity: __. Delivery location: __. Please confirm price, stock, delivery fee and payment instructions.`)} target="_blank" rel="noopener noreferrer">Order {product.category} on WhatsApp</a>
                <a className={styles.detail} href={`/products/${product.slug}`}>View product details <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>
      </div>
      <section id="partnerships" className={`${styles.partnerships} ${styles.section}`}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Our partnerships</p>
          <h2 className={styles.heading}>A shared commitment to the next chapter.</h2>
          <div className={styles.partnerGrid}>
            <article className={styles.partner}><span className={styles.status}>Lotion manufacturing · China</span><h3>Guangzhou Pallas<br />Cosmetics Co., Ltd.</h3><p>Our manufacturing partner in China for BaBra Lotion Women, Men and Kids.</p><p>For international partnerships and manufacturing enquiries, speak directly with BaBra Cosmetics.</p></article>
            <article className={styles.partner}><span className={styles.status}>In development · India</span><h3>Harish Ram /<br />HCP Wellness</h3><p>We are collaborating on new product development and samples, including soaps, skincare and oral care.</p><p className={styles.development}>These projects are in development. They are not confirmed launches and are not offered for sale.</p></article>
          </div>
        </div>
      </section>
      <section id="order" className={styles.section}>
        <div className={`${styles.wrap} ${styles.orderGrid}`}>
          <div><p className={styles.eyebrow}>Let’s make it personal</p><h2 className={styles.heading}>Your next order.<br />One conversation away.</h2><ol className={styles.steps}><li>Choose Women, Men or Kids and open the product’s WhatsApp order link.</li><li>Tell us your quantity and delivery location. Our team confirms price, stock, delivery fees and payment instructions.</li><li>Review the details and confirm your order with the team. Opening WhatsApp does not place or pay for an order.</li></ol><p className={`${styles.sectionIntro} mt-6`}>Prefer to call? Reach us on the same official number for product guidance, orders and international partnerships.</p></div>
          <aside className={styles.contact}><p className={styles.eyebrow}>Official contact</p><h3>BaBra Cosmetics Ltd</h3><p>TIN {cosmetics.tin}</p><p>Call / WhatsApp & international partnerships</p><a className={styles.contactLink} href={`tel:${cosmetics.phone}`}>{cosmetics.phone}</a><a className={styles.contactLink} href={`mailto:${cosmetics.email}`}>{cosmetics.email}</a><div className={styles.actions}><a href={enquiry} className={styles.primary} target="_blank" rel="noopener noreferrer">Start a WhatsApp order</a><a href={`tel:${cosmetics.phone}`} className={styles.secondary}>Call BaBra</a></div><div className={styles.business}><p>Wholesale, distributor or international enquiry?</p><a href="/wholesale-distributor">Request a wholesale quote <span aria-hidden="true">&nbsp;↗</span></a></div></aside>
        </div>
      </section>
      <div className={styles.mobileBar} aria-label="Quick ordering"><a className={styles.secondary} href={`tel:${cosmetics.phone}`}>Call BaBra</a><a className={styles.primary} href={enquiry} target="_blank" rel="noopener noreferrer">WhatsApp order</a></div>
    </main>
  );
}
