/* ═══════════════════════════════════════
   modal.js — Modal de detalhes do produto
   Depende de: catalog.js (WHATSAPP_NUMBER)
═══════════════════════════════════════ */

const CATALOG_URL = window.location.href; // URL atual do catálogo

/** Abre o modal preenchendo com os dados do produto */
function openModal(product) {
  const modal = document.getElementById('product-modal');
  const overlay = document.getElementById('modal-overlay');

  // Preenche conteúdo
  const modalImg = document.getElementById('modal-img');
  modalImg.src = product.photo;
  modalImg.alt = product.name;
  document.getElementById('modal-cat').textContent = product.categoryLabel;
  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-desc').textContent = product.desc;
  document.getElementById('modal-price').textContent = formatPrice(product.price);

  const oldPriceEl = document.getElementById('modal-old-price');
  if (product.oldPrice) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  const badgeEl = document.getElementById('modal-badge');
  if (product.badge) {
    badgeEl.textContent = product.badge;
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.style.display = 'none';
  }

  // Monta link do WhatsApp
  const msg = buildWhatsAppMessage(product);
  document.getElementById('modal-wa-btn').href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  // Exibe
  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // trava scroll da página
}

/** Fecha o modal */
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = '';
}

/** Monta a mensagem do WhatsApp */
function buildWhatsAppMessage(p) {
  return (
    `Olá! Tenho interesse em um produto do catálogo 💄\n\n` +
    `🛍 Cód: #${String(p.ean).padStart(3, '0')}\n` +
    `📦 Produto: ${p.name}\n` +
    `💰 Preço: ${formatPrice(p.price)}\n\n`
  );
}

/** Inicializa listeners de fechar */
function initModal() {
  // Clique fora do modal (no overlay) fecha
  document.getElementById('modal-overlay').addEventListener('click', closeModal);

  // Impede que clique dentro do modal propague pro overlay
  document.getElementById('product-modal').addEventListener('click', e => e.stopPropagation());
}

document.addEventListener('DOMContentLoaded', initModal);
