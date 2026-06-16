import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Sign Up | BaBra Account",
  description: "Create a BaBra account with Rwanda address details for orders, applications, payments, and Lost & Found reports."
};

export default function SignUpPage() {
  return <PlatformClient mode="signup" />;
}
