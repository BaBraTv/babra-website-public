import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "BaBra Foundation | Community Impact & Family Support Rwanda",
  description: "BaBra Foundation division for volunteers, donations, community partners, child and family support, and social impact in Rwanda."
};

export default function FoundationPage() {
  return <DivisionPage division="foundation" />;
}
