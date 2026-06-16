import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "BaBra Farm Forms | Farmers, Suppliers & Agriculture Partnerships",
  description: "BaBra Farm forms for farmer registration, supplier registration, produce marketplace, and agriculture partnerships."
};

export default function FarmFormsPage() {
  return <DivisionFormsPage division="farm" />;
}
