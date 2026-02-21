import { Breadcrumbs } from "@/components/breadcrumbs";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BariBuddies community | Dutch Goose",
  description: "Gratis community met invite form voor mensen met een maagverkleining.",
  path: "/community/baribuddies"
});

export default function BariBuddiesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Community", href: "/community" },
          { label: "BariBuddies" }
        ]}
      />
      <VisualHero
        title="BariBuddies 🥝🍌"
        subtitle="Een warme community voor mensen met een maagverkleining. Praktische hulp, herkenning en duidelijke regels."
        imageSrc="/illustrations/hero-buddies.svg"
        imageAlt="BariBuddies community visual"
        chip="Gratis community"
      />
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Wat is het?</h2>
        <p className="mt-2 text-slate-700">
          Een gratis community voor mensen met een maagverkleining. Eerlijk, warm, direct.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <li>Herkenning zonder oordeel</li>
          <li>Praktische tips uit de praktijk</li>
          <li>Steun op lastige dagen</li>
        </ul>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Vraag een invite aan</h2>
        <form name="baribuddies-invite" method="POST" data-netlify="true" className="mt-3 space-y-3">
          <input type="hidden" name="form-name" value="baribuddies-invite" />
          <label className="block text-sm font-medium">
            Naam
            <input required type="text" name="name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            E-mail
            <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Waar sta je nu?
            <textarea name="phase" rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button className="btn-primary text-xs" type="submit">
            Vraag invite aan
          </button>
        </form>
      </section>
    </div>
  );
}
