import Link from "next/link";
import { BananaIcon, KiwiIcon } from "@/components/icons";
import { DealCard } from "@/components/deal-card";
import { PartnerDisclosure } from "@/components/partner-disclosure";
import { buildMetadata } from "@/lib/seo";
import { deals } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Dutch Goose | Jouw portal na maagverkleining",
  description:
    "Tools, deals, tests en community voor je leven na een maagverkleining. Praktisch en eerlijk.",
  path: "/"
});

export default function HomePage() {
  const featuredDeals = deals.slice(0, 3);

  return (
    <div className="space-y-10 fruit-bg rounded-goose p-4 sm:p-6">
      <section className="rounded-goose bg-gradient-to-br from-gooseNavy to-gooseNavySoft p-8 text-white">
        <p className="section-chip mb-4 bg-gooseBanana text-gooseNavy">Community first 🥝🍌</p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Dutch Goose, jouw community portal na maagverkleining 🥝🍌
        </h1>
        <p className="mt-4 max-w-2xl text-slate-100">
          Tools, deals, tests en community voor je leven na een maagverkleining. Warm, direct, geen ruis.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/deals" className="btn-primary bg-gooseKiwi text-gooseNavy hover:bg-gooseBanana">
            Bekijk deals
          </Link>
          <Link href="/start" className="btn-secondary border-white text-white hover:bg-white hover:text-gooseNavy">
            Start hier
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="community-card">
          <h2 className="text-2xl font-semibold text-gooseNavy">Over Dutch Goose</h2>
          <p className="mt-3 text-slate-700">
            David Gans viel 105 kg af na een maagverkleining. Bekend van TikTok en community.
            Focus op eerlijk, praktisch en zonder filter.
          </p>
        </article>
        <article className="community-card">
          <h2 className="text-2xl font-semibold text-gooseNavy">
            BariBuddies <KiwiIcon /> <BananaIcon />
          </h2>
          <p className="mt-3 text-slate-700">
            Een warme community voor mensen met een maagverkleining. Je krijgt herkenning, snelle
            tips en steun op dagen dat het schuurt.
          </p>
          <Link href="/community/baribuddies" className="btn-primary mt-4 text-xs">
            Vraag een invite aan
          </Link>
        </article>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gooseNavy">Waarom deze portal 🥝🍌</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="card">
            <h3 className="font-semibold text-gooseNavy">Overzicht</h3>
            <p className="mt-2 text-sm text-slate-700">Alles op één plek: startflow, tools, deals, tests en kennisbank.</p>
          </article>
          <article className="card">
            <h3 className="font-semibold text-gooseNavy">Betrouwbare uitleg</h3>
            <p className="mt-2 text-sm text-slate-700">Helder Nederlands zonder jargon, mét disclaimers waar nodig.</p>
          </article>
          <article className="card">
            <h3 className="font-semibold text-gooseNavy">Slimme keuzes</h3>
            <p className="mt-2 text-sm text-slate-700">Deals en codes als ze er zijn, zonder loze beloften.</p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gooseNavy">Top deals uit de community</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredDeals.map((deal) => (
            <DealCard key={deal.slug} deal={deal} />
          ))}
        </div>
      </section>

      <section className="community-card">
        <h2 className="text-2xl font-semibold text-gooseNavy">Groepering per producten en leveranciers</h2>
        <p className="mt-2 text-slate-700">
          Op de deals en partners pagina zie je nu duidelijke blokken per productgroep en leverancier.
          Zo vind je sneller wat bij jouw fase past.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="section-chip">🥝 Proteïne</span>
          <span className="section-chip">🍌 Vezels</span>
          <span className="section-chip">🥝 Keuken tools</span>
          <span className="section-chip">🍌 Maaltijdstructuur</span>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-3 text-2xl font-semibold text-gooseNavy">Transparantie en vertrouwen</h2>
        <PartnerDisclosure />
        <p className="mt-3 text-sm text-slate-700">
          Partnerlinks staan erbij. Jij betaalt nooit extra door een partnerlink. Jij helpt de
          community groeien.
        </p>
      </section>
    </div>
  );
}
