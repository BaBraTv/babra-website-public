import { PasswordForm } from "../components/PasswordForm";
import { recoveryEmailConfigured } from "../../lib/password-email";
export const dynamic = "force-dynamic";
export const metadata = { title: "Forgot Password | BaBra", robots: { index: false, follow: false }, referrer: "no-referrer" as const };
export default function Page() { return <PasswordForm mode="forgot" emailReady={recoveryEmailConfigured()} />; }
