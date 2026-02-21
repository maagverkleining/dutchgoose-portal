import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Deal, Merchant } from "@/types/models";

export type BuildOutgoingLinkParams = {
  merchant: Merchant;
  deal?: Deal;
  categorySlug: string;
  placement: string;
  slug: string;
};

export function buildClickRef(slug: string, placement: string, date = new Date()) {
  return `dg_${slug}_${placement}_${formatDate(date)}`;
}

export function withDefaultUtm(url: string, categorySlug: string, placement: string) {
  const target = new URL(url);
  target.searchParams.set("utm_source", "dutchgoose.nl");
  target.searchParams.set("utm_medium", "affiliate");
  target.searchParams.set("utm_campaign", categorySlug);
  target.searchParams.set("utm_content", placement);
  return target;
}

export function buildOutgoingLink({
  merchant,
  deal,
  categorySlug,
  placement,
  slug
}: BuildOutgoingLinkParams) {
  const sourceUrl = merchant.trackingNetwork === "awin" && merchant.awinTrackingUrl
    ? merchant.awinTrackingUrl
    : merchant.baseUrl;

  const link = withDefaultUtm(sourceUrl, categorySlug, placement);

  if (merchant.trackingNetwork === "awin") {
    link.searchParams.set("clickref", buildClickRef(slug, placement));
    if (merchant.awinMerchantId) {
      link.searchParams.set("awinmid", merchant.awinMerchantId);
    }
  }

  if (deal?.couponCode) {
    link.searchParams.set("utm_term", deal.couponCode);
  } else if (merchant.allowDefaultCode && siteConfig.defaultCouponCode) {
    link.searchParams.set("utm_term", siteConfig.defaultCouponCode);
  }

  return link.toString();
}
