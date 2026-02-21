import { buildMetadata } from "@/lib/seo";
import { VisualHero } from "@/components/visual-hero";

export const metadata = buildMetadata({
  title: "Samenwerken met Dutch Goose",
  description: "Pitchpagina voor adverteerders en partners met leadformulier.",
  path: "/samenwerken"
});

export default function SamenwerkenPage() {
  return (
    <div className="space-y-6">
      <VisualHero
        title="Samenwerken"
        subtitle="Voor merken en partners die echt waarde toevoegen voor mensen na maagverkleining."
        imageSrc="/illustrations/partners-suppliers.svg"
        imageAlt="Samenwerken en partnerdeals"
        chip="Partner & media"
      />
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Opties</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <li>Featured plaatsing</li>
          <li>Sponsored test aflevering</li>
          <li>Bundel deal</li>
          <li>Newsletter placement</li>
          <li>Community giveaway</li>
        </ul>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Partner resources</h2>
        <p className="mt-2 text-sm text-slate-700">
          Werk je met links, campagnes of placements? Gebruik de UTM builder voor consistente tracking.
        </p>
        <div className="mt-4">
          <a href="/tools/utm-builder" className="btn-secondary text-xs">
            Open UTM builder
          </a>
        </div>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Partnerformulier</h2>
        <form name="samenwerken-lead" method="POST" data-netlify="true" className="mt-3 grid gap-3 md:grid-cols-2">
          <input type="hidden" name="form-name" value="samenwerken-lead" />
          <label className="text-sm font-medium">
            Bedrijf
            <input required name="bedrijf" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium">
            Contact
            <input required name="contact" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium">
            Doel
            <input required name="doel" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium">
            Budget indicatie
            <input name="budget" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium md:col-span-2">
            Type samenwerking
            <select name="type" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              <option>Featured plaatsing</option>
              <option>Sponsored test aflevering</option>
              <option>Bundel deal</option>
              <option>Newsletter placement</option>
              <option>Community giveaway</option>
            </select>
          </label>
          <button className="btn-primary text-xs md:col-span-2" type="submit">
            Verstuur aanvraag
          </button>
        </form>
      </section>
    </div>
  );
}
