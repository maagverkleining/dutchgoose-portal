import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tools na maagverkleining | Dutch Goose",
  description: "Praktische tools: eiwitcalculator, timer en voorraadteller.",
  path: "/tools"
});

const tools = [
  {
    title: "Eiwit calculator",
    href: "/tools/eiwit-calculator",
    description: "Bereken je dagtotaal en zie suggesties per eetmoment."
  },
  {
    title: "Eten drinken timer",
    href: "/tools/timer-eten-drinken",
    description: "Houd 20, 30 of 45 minuten strak aan met start/stop."
  },
  {
    title: "Voorraad teller",
    href: "/tools/voorraad-teller",
    description: "Zie hoeveel dagen je pot nog meegaat en vraag reminder aan."
  }
];

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Tools" }]} />
      <VisualHero
        title="Tools voor je dagritme"
        subtitle="Praktische hulpmiddelen die je dagelijks gebruikt: eiwit, timer en voorraad."
        imageSrc="/illustrations/deals-categories.svg"
        imageAlt="Dutch Goose tools overzicht"
        chip="Community tools"
      />
      <ConversionBlock variant="tools" context="tools-top" />
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.href} className="card">
            <h2 className="text-xl font-semibold text-gooseNavy">{tool.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{tool.description}</p>
            <Link href={tool.href} className="btn-primary mt-4 text-xs">
              Open tool
            </Link>
          </article>
        ))}
      </div>
      <SmartAffiliateBlock contextKey="eiwit-calculator" title="Deals die goed werken met deze tools" />
      <ConversionBlock variant="community" context="tools-community-cta" />
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Voor partners en campagnes</h2>
        <p className="mt-2 text-sm text-slate-700">
          De UTM builder is een interne partnertool voor samenwerkingen en tracking, niet voor de
          standaard community-flow.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tools/utm-builder" className="btn-secondary text-xs">
            Open UTM builder
          </Link>
          <Link href="/samenwerken" className="btn-primary text-xs">
            Naar samenwerken
          </Link>
        </div>
      </section>
    </div>
  );
}
