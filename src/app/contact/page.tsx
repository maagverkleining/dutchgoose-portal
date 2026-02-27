import { buildMetadata } from "@/lib/seo";
import { VisualHero } from "@/components/visual-hero";

export const metadata = buildMetadata({
  title: "Contact | Dutch Goose",
  description: "Stel je vraag of stuur een bericht naar Dutch Goose.",
  path: "/contact"
});

type ContactPageProps = {
  searchParams?: {
    status?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const status = searchParams?.status;

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
        {status === "success" ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Je bericht is verstuurd. We reageren zo snel mogelijk.
          </p>
        ) : null}
        {status && status !== "success" ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Versturen is niet gelukt. Probeer het later opnieuw of mail direct naar info@dutchgoose.nl.
          </p>
        ) : null}
        <form action="/api/contact" method="POST" className="space-y-3">
          <input type="hidden" name="formType" value="contact" />
          <input type="hidden" name="redirectTo" value="/contact" />
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
