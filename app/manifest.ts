import type { MetadataRoute } from "next";
import { site } from "./commerce-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaBra — EI BaBra Holding",
    short_name: "BaBra",
    description:
      "Official BaBra Store for BaBra Cosmetics, BaBra Lotion, samples, wholesale, LifeTalk TV, BaBra Farm, BaBra Schools, and BaBra Group services.",
    id: "/",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    background_color: "#090706",
    theme_color: "#090706",
    orientation: "any",
    categories: ["business", "shopping", "beauty"],
    lang: "en-RW",
    dir: "ltr",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Shop BaBra",
        short_name: "Shop",
        description: "Open BaBra Store products.",
        url: `${site.url}/store`,
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Request Samples",
        short_name: "Samples",
        description: "Open BaBra Cosmetics sample and wholesale forms.",
        url: `${site.url}/forms/cosmetics`,
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Contact BaBra",
        short_name: "Contact",
        description: "Contact BaBra support.",
        url: `${site.url}/contact`,
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
