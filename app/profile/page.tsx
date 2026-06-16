import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Customer Profile | babra.store",
  description: "BaBra Store customer profile for language preference, phone, email, and delivery details."
};

export default function ProfilePage() {
  return <PlatformClient mode="account" />;
}
