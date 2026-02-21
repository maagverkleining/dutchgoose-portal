"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mainNav, megaMenu } from "@/lib/navigation";
import { BananaIcon, KiwiIcon } from "@/components/icons";
import { AnimatedOrigamiGoose } from "@/components/animated-origami-goose";

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const quickLinks = useMemo(() => {
    const entries = megaMenu.flatMap((group) => group.links);
    const lowered = query.toLowerCase();
    if (!lowered) {
      return entries.slice(0, 6);
    }
    return entries
      .filter((item) => item.label.toLowerCase().includes(lowered))
      .slice(0, 6);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-goose py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gooseNavy">
            <AnimatedOrigamiGoose className="h-16 w-36" /> Dutch Goose
          </Link>
          <span className="hidden rounded-full bg-gooseKiwi/20 px-3 py-1 text-xs font-semibold text-gooseNavy sm:inline-flex">
            BariBuddies <KiwiIcon /> <BananaIcon />
          </span>
          <form action="/deals" className="relative ml-auto w-full min-w-52 flex-1 sm:max-w-sm" role="search">
            <input
              aria-label="Zoek in portal"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-gooseNavy focus:outline-none"
              placeholder="Zoek deals, tools, partners"
            />
            {query ? (
              <div className="absolute left-0 right-0 top-12 rounded-goose border border-slate-200 bg-white p-3 shadow-card">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Snelle links</p>
                <ul className="space-y-1 text-sm">
                  {quickLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </form>
          <button
            className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="main-nav"
          >
            Menu
          </button>
        </div>
        <nav
          id="main-nav"
          className={`mt-3 ${open ? "block" : "hidden"} lg:block`}
          aria-label="Hoofdmenu"
        >
          <ul className="flex flex-wrap gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gooseNavy hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-3 hidden rounded-goose border border-slate-200 bg-slate-50 p-3 lg:block">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Mega menu</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {megaMenu.map((group) => (
              <section key={group.title}>
                <h3 className="mb-1 text-sm font-semibold text-gooseNavy">{group.title}</h3>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-600 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
