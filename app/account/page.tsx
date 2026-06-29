import { PlatformClient } from "../PlatformClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export const metadata = {
  title: "My Account | BaBra Dashboard",
  description: "BaBra account dashboard for orders, applications, Lost & Found reports, payment history, and profile."
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <PlatformClient mode="account" />;
}
