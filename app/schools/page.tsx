import type { Metadata } from "next";
import { SchoolsRwandaExperience } from "./SchoolsRwandaExperience";

const title = "BaBra Schools Rwanda | Education, Innovation and Community Health";
const description =
  "Discover the long-term vision for BaBra Schools Rwanda—an integrated campus planned to connect education, innovation, student development, community health and sustainable growth.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["BaBra Schools Rwanda", "education Rwanda", "innovation campus Rwanda", "community health Rwanda", "East Africa education"],
  alternates: { canonical: "https://www.babra.store/schools" },
  openGraph: {
    title,
    description,
    url: "https://www.babra.store/schools",
    siteName: "BaBra",
    locale: "en_RW",
    type: "website",
    images: [
      {
        url: "/media/schools/concepts/babra-schools-rwanda-multipurpose-hall-concept.webp",
        width: 2185,
        height: 1569,
        alt: "Concept architectural reference for the proposed BaBra Schools Rwanda multi-purpose and cultural hall"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/schools/concepts/babra-schools-rwanda-multipurpose-hall-concept.webp"]
  }
};

export default function SchoolsPage() {
  return <SchoolsRwandaExperience />;
}
