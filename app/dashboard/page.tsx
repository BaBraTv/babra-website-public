import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Admin Dashboard | BaBra Team",
  description: "BaBra admin dashboard for orders, payments, customers, applications, Lost & Found reports, and status management."
};

export default function DashboardPage() {
  return <PlatformClient mode="admin" />;
}
