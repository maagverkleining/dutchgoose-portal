import type { Merchant } from "@/types/models";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function colorFromSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const palette = [
    "from-[#7BCB4A] to-[#4FA8D1]",
    "from-[#FFD95A] to-[#6CC36A]",
    "from-[#85C8FF] to-[#7BCB4A]",
    "from-[#FFCB73] to-[#4FA8D1]"
  ];
  return palette[Math.abs(hash) % palette.length];
}

export function MerchantThumbnail({
  merchant,
  className = "",
  size = "md"
}: {
  merchant: Merchant;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "h-10 w-10 text-xs" : size === "lg" ? "h-20 w-20 text-lg" : "h-14 w-14 text-sm";

  const hasUsableImage = Boolean(merchant.heroImage) && !merchant.heroImage?.startsWith("/assets/");

  if (hasUsableImage) {
    return (
      <img
        src={merchant.heroImage as string}
        alt={`Thumbnail ${merchant.name}`}
        className={`${sizeClass} rounded-xl border border-slate-200 object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${colorFromSlug(
        merchant.slug
      )} inline-flex items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br font-bold text-gooseNavy ${className}`}
      aria-label={`Thumbnail ${merchant.name}`}
      title={merchant.name}
    >
      {initialsFromName(merchant.name)}
    </div>
  );
}
