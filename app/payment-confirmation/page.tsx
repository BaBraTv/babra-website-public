import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Payment Confirmation | BaBra Manual Payment",
  description: "BaBra manual payment confirmation page for Cash on Delivery, MTN MoMo, Airtel Money, and Bank Transfer."
};

export default function PaymentConfirmationPage() {
  return <PlatformClient mode="payment" />;
}
