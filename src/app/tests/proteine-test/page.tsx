import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { GoLink } from "@/components/go-link";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Proteïne test | Dutch Goose",
  description: "Ranking cards met smaak, structuur, eiwitwaarde en CTA naar deals.",
  path: "/tests/proteine-test"
});

const ranking = [
  {
    product: "Body & Fit Whey Isolaat",
    dealSlug: "bodyfit-isolaat-voordeel",
    taste: 8.5,
    structure: 8,
    protein: 25,
    price: "€€"
  },
  {
    product: "Myprotein Clear Whey",
    dealSlug: "myprotein-starter-bundel",
    taste: 8,
    structure: 7.5,
    protein: 20,
    price: "€€"
  },
  {
    product: "Bulk Vegan Protein",
    dealSlug: "bulk-repen-selectie",
    taste: 7,
    structure: 7,
    protein: 22,
    price: "€"
  }
];

export default function ProteineTestPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tests", href: "/tests" },
          { label: "Proteïne test" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Proteïne test</h1>
      <img
        src="/illustrations/category-proteine.svg"
        alt="Proteïne test visual"
        className="w-full rounded-2xl border border-slate-200"
      />
      <p className="text-slate-700">Ranking cards op smaak, structuur en eiwit per portie.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {ranking.map((row, index) => (
          <article key={row.product} className="card">
            <p className="text-xs font-semibold uppercase text-slate-500">#{index + 1}</p>
            <h2 className="text-lg font-semibold text-gooseNavy">{row.product}</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>Smaak: {row.taste}/10</li>
              <li>Structuur: {row.structure}/10</li>
              <li>Eiwit: {row.protein}g</li>
              <li>Prijs: {row.price}</li>
            </ul>
            <GoLink
              slug={row.dealSlug}
              placement="test-proteine-buy-button"
              eventName="deal_click"
              className="btn-secondary mt-4 text-xs"
            >
              Koop via deal
            </GoLink>
          </article>
        ))}
      </div>
      <GoLink slug="bodyfit-isolaat-voordeel" placement="test-proteine" eventName="deal_click" className="btn-primary text-xs">
        Naar bijpassende deals
      </GoLink>
      <SmartAffiliateBlock contextKey="tests-proteine-test" />
      <ConversionBlock variant="community" context="tests-proteine-bottom" />
    </div>
  );
}
