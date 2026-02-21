import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy | Dutch Goose",
  description: "Lees hoe Dutch Goose omgaat met privacy, formulieren en click logging.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gooseNavy">Privacy</h1>
      <div className="card space-y-2 text-slate-700">
        <p>We verzamelen alleen wat nodig is voor formulieren en basis click logging.</p>
        <p>Click logging gebeurt zonder persoonlijke data en zonder tracking cookies.</p>
        <p>Gegevens uit formulieren gebruiken we alleen voor opvolging van jouw vraag.</p>
      </div>
    </div>
  );
}
