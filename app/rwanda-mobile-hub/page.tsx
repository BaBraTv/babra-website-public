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
    description: "Official Rwanda Mobile Hub page. Office images and detailed service information are pending approval.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rwanda Mobile Hub | Official Division",
    description: "Official Rwanda Mobile Hub page.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function RwandaMobileHubPage() {
  return <DivisionPage division="rwanda-mobile-hub" />;
}
