import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voorwaarden | Dutch Goose",
  description: "Gebruik en voorwaarden van het Dutch Goose platform.",
  path: "/voorwaarden"
});

export default function VoorwaardenPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gooseNavy">Voorwaarden</h1>
      <div className="card space-y-2 text-slate-700">
        <p>Gebruik van Dutch Goose is op eigen verantwoordelijkheid.</p>
        <p>Content is informatief en vervangt geen medisch advies.</p>
        <p>Samenwerkingen en partnerlinks worden duidelijk gemarkeerd.</p>
        <p className="font-mono text-sm">
          tiktok-developers-site-verification=v5ZgtGnNL3YNQE1wQ5ill1G3DFUsZ8Qo
        </p>
      </div>
    </div>
  );
}
