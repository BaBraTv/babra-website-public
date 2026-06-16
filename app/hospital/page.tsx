import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "BaBra Hospital | Future Healthcare Systems",
  description: "BaBra Hospital future healthcare vision under EI BaBra Holding Ltd for patient trust, healthcare systems, and community health support."
};

export default function HospitalPage() {
  return <DivisionPage division="hospital" />;
}
