import { Breadcrumbs } from "@/components/breadcrumbs";
import { VisualHero } from "@/components/visual-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dutch Goose Plus membership",
  description: "Plus voordelen, prijs placeholders en interesseformulier.",
  path: "/community/plus"
});

export default function CommunityPlusPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Community", href: "/community" },
          { label: "Plus" }
        ]}
      />
      <VisualHero
        title="Dutch Goose Plus 🍌🥝"
        subtitle="Extra verdieping, maandelijkse focus en directe begeleiding voor wie meer structuur en accountability wil."
        imageSrc="/illustrations/partners-suppliers.svg"
        imageAlt="Plus membership visual"
        chip="Premium community"
      />
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Wat je krijgt per maand</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <li>Exclusieve deep-dive sessies</li>
          <li>Maandelijkse focus challenge</li>
          <li>Extra Q&A met David</li>
          <li>Voorrang bij tests en nieuwe tools</li>
        </ul>
        <p className="mt-3 text-slate-700">Prijs placeholder: €4,99 per maand of €49 per jaar.</p>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Direct starten</h2>
        <a href="#" className="btn-primary mt-3 text-xs" aria-label="Start Stripe checkout placeholder">
          Stripe checkout placeholder
        </a>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Liever eerst interesse doorgeven?</h2>
        <form name="plus-interest" method="POST" data-netlify="true" className="mt-3 space-y-3">
          <input type="hidden" name="form-name" value="plus-interest" />
          <label className="block text-sm font-medium">
            Naam
            <input required type="text" name="name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            E-mail
            <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button className="btn-secondary text-xs" type="submit">
            Ik wil dit
          </button>
        </form>
      </section>
    </div>
  );
}
