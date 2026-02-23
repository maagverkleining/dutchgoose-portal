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
  const phaseCopy: Record<string, { intro: string; future: string }> = {
    "net-post-op": {
      intro: "Je lijf herstelt nu. Focus op rust, kleine happen, eiwit en drinkritme.",
      future: "Kijk alvast vooruit: rond 6-12 maanden draait het meer om structuur vasthouden."
    },
    "6-tot-12-maanden": {
      intro: "Je bouwt routine op in echte weken met werk, gezin en sociale momenten.",
      future: "Kijk alvast vooruit: na 1 jaar draait het meer om onderhoud en grenzen."
    },
    "1-jaar-plus": {
      intro: "Je zit in onderhoud. Nu tellen consistentie, terugvalpreventie en slimme keuzes.",
      future: "Blijf vooruitkijken: kleine bijsturing op tijd voorkomt grote terugval."
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Begin hier" }]} />
      <VisualHero
        title="Begin hier"
        subtitle="Kies je fase en start met de juiste kit, tools en kennisbank. Kort, logisch en direct toepasbaar."
        imageSrc="/illustrations/deals-categories.svg"
        imageAlt="Startflow en categorie overzicht"
        chip="Stap voor stap"
        actions={[
          { label: "Kies je fase", href: "#fase-selectie", style: "primary" },
          { label: "Bekijk community", href: "/community", style: "secondary" }
        ]}
      />
      <div id="fase-selectie">
        <PhaseSelector autoNavigate />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {starterKits.map((kit) => (
          <article className="card" key={kit.slug}>
            <h2 className="text-xl font-semibold text-gooseNavy">{kit.phase}</h2>
            <p className="mt-2 text-sm text-slate-700">
              {phaseCopy[kit.slug]?.intro ?? kit.description}
            </p>
            <p className="mt-2 text-xs text-slate-600">
              {phaseCopy[kit.slug]?.future ?? "Je krijgt in elke fase een logisch volgende stap."}
            </p>
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
