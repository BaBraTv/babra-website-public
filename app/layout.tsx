import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.babra.store"),
  title: {
    default: "BaBra Lotion Rwanda | Premium Skincare, Samples & Wholesale",
    template: "%s | babra.store"
  },
  description:
    "Shop BaBra Lotion Rwanda and premium BaBra skincare on babra.store. Request samples, wholesale or distributor pricing, showroom support, and Rwanda delivery by province, district, sector, cell, and village.",
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
    "premium skincare Rwanda",
    "premium cosmetics Rwanda",
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
  openGraph: {
    title: "BaBra Lotion Rwanda | Premium Skincare Store",
    description:
      "Official babra.store platform for BaBra Lotion, premium skincare, samples, wholesale, distributor requests, showroom support, and Rwanda delivery.",
    url: "https://www.babra.store",
    siteName: "babra.store",
    images: [{ url: "/brand/logo.jpeg", width: 1200, height: 630, alt: "BaBra Cosmetics Ltd" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Lotion Rwanda | Premium Skincare Store",
    description: "Shop BaBra Lotion Rwanda with samples, wholesale, showroom support, and Rwanda delivery.",
    images: ["/brand/logo.jpeg"]
  },
  applicationName: "BaBra Store",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BaBra Store",
    statusBarStyle: "black-translucent"
  },
  alternates: {
    canonical: "https://www.babra.store"
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
