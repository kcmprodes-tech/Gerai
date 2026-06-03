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
  {
    id: 1,
    title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id",
    category: "All",
    price: 95000,
    oldPrice: null,
    image: "./assets/product-demam-bola.jpg",
  },
  {
    id: 2,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    category: "All",
    price: 175000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 3,
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    category: "All",
    price: 99000,
    oldPrice: 125000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 4,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    category: "All",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 5,
    title: "Harian Kompas Akhir Pekan + Kompas.id",
    category: "All",
    startingPrice: true,
    price: 175000,
    oldPrice: null,
    image: "./assets/product-harian-kompas.jpeg",
  },
  {
    id: 6,
    title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026",
    category: "All",
    price: 50000,
    oldPrice: null,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 7,
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    category: "All",
    price: 199000,
    oldPrice: null,
    image: "./assets/product-kaus-kompas.png",
  },
  {
    id: 8,
    title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian",
    category: "All",
    price: 169000,
    oldPrice: null,
    image: "./assets/product-papa-francesco.jpeg",
  },
  {
    id: 9,
    title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id",
    category: "All",
    price: 95000,
    oldPrice: null,
    image: "./assets/product-demam-bola.jpg",
  },
  {
    id: 10,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    category: "All",
    price: 175000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 11,
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    category: "All",
    price: 99000,
    oldPrice: 125000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 12,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    category: "All",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 13,
    title: "Harian Kompas Akhir Pekan + Kompas.id",
    category: "All",
    startingPrice: true,
    price: 175000,
    oldPrice: null,
    image: "./assets/product-harian-kompas.jpeg",
  },
  {
    id: 14,
    title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026",
    category: "All",
    price: 50000,
    oldPrice: null,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 15,
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    category: "All",
    price: 199000,
    oldPrice: null,
    image: "./assets/product-kaus-kompas.png",
  },
  {
    id: 16,
    title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian",
    category: "All",
    price: 169000,
    oldPrice: null,
    image: "./assets/product-papa-francesco.jpeg",
  },
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
  wishlistCount: document.querySelector("#wishlistCount"),
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
};

function productCardTemplate(product) {
  const wished = state.wishlist.has(product.id);
  const rating = product.rating || 4.9;
  const reviews = product.reviews || 120;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `
    <article class="product-card" data-product-detail="${product.id}" tabindex="0" aria-label="Lihat detail ${product.title}">
      <div class="product-media">
        <a class="product-detail-link media-link" href="./detail.html?id=${product.id}" aria-label="Lihat detail ${product.title}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        ${discount ? `<span class="product-discount">${discount}%</span>` : ""}
        <button class="icon-button wishlist ${wished ? "active" : ""}" data-wishlist="${product.id}" type="button" aria-label="Tambahkan ke wishlist"><i class="ph ph-heart" aria-hidden="true"></i>
        </button>
      </div>
      <div class="product-body">
        <a class="product-detail-link product-info-link" href="./detail.html?id=${product.id}">
          <span class="product-tag">Bundling</span>
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
  els.bestSellerGrid.innerHTML = products
    .slice(0, 4)
    .map((product) => productCardTemplate(product))
    .join("");
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
  renderProductSection(els.bundlingGrid, [2, 3, 4, 6]);
  renderProductSection(els.subscriptionGrid, [5, 13, 1, 11]);
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
  const productCard = event.target.closest("[data-product-detail]");

  if (wishlistButton) {
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

  if (cartButton) addToCart(cartButton.dataset.addCart);
  if (productCard && !wishlistButton && !cartButton) {
    window.location.href = `./detail.html?id=${productCard.dataset.productDetail}`;
  }
}

function handleProductGridKeydown(event) {
  if (event.key !== "Enter") return;
  const productCard = event.target.closest("[data-product-detail]");
  if (productCard) window.location.href = `./detail.html?id=${productCard.dataset.productDetail}`;
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
  els.wishlistCount.textContent = state.wishlist.size;
  els.wishlistCount.classList.toggle("hidden", state.wishlist.size === 0);
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
}

function closeAvatarMenu() {
  const menu = document.querySelector("[data-avatar-menu]");
  const trigger = document.querySelector("[data-avatar-menu-trigger]");
  if (!menu || !trigger) return;
  menu.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
}

function setupAvatarMenu() {
  const menu = document.querySelector("[data-avatar-menu]");
  const trigger = document.querySelector("[data-avatar-menu-trigger]");
  if (!menu || !trigger || trigger.dataset.avatarMenuReady === "true") return;
  trigger.dataset.avatarMenuReady = "true";

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  menu.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", closeAvatarMenu);
}

function openHomeLogin() {
  els.homeLoginModal.hidden = false;
  document.body.classList.add("modal-open");
  showHomeIdentityStep();
  requestAnimationFrame(() => els.homeLoginIdentity.focus());
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

renderCategories();
renderProducts();
renderBestSellers();
renderCuratedSections();
renderCart();
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

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  els.clearSearch.classList.toggle("hidden", !state.query);
  renderProducts();
});

els.clearSearch.addEventListener("click", () => {
  state.query = "";
  els.searchInput.value = "";
  els.clearSearch.classList.add("hidden");
  renderProducts();
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
  if (e.key === "Escape") closeMobileSearch();
});

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
