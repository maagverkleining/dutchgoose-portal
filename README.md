# Dutch Goose Portal (Next.js + Netlify)

Complete portal website voor `www.dutchgoose.nl` met routes voor deals, tools, tests, starter kits, kennisbank, community en partners.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Netlify plugin voor Next.js
- JSON data in `/data` (geen CMS)

## Snel starten

1. Installeer dependencies:
   - `npm install`
2. Start lokaal:
   - `npm run dev`
3. Build check:
   - `npm run build`

## Netlify live zetten

1. Push deze repo naar GitHub.
2. Maak een nieuwe Netlify site met die repo.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Netlify detecteert `netlify.toml` en activeert `@netlify/plugin-nextjs`.
5. Deploy en koppel custom domain `www.dutchgoose.nl`.

## Affiliate en tracking

- Alle affiliate uitgaande links lopen via `/go/[slug]`.
- Redirect is `302`.
- Click logging gebeurt via Netlify Function:
  - `netlify/functions/log-click.ts`
- Gelogde velden:
  - `timestamp`
  - `slug`
  - `category`
  - `placement`
  - `ref`
  - `userAgentHash`
  - `country` (optioneel)

## Nieuwe adverteerder toevoegen

Open `/data/merchants.json` en voeg een object toe met velden:

- `name`
- `slug`
- `category`
- `shortPitch`
- `whyForMaagverkleining` (3 bullets)
- `trackingNetwork` (`awin` of `direct`)
- `awinMerchantId` (optioneel)
- `awinTrackingUrl` (optioneel)
- `baseUrl`
- `allowDefaultCode` (boolean)
- `couponCode` (optioneel)
- `couponText` (optioneel)
- `heroImage` (optioneel)
- `isFeatured` (boolean)
- `needsReview` (boolean)

## Waar Awin tracking URL en merchant ID invullen

Per merchant in `/data/merchants.json`:

- `awinMerchantId`: het Awin merchant ID
- `awinTrackingUrl`: de tracking URL uit Awin

De clickref (`dg_[slug]_[placement]_[yyyyMMdd]`) wordt centraal opgebouwd in:

- `src/lib/tracking.ts` (`buildClickRef`)

## Awin import tool

Bestand:

- `tools/import-awin-export.ts`

Gebruik:

1. Zet een Awin export bestand (`.csv`, `.xlsx` of `.xls`) in `/imports`.
2. Run:
   - `npm run import:awin`
3. Script merged nieuwe merchants in `/data/merchants.json` met `needsReview: true`.

## Belangrijke mappen

- `src/app`: alle routes
- `src/components`: UI componenten
- `src/lib`: config, SEO, tracking, data helpers
- `data`: JSON content
- `netlify/functions`: click logging functies
- `tools`: import scripts
