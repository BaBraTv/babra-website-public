import { StoreClient } from "../store/StoreClient";

export const metadata = {
  title: "Checkout | babra.store",
  description: "BaBra Store Rwanda-first checkout with province, district, sector, cell, village, phone, landmark, and delivery notes."
};

export default function CheckoutPage() {
  return <StoreClient />;
}
