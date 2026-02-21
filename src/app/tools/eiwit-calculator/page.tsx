import { EiwitCalculatorClient } from "@/components/tools/eiwit-calculator-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eiwit calculator | Dutch Goose tools",
  description: "Bereken je dagtotaal eiwit op basis van maaltijden en gram per maaltijd.",
  path: "/tools/eiwit-calculator"
});

export default function EiwitCalculatorPage() {
  return <EiwitCalculatorClient />;
}
