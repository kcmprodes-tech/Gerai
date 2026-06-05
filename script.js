function money(value) {
  return `Rp${value.toLocaleString("id-ID", {
    maximumFractionDigits: 0,
  })}`;
}

const categories = [
  {
    name: "Promo Spesial",
    subtitle: "Penawaran terbatas",
    image: "./assets/category-diskon.png",
    tone: "pink",
  },
  {
    name: "Langganan",
    subtitle: "Digital",
    image: "./assets/category-langganan.png",
    tone: "green",
  },
  {
    name: "Bundling",
    subtitle: "Pake Hemat",
    image: "./assets/category-bundling.png",
    tone: "mint",
  },
  {
    name: "Buku",
    subtitle: "400+ produk",
    image: "./assets/category-buku.png",
    tone: "blue",
  },
  {
    name: "Merchandise",
    subtitle: "80+ item",
    image: "./assets/category-merch.png",
    tone: "yellow",
  },
  {
    name: "Tiket & kelas",
    subtitle: "Event pilihan",
    image: "./assets/category-eventclass.png",
    tone: "peach",
  },
];

const products = [
  { id: 1,  type: "bundling", title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id", category: "All", price: 95000, oldPrice: null, image: "./assets/product-demam-bola.jpg" },
  { id: 2,  type: "bundling", title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", category: "All", price: 175000, oldPrice: 229000, image: "./assets/thumb-banner-utama.png" },
  { id: 3,  type: "bundling", title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium", category: "All", price: 99000, oldPrice: 125000, image: "./assets/product-pesta-bola.jpg" },
  { id: 4,  type: "bundling", title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", category: "All", price: 149000, oldPrice: 229000, image: "./assets/thumb-banner-utama.png" },
  { id: 5,  type: "digital",  title: "Harian Kompas Akhir Pekan + Kompas.id", category: "All", startingPrice: true, price: 175000, oldPrice: null, image: "./assets/product-harian-kompas.jpeg" },
  { id: 6,  type: "physical", title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026", category: "All", price: 50000, oldPrice: null, image: "./assets/product-pesta-bola.jpg" },
  { id: 7,  type: "physical", title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu", category: "All", price: 199000, oldPrice: null, image: "./assets/product-kaus-kompas.png" },
  { id: 8,  type: "physical", title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian", category: "All", price: 169000, oldPrice: null, image: "./assets/product-papa-francesco.jpeg" },
  { id: 9,  type: "bundling", title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id", category: "All", price: 95000, oldPrice: null, image: "./assets/product-demam-bola.jpg" },
  { id: 10, type: "bundling", title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", category: "All", price: 175000, oldPrice: 229000, image: "./assets/thumb-banner-utama.png" },
  { id: 11, type: "bundling", title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium", category: "All", price: 99000, oldPrice: 125000, image: "./assets/product-pesta-bola.jpg" },
  { id: 12, type: "bundling", title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler", category: "All", price: 149000, oldPrice: 229000, image: "./assets/thumb-banner-utama.png" },
  { id: 13, type: "digital",  title: "Harian Kompas Akhir Pekan + Kompas.id", category: "All", startingPrice: true, price: 175000, oldPrice: null, image: "./assets/product-harian-kompas.jpeg" },
  { id: 14, type: "physical", title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026", category: "All", price: 50000, oldPrice: null, image: "./assets/product-pesta-bola.jpg" },
  { id: 15, type: "physical", title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu", category: "All", price: 199000, oldPrice: null, image: "./assets/product-kaus-kompas.png" },
  { id: 16, type: "physical", title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian", category: "All", price: 169000, oldPrice: null, image: "./assets/product-papa-francesco.jpeg" },
  { id: 17, type: "bundling", title: "Suroboyo10K Ultimate Bundle", category: "All", price: 149000, oldPrice: 229000, image: "./assets/SKU-Front-Runner-600x600.jpg" },
];

const state = {
  category: "all",
  query: "",
  sort: "featured",
  wishlist: new Set(),
  cart: new Map(),
};

const els = {
  popularCategories: document.querySelector("#popularCategories"),
  productGrid: document.querySelector("#productGrid"),
  searchInput: document.querySelector("#searchInput"),
  submitSearch: document.querySelector("#submitSearch"),
  clearSearch: document.querySelector("#clearSearch"),
  sortSelect: document.querySelector("#sortSelect"),
  emptyState: document.querySelector("#emptyState"),
  activeFilter: document.querySelector("#activeFilter"),
  bestSellerGrid: document.querySelector("#bestSellerGrid"),
  bundlingGrid: document.querySelector("#bundlingGrid"),
  subscriptionGrid: document.querySelector("#subscriptionGrid"),
  cartToggle: document.querySelector("#cartToggle"),
  closeCart: document.querySelector("#closeCart"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  cartCount: document.querySelector("#cartCount"),

  openLoginModal: document.querySelector("#openLoginModal"),
  openMobileLoginModal: document.querySelector("#openMobileLoginModal"),
  homeLoginModal: document.querySelector("#homeLoginModal"),
  homeLoginIdentity: document.querySelector("#homeLoginIdentity"),
  homeLoginPassword: document.querySelector("#homeLoginPassword"),
  homeIdentityStep: document.querySelector('[data-home-login-step="identity"]'),
  homePasswordStep: document.querySelector('[data-home-login-step="password"]'),
  homeLoginIdentityPreview: document.querySelector("#homeLoginIdentityPreview"),
  homeContinueIdentity: document.querySelector("#homeContinueIdentity"),
  homeContinuePassword: document.querySelector("#homeContinuePassword"),
  homeChangeIdentity: document.querySelector("#homeChangeIdentity"),
  homeTogglePassword: document.querySelector("#homeTogglePassword"),
  authActions: document.querySelector("#authActions"),
  accountAvatar: document.querySelector("#accountAvatar"),
  heroSlides: document.querySelectorAll("[data-hero-slide]"),
  heroDots: document.querySelectorAll("[data-hero-dot]"),
};

let heroSlideIndex = 0;
let heroSlideTimer = null;

function productCardTemplate(product) {
  const wished = state.wishlist.has(product.id);
  const rating = product.rating || 4.9;
  const reviews = product.reviews || 120;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `
    <article class="product-card" data-product-detail="${product.id}" tabindex="0" aria-label="Lihat detail ${product.title}">
      <div class="product-media">
        <a class="product-detail-link media-link" href="./detail?id=${product.id}" aria-label="Lihat detail ${product.title}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        ${discount ? `<span class="product-discount">${discount}%</span>` : ""}
        <button class="icon-button wishlist ${wished ? "active" : ""}" data-wishlist="${product.id}" type="button" aria-label="Tambahkan ke wishlist"><i class="ph ph-heart" aria-hidden="true"></i>
        </button>
      </div>
      <div class="product-body">
        <a class="product-detail-link product-info-link" href="./detail?id=${product.id}">
          <span class="product-tag product-tag--${product.type || "physical"}">${{ bundling: "Bundling", digital: "Digital", physical: "Produk fisik" }[product.type] || "Produk"}</span>
          <p class="product-title">${product.title}</p>
          <div class="rating" aria-label="Rating ${rating} dari 5">
            <i class="ph-fill ph-star" aria-hidden="true"></i>
            <span>${rating.toFixed(1)} (${compactNumber(reviews)})</span>
          </div>
          <div class="price-row">
            ${product.startingPrice ? `<span class="price-prefix">Harga mulai</span>` : ""}
            <strong class="price">${money(product.price)}</strong>
            ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
          </div>
        </a>
        <button class="btn primary" data-add-cart="${product.id}" type="button">Tambah</button>
      </div>
    </article>
  `;
}

function getStoredValue(key) {
  let localValue = null;
  try {
    localValue = localStorage.getItem(key);
  } catch {
    localValue = null;
  }

  if (localValue !== null) return localValue;

  try {
    const tabState = JSON.parse(window.name || "{}");
    return tabState[key] ?? null;
  } catch {
    return null;
  }
}

function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Some file:// browser contexts block storage; the UI should still keep working.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    tabState[key] = value;
    window.name = JSON.stringify(tabState);
  } catch {
    window.name = JSON.stringify({ [key]: value });
  }
}

function stars(value) {
  const rounded = Math.round(value);
  return Array.from({ length: 5 }, (_, index) => {
    const starClass = index < rounded ? "ph-fill ph-star" : "ph ph-star";
    return `<i class="${starClass}" aria-hidden="true"></i>`;
  }).join("");
}

function compactNumber(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

function renderCategories() {
  els.popularCategories.innerHTML = categories
    .map(
      (category) => `
        <button class="category-card" data-category="${category.name}" type="button">
          <figure class="category-tile ${category.tone ? `category-tile-${category.tone}` : ""}">
            <span class="image-wrap"><img src="${category.image}" alt="${category.name}"></span>
            <figcaption><strong>${category.name}</strong><span>${category.subtitle}</span></figcaption>
          </figure>
        </button>
      `,
    )
    .join("");
}

function getFilteredProducts() {
  const query = state.query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = state.category === "all" || product.category === state.category;
    const matchesQuery =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return filtered.sort((a, b) => {
    if (state.sort === "price-low") return a.price - b.price;
    if (state.sort === "price-high") return b.price - a.price;
    if (state.sort === "rating") return b.rating - a.rating;
    return a.id - b.id;
  });
}

function renderProducts() {
  const visibleProducts = getFilteredProducts();
  els.emptyState.classList.toggle("hidden", visibleProducts.length > 0);

  if (state.category !== "all" || state.query) {
    const categoryLabel = state.category === "all" ? "Kategori" : state.category;
    els.activeFilter.textContent = `${categoryLabel}${state.query ? ` - "${state.query}"` : ""}`;
    els.activeFilter.classList.remove("hidden");
  } else {
    els.activeFilter.classList.add("hidden");
  }

  els.productGrid.innerHTML = visibleProducts
    .map((product) => productCardTemplate(product))
    .join("");
}

function renderBestSellers() {
  if (!els.bestSellerGrid) return;
  renderProductSection(els.bestSellerGrid, [1, 5, 7, 8, 17]);
}

function renderProductSection(grid, productIds) {
  if (!grid) return;
  grid.innerHTML = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
    .map((product) => productCardTemplate(product))
    .join("");
}

function renderCuratedSections() {
  const bundlingProductIds = [2, 3, 4, 17, 1].filter((id) => {
    const product = products.find((item) => item.id === id);
    return product?.type === "bundling";
  });
  const subscriptionProductIds = products
    .filter((product) => product.type === "digital")
    .map((product) => product.id);
  renderProductSection(els.bundlingGrid, bundlingProductIds);
  renderProductSection(els.subscriptionGrid, subscriptionProductIds);
}

function showWishlistToast() {
  let toast = document.querySelector("[data-wishlist-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "wishlist-toast";
    toast.dataset.wishlistToast = "";
    toast.setAttribute("role", "status");
    toast.textContent = "Berhasil menyimpan di wishlist";
    document.body.appendChild(toast);
  }

  clearTimeout(showWishlistToast.timer);
  toast.classList.add("show");
  showWishlistToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function handleProductGridClick(event) {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const cartButton = event.target.closest("[data-add-cart]");
  const detailLink = event.target.closest(".product-detail-link");
  const productCard = event.target.closest("[data-product-detail]");

  if (wishlistButton) {
    event.preventDefault();
    const id = Number(wishlistButton.dataset.wishlist);
    const wasSaved = state.wishlist.has(id);
    if (wasSaved) state.wishlist.delete(id);
    else {
      state.wishlist.add(id);
      showWishlistToast();
    }
    renderProducts();
    updateBadges();
  }

  if (cartButton) {
    event.preventDefault();
    addToCart(cartButton.dataset.addCart);
  }
  if (productCard && !wishlistButton && !cartButton) {
    event.preventDefault();
    const productId = detailLink?.href
      ? new URL(detailLink.href, window.location.href).searchParams.get("id")
      : productCard.dataset.productDetail;
    window.location.href = `./detail?id=${productId}`;
  }
}

function handleProductGridKeydown(event) {
  if (event.key !== "Enter") return;
  const productCard = event.target.closest("[data-product-detail]");
  if (productCard) window.location.href = `./detail?id=${productCard.dataset.productDetail}`;
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll(".category-tab[data-category]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
  renderProducts();
}

function updateBadges() {
  const itemCount = [...state.cart.values()].reduce((sum, item) => sum + item.qty, 0);
  els.cartCount.textContent = itemCount;
  els.cartCount.classList.toggle("hidden", itemCount === 0);
  renderBestSellers();
  renderCuratedSections();
}

function renderCart() {
  const entries = [...state.cart.values()];
  if (!entries.length) {
    els.cartItems.innerHTML = `<p class="empty-state">Keranjang masih kosong.</p>`;
    els.cartTotal.textContent = money(0);
    updateBadges();
    return;
  }

  els.cartItems.innerHTML = entries
    .map(
      ({ product, qty }) => `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.title}">
          <div>
            <h3>${product.title}</h3>
            <div class="qty" aria-label="Jumlah ${product.title}">
              <button data-dec="${product.id}" type="button" aria-label="Kurangi">-</button>
              <span>${qty}</span>
              <button data-inc="${product.id}" type="button" aria-label="Tambah">+</button>
            </div>
          </div>
          <strong class="cart-price">${money(product.price * qty)}</strong>
        </div>
      `,
    )
    .join("");

  const total = entries.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  els.cartTotal.textContent = money(total);
  updateBadges();
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;

  const existing = state.cart.get(product.id);
  state.cart.set(product.id, { product, qty: existing ? existing.qty + 1 : 1 });
  renderCart();
}

function changeQty(id, delta) {
  const key = Number(id);
  const existing = state.cart.get(key);
  if (!existing) return;

  const qty = existing.qty + delta;
  if (qty <= 0) state.cart.delete(key);
  else state.cart.set(key, { ...existing, qty });
  renderCart();
}

function toggleDrawer(open) {
  els.cartDrawer.classList.toggle("open", open);
  els.cartDrawer.setAttribute("aria-hidden", String(!open));
}

function setLoggedIn(isLoggedIn) {
  els.authActions.classList.toggle("hidden", isLoggedIn);
  els.accountAvatar.classList.toggle("hidden", !isLoggedIn);
  setStoredValue("geraiLoggedIn", isLoggedIn ? "true" : "false");
  syncHomeAvatarEmail();
  window.syncGeraiAuthHeader?.();
}

function closeAvatarMenu() {
  const menu = document.querySelector("[data-avatar-menu]");
  const trigger = document.querySelector("[data-avatar-menu-trigger]");
  if (!menu || !trigger) return;
  menu.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
}

function getHomeLoginIdentity() {
  return getStoredValue("geraiLoginIdentity") || "ikhwanardhi@gmail.com";
}

function syncHomeAvatarEmail() {
  document.querySelectorAll("[data-avatar-email]").forEach((email) => {
    email.textContent = getHomeLoginIdentity();
  });
}

function setupAvatarMenu() {
  const menu = document.querySelector("[data-avatar-menu]");
  const trigger = document.querySelector("[data-avatar-menu-trigger]");
  if (!menu || !trigger || trigger.dataset.avatarMenuReady === "true") return;
  trigger.dataset.avatarMenuReady = "true";
  syncHomeAvatarEmail();

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    syncHomeAvatarEmail();
    menu.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  menu.addEventListener("click", (event) => {
    if (!event.target.closest("[data-logout]")) event.stopPropagation();
  });
  document.addEventListener("click", closeAvatarMenu);
}

function openHomeLogin() {
  els.homeLoginModal.hidden = false;
  document.body.classList.add("modal-open");
  showHomeIdentityStep();
  if (!window.matchMedia("(max-width: 767px)").matches) {
    requestAnimationFrame(() => els.homeLoginIdentity.focus());
  }
}

function closeHomeLogin() {
  els.homeLoginModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function showHomeIdentityStep() {
  els.homeIdentityStep.hidden = false;
  els.homePasswordStep.hidden = true;
}

function showHomePasswordStep() {
  const identity = els.homeLoginIdentity.value.trim() || "ikhwanardhi@gmail.com";
  els.homeLoginIdentityPreview.textContent = identity;
  els.homeIdentityStep.hidden = true;
  els.homePasswordStep.hidden = false;
  els.homeLoginPassword.focus();
}

function finishHomeLogin() {
  const identity = els.homeLoginIdentityPreview.textContent.trim() || els.homeLoginIdentity.value.trim() || "ikhwanardhi@gmail.com";
  setStoredValue("geraiLoginIdentity", identity);
  closeHomeLogin();
  setLoggedIn(true);
}

function setHeroSlide(index) {
  if (!els.heroSlides.length) return;
  heroSlideIndex = (index + els.heroSlides.length) % els.heroSlides.length;
  els.heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === heroSlideIndex);
  });
  els.heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === heroSlideIndex);
  });
}

function startHeroCarousel() {
  if (els.heroSlides.length < 2) return;
  setHeroSlide(0);
  heroSlideTimer = window.setInterval(() => {
    setHeroSlide(heroSlideIndex + 1);
  }, 3000);
}

function resetHeroCarousel() {
  if (!heroSlideTimer) return;
  window.clearInterval(heroSlideTimer);
  heroSlideTimer = null;
  startHeroCarousel();
}

renderCategories();
renderProducts();
renderBestSellers();
renderCuratedSections();
renderCart();
startHeroCarousel();
setLoggedIn(getStoredValue("geraiLoggedIn") === "true");
if (window.location.hash === "#login" && getStoredValue("geraiLoggedIn") !== "true") {
  openHomeLogin();
}

document.querySelectorAll(".category-tab[data-category]").forEach((tab) => {
  tab.addEventListener("click", () => setCategory(tab.dataset.category));
});

els.popularCategories.addEventListener("click", (event) => {
  const card = event.target.closest("[data-category]");
  if (!card) return;
  setCategory(card.dataset.category);
  document.querySelector("#deals").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.productGrid.addEventListener("click", handleProductGridClick);
els.productGrid.addEventListener("keydown", handleProductGridKeydown);
els.bestSellerGrid?.addEventListener("click", handleProductGridClick);
els.bestSellerGrid?.addEventListener("keydown", handleProductGridKeydown);
els.bundlingGrid?.addEventListener("click", handleProductGridClick);
els.bundlingGrid?.addEventListener("keydown", handleProductGridKeydown);
els.subscriptionGrid?.addEventListener("click", handleProductGridClick);
els.subscriptionGrid?.addEventListener("keydown", handleProductGridKeydown);

els.heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setHeroSlide(Number(dot.dataset.heroDot));
    resetHeroCarousel();
  });
});

function goToSearchPage() {
  const query = els.searchInput.value.trim();
  if (!query) return;
  window.location.href = `./search.html?q=${encodeURIComponent(query)}`;
}

els.searchInput.addEventListener("input", (event) => {
  els.clearSearch.classList.toggle("hidden", !event.target.value.trim());
});

els.clearSearch.addEventListener("click", () => {
  state.query = "";
  els.searchInput.value = "";
  els.clearSearch.classList.add("hidden");
  els.searchInput.focus();
});

const topbar = document.querySelector(".topbar");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
const closeSearchMobile = document.querySelector("#closeSearchMobile");

function openMobileSearch() {
  topbar.classList.add("search-open");
  mobileSearchToggle.setAttribute("aria-expanded", "true");
  els.searchInput.focus();
}

function closeMobileSearch() {
  topbar.classList.remove("search-open");
  mobileSearchToggle.setAttribute("aria-expanded", "false");
}

mobileSearchToggle.addEventListener("click", openMobileSearch);

closeSearchMobile.addEventListener("click", () => {
  closeMobileSearch();
});

els.searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    goToSearchPage();
    return;
  }
  if (e.key === "Escape") closeMobileSearch();
});

els.submitSearch?.addEventListener("click", goToSearchPage);

if (els.sortSelect) {
  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderProducts();
  });
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.scrollTarget}`).scrollIntoView({ behavior: "smooth" });
  });
});

els.cartToggle.addEventListener("click", () => {
  window.location.href = "./cart.html";
});

els.openLoginModal.addEventListener("click", openHomeLogin);
els.openMobileLoginModal?.addEventListener("click", openHomeLogin);
els.homeLoginModal.addEventListener("click", (event) => {
  if (event.target === els.homeLoginModal) closeHomeLogin();
});
els.homeContinueIdentity.addEventListener("click", showHomePasswordStep);
els.homeLoginIdentity.addEventListener("keydown", (event) => {
  if (event.key === "Enter") showHomePasswordStep();
});
els.homeChangeIdentity.addEventListener("click", () => {
  showHomeIdentityStep();
  els.homeLoginIdentity.focus();
});
els.homeTogglePassword.addEventListener("click", () => {
  const shouldShow = els.homeLoginPassword.type === "password";
  els.homeLoginPassword.type = shouldShow ? "text" : "password";
  els.homeTogglePassword.setAttribute("aria-label", shouldShow ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});
els.homeContinuePassword.addEventListener("click", finishHomeLogin);
els.homeLoginPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") finishHomeLogin();
});

els.closeCart.addEventListener("click", () => toggleDrawer(false));
els.cartDrawer.addEventListener("click", (event) => {
  if (event.target === els.cartDrawer) toggleDrawer(false);

  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  toggleDrawer(false);
  if (!els.homeLoginModal.hidden) closeHomeLogin();
  closeAvatarMenu();
});

setupAvatarMenu();
