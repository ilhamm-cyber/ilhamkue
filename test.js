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

// --- FITUR TAMBAH PRODUK (LOCALSTORAGE) ---

const addProductBtn = document.getElementById("open-add-product-modal");
const closeAddProductBtn = document.getElementById("close-add-product-modal");
const addProductModal = document.getElementById("add-product-modal");
const addProductForm = document.getElementById("add-product-form");
const productList = document.getElementById("product-list");

// Buka modal
if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
        addProductModal.classList.remove("hidden");
        addProductModal.classList.add("flex");
    });
}

// Tutup modal
if (closeAddProductBtn) {
    closeAddProductBtn.addEventListener("click", () => {
        addProductModal.classList.add("hidden");
        addProductModal.classList.remove("flex");
    });
}

// Format link WhatsApp otomatis
function getWhatsAppLink(name, price) {
    const message = `Halo kak 👋\nSaya ingin memesan produk berikut di Rollin Bakery:\n\n🛒 ${name}\n💰 Harga: ${price}\n\nMohon info ketersediaan & cara pembayarannya ya.\nTerima kasih 🙏`;
    return `https://wa.me/6281574754392?text=${encodeURIComponent(message)}`;
}

// Render produk dari LocalStorage
function renderCustomProducts() {
    const products = JSON.parse(localStorage.getItem("customProducts") || "[]");
    
    // Hapus custom product sebelumnya jika ada (biar ngga duplikat kalau dirender ulang)
    const customElements = document.querySelectorAll('.custom-product');
    customElements.forEach(el => el.remove());

    products.forEach((product) => {
        const productHTML = `
            <div class="custom-product group bg-white p-4 rounded-[2rem] hover:shadow-xl transition duration-300 border border-transparent hover:border-orange-300 relative">
                <button onclick="deleteProduct('${product.id}')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition z-10 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <div class="h-64 overflow-hidden rounded-[1.5rem] mb-6 bg-gray-100 flex items-center justify-center">
                    <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="${product.name}" />
                </div>
                <div class="px-2 pb-4">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xl font-bold font-serif text-bakery-dark">${product.name}</h3>
                        <span class="font-bold text-red-500">${product.price}</span>
                    </div>
                    <p class="text-gray-500 text-sm mb-4">${product.desc}</p>
                    <a href="${getWhatsAppLink(product.name, product.price)}" target="_blank" class="block w-full text-center py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 transition duration-300 hover:bg-[#60A5FA] hover:text-white hover:border-[#60A5FA] hover:scale-105 hover:shadow-md">
                        Pesan Sekarang
                    </a>
                </div>
            </div>
        `;
        if (productList) {
            productList.insertAdjacentHTML('beforeend', productHTML);
        }
    });
}

// Hapus produk
window.deleteProduct = function(id) {
    if(confirm('Apakah kamu yakin ingin menghapus produk ini?')) {
        let products = JSON.parse(localStorage.getItem("customProducts") || "[]");
        products = products.filter(p => p.id !== id);
        localStorage.setItem("customProducts", JSON.stringify(products));
        renderCustomProducts();
    }
}

// Handle form submit
if (addProductForm) {
    addProductForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const desc = document.getElementById("product-desc").value;
        const fileInput = document.getElementById("product-image");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                
                const newProduct = {
                    id: 'prod_' + Date.now(),
                    name: name,
                    price: price,
                    desc: desc,
                    image: base64Image
                };

                const products = JSON.parse(localStorage.getItem("customProducts") || "[]");
                products.push(newProduct);
                localStorage.setItem("customProducts", JSON.stringify(products));

                // Reset form & tutup modal
                addProductForm.reset();
                addProductModal.classList.add("hidden");
                addProductModal.classList.remove("flex");

                // Render ulang produk custom
                renderCustomProducts();
                
                alert("Produk berhasil ditambahkan!");
            };
            reader.readAsDataURL(file);
        }
    });
}

// Render awal
document.addEventListener("DOMContentLoaded", () => {
    renderCustomProducts();
});
