import { UtmBuilderClient } from "@/components/tools/utm-builder-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UTM builder | Dutch Goose tools",
  description: "Bouw standaard Dutch Goose UTM links met category en placement.",
  path: "/tools/utm-builder"
});

export default function UtmBuilderPage() {
  return <UtmBuilderClient />;
}
