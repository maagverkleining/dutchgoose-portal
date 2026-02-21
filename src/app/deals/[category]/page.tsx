import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DealsFilter } from "@/components/deals-filter";
import { JsonLd } from "@/components/json-ld";
import { categories, categoryMap, deals } from "@/lib/data";
import { getCategoryIllustration } from "@/lib/illustrations";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = categoryMap.get(params.category);
  if (!category) {
    return buildMetadata({ title: "Deals", description: "Deals", path: "/deals" });
  }
  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/deals/${category.slug}`
  });
}

export default function DealCategoryPage({ params }: { params: { category: string } }) {
  const category = categoryMap.get(params.category);
  if (!category) {
    notFound();
  }
  const categoryDeals = deals.filter((deal) => deal.category === category.slug);

  return (
    <div className="space-y-6">
      <JsonLd data={buildFaqJsonLd(category.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Deals", href: "/deals" },
          { label: category.name }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">{category.name} deals</h1>
      <img
        src={getCategoryIllustration(category.slug)}
        alt={`Categorie illustratie ${category.name}`}
        className="w-full rounded-2xl border border-slate-200"
      />
      <p className="text-slate-700">{category.introCopy}</p>
      <p className="text-sm text-slate-600">{categoryDeals.length} deals gevonden in deze categorie.</p>
      <Suspense fallback={<div className="card">Deals laden...</div>}>
        <DealsFilter categorySlug={category.slug} />
      </Suspense>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gooseNavy">FAQ</h2>
        {category.faqs.map((faq) => (
          <article className="card" key={faq.question}>
            <h3 className="font-semibold text-gooseNavy">{faq.question}</h3>
            <p className="mt-2 text-sm text-slate-700">{faq.answer}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
