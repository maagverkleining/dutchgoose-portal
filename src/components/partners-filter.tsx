"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, merchants } from "@/lib/data";
import { PartnerCard } from "@/components/partner-card";

export function PartnersFilter() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";

  const filtered = useMemo(
    () =>
      merchants.filter((merchant) => {
        const categoryMatch = category === "all" || merchant.category === category;
        const searchMatch = `${merchant.name} ${merchant.shortPitch}`
          .toLowerCase()
          .includes(q.toLowerCase());
        return categoryMatch && searchMatch;
      }),
    [category, q]
  );

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`${pathname}?${next.toString()}`);
  }

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    filtered.forEach((merchant) => {
      const categoryName =
        categories.find((categoryItem) => categoryItem.slug === merchant.category)?.name ?? "Overig";
      const current = groups.get(categoryName) ?? [];
      current.push(merchant);
      groups.set(categoryName, current);
    });
    return Array.from(groups.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([categoryName, list]) => [
        categoryName,
        [...list].sort((a, b) => {
          const score = (slug: string, featured: boolean) => (slug === "ahead-nutrition" ? 20 : 0) + (featured ? 5 : 0);
          return score(b.slug, b.isFeatured) - score(a.slug, a.isFeatured) || a.name.localeCompare(b.name);
        })
      ] as const);
  }, [filtered]);

  return (
    <section className="space-y-6">
      <aside className="community-card grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Zoek partners
          <input
            aria-label="Zoek partners"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={q}
            onChange={(event) => updateParam("q", event.target.value)}
            placeholder="naam of onderwerp"
          />
        </label>
        <label className="text-sm font-medium">
          Categorie
          <select
            aria-label="Filter partner categorie"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={category}
            onChange={(event) => updateParam("category", event.target.value)}
          >
            <option value="all">Alle categorieën</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </aside>
      <div className="space-y-6">
        {grouped.map(([categoryName, groupedMerchants], categoryIndex) => (
          <section key={categoryName} className="space-y-3">
            <h3 className="inline-flex items-center rounded-full bg-gooseKiwi/20 px-3 py-1 text-sm font-semibold text-gooseNavy">
              {categoryIndex % 2 === 0 ? "🥝" : "🍌"} Productgroep: {categoryName}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groupedMerchants.map((merchant) => (
                <PartnerCard key={merchant.slug} merchant={merchant} />
              ))}
            </div>
          </section>
        ))}
        {grouped.length === 0 ? (
          <div className="card text-sm text-slate-600">
            <p>Geen partners gevonden met deze filters.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="/partners" className="btn-secondary text-xs">
                Reset filters
              </a>
              <a href="/community" className="btn-primary text-xs">
                Vraag hulp in community
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
