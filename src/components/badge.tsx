import { classNames } from "@/lib/utils";

export function Badge({ label }: { label: "Partnerlink" | "Code" | "Deal" | "Nieuw" }) {
  const styleMap: Record<typeof label, string> = {
    Partnerlink: "bg-slate-100 text-slate-700",
    Code: "bg-gooseKiwi/20 text-gooseNavy",
    Deal: "bg-gooseBanana/40 text-gooseNavy",
    Nieuw: "bg-blue-100 text-blue-700"
  };

  return <span className={classNames("badge", styleMap[label])}>{label}</span>;
}
