import { redirect } from "next/navigation";
import { getCurrentUser, isAdminRole } from "../../../lib/session";
import { GalleryAdmin } from "./GalleryAdmin";
export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery | BaBra Admin", robots: { index: false, follow: false } };
export default async function GalleryAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isAdminRole(user.role) || user.status !== "ACTIVE") redirect("/account");
  return <GalleryAdmin />;
}
