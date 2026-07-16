import type { Metadata } from "next";
import "./globals.css";
import { site } from "./commerce-data";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EI BaBra Holding Ltd | Official BaBra Platform",
    template: `%s | ${site.domain}`
  },
  description:
    "Official BaBra platform for EI BaBra Holding Ltd, BaBra Cosmetics, Rwanda Mobile Hub, BaBra Schools, BaBra Foundation, LifeTalk TV, Store, and Contact routes.",
  keywords: [
    "BaBra Lotion",
    "BaBra Lotion Rwanda",
    "BaBra Lotion Women 500 ml",
    "BaBra Lotion Men 500 ml",
    "BaBra Lotion Babies 500 ml",
    "BaBra Cosmetics",
    "BaBra",
    "LifeTalk TV",
    "EI BaBra Holding Ltd",
    "Rwanda Mobile Hub",
    "BaBra Schools",
    "BaBra Foundation",
    "BaBra Store"
  ],
  alternates: {
    canonical: site.url
  },
  openGraph: {
    title: "EI BaBra Holding Ltd | Official BaBra Platform",
    description:
      "Official BaBra platform using approved BaBra media only.",
    url: site.url,
    siteName: site.domain,
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "EI BaBra Holding Ltd | Official BaBra Platform",
    description: "Official BaBra platform using approved BaBra media only.",
    images: ["/media/logos/babra-logo.jpeg"]
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
