import type { Metadata } from "next";
import { GalleryClient } from "./GalleryClient";
export const metadata: Metadata = {
  title: "BaBra Gallery | Ibikorwa byacu",
  description: "Amashusho n’amakuru y’ibikorwa bya BaBra, amatariki yabyo n’ibitekerezo byanyu.",
  alternates: { canonical: "https://www.babra.store/gallery" }
};
export default function GalleryPage() { return <GalleryClient />; }
