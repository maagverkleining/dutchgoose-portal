import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GoLink } from "@/components/go-link";
import { JsonLd } from "@/components/json-ld";
import { PartnerDisclosure } from "@/components/partner-disclosure";
import { ConversionBlock } from "@/components/conversion-block";
import { MerchantThumbnail } from "@/components/merchant-thumbnail";
import { SmartAffiliateBlock } from "@/components/smart-affiliate-block";
import { merchantMap, merchants, deals } from "@/lib/data";
import { getCategoryIllustration } from "@/lib/illustrations";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return merchants.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const merchant = merchantMap.get(params.slug);
  if (!merchant) {
    return buildMetadata({ title: "Partner", description: "Partner", path: "/partners" });
  }
  return buildMetadata({
    title: `${merchant.name} partner pagina | Dutch Goose`,
    description: merchant.shortPitch,
    path: `/partners/${merchant.slug}`
  });
}

export default function PartnerDetailPage({ params }: { params: { slug: string } }) {
  const merchant = merchantMap.get(params.slug);
  if (!merchant) {
    notFound();
  }

  const relatedDeals = deals.filter((deal) => deal.merchantSlug === merchant.slug);
  const faqs = [
    {
      question: `Voor wie is ${merchant.name}?`,
      answer: `${merchant.name} is handig voor mensen die structuur en praktische keuzes zoeken na een maagverkleining.`
    },
    {
      question: "Hoe bestel ik slim?",
      answer: "Klik via de Dutch Goose link, check of er een code staat en vergelijk de productlabels voor je bestelt."
    },
    {
      question: "Wat als er geen code staat?",
      answer: "Dan loopt de deal via partnerlink. Check de shop voor lopende acties."
    }
  ];

  return (
    <div className="space-y-6">
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Partners", href: "/partners" },
          { label: merchant.name }
        ]}
      />
      <div className="flex items-center gap-3">
        <MerchantThumbnail merchant={merchant} size="lg" />
        <h1 className="text-3xl font-bold text-gooseNavy">{merchant.name}</h1>
      </div>
      <img
        src={getCategoryIllustration(merchant.category)}
        alt={`Visual ${merchant.name}`}
        className="w-full rounded-2xl border border-slate-200"
      />
      <p className="text-slate-700">{merchant.shortPitch}</p>

      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Voor wie</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          {merchant.whyForMaagverkleining.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Waarom handig na maagverkleining</h2>
        <p className="mt-2 text-slate-700">
          Heldere labels, praktische keuzes en vaak snelle levering. Zo houd je je ritme eenvoudiger vol.
        </p>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Hoe bestel je</h2>
        <p className="mt-2 text-slate-700">Open de partnerlink, check code of actie, rond af in de shop.</p>
        <GoLink slug={merchant.slug} placement="partner-card" className="btn-primary mt-4 text-xs">
          Naar partner
        </GoLink>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Deal uitleg</h2>
        <p className="mt-2 text-slate-700">
          Via Dutch Goose pak je korting als er een code of actie is.
        </p>
        {relatedDeals.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {relatedDeals.map((deal) => (
              <li key={deal.slug}>{deal.title}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gooseNavy">FAQ</h2>
        {faqs.map((faq) => (
          <article className="card" key={faq.question}>
            <h3 className="font-semibold text-gooseNavy">{faq.question}</h3>
            <p className="mt-2 text-sm text-slate-700">{faq.answer}</p>
          </article>
        ))}
      </section>

      <PartnerDisclosure />
      <SmartAffiliateBlock contextKey="deals-default" title="Vergelijkbare partnerdeals" />
      <ConversionBlock variant="community" context={`partner-${merchant.slug}`} />
    </div>
  );
}
