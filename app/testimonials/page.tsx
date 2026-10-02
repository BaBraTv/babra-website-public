import type { Metadata } from "next";
import { TestimonialsClient } from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Real BaBra Stories | Customer Experiences",
  description: "Read moderated BaBra customer experiences and submit your genuine BaBra Lotion story for review.",
  alternates: { canonical: "https://www.babra.store/testimonials" },
  openGraph: {
    title: "Real BaBra Stories | Customer Experiences",
    description: "Moderated customer-submitted BaBra experiences. No invented testimonials.",
    url: "https://www.babra.store/testimonials",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  }
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
