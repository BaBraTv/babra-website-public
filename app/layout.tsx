import type { Metadata } from "next";
import "./globals.css";
import { site } from "./commerce-data";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EI BaBra Holding Ltd | BaBra Ecosystem Platform",
    template: `%s | ${site.domain}`
  },
  description:
    "EI BaBra Holding Ltd brings together BaBra Cosmetics, Rwanda Mobile Hub, BaBra Schools, BaBra Hospital, BaBra Farm, BaBra Foundation, LifeTalk TV, Lost & Found Rwanda, store products, forms, and partner access.",
  keywords: [
    "Best body lotion",
    "skin care",
    "moisturizing lotion",
    "dry skin lotion",
    "oily skin lotion",
    "normal skin lotion",
    "shea butter lotion",
    "aloe vera lotion",
    "luxury body lotion",
    "BaBra Lotion",
    "BaBra Lotion Rwanda",
    "BaBra Cosmetics",
    "BaBra Cosmetics Ltd",
    "BaBra",
    "BaBra Group",
    "Premium Luxury in Every Touch",
    "Rwanda luxury skincare",
    "global skincare brand",
    "BaBra Pocket Fresh",
    "BaBra Pads",
    "BaBra Soap",
    "BaBra Showroom",
    "LifeTalk TV",
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
  alternates: {
    canonical: site.url
  },
  openGraph: {
    title: "EI BaBra Holding Ltd | BaBra Ecosystem Platform",
    description:
      "The BaBra ecosystem platform for cosmetics, mobile technology, schools, healthcare, agriculture, foundation work, media, public services, commerce, and partner access.",
    url: site.url,
    siteName: site.domain,
    images: [{ url: "/brand/homepage-video-poster.webp", width: 1200, height: 630, alt: "EI BaBra Holding Ltd ecosystem" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "EI BaBra Holding Ltd | BaBra Ecosystem Platform",
    description: "BaBra ecosystem: cosmetics, mobile hub, schools, hospital, farm, foundation, LifeTalk TV, Lost & Found Rwanda, store, forms, and partner access.",
    images: ["/brand/homepage-video-poster.webp"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
