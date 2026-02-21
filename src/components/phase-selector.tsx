"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Phase = "net-post-op" | "6-12-maanden" | "1-jaar-plus";

const options: Array<{ value: Phase; label: string }> = [
  { value: "net-post-op", label: "Net post op" },
  { value: "6-12-maanden", label: "6 tot 12 maanden" },
  { value: "1-jaar-plus", label: "1 jaar plus" }
];

export function PhaseSelector() {
  const [phase, setPhase] = useState<Phase>("net-post-op");

  useEffect(() => {
    const stored = localStorage.getItem("userPhase") as Phase | null;
    if (stored) {
      setPhase(stored);
    }
  }, []);

  function onSelect(next: Phase) {
    setPhase(next);
    localStorage.setItem("userPhase", next);
    trackEvent("phase_select", { phase: next });
  }

  return (
    <section className="community-card">
      <h2 className="text-xl font-semibold text-gooseNavy">Kies je fase</h2>
      <p className="mt-2 text-sm text-slate-700">We tonen daarna gerichte content en deals voor jouw situatie.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold ${
              phase === option.value
                ? "border-gooseKiwi bg-gooseKiwi/20 text-gooseNavy"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
