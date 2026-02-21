import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DealsFilter } from "@/components/deals-filter";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ConversionBlock } from "@/components/conversion-block";
import { SafeDataRenderer } from "@/components/safe-data-renderer";
import { categories, deals, merchants } from "@/lib/data";

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
      <h1 className="text-3xl font-bold text-gooseNavy">Deals 🥝🍌</h1>
      <p className="text-slate-700">Via Dutch Goose pak je korting als er een code of actie is.</p>
      <ConversionBlock
        variant="deals"
        context="deals-top"
        headline="Besparen op producten die je toch gebruikt"
        copy="Filter slim op categorie, type en leverancier. Daarna pak je direct je volgende stap in tools of community."
      />
      <section className="community-card">
        <img
          src="/illustrations/deals-categories.svg"
          alt="Deals categorie overzicht"
          className="mb-4 w-full rounded-xl border border-slate-200"
        />
        <h2 className="text-lg font-semibold text-gooseNavy">Snel overzicht community stijl</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gooseNavy">Productgroepen</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span key={category.slug} className="section-chip">
                  {index % 2 === 0 ? "🥝" : "🍌"} {category.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gooseNavy">Leveranciers</p>
            <p className="mt-2 text-sm text-slate-700">
              {merchants.length} leveranciers verdeeld over {categories.length} productgroepen.
            </p>
          </div>
        </div>
      </section>
      <SafeDataRenderer data={deals} fallbackData={deals.slice(0, 6)}>
        {(rows) => (
          <p className="text-sm text-slate-600">
            We tonen nu {rows.length} deals. Gebruik filters voor je beste match.
          </p>
        )}
      </SafeDataRenderer>
      <Suspense fallback={<div className="card">Deals laden...</div>}>
        <DealsFilter />
      </Suspense>
    </div>
  );
}
