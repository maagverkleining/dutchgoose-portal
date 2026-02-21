import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { SafeDataRenderer } from "@/components/safe-data-renderer";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tests | Dutch Goose",
  description: "Vergelijk producten met tests, rankings en duidelijke conclusies.",
  path: "/tests"
});

export default function TestsPage() {
  const tests = [
    {
      title: "Proteïne test",
      href: "/tests/proteine-test",
      description: "Gebruik onze format met smaak, structuur, eiwitwaarde en prijs per portie."
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Tests" }]} />
      <VisualHero
        title="Tests en rankings 🥝🍌"
        subtitle="Heldere vergelijkingen op smaak, structuur en gebruiksgemak. Geen vaag gedoe."
        imageSrc="/illustrations/deals-categories.svg"
        imageAlt="Tests en rankings visual"
        chip="Praktisch getest"
      />
      <ConversionBlock variant="deals" context="tests-top" />
      <SafeDataRenderer data={tests} fallbackData={tests}>
        {(rows) => (
          <div className="grid gap-4 md:grid-cols-2">
            {rows.map((test) => (
              <article key={test.href} className="card">
                <h2 className="text-xl font-semibold text-gooseNavy">{test.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{test.description}</p>
                <Link href={test.href} className="btn-primary mt-4 text-xs">
                  Bekijk test
                </Link>
              </article>
            ))}
          </div>
        )}
      </SafeDataRenderer>
      <SmartAffiliateBlock contextKey="tests-proteine-test" />
      <ConversionBlock variant="community" context="tests-bottom" />
    </div>
  );
}
