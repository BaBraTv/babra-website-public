import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "BaBra Schools Forms | Students, Teachers, Scholarships & Digital School",
  description: "BaBra Schools forms for student applications, teacher applications, scholarship requests, and digital school registration."
};

export default function SchoolsFormsPage() {
  return <DivisionFormsPage division="schools" />;
}
