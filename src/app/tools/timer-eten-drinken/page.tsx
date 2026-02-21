import { TimerEtenDrinkenClient } from "@/components/tools/timer-eten-drinken-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eten drinken timer | Dutch Goose tools",
  description: "Mobiele timer met 20, 30 en 45 minuten plus audio toggle.",
  path: "/tools/timer-eten-drinken"
});

export default function TimerEtenDrinkenPage() {
  return <TimerEtenDrinkenClient />;
}
