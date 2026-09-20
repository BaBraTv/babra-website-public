import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import { AffiliateAdmin } from "./AffiliateAdmin";

export const metadata = { title: "Affiliate Administration | BaBra" };
export default async function AffiliateAdminPage() { const user = await getCurrentUser(); if (!user) redirect("/login"); if (user.role !== "ADMIN" && user.role !== "STAFF") redirect("/account"); return <AffiliateAdmin/>; }
