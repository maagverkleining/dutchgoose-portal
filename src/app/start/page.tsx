import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { PhaseSelector } from "@/components/phase-selector";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { VisualHero } from "@/components/visual-hero";
import { starterKits } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Begin hier na maagverkleining | Dutch Goose",
  description: "Kies je fase en start met een passende starter kit en kennisbank links.",
  path: "/start"
});

export default function StartPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Begin hier" }]} />
      <VisualHero
        title="Begin hier"
        subtitle="Kies je fase en start met de juiste kit, tools en kennisbank. Kort, logisch en direct toepasbaar."
        imageSrc="/illustrations/deals-categories.svg"
        imageAlt="Startflow en categorie overzicht"
        chip="Stap voor stap"
      />
      <PhaseSelector />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {starterKits.map((kit) => (
          <article className="card" key={kit.slug}>
            <h2 className="text-xl font-semibold text-gooseNavy">{kit.phase}</h2>
            <p className="mt-2 text-sm text-slate-700">{kit.description}</p>
            <Link href={`/starter-kits/${kit.slug}`} className="btn-primary mt-4 text-xs">
              Open starter kit
            </Link>
          </article>
        ))}
      </div>
      <SmartAffiliateBlock contextKey="home-default" title="Slimme eerste deals" />
      <ConversionBlock variant="community" context="start-bottom" />
    </div>
  );
}
