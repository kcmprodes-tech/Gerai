function money(value) {
  return `${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  })} AED`;
}

const categories = [
  {
    name: "Electronics",
    image: "./assets/category-electronics.svg",
  },
  {
    name: "Fashion",
    image: "./assets/category-fashion.svg",
  },
  {
    name: "Luxury",
    image: "./assets/category-luxury.svg",
  },
  {
    name: "Home Decor",
    image: "./assets/category-home.svg",
  },
  {
    name: "Beauty",
    image: "./assets/category-beauty.svg",
  },
  {
    name: "Groceries",
    image: "./assets/category-groceries.svg",
  },
  {
    name: "Sneakers",
    image: "./assets/category-sneakers.svg",
  },
];

const products = [
  {
    id: 1,
    title: "Samsung Galaxy S24 Ultra 12+GB Titanium Gray...",
    category: "Electronics",
    price: 999.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 1200,
    image: "./assets/product-phone.svg",
  },
  {
    id: 2,
    title: "Nike Jordan Brooklyn Fleece Men's Pullover Hoodie...",
    category: "Fashion",
    price: 45,
    oldPrice: null,
    rating: 4.5,
    reviews: 589,
    image: "./assets/product-hoodie.svg",
  },
  {
    id: 3,
    title: "Beanless Bag Inflatable Lounge Chair Grey",
    category: "Home Decor",
    price: 32,
    oldPrice: 48,
    rating: 4.7,
    reviews: 100,
    image: "./assets/product-beanbag.svg",
  },
  {
    id: 4,
    title: "Diamond Stud Earrings (1/3 ct. t.w.) in 14K White, Yellow or Rose Gold",
    category: "Luxury",
    price: 299,
    oldPrice: null,
    rating: 4.9,
    reviews: 1100,
    image: "./assets/product-earrings.svg",
  },
  {
    id: 5,
    title: "Nike Invincible 3 Premium",
    category: "Sneakers",
    price: 190,
    oldPrice: null,
    rating: 4.6,
    reviews: 157,
    image: "./assets/product-shoe.svg",
  },
  {
    id: 6,
    title: "Fresh Organic Vegetable Box 5kg",
    category: "Groceries",
    price: 189,
    oldPrice: 229,
    rating: 4.4,
    reviews: 310,
    image: "./assets/category-groceries.svg",
  },
  {
    id: 7,
    title: "Serum Vitamin C Brightening Set",
    category: "Beauty",
    price: 329,
    oldPrice: 399,
    rating: 4.8,
    reviews: 864,
    image: "./assets/category-beauty.svg",
  },
  {
    id: 8,
    title: "Kids Denim Jacket and Sneakers Bundle",
    category: "Kids Fashion",
    price: 359,
    oldPrice: 449,
    rating: 4.3,
    reviews: 74,
    image: "./assets/category-fashion.svg",
  },
  {
    id: 9,
    title: "Women's Linen Summer Dress",
    category: "Women's",
    price: 449,
    oldPrice: null,
    rating: 4.6,
    reviews: 220,
    image: "./assets/category-fashion.svg",
  },
  {
    id: 10,
    title: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 159,
    rating: 4.7,
    reviews: 430,
    image: "./assets/category-electronics.svg",
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
  cartToggle: document.querySelector("#cartToggle"),
  closeCart: document.querySelector("#closeCart"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  cartCount: document.querySelector("#cartCount"),
  wishlistCount: document.querySelector("#wishlistCount"),
};

function stars(value) {
  const rounded = Math.round(value);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, 5 - rounded);
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
          <figure>
            <span class="image-wrap"><img src="${category.image}" alt="${category.name}"></span>
            <figcaption>${category.name}</figcaption>
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
    const categoryLabel = state.category === "all" ? "Semua kategori" : state.category;
    els.activeFilter.textContent = `${categoryLabel}${state.query ? ` - "${state.query}"` : ""}`;
    els.activeFilter.classList.remove("hidden");
  } else {
    els.activeFilter.classList.add("hidden");
  }

  els.productGrid.innerHTML = visibleProducts
    .map((product) => {
      const wished = state.wishlist.has(product.id);
      return `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <button class="icon-button wishlist ${wished ? "active" : ""}" data-wishlist="${product.id}" type="button" aria-label="Tambahkan ke wishlist">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20.35 10.55 19C5.4 14.2 2 11.04 2 7.15 2 4 4.42 1.55 7.5 1.55c1.74 0 3.41.81 4.5 2.09a5.93 5.93 0 0 1 4.5-2.09C19.58 1.55 22 4 22 7.15c0 3.89-3.4 7.05-8.55 11.86L12 20.35Z"/></svg>
            </button>
          </div>
          <div class="product-body">
            <p class="product-title">${product.title}</p>
            <div class="rating" aria-label="Rating ${product.rating} dari 5">
              ${stars(product.rating)}
              <span>(${compactNumber(product.reviews)})</span>
            </div>
            <div class="price-row">
              <strong class="price">${money(product.price)}</strong>
              ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
            </div>
            <button class="btn primary" data-add-cart="${product.id}" type="button">Tambah</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll(".category-tab").forEach((tab) => {
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

renderCategories();
renderProducts();
renderCart();

document.querySelectorAll(".category-tab").forEach((tab) => {
  tab.addEventListener("click", () => setCategory(tab.dataset.category));
});

els.popularCategories.addEventListener("click", (event) => {
  const card = event.target.closest("[data-category]");
  if (!card) return;
  setCategory(card.dataset.category);
  document.querySelector("#deals").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.productGrid.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const cartButton = event.target.closest("[data-add-cart]");

  if (wishlistButton) {
    const id = Number(wishlistButton.dataset.wishlist);
    if (state.wishlist.has(id)) state.wishlist.delete(id);
    else state.wishlist.add(id);
    renderProducts();
    updateBadges();
  }

  if (cartButton) addToCart(cartButton.dataset.addCart);
});

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

els.cartToggle.addEventListener("click", () => toggleDrawer(true));
els.closeCart.addEventListener("click", () => toggleDrawer(false));
els.cartDrawer.addEventListener("click", (event) => {
  if (event.target === els.cartDrawer) toggleDrawer(false);

  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleDrawer(false);
});
