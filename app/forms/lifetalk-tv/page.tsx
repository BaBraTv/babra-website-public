import type { Metadata } from "next";
import { DivisionFormsPage } from "../DivisionFormsPage";

export const metadata: Metadata = {
  title: "LifeTalk TV Forms | Presenters, Actors, Advertising & Stories",
  description: "LifeTalk TV forms for presenter applications, actor registration, advertising, story submission, and documentary requests."
};

export default function LifeTalkTvFormsPage() {
  return <DivisionFormsPage division="lifetalk-tv" />;
}
