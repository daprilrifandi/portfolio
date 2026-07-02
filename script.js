// Autoplay hanya video yang terlihat di layar
const videos = document.querySelectorAll(".item video");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      if (video.muted) { // autoplay hanya kalau mute
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  });
}, { threshold: 0.6 });

videos.forEach(video => {
  observer.observe(video);
});

// Random urutan item agar setiap load berbeda
const gallery = document.querySelector(".gallery");
const items = Array.from(gallery.children);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(items).forEach(item => gallery.appendChild(item));
