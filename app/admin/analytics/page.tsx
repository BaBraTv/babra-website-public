import { redirect } from "next/navigation";
import { getCurrentUser, isAdminRole } from "../../../lib/session";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
export const dynamic = "force-dynamic";
export const metadata = { title: "Visitor Analytics | BaBra Admin", robots: { index: false, follow: false } };
export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminRole(user.role) || user.status !== "ACTIVE") redirect("/account");
  return <AnalyticsDashboard />;
}
