// Acak urutan galeri
function shuffleGallery() {
  const gallery = document.getElementById("gallery");
  const items = Array.from(gallery.children);

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    gallery.appendChild(items[j]);
  }
}

// Pause otomatis video lain saat ada yang diputar
function setupVideoPause() {
  const videos = document.querySelectorAll("video");

  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(v => {
        if (v !== video) {
          v.pause();
        }
      });
    });
  });
}

// Autoplay hanya saat video terlihat di tengah layar
function setupAutoplayOnScroll() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(video => observer.observe(video));
}

window.addEventListener("load", () => {
  shuffleGallery();
  setupVideoPause();
  setupAutoplayOnScroll();
});
