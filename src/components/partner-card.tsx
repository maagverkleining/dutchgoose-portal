import Link from "next/link";
import { Badge } from "@/components/badge";
import { MerchantThumbnail } from "@/components/merchant-thumbnail";
import { PartnerDisclosure } from "@/components/partner-disclosure";
import { getCategoryIllustration } from "@/lib/illustrations";
import type { Merchant } from "@/types/models";

export function PartnerCard({ merchant }: { merchant: Merchant }) {
  return (
    <article className="card h-full">
      <img
        src={merchant.heroImage ?? getCategoryIllustration(merchant.category)}
        alt={`Preview ${merchant.name}`}
        className="mb-3 h-24 w-full rounded-xl border border-slate-100 object-cover"
      />
      <div className="mb-3 flex items-center gap-2">
        <MerchantThumbnail merchant={merchant} size="sm" />
        <h3 className="text-lg font-semibold text-gooseNavy">{merchant.name}</h3>
      </div>
      <div className="mb-3 flex gap-2">
        <Badge label={merchant.couponCode ? "Code" : "Partnerlink"} />
        {merchant.isFeatured ? <Badge label="Deal" /> : null}
        {merchant.slug === "ahead-nutrition" ? <Badge label="Hot" /> : null}
      </div>
      <p className="mt-2 text-sm text-slate-600">{merchant.shortPitch}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {merchant.whyForMaagverkleining.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <PartnerDisclosure className="mt-4" />
      <Link href={`/partners/${merchant.slug}`} className="btn-secondary mt-4 text-xs">
        Bekijk partner
      </Link>
    </article>
  );
}
