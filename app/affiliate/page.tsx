import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session";
import { AffiliatePortal } from "./AffiliatePortal";

export const metadata = { title: "Affiliate Account | BaBra", description: "Secure BaBra affiliate application, earnings, referrals, and withdrawal workspace." };

export default async function AffiliatePage() {
  if (!(await getCurrentUser())) redirect("/login");
  return <AffiliatePortal />;
}
