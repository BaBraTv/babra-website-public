import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "Rwanda Mobile Hub Forms | Repairs, Technicians, Suppliers & Trade-In",
  description: "Rwanda Mobile Hub forms for phone repair, laptop repair, legal unlocking, spare parts suppliers, technician applications, trade-ins, and accessories sellers."
};

export default function RwandaMobileHubFormsPage() {
  return <DivisionFormsPage division="rwanda-mobile-hub" />;
}
