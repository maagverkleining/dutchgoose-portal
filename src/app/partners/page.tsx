import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnersFilter } from "@/components/partners-filter";
import { JsonLd } from "@/components/json-ld";
import { ConversionBlock } from "@/components/conversion-block";
import { MerchantThumbnail } from "@/components/merchant-thumbnail";
import { SafeDataRenderer } from "@/components/safe-data-renderer";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";
import { merchantMap, merchants } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Partners directory | Dutch Goose",
  description: "Bekijk alle partners met uitleg, deal informatie en FAQ.",
  path: "/partners"
});

export default function PartnersPage() {
  const ahead = merchantMap.get("ahead-nutrition");

  return (
    <div className="space-y-6">
      <JsonLd
        data={buildItemListJsonLd(
          merchants.map((merchant) => ({
            name: merchant.name,
            url: `/partners/${merchant.slug}`
          })),
          "Dutch Goose partners"
        )}
      />
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Partners" }]} />
      <h1 className="text-3xl font-bold text-gooseNavy">Partners 🥝🍌</h1>
      <p className="text-slate-700">
        Directory van partners met heldere uitleg per merk, gegroepeerd per productgroep en leverancier.
      </p>
      <ConversionBlock
        variant="deals"
        context="partners-top"
        headline="Kies je leverancier zonder ruis"
        copy="Vergelijk partners op relevantie na maagverkleining en ga daarna direct door naar passende deals."
      />
      {ahead ? (
        <section className="community-card border-2 border-gooseKiwi/60">
          <div className="flex items-center gap-3">
            <MerchantThumbnail merchant={ahead} size="lg" />
            <div>
              <h2 className="text-lg font-semibold text-gooseNavy">Uitgelicht: Ahead Nutrition</h2>
              <p className="text-sm text-slate-700">
                Code <strong>dutchgoose</strong> voor de huidige actieperiode.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      <img
        src="/illustrations/partners-suppliers.svg"
        alt="Partners gegroepeerd per leverancier"
        className="w-full rounded-2xl border border-slate-200"
      />
      <SafeDataRenderer data={merchants} fallbackData={merchants.slice(0, 6)}>
        {(rows) => <p className="text-sm text-slate-600">{rows.length} partners beschikbaar.</p>}
      </SafeDataRenderer>
      <Suspense fallback={<div className="card">Partners laden...</div>}>
        <PartnersFilter />
      </Suspense>
    </div>
  );
}
