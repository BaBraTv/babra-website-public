import { requireAcademyUser } from "../../../lib/academy/auth";
import { notFound } from "next/navigation";
import { isAcademyEnabled } from "../../../lib/academy/feature";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  if (!isAcademyEnabled()) notFound();
  await requireAcademyUser();
  return <>{children}</>;
}
