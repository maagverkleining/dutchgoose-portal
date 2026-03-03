#!/usr/bin/env node

import fs from 'node:fs/promises';

const CATALOG_PATH = 'wls-static/public/catalog-data.js';
const REQUEST_TIMEOUT_MS = 20000;

function amsterdamDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Amsterdam',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

function parseCatalogJs(raw) {
  const match = raw.match(/window\.__WLS_CATALOG\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
  if (!match) throw new Error('Kon window.__WLS_CATALOG niet parsen.');
  return JSON.parse(match[1]);
}

function serializeCatalogJs(catalog) {
  return `window.__WLS_CATALOG = ${JSON.stringify(catalog, null, 2)}\n;\n`;
}

function parseEuroToNumber(value) {
  if (!value) return null;
  const normalized = String(value).replace(/\s/g, '').replace(',', '.');
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

function cleanHtml(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&euro;/gi, '€')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectJsonLdCandidates(html) {
  const out = [];
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  function walk(node, contextText = '') {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach((n) => walk(n, contextText));
      return;
    }
    if (typeof node !== 'object') return;

    const typeRaw = node['@type'];
    const types = Array.isArray(typeRaw) ? typeRaw : [typeRaw];
    const isOffer = types.some((t) => String(t || '').toLowerCase().includes('offer'));

    if (isOffer && node.price !== undefined) {
      const price = parseEuroToNumber(node.price);
      if (price !== null) {
        const snippet = [
          contextText,
          node.name,
          node.description,
          node.sku,
          node.url,
          node.eligibleQuantity?.value
        ]
          .filter(Boolean)
          .join(' | ')
          .toLowerCase();
        out.push({ price, snippet, source: 'jsonld' });
      }
    }

    const nestedKeys = ['offers', 'hasOfferCatalog', 'itemListElement'];
    nestedKeys.forEach((key) => {
      if (node[key]) walk(node[key], `${contextText} ${node.name || ''}`.trim());
    });
  }

  for (const block of blocks) {
    const raw = block[1]?.trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      walk(parsed);
    } catch {
      // ignore malformed blocks
    }
  }

  return out;
}

function collectTextCandidates(html) {
  const out = [];
  const plain = cleanHtml(html);
  const regex = /(€|EUR\s?)([0-9]{1,4}(?:[\.,][0-9]{2})?)/gi;
  let m;
  while ((m = regex.exec(plain)) !== null) {
    const price = parseEuroToNumber(m[2]);
    if (price === null) continue;
    const start = Math.max(0, m.index - 80);
    const end = Math.min(plain.length, regex.lastIndex + 80);
    const snippet = plain.slice(start, end).toLowerCase();
    out.push({ price, snippet, source: 'text' });
  }
  return out;
}

function sanitizeCandidates(candidates) {
  const filtered = candidates.filter((c) => Number.isFinite(c.price) && c.price >= 1 && c.price <= 250);
  const uniq = new Map();
  for (const c of filtered) {
    const key = `${c.price.toFixed(2)}|${c.snippet.slice(0, 80)}`;
    if (!uniq.has(key)) uniq.set(key, c);
  }
  return [...uniq.values()];
}

function optionCountRegex(option) {
  const n = Number(option.count);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new RegExp(`\\b${n}\\b`);
}

function chooseCandidateForOption(option, candidates, usedIndexes) {
  const countRe = optionCountRegex(option);
  const current = Number(option.price);

  const scored = candidates
    .map((cand, idx) => {
      if (usedIndexes.has(idx)) return null;
      let score = 0;
      if (countRe && countRe.test(cand.snippet)) score += 6;
      if (/caps|capsule|tablet|kauw|stuks|verpakking|pot/.test(cand.snippet)) score += 1;
      if (Number.isFinite(current)) {
        const rel = Math.abs(cand.price - current) / Math.max(current, 1);
        score += Math.max(0, 2 - rel * 3);
      }
      return { idx, cand, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  const best = scored[0];
  if (best.score < 2.5) return null;

  usedIndexes.add(best.idx);
  return best.cand;
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; WLSPriceRefreshBot/1.0; +https://www.maagverkleiningvitaminen.nl)'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const raw = await fs.readFile(CATALOG_PATH, 'utf8');
  const catalog = parseCatalogJs(raw);

  const bySource = new Map();
  for (const product of catalog.products || []) {
    const url = product.sourceUrl || product.orderUrl;
    if (!url) continue;
    if (!bySource.has(url)) bySource.set(url, []);
    bySource.get(url).push(product);
  }

  const report = {
    scannedSources: 0,
    updatedProducts: 0,
    updatedOptions: 0,
    sourceErrors: []
  };

  for (const [url, products] of bySource.entries()) {
    report.scannedSources += 1;
    let html;
    try {
      html = await fetchHtml(url);
    } catch (err) {
      report.sourceErrors.push(`${url}: ${String(err.message || err)}`);
      continue;
    }

    const candidates = sanitizeCandidates([
      ...collectJsonLdCandidates(html),
      ...collectTextCandidates(html)
    ]);

    if (!candidates.length) continue;

    for (const product of products) {
      const options = Array.isArray(product.packageOptions) ? product.packageOptions : [];
      if (!options.length) continue;

      const usedIndexes = new Set();
      let localUpdates = 0;

      for (const option of options) {
        const picked = chooseCandidateForOption(option, candidates, usedIndexes);
        if (!picked) continue;

        const oldPrice = Number(option.price);
        const newPrice = Number(picked.price.toFixed(2));
        if (!Number.isFinite(oldPrice)) continue;

        const relDiff = Math.abs(newPrice - oldPrice) / Math.max(oldPrice, 1);
        if (relDiff > 0.75) continue;

        if (newPrice !== oldPrice) {
          option.price = newPrice;
          localUpdates += 1;
          report.updatedOptions += 1;
        }
      }

      if (localUpdates > 0) report.updatedProducts += 1;
    }
  }

  const now = new Date();
  catalog.generatedAt = amsterdamDateString(now);
  catalog.runtimeMeta = {
    ...(catalog.runtimeMeta || {}),
    refreshedAt: now.toISOString(),
    refreshType: 'automatisch',
    refreshedBy: 'daily-github-action'
  };

  await fs.writeFile(CATALOG_PATH, serializeCatalogJs(catalog), 'utf8');

  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
