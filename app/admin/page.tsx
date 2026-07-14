import { AdminDashboardClient } from "./AdminDashboardClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";

export const metadata = {
  title: "Admin Dashboard | babra.store",
  description: "BaBra Store admin dashboard for orders, payments, delivery, rewards, products, and customer intelligence."
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN" && user.role !== "MANAGER" && user.role !== "STAFF") redirect("/account");
  return <AdminDashboardClient />;
}
