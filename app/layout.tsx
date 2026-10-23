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
    default: "BaBra | Luxury in Every Touch | Rwanda",
    template: `%s | ${site.domain}`
  },
  description:
    "Official home of BaBra Cosmetics and the BaBra ecosystem in Rwanda. Explore BaBra Lotion Signature for Her, Signature for Him and Soft Care for Kids, all 500 mL.",
  keywords: [
    "BaBra Lotion",
    "BaBra Lotion Rwanda",
    "BaBra Lotion Signature for Her 500 mL",
    "BaBra Lotion Signature for Him 500 mL",
    "BaBra Lotion Soft Care for Kids 500 mL",
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
    title: "BaBra | Luxury in Every Touch",
    description:
      "Official BaBra Cosmetics product information and the wider BaBra ecosystem, rooted in Rwanda.",
    url: site.url,
    siteName: site.domain,
    images: [{ url: "/media/products/babra-lotion-women-500ml.png", alt: "BaBra Lotion Signature for Her 500 mL bottle" }],
    locale: "en_RW",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BaBra | Luxury in Every Touch",
    description: "Official BaBra Cosmetics product information and the wider BaBra ecosystem, rooted in Rwanda.",
    images: ["/media/products/babra-lotion-women-500ml.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: "EI BaBra Holding Ltd",
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/media/logos/babra-logo.jpeg` },
        address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
        sameAs: ["https://www.youtube.com/@babratv"]
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#babra-cosmetics`,
        name: "BaBra Cosmetics Ltd",
        url: `${site.url}/cosmetics`,
        parentOrganization: { "@id": `${site.url}/#organization` },
        taxID: "149358983",
        email: "babracosmeticsltd@gmail.com",
        telephone: "+250788351482",
        address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
        brand: { "@id": `${site.url}/#babra-cosmetics-brand` }
      },
      {
        "@type": "Brand",
        "@id": `${site.url}/#babra-cosmetics-brand`,
        name: "BaBra Cosmetics",
        slogan: "Luxury in Every Touch",
        url: `${site.url}/cosmetics`,
        logo: `${site.url}/media/logos/babra-logo.jpeg`
      }
    ]
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
        <a href="#main-content" className="sr-only z-[100] rounded bg-white px-4 py-3 font-bold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
        <ServiceWorkerRegistration />
        <LanguageBar />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <OfficialFooter />
        <GoogleAnalytics />
        <VisitorAnalytics enabled={process.env.ANALYTICS_ENABLED === "true" && (process.env.ANALYTICS_HASH_SECRET?.length ?? 0) >= 32} googleAnalyticsEnabled campaigns={(process.env.ANALYTICS_CAMPAIGNS || "").split(",").filter(Boolean)} />
      </body>
    </html>
  );
}
