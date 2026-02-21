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

  return (
    <section className="space-y-6">
      <aside className="card grid gap-3 sm:grid-cols-2">
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((merchant) => (
          <PartnerCard key={merchant.slug} merchant={merchant} />
        ))}
      </div>
    </section>
  );
}
