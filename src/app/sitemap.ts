import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * XML Sitemap for InclusyQ Landing Page
 * 
 * This sitemap includes all publicly accessible marketing pages.
 * Excluded: API routes, private dashboards, authentication pages.
 * 
 * Generated for: https://inclusyq.online
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Canonical domain - ensures absolute URLs without trailing slash
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

  // Last modified dates for each page
  // Update these when making significant content changes
  const lastModified = {
    home: new Date("2026-11-16"),      // Landing page last updated
    privacy: new Date("2026-11-16"),   // Privacy policy last updated
    terms: new Date("2026-11-16"),     // Terms of service last updated
  };

  return [
    {
      url: `${baseUrl}/`,
      lastModified: lastModified.home,
      changeFrequency: "weekly",  // Marketing content updated regularly
      priority: 1.0,              // Highest priority - main landing page
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified.privacy,
      changeFrequency: "monthly", // Legal content changes infrequently
      priority: 0.3,              // Lower priority - legal page
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastModified.terms,
      changeFrequency: "monthly", // Legal content changes infrequently
      priority: 0.3,              // Lower priority - legal page
    },
  ];
}
