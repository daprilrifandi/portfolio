document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".gallery img, .gallery video");
  items.forEach(item => {
    item.addEventListener("load", () => {
      item.classList.add("loaded");
    });
  });
});
