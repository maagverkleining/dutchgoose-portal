import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community | Dutch Goose",
  description: "Gratis community en Plus membership voor extra begeleiding.",
  path: "/community"
});

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Community" }]} />
      <VisualHero
        title="Community 🥝🍌"
        subtitle="Jij hoeft dit niet alleen te doen. Hier vind je support, structuur en een plek waar mensen je echt snappen."
        imageSrc="/illustrations/hero-buddies.svg"
        imageAlt="BariBuddies community met mensen, kiwi en banaan"
        chip="BariBuddies NL/BE"
      />
      <ConversionBlock variant="community" context="community-top" />
      <div className="grid gap-4 md:grid-cols-2">
        <article className="card">
          <h2 className="text-xl font-semibold text-gooseNavy">BariBuddies 🥝🍌</h2>
          <p className="mt-2 text-sm text-slate-700">
            Gratis community voor herkenning, steun en praktische tips.
          </p>
          <Link href="/community/baribuddies" className="btn-primary mt-4 text-xs">
            Vraag invite aan
          </Link>
        </article>
        <article className="card">
          <h2 className="text-xl font-semibold text-gooseNavy">Dutch Goose Plus</h2>
          <p className="mt-2 text-sm text-slate-700">Meer verdieping, extra sessies en maandelijkse focus.</p>
          <Link href="/community/plus" className="btn-primary mt-4 text-xs">
            Bekijk Plus
          </Link>
        </article>
      </div>
      <SmartAffiliateBlock contextKey="community-default" title="Community favorieten uit de deals" />
      <ConversionBlock variant="community" context="community-bottom" />
    </div>
  );
}
