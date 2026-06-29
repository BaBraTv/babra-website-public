import { PlatformClient } from "../PlatformClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN" && user.role !== "STAFF") redirect("/account");
  return <PlatformClient mode="admin" />;
}
