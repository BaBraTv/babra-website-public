import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "BaBra Cosmetics Forms | Wholesale, Samples, Agents & Support",
  description: "BaBra Cosmetics forms for wholesale distributor applications, sample requests, beauty agents, showroom visits, and product support."
};

export default function CosmeticsFormsPage() {
  return <DivisionFormsPage division="cosmetics" />;
}
