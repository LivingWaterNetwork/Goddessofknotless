import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { defaultSeo } from "@/content/seo";
import { siteUrl } from "@/content/business";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "@/styles/globals.css";

/* Self-hosted through next/font: no runtime request to Google, and
   `display: swap` with a matched fallback keeps CLS at zero.
   
   Only the weights the stylesheet actually uses are requested (400/600/700 —
   verified against globals.css). Nine faces were being shipped for four in use,
   which cost ~60KB on the critical path and pushed out LCP.
   
   Cormorant carries real italics rather than letting the browser synthesise
   them: the display quotes and the hero's third line are all italic serif. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Cambria", "Georgia", "serif"],
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeo.defaultTitle,
    template: defaultSeo.titleTemplate,
  },
  description: defaultSeo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: defaultSeo.siteName,
    locale: defaultSeo.locale,
    url: siteUrl,
    title: defaultSeo.defaultTitle,
    description: defaultSeo.defaultDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: defaultSeo.siteName }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#064E3B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar />

        <script
          type="application/ld+json"
          // Static, code-generated JSON-LD from the typed content layer.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
