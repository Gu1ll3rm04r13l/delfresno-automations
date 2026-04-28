import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const sections = [
    "",
    "#servicios",
    "#proceso",
    "#stack",
    "#faq",
    "#contacto",
  ];
  return sections.map((s, i) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.7,
  }));
}
