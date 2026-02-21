import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { VisualHero } from "@/components/visual-hero";
import { knowledgebase } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kennisbank maagverkleining | Dutch Goose",
  description: "24 praktische artikelen in helder Nederlands met FAQ en interne links.",
  path: "/kennisbank"
});

export default function KennisbankPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Kennisbank" }]} />
      <VisualHero
        title="Kennisbank"
        subtitle="Heldere uitleg in gewone taal. Voor echte situaties na maagverkleining."
        imageSrc="/illustrations/hero-buddies.svg"
        imageAlt="Kennisbank en community visual"
        chip="24 artikelen"
      />
      <p className="text-slate-700">Geen medisch advies. Bespreek dit met je eigen ziekenhuis of team.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {knowledgebase.map((article) => (
          <article className="card" key={article.slug}>
            <h2 className="text-lg font-semibold text-gooseNavy">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{article.description}</p>
            <Link href={`/kennisbank/${article.slug}`} className="btn-secondary mt-4 text-xs">
              Lees artikel
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
