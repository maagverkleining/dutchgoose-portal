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
      <p className="text-sm text-slate-700">Vitamines staat op een apart domein en opent extern.</p>
      <section className="card space-y-3">
        <p className="text-sm text-slate-700">
          Voor vitamines ga je naar de losse site:
          {" "}
          <a
            className="font-semibold"
            href="https://www.maagverkleiningvitaminen.nl/"
            target="_blank"
            rel="noreferrer"
          >
            www.maagverkleiningvitaminen.nl
          </a>
        </p>
        <a
          className="btn-primary text-xs"
          href="https://www.maagverkleiningvitaminen.nl/"
          target="_blank"
          rel="noreferrer"
        >
          Open vitamines-site
        </a>
      </section>
    </div>
  );
}
