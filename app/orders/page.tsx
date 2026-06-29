import { PlatformClient } from "../PlatformClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export const metadata = {
  title: "Order Tracking | babra.store",
  description: "Track BaBra Store order status from order received to payment, packing, and delivery."
};

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <PlatformClient mode="orders" />;
}
