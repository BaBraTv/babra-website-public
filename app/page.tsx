import type { Metadata } from "next";
import LuxuryHomepage from "./LuxuryHomepage";

export const metadata: Metadata = {
  title: "EI BaBra Holding Ltd | One Vision. A Lasting Legacy.",
  description:
    "Discover EI BaBra Holding Ltd and the original BaBra Lotion collection for Women, Men and Kids. Rwanda-led enterprise, innovation and impact.",
  alternates: { canonical: "https://www.babra.store/" },
  openGraph: {
    title: "EI BaBra Holding Ltd | Luxury in Every Touch",
    description: "One vision. A lasting legacy. Discover BaBra Cosmetics and the wider BaBra group.",
    url: "https://www.babra.store/",
    images: [
      {
        url: "/media/logos/babra-logo.jpeg",
        alt: "Official BaBra logo"
      }
    ]
  }
};

export default function HomePage() {
  return <LuxuryHomepage />;
}
