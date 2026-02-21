import { classNames } from "@/lib/utils";

export function Badge({ label }: { label: "Partnerlink" | "Code" | "Deal" | "Nieuw" | "Uitgelicht" | "Hot" }) {
  const styleMap: Record<typeof label, string> = {
    Partnerlink: "bg-slate-100 text-slate-700",
    Code: "bg-gooseKiwi/20 text-gooseNavy",
    Deal: "bg-gooseBanana/40 text-gooseNavy",
    Nieuw: "bg-blue-100 text-blue-700",
    Uitgelicht: "bg-amber-100 text-amber-800",
    Hot: "bg-rose-100 text-rose-700"
  };

  return <span className={classNames("badge", styleMap[label])}>{label}</span>;
}
