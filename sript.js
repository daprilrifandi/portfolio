// ----- fitur otomatis mode malam berdasarkan jam -----
(function autoDarkMode() {
  try {
    const h = new Date().getHours();
    if (h >= 18 || h < 6) document.body.classList.add('dark-mode');
  } catch (e) { /* ignore */ }
})();

// ----- shuffle item setiap load (opsional, biar tampil acak) -----
function shuffleGallery(container) {
  const nodes = Array.from(container.children);
  for (let i = nodes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.appendChild(nodes[j]);
  }
}

// ----- intersection observer untuk video autoplay & highlight -----
function setupObservers() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Shuffle dulu biar tidak selalu sama (hapus kalau tidak mau)
  shuffleGallery(gallery);

  // play/pause video & tambahkan class in-view saat cukup terlihat
  const items = gallery.querySelectorAll('.gallery-item');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        el.classList.add('in-view');
        if (el.tagName === 'VIDEO') {
          // pastikan muted supaya browser mengizinkan play()
          el.muted = true;
          el.play().catch(()=>{/* play bisa gagal pada autoplay policy */});
        }
      } else {
        el.classList.remove('in-view');
        if (el.tagName === 'VIDEO') {
          el.pause();
        }
      }
    });
  }, { threshold: [0.5] }); // 50% terlihat dianggap "di-tengah"

  items.forEach(item => {
    // Untuk gambar, saat sudah ter-load, hilangkan background placeholder
    if (item.tagName === 'IMG') {
      if (item.complete) item.classList.add('loaded');
      item.addEventListener('load', () => item.classList.add('loaded'));
    }
    obs.observe(item);
  });
}

// Jalankan saat DOM siap
window.addEventListener('DOMContentLoaded', setupObservers);
