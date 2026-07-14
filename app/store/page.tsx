import type { Metadata } from "next";
import { StoreClient } from "./StoreClient";

export const metadata: Metadata = {
  title: "BaBra Cosmetics Store | Editable Enterprise Catalog",
  description:
    "Professional ecommerce experience for BaBra Lotion Women 500ml, Men 500ml, and Babies 500ml with wishlist, compare, cart, checkout, and WhatsApp inquiry flows.",
  openGraph: {
    title: "BaBra Cosmetics Store",
    description: "Editable enterprise cosmetics store for official BaBra 500ml lotion products.",
    images: [{ url: "/brand/official-babra-bottle.png", width: 1200, height: 630, alt: "BaBra Lotion official product" }]
  }
};

export default function StorePage() {
  return <StoreClient />;
}