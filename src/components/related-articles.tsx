import Link from "next/link";
import { knowledgebase } from "@/lib/data";

export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = knowledgebase.filter((item) => item.slug !== currentSlug).slice(0, 3);

  return (
    <section className="card">
      <h2 className="text-xl font-semibold text-gooseNavy">Gerelateerde artikelen</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {related.map((article) => (
          <Link key={article.slug} href={`/kennisbank/${article.slug}`} className="rounded-xl border border-slate-200 p-3 text-sm hover:bg-gooseCanvas">
            <p className="font-semibold text-gooseNavy">{article.title}</p>
            <p className="mt-1 text-slate-600">{article.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
