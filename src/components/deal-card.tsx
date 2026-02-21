"use client";

import { useState } from "react";
import { Badge } from "@/components/badge";
import { GoLink } from "@/components/go-link";
import { MerchantThumbnail } from "@/components/merchant-thumbnail";
import { disclosureLine, siteConfig } from "@/lib/site";
import { merchantMap } from "@/lib/data";
import { getCategoryIllustration } from "@/lib/illustrations";
import type { Deal } from "@/types/models";

type DealCardProps = {
  deal: Deal;
};

export function DealCard({ deal }: DealCardProps) {
  const [copied, setCopied] = useState(false);
  const merchant = merchantMap.get(deal.merchantSlug);
  const coupon =
    deal.couponCode ??
    merchant?.couponCode ??
    (merchant?.allowDefaultCode ? siteConfig.defaultCouponCode : "");
  const couponText = deal.couponText ?? merchant?.couponText;

  return (
    <article className="card flex h-full flex-col">
      <img
        src={getCategoryIllustration(deal.category)}
        alt={`Illustratie ${deal.category}`}
        className="mb-3 h-24 w-full rounded-xl border border-slate-100 object-cover"
      />
      {merchant ? (
        <div className="mb-3 flex items-center gap-2">
          <MerchantThumbnail merchant={merchant} size="sm" />
          <p className="text-sm font-semibold text-gooseNavy">{merchant.name}</p>
        </div>
      ) : null}
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge
          label={
            deal.dealType === "code"
              ? "Code"
              : deal.dealType === "sale"
                ? "Deal"
                : "Partnerlink"
          }
        />
        <Badge label="Nieuw" />
        {deal.merchantSlug === "ahead-nutrition" ? <Badge label="Uitgelicht" /> : null}
      </div>
      <h3 className="text-lg font-semibold text-gooseNavy">{deal.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{deal.note}</p>
      <p className="mt-2 text-xs text-slate-500">{disclosureLine}</p>
      {coupon ? (
        <div className="mt-3 rounded-goose bg-gooseKiwi/15 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gooseNavy">Code</p>
          <p className="font-mono text-lg font-bold text-gooseNavy">{coupon}</p>
          <p className="text-xs text-slate-600">
            {couponText ?? "Plak de code in je winkelmand bij afrekenen."}
          </p>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(coupon);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="btn-secondary mt-2 px-3 py-1.5 text-xs"
            aria-label={`Kopieer kortingscode ${coupon}`}
          >
            {copied ? "Gekopieerd" : "Kopieer code"}
          </button>
        </div>
      ) : (
        <p className="mt-3 rounded-goose bg-slate-100 p-3 text-xs text-slate-600">
          Deal loopt via partnerlink, check de shop voor acties.
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">{merchant?.name ?? "Leverancier"}</p>
        <GoLink slug={deal.slug} placement={deal.placementDefault} className="btn-primary text-xs">
          Bekijk deal
        </GoLink>
      </div>
    </article>
  );
}
