import type { Metadata } from "next";
import { DivisionPage } from "../DivisionPage";

export const metadata: Metadata = {
  title: "Rwanda Mobile Hub | Mobile Technology & Digital Trade",
  description: "Rwanda Mobile Hub division for mobile technology, devices, repair, digital trade, and youth technology opportunity."
};

export default function RwandaMobileHubPage() {
  return <DivisionPage division="rwanda-mobile-hub" />;
}
