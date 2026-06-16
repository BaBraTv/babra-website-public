import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "My Account | BaBra Dashboard",
  description: "BaBra account dashboard for orders, applications, Lost & Found reports, payment history, and profile."
};

export default function AccountPage() {
  return <PlatformClient mode="account" />;
}
