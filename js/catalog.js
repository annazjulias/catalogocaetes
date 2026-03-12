/* ═══════════════════════════════════════
   catalog.js — Carrega e renderiza produtos
   do arquivo data/products.json
═══════════════════════════════════════ */

const WHATSAPP_NUMBER = '553599227098';

let allProducts = [];

function formatPrice(n){

  if(n === null || n === undefined)
  return "R$ --";

  return Number(n).toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  });

}

function buildCard(p) {
  window.__products = window.__products || {};
  window.__products[p.id] = p;

  const clickAttr = `onclick="openModal(window.__products[${p.id}])" style="cursor:pointer"`;

  if (p.featured) {
    return `
      <div class="product-card featured" data-category="${p.grupo}" ${clickAttr}>
        <img class="product-img" src="${p.photo}" alt="${p.name}">
        <div class="product-info">
          <div class="product-cat">Destaque da semana</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.marca}</div>
          <div class="product-price-row">
            <div class="product-price">${formatPrice(p.price)}</div>
            ${p.oldPrice ? `<div class="product-old">${formatPrice(p.oldPrice)}</div>` : ''}
          </div>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>`;
  }

  return `
    <div class="product-card" data-category="${p.grupo}" ${clickAttr}>
      <img class="product-img" src="${p.photo}" alt="${p.name}">
      <div class="product-info">
        <div class="product-cat">${p.categoryLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.marca}</div>
        <div class="product-price-row">
          <div class="product-price">${formatPrice(p.price)}</div>
          ${p.oldPrice ? `<div class="product-old">${formatPrice(p.oldPrice)}</div>` : ''}
        </div>
      </div>
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
    </div>`;
}

function renderGrid(products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span style="font-size:36px">🔍</span>
        <p>Nenhum produto nessa categoria no momento.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(buildCard).join('');
}
async function initCatalog() {
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:span 2;opacity:0.5">
        <span style="font-size:36px">⏳</span>
        <p>Carregando produtos...</p>
      </div>`;
  }
  try {
    const res = await fetch('./data/products.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allProducts = await res.json();
    renderGrid(allProducts);
  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
    if (grid) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:span 2">
          <span style="font-size:36px">😕</span>
          <p>Não foi possível carregar os produtos. Tente novamente.</p>
        </div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', initCatalog);