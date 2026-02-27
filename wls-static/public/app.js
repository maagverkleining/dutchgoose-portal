const state = {
  catalog: null,
  visible: []
};

const supplierFilter = document.getElementById('supplierFilter');
const formFilter = document.getElementById('formFilter');
const sortBy = document.getElementById('sortBy');
const cardsEl = document.getElementById('cards');
const statsEl = document.getElementById('stats');
const heroMetaEl = document.getElementById('heroMeta');
const priceBody = document.querySelector('#priceTable tbody');
const nutrientHead = document.getElementById('nutrientHead');
const nutrientBody = document.getElementById('nutrientBody');
const sourcesEl = document.getElementById('sources');

function eur(v) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(v);
}

function formatCell(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return '';
  if (Number.isInteger(v)) return String(v);
  return String(v).replace('.', ',');
}

function getSortedOptions(product) {
  const options = (product.packageOptions || [])
    .filter((o) => Number.isFinite(o.count) && o.count > 0 && Number.isFinite(o.price) && o.price > 0)
    .map((o) => ({
      ...o,
      perPill: o.price / o.count
    }))
    .sort((a, b) => a.perPill - b.perPill);

  return options;
}

function bestOption(product) {
  if (product.computed?.cheapestOption) return product.computed.cheapestOption;
  const options = getSortedOptions(product);
  return options[0] || null;
}

function pricePerPill(product) {
  if (Number.isFinite(product.computed?.lowestPricePerPill)) return product.computed.lowestPricePerPill;
  const best = bestOption(product);
  if (!best) return null;
  return best.price / best.count;
}

function formLabel(form) {
  if (form === 'mix') return 'capsule/kauwtablet';
  return form;
}

function getVisibleProducts() {
  if (!state.catalog) return [];
  const supplier = supplierFilter.value;
  const form = formFilter.value;

  let items = state.catalog.products.filter((p) => {
    if (supplier !== 'all' && p.supplier !== supplier) return false;
    if (form !== 'all' && p.form !== form) return false;
    return true;
  });

  items = items.sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name, 'nl');
    if (sortBy.value === 'pot') {
      const aMax = Math.max(...(a.packageOptions || []).map((o) => o.count));
      const bMax = Math.max(...(b.packageOptions || []).map((o) => o.count));
      return bMax - aMax;
    }

    const aP = pricePerPill(a) ?? 999;
    const bP = pricePerPill(b) ?? 999;
    return aP - bP;
  });

  return items;
}

function renderCards(items) {
  cardsEl.innerHTML = items.map((p) => {
    const best = bestOption(p);
    const ppp = pricePerPill(p);
    const options = getSortedOptions(p).map((o) => `${o.label || `${o.count} stuks`}: ${eur(o.price)} (${eur(o.perPill)}/pil)`).join(' | ');

    return `
      <article class="card">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div class="supplier">${p.supplier}</div>
          <h3 class="title">${p.name}</h3>
          <div class="facts">
            <span class="pill">${formLabel(p.form)}</span>
            <span class="pill">${p.packageOptions?.length || 0} verpakkingen</span>
          </div>
          <div class="price">Laagste prijs/pil: <span class="ppp">${ppp !== null ? eur(ppp) : 'n.v.t.'}</span></div>
          <div class="best">Goedkoopste pot: ${best ? `${best.count} stuks voor ${eur(best.price)}` : 'n.v.t.'}</div>
          <div class="options">Varianten: ${options || 'n.v.t.'}</div>
          <a class="buy" href="${p.orderUrl}" target="_blank" rel="noopener noreferrer">Bekijk prijs en bestel nu</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderPriceTable(items) {
  priceBody.innerHTML = items.map((p) => {
    const best = bestOption(p);
    const ppp = pricePerPill(p);
    return `
      <tr>
        <td>${p.supplier}</td>
        <td>${p.name}</td>
        <td>${formLabel(p.form)}</td>
        <td>${best ? `${best.count} stuks (${eur(best.price)})` : 'n.v.t.'}</td>
        <td>${ppp !== null ? eur(ppp) : 'n.v.t.'}</td>
        <td><a class="table-buy" href="${p.orderUrl}" target="_blank" rel="noopener noreferrer">Bestel direct</a></td>
      </tr>
    `;
  }).join('');
}

function renderNutrientMatrix(items) {
  const labels = state.catalog.nutrientLabels || {};
  const nutrientKeys = state.catalog.nutrients || [];

  nutrientHead.innerHTML = `
    <th>Voedingsstof</th>
    ${items.map((p) => `<th>${p.supplier}<br>${p.name}</th>`).join('')}
  `;

  nutrientBody.innerHTML = nutrientKeys.map((key) => {
    const rowLabel = labels[key] || key;
    const cols = items.map((p) => {
      const v = p.nutrients ? p.nutrients[key] : null;
      return `<td>${formatCell(v)}</td>`;
    }).join('');

    return `
      <tr>
        <td><strong>${rowLabel}</strong></td>
        ${cols}
      </tr>
    `;
  }).join('');
}

function renderSources() {
  const sourceList = state.catalog.sources || [];
  sourcesEl.innerHTML = sourceList.map((src) => `<div class="source-item"><a href="${src}" target="_blank" rel="noopener noreferrer">${src}</a></div>`).join('');
}

function renderMeta() {
  const chips = [];
  if (state.catalog.lastCalculatedAt) {
    chips.push(`Laatste berekening: ${new Date(state.catalog.lastCalculatedAt).toLocaleString('nl-NL')}`);
  }
  if (state.catalog.runtimeMeta?.refreshedAt) {
    chips.push(`Prijs-refresh: ${new Date(state.catalog.runtimeMeta.refreshedAt).toLocaleString('nl-NL')}`);
  }
  chips.push(`${state.catalog.products.length} producten`);
  heroMetaEl.innerHTML = chips.map((c) => `<span class="chip">${c}</span>`).join('');
}

function render() {
  const items = getVisibleProducts();
  state.visible = items;

  statsEl.textContent = `${items.length} producten zichtbaar`;
  renderCards(items);
  renderPriceTable(items);
  renderNutrientMatrix(items);
}

function setupFilters() {
  const suppliers = [...new Set(state.catalog.products.map((p) => p.supplier))].sort((a, b) => a.localeCompare(b, 'nl'));
  supplierFilter.innerHTML = '<option value="all">Alle leveranciers</option>' + suppliers.map((s) => `<option value="${s}">${s}</option>`).join('');

  supplierFilter.addEventListener('change', render);
  formFilter.addEventListener('change', render);
  sortBy.addEventListener('change', render);
}

async function init() {
  const embedded = window.__WLS_CATALOG || null;

  if (window.location.protocol === 'file:' && embedded) {
    state.catalog = embedded;
  } else {
    try {
      const res = await fetch('/api/catalog');
      if (!res.ok) throw new Error('Kon catalog niet ophalen');
      state.catalog = await res.json();
    } catch (_) {
      if (embedded) {
        state.catalog = embedded;
      } else {
        throw new Error('Kon catalog niet ophalen');
      }
    }
  }

  setupFilters();
  renderMeta();
  render();
  renderSources();
}

init().catch((err) => {
  cardsEl.innerHTML = `<article class="panel"><h2>Fout</h2><p class="note">${err.message}</p></article>`;
});
