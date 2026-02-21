import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { starterKits } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Begin hier na maagverkleining | Dutch Goose",
  description: "Kies je fase en start met een passende starter kit en kennisbank links.",
  path: "/start"
});

export default function StartPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Begin hier" }]} />
      <h1 className="text-3xl font-bold text-gooseNavy">Begin hier</h1>
      <p className="mt-3 max-w-2xl text-slate-700">
        Kies je fase. Dan pakken we de juiste tools, kennisbank en deals erbij.
      </p>
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
    </div>
  );
}
