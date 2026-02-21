"use client";

import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { GoLink } from "@/components/go-link";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { trackEvent } from "@/lib/analytics";

export function EiwitCalculatorClient() {
  const [meals, setMeals] = useState(4);
  const [grams, setGrams] = useState(20);

  const total = useMemo(() => meals * grams, [grams, meals]);

  const suggestions = [
    `Ontbijt: ${Math.round(grams * 0.8)}g`,
    `Lunch: ${grams}g`,
    `Diner: ${Math.round(grams * 1.1)}g`,
    `Snack: ${Math.max(10, Math.round(grams * 0.6))}g`
  ];

  useEffect(() => {
    trackEvent("tool_use", { tool: "eiwit-calculator" });
  }, []);

  const recommendedDeals = useMemo((): Array<{ slug: string; label: string }> => {
    if (total >= 120) {
      return [
        { slug: "bodyfit-isolaat-voordeel", label: "Body & Fit isolaat voordeel" },
        { slug: "myprotein-starter-bundel", label: "Myprotein starter bundel" }
      ];
    }
    if (total >= 80) {
      return [
        { slug: "myprotein-starter-bundel", label: "Myprotein starter bundel" },
        { slug: "huel-drukke-dag-bundle", label: "Huel drukke dag bundle" }
      ];
    }
    return [
      { slug: "bulk-repen-selectie", label: "Bulk repen selectie" },
      { slug: "bodyfit-isolaat-voordeel", label: "Body & Fit isolaat voordeel" }
    ];
  }, [total]);

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Eiwit calculator" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Eiwit calculator</h1>
      <section className="card space-y-4">
        <label className="block text-sm font-medium">
          Aantal maaltijden
          <input
            aria-label="Aantal maaltijden"
            type="number"
            min={1}
            value={meals}
            onChange={(event) => setMeals(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Gram eiwit per maaltijd
          <input
            aria-label="Gram eiwit per maaltijd"
            type="number"
            min={1}
            value={grams}
            onChange={(event) => setGrams(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <p className="rounded-goose bg-gooseKiwi/20 p-4 text-lg font-semibold text-gooseNavy">
          Dagtotaal: {Number.isFinite(total) ? total : 0} gram eiwit
        </p>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Suggesties per moment</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Aanbevolen producten bij jouw uitkomst</h2>
        <p className="mt-2 text-sm text-slate-700">
          Op basis van je dagtotaal ({total}g) kun je deze deals checken.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {recommendedDeals.map((deal) => (
            <GoLink
              key={deal.slug}
              slug={deal.slug}
              placement="eiwit-calculator-recommendation"
              eventName="deal_click"
              className="btn-secondary text-xs"
            >
              Bekijk {deal.label}
            </GoLink>
          ))}
        </div>
      </section>
      <SmartAffiliateBlock contextKey="eiwit-calculator" />
      <ConversionBlock variant="community" context="tool-eiwit-calculator" />
    </div>
  );
}
