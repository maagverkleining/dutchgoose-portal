# Google Statistieken Setup (GA4 + Search Console)

## 1) GA4 aanzetten op de site

1. Maak of open je GA4 property in Google Analytics.
2. Kopieer je Measurement ID (vorm: `G-XXXXXXXXXX`).
3. Zet die in:
   - `wls-static/public/site-config.js`

Voorbeeld:

```js
window.WLS_SITE_CONFIG = {
  ga4MeasurementId: "G-XXXXXXXXXX",
};
```

Na deploy zie je in GA4 realtime verkeer + events.

## 2) Welke events worden gemeten

- `affiliate_click`
  - Klik op productknoppen zoals "Bekijk prijs en bestel nu" en "Bestel direct".
- `outbound_click`
  - Uitgaande links naar externe domeinen.
- `internal_nav_click`
  - Interne navigatie-ankers (zoals `#cards`).

Belangrijke event-velden:

- `page_path`
- `link_url`
- `link_domain`
- `link_text`
- `placement`
- `supplier`
- `product_id`

## 3) Zoekwoorden en SEO-data (Search Console)

1. Open Google Search Console.
2. Voeg `maagverkleiningvitaminen.nl` toe als **Domain property**.
3. Verifieer via DNS TXT-record (aanbevolen).
4. In Search Console -> **Prestaties** zie je:
   - zoekwoorden
   - klikken
   - vertoningen
   - CTR
   - gemiddelde positie

## 4) Snelste dashboard-combinatie

- GA4: gedrag + events + verkeer
- Search Console: organische zoekwoorden + ranking
- Koppel beide in Looker Studio voor 1 overzicht.
