import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { starterKits } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Starter kits | Dutch Goose",
  description: "Kies een starter kit op basis van je fase na maagverkleining.",
  path: "/starter-kits"
});

export default function StarterKitsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Starter kits" }]} />
      <h1 className="text-3xl font-bold text-gooseNavy">Starter kits</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {starterKits.map((kit) => (
          <article key={kit.slug} className="card">
            <h2 className="text-xl font-semibold text-gooseNavy">{kit.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{kit.description}</p>
            <Link href={`/starter-kits/${kit.slug}`} className="btn-primary mt-4 text-xs">
              Open kit
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
