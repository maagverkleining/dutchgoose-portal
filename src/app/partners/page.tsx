import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnersFilter } from "@/components/partners-filter";
import { JsonLd } from "@/components/json-ld";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";
import { merchants } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Partners directory | Dutch Goose",
  description: "Bekijk alle partners met uitleg, deal informatie en FAQ.",
  path: "/partners"
});

export default function PartnersPage() {
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
      <h1 className="text-3xl font-bold text-gooseNavy">Partners</h1>
      <p className="text-slate-700">Directory van partners met heldere uitleg per merk.</p>
      <Suspense fallback={<div className="card">Partners laden...</div>}>
        <PartnersFilter />
      </Suspense>
    </div>
  );
}
