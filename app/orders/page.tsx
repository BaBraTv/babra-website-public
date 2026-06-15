import { StoreClient } from "../store/StoreClient";

export const metadata = {
  title: "Order Tracking | babra.store",
  description: "Track BaBra Store order status from order received to payment, packing, and delivery."
};

export default function OrdersPage() {
  return <StoreClient />;
}
