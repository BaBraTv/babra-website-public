import { redirect } from "next/navigation";
import { getCurrentUser, isAdminRole } from "../../../lib/session";
import { TestimonialAdmin } from "./TestimonialAdmin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Testimonial Review | BaBra Admin", robots: { index: false, follow: false } };

export default async function TestimonialAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminRole(user.role) || user.status !== "ACTIVE") redirect("/account");
  return <TestimonialAdmin />;
}
