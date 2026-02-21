"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deals, merchants } from "@/lib/data";
import { DealCard } from "@/components/deal-card";
import type { DealType } from "@/types/models";

const sorters: Record<string, (a: typeof deals[number], b: typeof deals[number]) => number> = {
  populair: (a, b) => {
    const merchantA = merchants.find((entry) => entry.slug === a.merchantSlug);
    const merchantB = merchants.find((entry) => entry.slug === b.merchantSlug);
    const score = (slug: string, featured = false) => (slug === "ahead-nutrition" ? 20 : 0) + (featured ? 5 : 0);
    return score(b.merchantSlug, Boolean(merchantB?.isFeatured)) - score(a.merchantSlug, Boolean(merchantA?.isFeatured));
  },
  nieuw: (a, b) => b.slug.localeCompare(a.slug),
  "hoogste-korting": (a, b) => Number(Boolean(b.couponCode)) - Number(Boolean(a.couponCode)),
  "beste-match": (a, b) => a.title.localeCompare(b.title)
};

export function DealsFilter({ categorySlug }: { categorySlug?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const dealType = params.get("dealType") ?? "all";
  const merchantSlug = params.get("merchant") ?? "all";
  const sort = params.get("sort") ?? "populair";

  const filtered = useMemo(() => {
    return deals
      .filter((item) => (categorySlug ? item.category === categorySlug : true))
      .filter((item) => (dealType === "all" ? true : item.dealType === (dealType as DealType)))
      .filter((item) => (merchantSlug === "all" ? true : item.merchantSlug === merchantSlug))
      .filter((item) => {
        const merchant = merchants.find((entry) => entry.slug === item.merchantSlug);
        const haystack = `${item.title} ${item.note} ${merchant?.name ?? ""}`.toLowerCase();
        return haystack.includes(q.toLowerCase());
      })
      .sort(sorters[sort] ?? sorters.populair);
  }, [categorySlug, dealType, merchantSlug, q, sort]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`${pathname}?${next.toString()}`);
  }

  const merchantOptions = merchants
    .filter((merchant) => (categorySlug ? merchant.category === categorySlug : true))
    .map((merchant) => ({ slug: merchant.slug, name: merchant.name }));

  const groupedByMerchant = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    filtered.forEach((deal) => {
      const name = merchants.find((merchant) => merchant.slug === deal.merchantSlug)?.name ?? "Onbekende leverancier";
      const current = groups.get(name) ?? [];
      current.push(deal);
      groups.set(name, current);
    });
    return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  return (
    <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="community-card h-fit">
        <h2 className="mb-3 text-lg font-semibold text-gooseNavy">Filter</h2>
        <label className="mb-3 block text-sm font-medium">
          Zoek
          <input
            aria-label="Zoek deals"
            value={q}
            onChange={(event) => updateParam("q", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="merk of deal"
          />
        </label>
        <label className="mb-3 block text-sm font-medium">
          Type
          <select
            aria-label="Filter op deal type"
            value={dealType}
            onChange={(event) => updateParam("dealType", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="all">Alles</option>
            <option value="code">Code beschikbaar</option>
            <option value="link">Alleen partnerlink</option>
            <option value="sale">Actie</option>
          </select>
        </label>
        <label className="mb-3 block text-sm font-medium">
          Merk
          <select
            aria-label="Filter op merk"
            value={merchantSlug}
            onChange={(event) => updateParam("merchant", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="all">Alle merken</option>
            {merchantOptions.map((merchant) => (
              <option value={merchant.slug} key={merchant.slug}>
                {merchant.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Sorteer
          <select
            aria-label="Sorteer deals"
            value={sort}
            onChange={(event) => updateParam("sort", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="populair">Populair</option>
            <option value="nieuw">Nieuw</option>
            <option value="hoogste-korting">Hoogste korting</option>
            <option value="beste-match">Beste match</option>
          </select>
        </label>
        <p className="mt-3 rounded-goose bg-gooseKiwi/15 p-3 text-xs text-slate-700">
          🥝 Producten en 🍌 leveranciers zijn gegroepeerd zodat je sneller kunt kiezen.
        </p>
      </aside>
      <div className="space-y-6">
        {groupedByMerchant.map(([merchantName, merchantDeals], groupIndex) => (
          <section key={merchantName} className="space-y-3">
            <h3 className="inline-flex items-center rounded-full bg-gooseBanana/40 px-3 py-1 text-sm font-semibold text-gooseNavy">
              {groupIndex % 2 === 0 ? "🥝" : "🍌"} Leverancier: {merchantName}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {merchantDeals.map((deal) => (
                <DealCard key={deal.slug} deal={deal} />
              ))}
            </div>
          </section>
        ))}
        {groupedByMerchant.length === 0 ? (
          <div className="card text-sm text-slate-600">
            <p>Geen resultaten gevonden. Probeer een andere filter.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="btn-secondary text-xs" href="/deals">
                Reset filters
              </a>
              <a className="btn-primary text-xs" href="/community/baribuddies">
                Vraag community hulp
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
