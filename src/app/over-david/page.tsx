import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Over David Gans | Dutch Goose",
  description: "Persoonlijk en professioneel verhaal van David Gans met social links en media kit.",
  path: "/over-david"
});

export default function OverDavidPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gooseNavy">Over David</h1>
      <section className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="card flex items-center justify-center">
          <p className="text-sm text-slate-500">Foto placeholder</p>
        </div>
        <article className="card">
          <h2 className="text-xl font-semibold text-gooseNavy">Persoonlijk en professioneel</h2>
          <p className="mt-2 text-slate-700">
            David Gans viel 105 kilo af na een maagverkleining en bouwde Dutch Goose als community-first platform.
            Praktisch, direct en zonder opsmuk.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn-secondary text-xs" href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a className="btn-secondary text-xs" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <Link className="btn-primary text-xs" href="/media-kit-dutch-goose.txt">
              Download media kit
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
