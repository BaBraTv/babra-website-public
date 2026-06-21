import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import { LanguageBar } from "./LanguageBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.babra.store"),
  title: {
    default: "EI BaBra Holding Ltd | Global Beauty, Media, Agriculture & Innovation",
    template: "%s | babra.store"
  },
  description:
    "EI BaBra Holding Ltd is a global business ecosystem for BaBra Cosmetics, BaBra Lotion, BaBra Farm, BaBra Schools, LifeTalk TV, BaBra Foundation, digital media, agriculture, education, and innovation.",
  keywords: [
    "EI BaBra Holding Ltd",
    "Best body lotion",
    "skin care",
    "moisturizing lotion",
    "dry skin lotion",
    "oily skin lotion",
    "normal skin lotion",
    "shea butter lotion",
    "aloe vera lotion",
    "luxury body lotion",
    "premium skincare Rwanda",
    "premium cosmetics Rwanda",
    "global premium skincare",
    "worldwide luxury skincare",
    "international cosmetics brand",
    "BaBra Lotion Rwanda",
    "BaBra Lotion Kigali",
    "BaBra Lotion samples",
    "BaBra Lotion wholesale",
    "BaBra distributor Rwanda",
    "BaBra Lotion",
    "BaBra Cosmetics",
    "BaBra Cosmetics Ltd",
    "BaBra",
    "BaBra Group",
    "Premium Luxury in Every Touch",
    "Rwanda luxury skincare",
    "global skincare brand",
    "BaBra Store",
    "BaBra official website",
    "BaBra global skincare",
    "premium body lotion wholesale",
    "skincare wholesale Rwanda",
    "cosmetics distributor Rwanda",
    "cosmetics export brand",
    "body lotion supplier Rwanda",
    "BaBra social media",
    "BaBra WhatsApp order",
    "BaBra Pocket Fresh",
    "BaBra Pads",
    "BaBra Soap",
    "BaBra Showroom",
    "LifeTalk TV",
    "BaBra Farm",
    "BaBra Schools",
    "BaBra Foundation",
    "Rwanda skincare company",
    "Rwanda agriculture business",
    "Rwanda education project",
    "Rwanda media platform",
    "NZABIGERAHO",
    "EI BaBra Holding Ltd",
    "BaBra quality documentation",
    "GMP cosmetics manufacturing",
    "ISO 22716 cosmetics",
    "BaBra samples",
    "BaBra wholesale",
    "BaBra partnership",
    "BaBra Child & Family Support",
    "family-based care Rwanda",
    "vulnerable children support Rwanda",
    "family reintegration"
  ],
  openGraph: {
    title: "EI BaBra Holding Ltd | Global Corporate Ecosystem Portal",
    description:
      "Official babra.store gateway for BaBra Cosmetics, BaBra Farm, BaBra Schools, LifeTalk TV, BaBra Foundation, Rwanda Mobile Hub, and global community impact.",
    url: "https://www.babra.store",
    siteName: "EI BaBra Holding Ltd",
    images: [{ url: "/brand/official-babra-bottle.png", width: 1200, height: 1600, alt: "Official BaBra Lotion bottle" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "EI BaBra Holding Ltd | Global BaBra Corporate Ecosystem",
    description: "BaBra Cosmetics, Farm, Schools, LifeTalk TV, Foundation, and global business platforms.",
    images: ["/brand/official-babra-bottle.png"]
  },
  applicationName: "EI BaBra Holding",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "EI BaBra Holding",
    statusBarStyle: "black-translucent"
  },
  alternates: {
    canonical: "https://www.babra.store"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "EI BaBra Holding Ltd",
        url: "https://www.babra.store",
        logo: "https://www.babra.store/brand/logo.jpeg",
        email: "info@babra.store",
        sameAs: ["https://www.babra.store"]
      },
      {
        "@type": "WebSite",
        name: "BaBra Store",
        url: "https://www.babra.store",
        publisher: { "@type": "Organization", name: "EI BaBra Holding Ltd" },
        inLanguage: ["en", "rw", "fr", "sw"]
      },
      {
        "@type": "Brand",
        name: "BaBra Cosmetics",
        slogan: "Luxury in Every Touch",
        url: "https://www.babra.store/cosmetics",
        logo: "https://www.babra.store/brand/logo.jpeg"
      },
      {
        "@type": "LocalBusiness",
        name: "BaBra Showroom",
        url: "https://www.babra.store/showroom",
        address: "Kigali, Rwanda",
        telephone: "+250788351482",
        email: "support@babra.store"
      },
      {
        "@type": "Product",
        name: "BaBra Lotion",
        brand: { "@type": "Brand", name: "BaBra Cosmetics" },
        image: "https://www.babra.store/brand/official-babra-bottle.png",
        description: "Premium BaBra Lotion skincare product for Rwanda, Africa, and worldwide customers with protected formula details.",
        offers: { "@type": "Offer", priceCurrency: "RWF", price: 25000, availability: "https://schema.org/InStock" }
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegistration />
        <LanguageBar />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
