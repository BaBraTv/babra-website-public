import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Login | BaBra Account",
  description: "Login to your BaBra account dashboard for orders, applications, payments, and Lost & Found reports."
};

export default function LoginPage() {
  return <PlatformClient mode="login" />;
}
