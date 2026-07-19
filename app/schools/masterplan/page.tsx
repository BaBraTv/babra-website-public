import type { Metadata } from "next";
import { SchoolsRwandaExperience } from "../SchoolsRwandaExperience";

export const metadata: Metadata = {
  title: "BaBra Schools Rwanda | Proposed Campus Master Plan",
  description:
    "Explore the preliminary Rwanda-focused campus vision for BaBra Schools, including education, innovation, student life, sustainability, and community health.",
  alternates: { canonical: "https://www.babra.store/schools/masterplan" },
  openGraph: {
    title: "BaBra Schools Rwanda | Proposed Campus Master Plan",
    description: "A preliminary development concept for an integrated education, innovation, and community-health campus in Rwanda.",
    url: "https://www.babra.store/schools/masterplan",
    locale: "en_RW",
    type: "website",
    images: ["/media/schools/concepts/babra-schools-rwanda-administration-library-concept.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra Schools Rwanda | Proposed Campus Master Plan",
    description: "A Rwanda-focused development vision with preliminary architectural concepts.",
    images: ["/media/schools/concepts/babra-schools-rwanda-administration-library-concept.webp"]
  }
};

export default function SchoolsMasterplanPage() {
  return <SchoolsRwandaExperience />;
}
