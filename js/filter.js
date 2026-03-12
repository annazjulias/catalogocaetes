/* ═══════════════════════════════════════
   filter.js — Filtragem por categoria
   Depende de: catalog.js (allProducts, renderGrid)
═══════════════════════════════════════ */

/** Mapa: texto do botão → valor de data-category */
const CATEGORY_MAP = {
  'todos': null,
  'Rosto': 'Rosto',
  'Boca': 'Boca',
  'Olhos': 'Olhos',
  'Acessórios': 'Acessórios',
  'Maquiagem': 'Maquiagem',
};

function resetFilter() {
  const tags = document.querySelectorAll('.cat-tag');
  tags.forEach(t => t.classList.remove('active'));
  const todosTag = document.querySelector('.cat-tag[data-filter="todos"]');
  if (todosTag) todosTag.classList.add('active');
  renderGrid(allProducts);
}

function initFilter() {
  const tags = document.querySelectorAll('.cat-tag');

  tags.forEach(tag => {
    tag.addEventListener('click', function () {
      // Atualiza visual ativo
      tags.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Descobre qual categoria filtrar
      const key = this.dataset.filter || 'todos';
      const cat = CATEGORY_MAP[key] ?? null;

      // Filtra e renderiza
     const filtered = cat
  ? allProducts.filter(p => p.grupo === cat)
  : allProducts;
      renderGrid(filtered);
    });
  });
}

document.addEventListener('DOMContentLoaded', initFilter);
