import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { starterKits, starterKitMap } from "@/lib/data";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return starterKits.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const kit = starterKitMap.get(params.slug);
  if (!kit) {
    return buildMetadata({ title: "Starter kit", description: "Starter kit", path: "/starter-kits" });
  }
  return buildMetadata({
    title: `${kit.title} | Dutch Goose`,
    description: kit.description,
    path: `/starter-kits/${kit.slug}`
  });
}

export default function StarterKitDetailPage({ params }: { params: { slug: string } }) {
  const kit = starterKitMap.get(params.slug);
  if (!kit) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Start", item: "/" },
          { name: "Starter kits", item: "/starter-kits" },
          { name: kit.title, item: `/starter-kits/${kit.slug}` }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Starter kits", href: "/starter-kits" },
          { label: kit.phase }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">{kit.title}</h1>
      <p className="text-slate-700">{kit.description}</p>
      <ul className="card list-disc space-y-2 pl-5 text-slate-700">
        {kit.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gooseNavy">Direct naar</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {kit.links.map((link) => (
            <Link key={link.href} href={link.href} className="card block font-medium text-gooseNavy hover:bg-gooseCanvas">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
