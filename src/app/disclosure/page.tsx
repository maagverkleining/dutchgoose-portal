import { PartnerDisclosure } from "@/components/partner-disclosure";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclosure partnerlinks | Dutch Goose",
  description: "Transparantie over partnerlinks, samenwerkingen en kortingscodes.",
  path: "/disclosure"
});

export default function DisclosurePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gooseNavy">Disclosure</h1>
      <PartnerDisclosure variant="long" />
    </div>
  );
}
