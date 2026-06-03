function money(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

const products = [
  { id: 1, title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id", price: 95000, image: "./assets/product-demam-bola.jpg" },
  { id: 2, title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", price: 175000, oldPrice: 229000, image: "./assets/product-bobo-origin.jpg" },
  { id: 3, title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium", price: 99000, oldPrice: 125000, image: "./assets/product-pesta-bola.jpg" },
  { id: 4, title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", price: 149000, oldPrice: 229000, image: "./assets/product-bobo-origin.jpg" },
  { id: 5, title: "Harian Kompas Akhir Pekan + Kompas.id", startingPrice: true, price: 175000, image: "./assets/product-harian-kompas.jpeg" },
  { id: 6, title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026", price: 50000, image: "./assets/product-pesta-bola.jpg" },
  { id: 7, title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu", price: 199000, image: "./assets/product-kaus-kompas.png" },
  { id: 8, title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian", price: 169000, image: "./assets/product-papa-francesco.jpeg" },
  { id: 9, title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id", price: 95000, image: "./assets/product-demam-bola.jpg" },
  { id: 10, title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", price: 175000, oldPrice: 229000, image: "./assets/product-bobo-origin.jpg" },
  { id: 11, title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium", price: 99000, oldPrice: 125000, image: "./assets/product-pesta-bola.jpg" },
  { id: 12, title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", price: 149000, oldPrice: 229000, image: "./assets/product-bobo-origin.jpg" },
  { id: 13, title: "Harian Kompas Akhir Pekan + Kompas.id", startingPrice: true, price: 175000, image: "./assets/product-harian-kompas.jpeg" },
  { id: 14, title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026", price: 50000, image: "./assets/product-pesta-bola.jpg" },
  { id: 15, title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu", price: 199000, image: "./assets/product-kaus-kompas.png" },
  { id: 16, title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian", price: 169000, image: "./assets/product-papa-francesco.jpeg" },
];

const params = new URLSearchParams(window.location.search);
let query = params.get("q") || "";
const wishlist = new Set();
const searchInput = document.querySelector("#searchPageInput");
const submitSearch = document.querySelector("#submitSearchPage");
const clearSearch = document.querySelector("#clearSearchPage");
const resultsTitle = document.querySelector("#searchResultsTitle");
const resultsCount = document.querySelector("#searchResultsCount");
const resultsGrid = document.querySelector("#searchResultsGrid");
const emptyState = document.querySelector("#searchResultsEmpty");
const authActions = document.querySelector("#searchAuthActions");
const accountAvatar = document.querySelector("#searchAccountAvatar");
const topbar = document.querySelector(".topbar");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
const closeSearchMobile = document.querySelector("#closeSearchMobile");

function getStoredValue(key) {
  try {
    const localValue = localStorage.getItem(key);
    if (localValue !== null) return localValue;
  } catch {
    // Keep file:// usable if storage is restricted.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    return tabState[key] ?? null;
  } catch {
    return null;
  }
}

function setHeaderLoginState() {
  const isLoggedIn = getStoredValue("geraiLoggedIn") === "true";
  authActions.classList.toggle("hidden", isLoggedIn);
  accountAvatar.classList.toggle("hidden", !isLoggedIn);
}

function productCardTemplate(product) {
  const rating = 4.9;
  const reviews = 120;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `
    <article class="product-card" tabindex="0" aria-label="Lihat detail ${product.title}">
      <div class="product-media">
        <a class="product-detail-link media-link" href="./detail.html?id=${product.id}" aria-label="Lihat detail ${product.title}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        ${discount ? `<span class="product-discount">${discount}%</span>` : ""}
        <button class="icon-button wishlist ${wishlist.has(product.id) ? "active" : ""}" data-wishlist="${product.id}" type="button" aria-label="Tambahkan ke wishlist"><i class="ph ph-heart" aria-hidden="true"></i></button>
      </div>
      <div class="product-body">
        <a class="product-detail-link product-info-link" href="./detail.html?id=${product.id}">
          <span class="product-tag">Produk</span>
          <p class="product-title">${product.title}</p>
          <div class="rating" aria-label="Rating ${rating} dari 5">
            <i class="ph-fill ph-star" aria-hidden="true"></i>
            <span>${rating.toFixed(1)} (${reviews})</span>
          </div>
          <div class="price-row">
            ${product.startingPrice ? `<span class="price-prefix">Harga mulai</span>` : ""}
            <strong class="price">${money(product.price)}</strong>
            ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
          </div>
        </a>
      </div>
    </article>
  `;
}

function renderResults() {
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = normalizedQuery
    ? products.filter((product) => product.title.toLowerCase().includes(normalizedQuery))
    : products;

  document.title = query ? `Hasil pencarian "${query}" - Gerai Kompas` : "Hasil pencarian - Gerai Kompas";
  resultsTitle.textContent = query ? `“${query}”` : "Semua produk";
  resultsCount.textContent = `${visibleProducts.length} produk ditemukan`;
  resultsGrid.innerHTML = visibleProducts.map(productCardTemplate).join("");
  emptyState.classList.toggle("hidden", visibleProducts.length > 0);
}

function submitQuery() {
  const nextQuery = searchInput.value.trim();
  if (!nextQuery) return;
  window.location.href = `./search.html?q=${encodeURIComponent(nextQuery)}`;
}

function showWishlistToast() {
  const toast = document.querySelector("[data-wishlist-toast]");
  toast.classList.add("show");
  window.clearTimeout(showWishlistToast.timeout);
  showWishlistToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

searchInput.value = query;
clearSearch.classList.toggle("hidden", !query);
renderResults();
setHeaderLoginState();

searchInput.addEventListener("input", (event) => {
  clearSearch.classList.toggle("hidden", !event.target.value.trim());
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitQuery();
  }

  if (event.key === "Escape") {
    topbar.classList.remove("search-open");
  }
});

submitSearch.addEventListener("click", submitQuery);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.classList.add("hidden");
  searchInput.focus();
});

mobileSearchToggle.addEventListener("click", () => {
  topbar.classList.add("search-open");
  searchInput.focus();
});

closeSearchMobile.addEventListener("click", () => {
  topbar.classList.remove("search-open");
});

resultsGrid.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest("[data-wishlist]");
  if (!wishlistButton) return;
  const id = Number(wishlistButton.dataset.wishlist);
  if (wishlist.has(id)) {
    wishlist.delete(id);
  } else {
    wishlist.add(id);
    showWishlistToast();
  }
  wishlistButton.classList.toggle("active", wishlist.has(id));
});
