import { buildMetadata } from "@/lib/seo";
import { VisualHero } from "@/components/visual-hero";

export const metadata = buildMetadata({
  title: "Contact | Dutch Goose",
  description: "Stel je vraag of stuur een bericht naar Dutch Goose.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <VisualHero
        title="Contact"
        subtitle="Vraag, idee of feedback? Stuur je bericht. We reageren nuchter en snel."
        imageSrc="/illustrations/hero-buddies.svg"
        imageAlt="Contact Dutch Goose"
        chip="Community support"
      />
      <section className="card">
        <form name="contact" method="POST" data-netlify="true" className="space-y-3">
          <input type="hidden" name="form-name" value="contact" />
          <label className="block text-sm font-medium">
            Naam
            <input required name="name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            E-mail
            <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Bericht
            <textarea required name="message" rows={5} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button className="btn-primary text-xs" type="submit">
            Verstuur
          </button>
        </form>
      </section>
    </div>
  );
}
