import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { GA4 } from "@/components/ga4";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dutch Goose | Portal na maagverkleining",
  description: siteConfig.description,
  path: "/"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/deals?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dutch Goose",
    url: siteConfig.url,
    sameAs: [siteConfig.socials.tiktok, siteConfig.socials.instagram]
  };

  return (
    <html lang="nl">
      <body>
        <GA4 />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={orgJsonLd} />
        <Header />
        <main className="container-goose py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
