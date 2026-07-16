import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "BaBra Foundation | Community Impact & Family Support Rwanda",
  description: "Official BaBra Foundation page for mission, education, health, community, gallery, and donation access.",
  alternates: {
    canonical: "https://www.babra.store/foundation"
  },
  openGraph: {
    title: "BaBra Foundation | Official Division",
    description: "Official BaBra Foundation page. Program details and media are pending official approval.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Foundation | Official Division",
    description: "Official BaBra Foundation page.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function FoundationPage() {
  return <DivisionPage division="foundation" />;
}
