import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "Rwanda Mobile Hub | Mobile Technology & Digital Trade",
  description: "Official Rwanda Mobile Hub page for repairs, accessories, software, hardware, and training.",
  alternates: {
    canonical: "https://www.babra.store/rwanda-mobile-hub"
  },
  openGraph: {
    title: "Rwanda Mobile Hub | Official Division",
    description: "Official Rwanda Mobile Hub page with verified service workspace media.",
    images: [{ url: "/media/mobile-hub/rwanda-mobile-hub-hero.jpg", width: 1200, height: 675, alt: "Official Rwanda Mobile Hub signage and service workspace" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rwanda Mobile Hub | Official Division",
    description: "Official Rwanda Mobile Hub page.",
    images: ["/media/mobile-hub/rwanda-mobile-hub-hero.jpg"]
  }
};

export default function RwandaMobileHubPage() {
  return <DivisionPage division="rwanda-mobile-hub" />;
}
