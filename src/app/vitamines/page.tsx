import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vitamines | Dutch Goose",
  description: "Vitamines omgeving van Dutch Goose binnen de portal.",
  path: "/vitamines"
});

export default function VitaminesPage() {
  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Vitamines" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Vitamines</h1>
      <p className="text-sm text-slate-700">
        Je blijft op dutchgoose.nl. De vitamines omgeving opent hieronder.
      </p>
      <section className="overflow-hidden rounded-goose border border-slate-200 bg-white">
        <iframe
          src="https://dutchgoose-wls.netlify.app/"
          title="Dutch Goose Vitamines"
          className="h-[78vh] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
