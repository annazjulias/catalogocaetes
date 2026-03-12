/* ═══════════════════════════════════════
   app.js — Navegação entre páginas e Share
═══════════════════════════════════════ */

/** Alterna entre as abas (Catálogo / Promoções) */
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('visible');
  el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Reseta filtro ao voltar para o catálogo
  if (id === 'p1' && typeof resetFilter === 'function') resetFilter();
  return false;
}

/** Web Share API com fallback para clipboard */
function shareLink() {
  const txt = '🌸 Confira a Semana da Maquiagem da Farmácia Atakado! Descontos incríveis só essa semana 💄✨';
  if (navigator.share) {
    navigator.share({
      title: 'Semana da Maquiagem 💄',
      text: txt,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(txt + '\n' + window.location.href)
      .then(() => alert('Link copiado! Cole no WhatsApp 😊'));
  }
}
