import { PlatformClient } from "../PlatformClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export const metadata = {
  title: "Payment Confirmation | BaBra Manual Payment",
  description: "BaBra manual payment confirmation page for Cash on Delivery, MTN MoMo, Airtel Money, and Bank Transfer."
};

export default async function PaymentConfirmationPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <PlatformClient mode="payment" />;
}
