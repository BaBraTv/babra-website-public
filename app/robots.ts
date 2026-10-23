import type { MetadataRoute } from "next";
import { site } from "./commerce-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/private", "/admin", "/dashboard"]
    },
    host: site.url,
    sitemap: `${site.url}/sitemap.xml`
  };
}
