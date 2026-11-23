import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Atkinson_Hyperlegible, Schibsted_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { nav, site } from "@/lib/content";
import "./globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-atkinson",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "healthcare",
  keywords: [
    "hospital queue management",
    "outpatient registration",
    "patient token system",
    "OPD queue software",
    "hospital queue display",
    "patient flow",
    "InclusyQ",
  ],
  authors: [{ name: "InclusyQ", url: siteUrl }],
  creator: "InclusyQ",
  publisher: "InclusyQ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          {nav.skip}
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
