import type { Metadata } from "next";
import "./globals.css";
import { site } from "./commerce-data";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BaBra Group | Cosmetics, LifeTalk TV, Showroom & Holding Vision",
    template: `%s | ${site.domain}`
  },
  description:
    "BaBra Group brings together BaBra Cosmetics, BaBra Lotion, BaBra Pocket Fresh, BaBra Pads, BaBra Soap, BaBra Showroom, LifeTalk TV, and future holding company systems.",
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
    title: "BaBra Group | Cosmetics, LifeTalk TV, Showroom & Holding Vision",
    description:
      "BaBra Group ecosystem for premium cosmetics, showroom retail, media, LifeTalk TV, and future African business growth.",
    url: site.url,
    siteName: site.domain,
    images: [{ url: "/brand/logo.jpeg", width: 1200, height: 630, alt: "BaBra Cosmetics Ltd" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Group | Cosmetics, LifeTalk TV, Showroom & Holding Vision",
    description: "BaBra Group ecosystem: cosmetics, showroom, LifeTalk TV, and Luxury In Every Touch.",
    images: ["/brand/logo.jpeg"]
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
