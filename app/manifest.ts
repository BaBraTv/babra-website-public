import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaBra",
    short_name: "BaBra",
    description: "Beauty, services, media, farming, education and public support in one African ecosystem.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#090706",
    theme_color: "#090706",
    orientation: "portrait",
    categories: ["shopping", "business", "lifestyle", "education", "productivity"],
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
