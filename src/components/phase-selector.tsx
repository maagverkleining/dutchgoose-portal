"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type Phase = "net-post-op" | "6-12-maanden" | "1-jaar-plus";

const options: Array<{ value: Phase; label: string }> = [
  { value: "net-post-op", label: "Net post op" },
  { value: "6-12-maanden", label: "6 tot 12 maanden" },
  { value: "1-jaar-plus", label: "1 jaar plus" }
];

const phaseTarget: Record<Phase, string> = {
  "net-post-op": "/starter-kits/net-post-op",
  "6-12-maanden": "/starter-kits/6-tot-12-maanden",
  "1-jaar-plus": "/starter-kits/1-jaar-plus"
};

export function PhaseSelector({ autoNavigate = false }: { autoNavigate?: boolean }) {
  const [phase, setPhase] = useState<Phase>("net-post-op");
  const router = useRouter();

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
    if (autoNavigate) {
      router.push(phaseTarget[next]);
    }
  }

  return (
    <section className="community-card">
      <h2 className="text-xl font-semibold text-gooseNavy">Kies je fase</h2>
      <p className="mt-2 text-sm text-slate-700">
        We tonen daarna gerichte content en deals voor jouw situatie.
      </p>
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
      <p className="mt-3 text-xs text-slate-600">
        Gekozen fase: <strong>{options.find((option) => option.value === phase)?.label}</strong>.{" "}
        <Link href={phaseTarget[phase]} className="underline">
          Open direct je starter kit
        </Link>
      </p>
    </section>
  );
}
