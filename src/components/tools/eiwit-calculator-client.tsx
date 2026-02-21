"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function EiwitCalculatorClient() {
  const [meals, setMeals] = useState(4);
  const [grams, setGrams] = useState(20);

  const total = useMemo(() => meals * grams, [grams, meals]);

  const suggestions = [
    `Ontbijt: ${Math.round(grams * 0.8)}g`,
    `Lunch: ${grams}g`,
    `Diner: ${Math.round(grams * 1.1)}g`,
    `Snack: ${Math.max(10, Math.round(grams * 0.6))}g`
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Eiwit calculator" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Eiwit calculator</h1>
      <section className="card space-y-4">
        <label className="block text-sm font-medium">
          Aantal maaltijden
          <input
            aria-label="Aantal maaltijden"
            type="number"
            min={1}
            value={meals}
            onChange={(event) => setMeals(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Gram eiwit per maaltijd
          <input
            aria-label="Gram eiwit per maaltijd"
            type="number"
            min={1}
            value={grams}
            onChange={(event) => setGrams(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <p className="rounded-goose bg-gooseKiwi/20 p-4 text-lg font-semibold text-gooseNavy">
          Dagtotaal: {Number.isFinite(total) ? total : 0} gram eiwit
        </p>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Suggesties per moment</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
