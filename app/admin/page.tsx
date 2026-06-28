import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Admin Dashboard | babra.store",
  description: "BaBra Store admin dashboard for orders, payments, delivery, rewards, products, and customer intelligence."
};

export default function AdminPage() {
  return <PlatformClient mode="admin" />;
}
