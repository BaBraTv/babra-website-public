import { PlatformClient } from "../PlatformClient";

export const metadata = {
  title: "Forgot Password | BaBra Account",
  description: "Request BaBra account password reset support in manual verification mode."
};

export default function ForgotPasswordPage() {
  return <PlatformClient mode="forgot" />;
}
