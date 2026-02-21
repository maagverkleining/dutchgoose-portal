import { VoorraadTellerClient } from "@/components/tools/voorraad-teller-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voorraad teller | Dutch Goose tools",
  description: "Bereken hoeveel dagen je voorraad meegaat en vraag een reminder aan.",
  path: "/tools/voorraad-teller"
});

export default function VoorraadTellerPage() {
  return <VoorraadTellerClient />;
}
