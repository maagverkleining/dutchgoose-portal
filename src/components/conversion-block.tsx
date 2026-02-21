"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export type ConversionVariant = "tools" | "deals" | "community";

type ConversionBlockProps = {
  variant: ConversionVariant;
  headline?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  context?: string;
};

const defaults: Record<ConversionVariant, Required<Omit<ConversionBlockProps, "variant" | "context">>> = {
  // Dutch Goose conversion optimization component
  tools: {
    headline: "Pak je volgende stap direct mee",
    copy: "Gebruik daarna een passende deal en zet je ritme vast in de community.",
    primaryLabel: "Bekijk deals",
    primaryHref: "/deals",
    secondaryLabel: "Naar community",
    secondaryHref: "/community/baribuddies"
  },
  deals: {
    headline: "Besparen op producten die je toch gebruikt",
    copy: "Kies slim per categorie en check meteen welke tool erbij past.",
    primaryLabel: "Start met deals",
    primaryHref: "/deals",
    secondaryLabel: "Open tools",
    secondaryHref: "/tools"
  },
  community: {
    headline: "Sluit je aan bij BariBuddies community",
    copy: "Je hoeft dit niet alleen te doen. Vraag je invite aan en haak aan.",
    primaryLabel: "Vraag invite aan",
    primaryHref: "/community/baribuddies",
    secondaryLabel: "Bekijk Plus",
    secondaryHref: "/community/plus"
  }
};

export function ConversionBlock(props: ConversionBlockProps) {
  const preset = defaults[props.variant];
  const headline = props.headline ?? preset.headline;
  const copy = props.copy ?? preset.copy;
  const primaryLabel = props.primaryLabel ?? preset.primaryLabel;
  const primaryHref = props.primaryHref ?? preset.primaryHref;
  const secondaryLabel = props.secondaryLabel ?? preset.secondaryLabel;
  const secondaryHref = props.secondaryHref ?? preset.secondaryHref;

  const eventName = props.variant === "community" ? "community_join_click" : "tool_use";

  return (
    <section className="community-card bg-gradient-to-r from-white to-gooseKiwi/10">
      <h2 className="text-2xl font-semibold text-gooseNavy">{headline}</h2>
      <p className="mt-2 text-sm text-slate-700">{copy}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={primaryHref}
          className="btn-primary text-xs"
          onClick={() =>
            trackEvent(eventName, {
              placement: props.context ?? props.variant,
              target: primaryHref
            })
          }
        >
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="btn-secondary text-xs">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
