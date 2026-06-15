import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/private", "/admin", "/dashboard"]
    },
    sitemap: "https://www.babra.store/sitemap.xml"
  };
}
