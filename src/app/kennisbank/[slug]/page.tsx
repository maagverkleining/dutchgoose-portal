import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { articleMap, knowledgebase } from "@/lib/data";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return knowledgebase.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articleMap.get(params.slug);
  if (!article) {
    return buildMetadata({ title: "Kennisbank", description: "Kennisbank", path: "/kennisbank" });
  }
  return buildMetadata({
    title: `${article.title} | Dutch Goose kennisbank`,
    description: article.description,
    path: `/kennisbank/${article.slug}`
  });
}

export default function KennisbankArticlePage({ params }: { params: { slug: string } }) {
  const article = articleMap.get(params.slug);
  if (!article) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Start", item: "/" },
          { name: "Kennisbank", item: "/kennisbank" },
          { name: article.title, item: `/kennisbank/${article.slug}` }
        ])}
      />
      <JsonLd data={buildFaqJsonLd(article.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Kennisbank", href: "/kennisbank" },
          { label: article.title }
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold text-gooseNavy">{article.title}</h1>
        <img
          src="/illustrations/hero-buddies.svg"
          alt="Community kennisbank visual"
          className="mt-4 w-full rounded-2xl border border-slate-200"
        />
        <p className="mt-2 text-sm text-slate-500">
          Update: {article.updatedAt} · Leestijd: {article.readingMinutes} minuten
        </p>
        <p className="mt-3 rounded-goose bg-slate-100 p-3 text-sm text-slate-700">
          Geen medisch advies. Bespreek dit met je eigen ziekenhuis of team.
        </p>
      </header>
      <div className="space-y-4 text-slate-800">
        {article.body.map((paragraph) => (
          <p className="leading-7" key={paragraph.slice(0, 32)}>
            {paragraph}
          </p>
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gooseNavy">FAQ</h2>
        {article.faqs.map((faq) => (
          <article className="card" key={faq.question}>
            <h3 className="font-semibold text-gooseNavy">{faq.question}</h3>
            <p className="mt-2 text-sm text-slate-700">{faq.answer}</p>
          </article>
        ))}
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Interne links</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/tools/eiwit-calculator" className="btn-secondary text-xs">
            Naar eiwit calculator
          </Link>
          <Link href="/tools/timer-eten-drinken" className="btn-secondary text-xs">
            Naar eten-drinken timer
          </Link>
          <Link href="/deals/proteine" className="btn-secondary text-xs">
            Naar proteïne deals
          </Link>
        </div>
      </section>
    </article>
  );
}
