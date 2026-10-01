import type { Metadata } from "next";
import "./globals.css";
import { site } from "./commerce-data";
import { OfficialFooter } from "./components/OfficialFooter";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import { LanguageBar } from "./LanguageBar";
import { VisitorAnalytics } from "./components/VisitorAnalytics";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { googleAnalyticsMeasurementId } from "../lib/google-analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EI BaBra Holding Ltd | BaBra Ecosystem Platform",
    template: `%s | ${site.domain}`
  },
  description:
    "EI BaBra Holding Ltd brings together BaBra Cosmetics, Rwanda Mobile Hub, BaBra Schools, BaBra Hospital, BaBra Farm, BaBra Foundation, LifeTalk TV, BaBra TV, Lost & Found Rwanda, commerce, and partner access.",
  keywords: [
    "BaBra Lotion",
    "BaBra Lotion Rwanda",
    "BaBra Lotion Women 500 ml",
    "BaBra Lotion Men 500 ml",
    "BaBra Lotion Babies 500 ml",
    "BaBra Cosmetics",
    "BaBra",
    "LifeTalk TV",
    "BaBra TV",
    "EI BaBra Holding Ltd",
    "Rwanda Mobile Hub",
    "BaBra Schools",
    "BaBra AI Academy",
    "Learn AI Rwanda",
    "BaBra Foundation",
    "BaBra Hospital",
    "BaBra Farm",
    "Lost & Found Rwanda",
    "BaBra Store"
  ],
  alternates: {
    canonical: site.url
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "EI BaBra Holding Ltd | Luxury. Innovation. African Excellence.",
    description:
      "Official BaBra platform using approved BaBra media only.",
    url: site.url,
    siteName: site.domain,
    images: [{ url: "/media/logos/babra-logo.jpeg", width: 1200, height: 630, alt: "Official BaBra logo" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "EI BaBra Holding Ltd | Luxury. Innovation. African Excellence.",
    description: "Official BaBra platform using approved BaBra media only.",
    images: ["/media/logos/babra-logo.jpeg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EI BaBra Holding Ltd",
    url: site.url,
    logo: `${site.url}/media/logos/babra-logo.jpeg`,
    brand: [
      { "@type": "Brand", name: "BaBra Cosmetics" },
      { "@type": "Brand", name: "Rwanda Mobile Hub" },
      { "@type": "Brand", name: "BaBra Schools" },
      { "@type": "Brand", name: "BaBra AI Academy" },
      { "@type": "Brand", name: "BaBra Foundation" },
      { "@type": "Brand", name: "LifeTalk TV" },
      { "@type": "Brand", name: "BaBra TV" }
    ],
    sameAs: []
  };

  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});gtag('js',new Date());gtag('config','${googleAnalyticsMeasurementId}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});`
          }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ServiceWorkerRegistration />
        <LanguageBar />
        {children}
        <OfficialFooter />
        <GoogleAnalytics />
        <VisitorAnalytics enabled={process.env.ANALYTICS_ENABLED === "true" && (process.env.ANALYTICS_HASH_SECRET?.length ?? 0) >= 32} googleAnalyticsEnabled campaigns={(process.env.ANALYTICS_CAMPAIGNS || "").split(",").filter(Boolean)} />
      </body>
    </html>
  );
}
