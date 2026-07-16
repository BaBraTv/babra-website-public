import type { Metadata } from "next";
import { StoreClient } from "./StoreClient";

export const metadata: Metadata = {
  title: "Shop BaBra Store | Official BaBra Products",
  description:
    "Shop official BaBra Lotion Women, BaBra Lotion Men, and BaBra Lotion Babies 500 ml products.",
  openGraph: {
    title: "Shop BaBra Store",
    description: "Commerce-ready BaBra Store for Rwanda-first skincare ordering.",
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }]
  }
};

export default function StorePage() {
  return <StoreClient />;
}
