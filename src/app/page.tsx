import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Impact } from "@/components/sections/Impact";
import { RoleViews } from "@/components/sections/RoleViews";
import { Pilot } from "@/components/sections/Pilot";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { features, site, structuredData } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        email: site.email,
        sameAs: [site.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: site.name,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        description: site.description,
        featureList: features.items.map((item) => item.tag),
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: structuredData.faq,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <TrustStrip />
      <Problem />
      <HowItWorks />
      <Features />
      <Impact />
      <RoleViews />
      <Pilot />
      <Faq />
      <FinalCta />
    </>
  );
}
