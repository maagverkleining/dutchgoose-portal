import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookies | Dutch Goose",
  description: "Uitleg over cookiegebruik en tracking op Dutch Goose.",
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gooseNavy">Cookies</h1>
      <div className="card space-y-2 text-slate-700">
        <p>Voor basisfunctionaliteit gebruiken we geen tracking cookies.</p>
        <p>Externe partners kunnen eigen cookies plaatsen nadat je hun shop opent.</p>
        <p>We houden onze eigen tracking zo licht en privacyvriendelijk mogelijk.</p>
      </div>
    </div>
  );
}
