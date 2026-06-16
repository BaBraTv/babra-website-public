import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "BaBra Farm | Rwanda Agriculture Business & Supply Chain",
  description: "BaBra Farm division for agriculture, farmer registration, suppliers, produce marketplace, livestock, and East Africa expansion."
};

export default function FarmPage() {
  return <DivisionPage division="farm" />;
}
