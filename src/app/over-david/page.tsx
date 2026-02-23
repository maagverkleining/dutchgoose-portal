import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Over David Gans | Dutch Goose",
  description:
    "Het verhaal van David Gans, 105 kilo afgevallen, oprichter van Dutch Goose en BariBuddies.",
  path: "/over-david"
});

export default function OverDavidPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-goose bg-gradient-to-r from-gooseNavy to-gooseNavySoft p-8 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Over David Gans</h1>
        <p className="mt-3 max-w-3xl text-slate-100">
          Van eigen zoektocht naar 105 kilo gewichtsverlies, naar een community met duizenden
          gesprekken, praktische tools en eerlijke content voor mensen na maagverkleining.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <article className="card overflow-hidden p-0">
          <img
            src="/images/david-gans-profiel.jpg"
            alt="David Gans"
            className="h-full min-h-[360px] w-full bg-white object-contain object-top"
          />
        </article>
        <article className="card">
          <h2 className="text-2xl font-semibold text-gooseNavy">Persoonlijk en professioneel</h2>
          <p className="mt-3 text-slate-700">
            David bouwde Dutch Goose vanuit één simpele missie: niemand hoeft deze reis alleen te
            doen. Geen gladde praatjes. Wel structuur, herkenning en tools die je echt gebruikt.
          </p>
          <p className="mt-3 text-slate-700">
            Met BariBuddies ontstond een warme community waar kiwi en banaan staan voor ritme,
            nuchterheid en support. Je krijgt eerlijke ervaringen, duidelijke productkeuzes en
            ruimte voor jouw tempo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn-secondary text-xs" href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer">
              Volg op TikTok
            </a>
            <a className="btn-secondary text-xs" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">
              Volg op Instagram
            </a>
            <Link className="btn-primary text-xs" href="/media-kit-dutch-goose.txt">
              Download media kit
            </Link>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card">
          <p className="section-chip">Mijlpaal 1</p>
          <h3 className="mt-3 text-lg font-semibold text-gooseNavy">105 kilo afgevallen</h3>
          <p className="mt-2 text-sm text-slate-700">
            Focus op volhouden in het echte leven: werk, gezin, sociale druk en terugvalmomenten.
          </p>
        </article>
        <article className="card">
          <p className="section-chip">Mijlpaal 2</p>
          <h3 className="mt-3 text-lg font-semibold text-gooseNavy">Community opgebouwd</h3>
          <p className="mt-2 text-sm text-slate-700">
            BariBuddies groeide uit tot een actieve plek waar leden elkaar dagelijks helpen.
          </p>
        </article>
        <article className="card">
          <p className="section-chip">Mijlpaal 3</p>
          <h3 className="mt-3 text-lg font-semibold text-gooseNavy">Dutch Goose portal</h3>
          <p className="mt-2 text-sm text-slate-700">
            Deals, kennisbank, tests en tools op één plek. Direct bruikbaar, zonder ruis.
          </p>
        </article>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold text-gooseNavy">Waar David voor staat</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Eerlijk over wat werkt en wat niet</li>
          <li>Community first, altijd</li>
          <li>Praktische keuzes die je volhoudt</li>
          <li>Samenwerken alleen als het past bij de doelgroep</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/community/baribuddies" className="btn-primary text-xs">
            Naar BariBuddies
          </Link>
          <Link href="/samenwerken" className="btn-secondary text-xs">
            Zakelijk samenwerken
          </Link>
        </div>
      </section>
    </div>
  );
}
