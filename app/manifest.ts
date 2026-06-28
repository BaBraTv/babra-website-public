import type { MetadataRoute } from "next";
import { site } from "./commerce-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaBra Store",
    short_name: "BaBra",
    description:
      "Official BaBra Store for BaBra Cosmetics, BaBra Lotion, samples, wholesale, LifeTalk TV, BaBra Farm, BaBra Schools, and BaBra Group services.",
    id: site.url,
    start_url: `${site.url}/store?source=pwa`,
    scope: `${site.url}/`,
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    background_color: "#090706",
    theme_color: "#090706",
    orientation: "portrait-primary",
    categories: ["business", "shopping", "beauty"],
    lang: "en-RW",
    dir: "ltr",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      },
      {
        src: "/brand/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any"
      }
    ],
    shortcuts: [
      {
        name: "Shop BaBra",
        short_name: "Shop",
        description: "Open BaBra Store products.",
        url: `${site.url}/store`,
        icons: [{ src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "Request Samples",
        short_name: "Samples",
        description: "Open BaBra Cosmetics sample and wholesale forms.",
        url: `${site.url}/forms/cosmetics`,
        icons: [{ src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "Contact BaBra",
        short_name: "Contact",
        description: "Contact BaBra support.",
        url: `${site.url}/contact`,
        icons: [{ src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }]
      }
    ]
  };
}
