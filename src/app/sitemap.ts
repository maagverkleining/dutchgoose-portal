import type { MetadataRoute } from "next";
import { categories, knowledgebase, merchants, starterKits } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/start",
    "/deals",
    "/tools",
    "/tools/eiwit-calculator",
    "/tools/timer-eten-drinken",
    "/tools/voorraad-teller",
    "/tools/utm-builder",
    "/tests",
    "/tests/proteine-test",
    "/starter-kits",
    "/kennisbank",
    "/community",
    "/community/baribuddies",
    "/community/plus",
    "/partners",
    "/over-david",
    "/samenwerken",
    "/contact",
    "/privacy",
    "/cookies",
    "/disclosure",
    "/voorwaarden"
  ];

  const dynamicRoutes = [
    ...categories.map((category) => `/deals/${category.slug}`),
    ...knowledgebase.map((article) => `/kennisbank/${article.slug}`),
    ...merchants.map((merchant) => `/partners/${merchant.slug}`),
    ...starterKits.map((kit) => `/starter-kits/${kit.slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-02-21")
  }));
}
