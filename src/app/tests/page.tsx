import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tests | Dutch Goose",
  description: "Vergelijk producten met tests, rankings en duidelijke conclusies.",
  path: "/tests"
});

export default function TestsPage() {
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
      <article className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Proteïne test</h2>
        <p className="mt-2 text-sm text-slate-700">
          Gebruik onze format met smaak, structuur, eiwitwaarde en prijs per portie.
        </p>
        <Link href="/tests/proteine-test" className="btn-primary mt-4 text-xs">
          Bekijk proteïne test
        </Link>
      </article>
    </div>
  );
}
