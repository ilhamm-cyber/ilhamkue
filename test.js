const hamburgerBtn = document.getElementById("hamburger-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay"); // Ambil elemen overlay
const mobileLinks = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  // 1. Toggle posisi Menu (Keluar/Masuk)
  // Kalau ada class translate-x-full, dia di luar kanan. Kalau dihapus, dia masuk ke layar (0).
  mobileMenu.classList.toggle("translate-x-full");

  // 2. Toggle Overlay (Latar belakang gelap)
  // Kalau overlay pakai hidden, gapapa transisi kasar, yang penting menunya halus.
  if (overlay) {
    overlay.classList.toggle("hidden");
  }
}

// Event Listeners
if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleMenu);
if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
if (overlay) overlay.addEventListener("click", toggleMenu); // Klik luar menu untuk tutup

// Tutup menu saat link diklik
mobileLinks.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});
