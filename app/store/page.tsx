import type { Metadata } from "next";
import { StoreClient } from "./StoreClient";

export const metadata: Metadata = {
  title: "Shop BaBra Store | Rwanda Skincare Delivery",
  description:
    "Shop BaBra Lotion for women, men, kids, and serum with cart, checkout, customer profile, order tracking, Rwanda delivery, and WhatsApp ordering.",
  openGraph: {
    title: "Shop BaBra Store",
    description: "Commerce-ready BaBra Store for Rwanda-first skincare ordering.",
    images: [{ url: "/brand/logo.jpeg", width: 1200, height: 630, alt: "BaBra Store cosmetics shopping" }]
  }
};

export default function StorePage() {
  return <StoreClient />;
}
