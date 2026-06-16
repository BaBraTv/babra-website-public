import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "BaBra Foundation Forms | Volunteers, Family Support & Donations",
  description: "BaBra Foundation forms for volunteer registration, child and family support requests, donations, and community partners."
};

export default function FoundationFormsPage() {
  return <DivisionFormsPage division="foundation" />;
}
