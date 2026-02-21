import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DealsFilter } from "@/components/deals-filter";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { deals } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Deals na maagverkleining | Dutch Goose",
  description: "Filter deals op categorie, type en merk. Eerlijk gemarkeerd met partnerlink of code.",
  path: "/deals"
});

export default function DealsPage() {
  const jsonLd = buildItemListJsonLd(
    deals.map((deal) => ({ name: deal.title, url: `/deals/${deal.category}` })),
    "Dutch Goose deals"
  );

  return (
    <div className="space-y-6">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Deals" }]} />
      <h1 className="text-3xl font-bold text-gooseNavy">Deals</h1>
      <p className="text-slate-700">Via Dutch Goose pak je korting als er een code of actie is.</p>
      <Suspense fallback={<div className="card">Deals laden...</div>}>
        <DealsFilter />
      </Suspense>
    </div>
  );
}
