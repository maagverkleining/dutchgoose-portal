import Link from "next/link";
import { disclosureLine, siteConfig } from "@/lib/site";

const links = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Disclosure", href: "/disclosure" },
  { label: "Voorwaarden", href: "/voorwaarden" }
];

export function Footer() {
  return (
    <footer className="mt-16 bg-gooseNavy text-slate-100">
      <div className="container-goose py-10">
        <p className="mb-6 rounded-goose bg-white/10 p-3 text-sm text-slate-100">{disclosureLine}</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h2 className="mb-3 text-lg font-semibold">Dutch Goose</h2>
            <p className="text-sm text-slate-200">
              Jouw portal na maagverkleining. Praktisch, eerlijk en community first.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Snel naar</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/start" className="text-slate-100 hover:underline">
                  Begin hier
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-slate-100 hover:underline">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-slate-100 hover:underline">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-100 hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Juridisch</h2>
            <ul className="space-y-2 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-100 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Social</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-slate-100 hover:underline" href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer">
                  TikTok
                </a>
              </li>
              <li>
                <a className="text-slate-100 hover:underline" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
}
