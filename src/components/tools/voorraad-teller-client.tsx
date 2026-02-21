"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function VoorraadTellerClient() {
  const [potmaat, setPotmaat] = useState(900);
  const [dosering, setDosering] = useState(30);

  const days = useMemo(() => {
    if (!potmaat || !dosering) {
      return 0;
    }
    return Math.floor(potmaat / dosering);
  }, [dosering, potmaat]);

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Voorraad teller" }
        ]}
      />
      <h1 className="text-3xl font-bold text-gooseNavy">Voorraad teller</h1>
      <section className="card space-y-4">
        <label className="block text-sm font-medium">
          Potmaat (gram)
          <input
            aria-label="Potmaat in gram"
            type="number"
            value={potmaat}
            onChange={(event) => setPotmaat(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Dosering per dag (gram)
          <input
            aria-label="Dosering per dag"
            type="number"
            value={dosering}
            onChange={(event) => setDosering(Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <p className="rounded-goose bg-gooseBanana/40 p-4 text-lg font-semibold text-gooseNavy">
          Je voorraad gaat ongeveer {days} dagen mee.
        </p>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold text-gooseNavy">Reminder aanvragen</h2>
        <form name="voorraad-reminder" method="POST" data-netlify="true" className="mt-3 space-y-3">
          <input type="hidden" name="form-name" value="voorraad-reminder" />
          <label className="block text-sm font-medium">
            E-mail
            <input
              required
              type="email"
              name="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <button className="btn-primary text-xs" type="submit">
            Stuur reminder
          </button>
        </form>
      </section>
    </div>
  );
}
