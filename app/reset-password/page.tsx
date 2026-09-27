import { PasswordForm } from "../components/PasswordForm";
export const dynamic = "force-dynamic";
export const metadata = { title: "Reset Password | BaBra", robots: { index: false, follow: false }, referrer: "no-referrer" as const };
export default function Page() { return <PasswordForm mode="reset" />; }
