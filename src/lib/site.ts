const defaultSiteUrl = "https://dutchgoose.nl";
const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).trim();
const normalizedSiteUrl = rawSiteUrl.endsWith("/")
  ? rawSiteUrl.slice(0, -1)
  : rawSiteUrl;

export const siteConfig = {
  name: "Dutch Goose",
  url: normalizedSiteUrl,
  utmSource: normalizedSiteUrl
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0],
  description:
    "Dutch Goose is jouw portal na maagverkleining met deals, tools, tests, kennisbank en community.",
  defaultCouponCode: "DUTCHGOOSE",
  socials: {
    tiktok: "https://www.tiktok.com/@davidgansnl",
    instagram: "https://www.instagram.com/davidgansnl"
  }
};

export const disclosureLine =
  "Via Dutch Goose pak je korting als er een code of actie is.";
