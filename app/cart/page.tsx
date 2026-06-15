import { StoreClient } from "../store/StoreClient";

export const metadata = {
  title: "Cart | babra.store",
  description: "Review BaBra Store products, pricing tiers, and WhatsApp order fallback."
};

export default function CartPage() {
  return <StoreClient />;
}
