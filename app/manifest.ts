import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaBra Store",
    short_name: "BaBra",
    description: "Official BaBra Store for premium Rwanda skincare, delivery, wholesale, and WhatsApp ordering.",
    start_url: "/store",
    scope: "/",
    display: "standalone",
    background_color: "#090706",
    theme_color: "#090706",
    orientation: "portrait",
    categories: ["shopping", "business", "lifestyle"],
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
        type: "image/jpeg"
      }
    ]
  };
}
