import { requireAcademyPermission } from "../../../lib/academy/auth";
import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAcademyEnabled()) notFound();
  await requireAcademyPermission("academy:admin");
  return <>{children}</>;
}
