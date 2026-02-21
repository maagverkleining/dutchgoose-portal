import { classNames } from "@/lib/utils";

type PartnerDisclosureProps = {
  variant?: "short" | "long";
  className?: string;
};

export function PartnerDisclosure({
  variant = "short",
  className
}: PartnerDisclosureProps) {
  if (variant === "short") {
    return (
      <p className={classNames("rounded-goose bg-slate-100 p-3 text-sm text-slate-700", className)}>
        Partnerlink. Jij betaalt niks extra. Jij steunt de community.
      </p>
    );
  }

  return (
    <div className={classNames("space-y-4", className)}>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">1. Wat zijn partnerlinks?</h2>
        <p>Een partnerlink is een speciale link waarmee een shop kan zien dat jij via Dutch Goose komt.</p>
      </section>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">2. Waarom gebruiken we ze?</h2>
        <p>Zo kunnen we tools, tests, artikelen en community blijven maken zonder betaalmuur op alles.</p>
      </section>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">3. Koopt samenwerking de content?</h2>
        <p>Nee. De community en bruikbaarheid staan altijd op 1. We delen ook minpunten waar nodig.</p>
      </section>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">4. Hoe markeren we samenwerkingen?</h2>
        <p>Je ziet badges zoals Partnerlink, Code, Deal of Nieuw direct op de kaart en op pagina’s.</p>
      </section>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">5. Hoe werken kortingscodes?</h2>
        <p>Alleen als er echt een code of actie actief is. We beloven nooit dat er altijd korting is.</p>
      </section>
      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">6. Vragen of twijfel?</h2>
        <p>Mail ons via de contactpagina. We leggen altijd uit hoe een link of samenwerking werkt.</p>
      </section>
    </div>
  );
}
