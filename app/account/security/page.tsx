import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import { PasswordForm } from "../../components/PasswordForm";
export const dynamic = "force-dynamic";
export const metadata = { title: "Change Password | BaBra", robots: { index: false, follow: false } };
export default async function Page() { const user = await getCurrentUser(); if (!user || user.status !== "ACTIVE") redirect("/login"); return <PasswordForm mode="change" />; }
