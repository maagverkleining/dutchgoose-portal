"use client";

import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConversionBlock } from "@/components/conversion-block";
import { trackEvent } from "@/lib/analytics";

export function UtmBuilderClient() {
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("proteine");
  const [placement, setPlacement] = useState("home-hero");

  const result = useMemo(() => {
    if (!url) {
      return "";
    }
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("utm_source", "dutchgoose.nl");
      parsed.searchParams.set("utm_medium", "affiliate");
      parsed.searchParams.set("utm_campaign", category);
      parsed.searchParams.set("utm_content", placement);
      return parsed.toString();
    } catch {
      return "Vul een geldige URL in.";
    }
  }, [url, category, placement]);

  useEffect(() => {
    trackEvent("tool_use", { tool: "utm-builder" });
  }, []);

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "UTM builder" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">UTM builder</h1>
      <section className="card space-y-3">
        <label className="block text-sm font-medium">
          URL
          <input
            aria-label="Basis URL"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="https://example.com"
          />
        </label>
        <label className="block text-sm font-medium">
          Category
          <input
            aria-label="UTM category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Placement
          <input
            aria-label="UTM placement"
            value={placement}
            onChange={(event) => setPlacement(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <div className="rounded-goose bg-slate-100 p-3 text-sm break-all">{result || "Nog geen output"}</div>
        <button
          className="btn-primary text-xs"
          onClick={() => navigator.clipboard.writeText(result)}
          type="button"
          disabled={!result || result === "Vul een geldige URL in."}
        >
          Kopieer link
        </button>
      </section>
      <ConversionBlock
        variant="community"
        context="tool-utm-builder"
        headline="Werk je met Dutch Goose als partner?"
        copy="Plan je samenwerking en zet je campagne strak op met heldere plaatsingen."
        primaryLabel="Naar samenwerken"
        primaryHref="/samenwerken"
      />
    </div>
  );
}
