import { PlatformClient } from "../PlatformClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export const metadata = {
  title: "Customer Profile | babra.store",
  description: "BaBra Store customer profile for language preference, phone, email, and delivery details."
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <PlatformClient mode="profile" />;
}
