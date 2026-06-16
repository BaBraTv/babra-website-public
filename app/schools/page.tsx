import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "BaBra Schools | Rwanda Education Project & Digital Learning",
  description: "BaBra Schools future education division for nursery, primary, secondary, university, digital learning, teachers, scholarships, and school systems."
};

export default function SchoolsPage() {
  return <DivisionPage division="schools" />;
}
