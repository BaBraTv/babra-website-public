import { requireAcademyPermission } from "../../../lib/academy/auth";
import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  if (!isAcademyEnabled()) notFound();
  await requireAcademyPermission("parent:read");
  return <>{children}</>;
}
