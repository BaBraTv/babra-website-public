import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://babra.com"),
  title: {
    default: "BaBra Lotion | Best Body Lotion for Dry, Oily & Normal Skin",
    template: "%s | BaBra.com"
  },
  description:
    "BaBra Lotion provides long-lasting hydration for dry skin, oily skin and normal skin. Enriched with Shea Butter, Coconut Oil, Aloe Vera and Botanical Extracts. Luxury In Every Touch.",
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
    "global skincare brand"
  ],
  openGraph: {
    title: "BaBra Lotion | Best Body Lotion for Dry, Oily & Normal Skin",
    description:
      "Long-lasting hydration for dry, oily and normal skin. BaBra Lotion delivers daily body care with a premium luxury fragrance experience.",
    url: "https://babra.com",
    siteName: "BaBra.com",
    images: [{ url: "/brand/logo.jpeg", width: 1200, height: 630, alt: "BaBra Cosmetics Ltd" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Lotion | Best Body Lotion for Dry, Oily & Normal Skin",
    description: "Long-lasting hydration, premium body care, and Luxury In Every Touch.",
    images: ["/brand/logo.jpeg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
