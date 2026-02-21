"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import mapData from "@data/context-affiliate-map.json";
import { deals, merchants } from "@/lib/data";
import { MerchantThumbnail } from "@/components/merchant-thumbnail";
import { trackEvent } from "@/lib/analytics";

type MapRow = {
  category: string;
};

const contextMap = mapData as Record<string, MapRow>;

type SmartAffiliateBlockProps = {
  contextKey: string;
  title?: string;
  maxItems?: number;
};

export function SmartAffiliateBlock({
  contextKey,
  title = "Aanbevolen deals voor jou",
  maxItems = 3
}: SmartAffiliateBlockProps) {
  const [phase, setPhase] = useState<string | null>(null);

  useEffect(() => {
    setPhase(localStorage.getItem("userPhase"));
  }, []);

  const mapping = useMemo(() => {
    const phaseKey = phase ? `${contextKey}-${phase}` : "";
    if (contextMap[phaseKey]) {
      return contextMap[phaseKey];
    }
    if (contextMap[contextKey]) {
      return contextMap[contextKey];
    }
    if (contextKey.startsWith("kennisbank-")) {
      return contextMap["kennisbank-default"];
    }
    if (contextKey.startsWith("starter-kit-")) {
      return contextMap["starter-kit-net-post-op"];
    }
    return contextMap["home-default"];
  }, [contextKey, phase]);

  const scoped = useMemo(() => {
    return deals
      .filter((deal) => deal.category === mapping.category)
      .sort((a, b) => {
        const merchantA = merchants.find((entry) => entry.slug === a.merchantSlug);
        const merchantB = merchants.find((entry) => entry.slug === b.merchantSlug);
        const score = (slug: string, featured = false) =>
          (slug === "ahead-nutrition" ? 20 : 0) + (featured ? 5 : 0);
        return score(b.merchantSlug, Boolean(merchantB?.isFeatured)) - score(a.merchantSlug, Boolean(merchantA?.isFeatured));
      })
      .slice(0, maxItems);
  }, [mapping.category, maxItems]);

  // Dutch Goose affiliate optimization component
  return (
    <section className="community-card">
      <h2 className="text-xl font-semibold text-gooseNavy">{title}</h2>
      <p className="mt-2 text-sm text-slate-700">Contextuele aanbevelingen op basis van waar je nu zit.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {scoped.map((deal) => {
          const merchant = merchants.find((item) => item.slug === deal.merchantSlug);
          return (
            <article key={deal.slug} className="rounded-xl border border-slate-200 bg-white p-3">
              {merchant ? (
                <div className="mb-2 flex items-center gap-2">
                  <MerchantThumbnail merchant={merchant} size="sm" />
                  <p className="text-sm font-semibold text-gooseNavy">{merchant.name}</p>
                </div>
              ) : null}
              <p className="text-xs font-semibold uppercase text-slate-500">{deal.category}</p>
              <h3 className="mt-1 font-semibold text-gooseNavy">{deal.title}</h3>
              <Link
                href={`/go/${deal.slug}?placement=smart-affiliate-${contextKey}`}
                className="btn-primary mt-3 text-xs"
                onClick={() =>
                  trackEvent("deal_click", {
                    context: contextKey,
                    deal: deal.slug,
                    category: deal.category
                  })
                }
              >
                Bekijk deal
              </Link>
            </article>
          );
        })}
      </div>
      {scoped.length === 0 ? (
        <p className="mt-4 rounded-goose bg-gooseCanvas p-3 text-sm text-slate-700">
          Er zijn nu geen exacte matches. Bekijk alle deals voor meer opties.
        </p>
      ) : null}
    </section>
  );
}
