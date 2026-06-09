const detailProducts = [
  {
    id: 1,
    type: "bundling",
    title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id",
    price: 95000,
    image: "./assets/product-demam-bola.jpg",
  },
  {
    id: 2,
    type: "bundling",
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 175000,
    oldPrice: 229000,
    image: "./assets/thumb-banner-utama.png",
    gallery: [
      "./assets/thumb-banner-utama.png",
      "./assets/BTO-Versi-e-com-1080-x-180-02.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-03.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-04.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-05.jpg",
    ],
  },
  {
    id: 3,
    type: "bundling",
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    price: 99000,
    oldPrice: 125000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 4,
    type: "bundling",
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/thumb-banner-utama.png",
    gallery: [
      "./assets/thumb-banner-utama.png",
      "./assets/BTO-Versi-e-com-1080-x-180-02.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-03.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-04.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-05.jpg",
    ],
  },
  {
    id: 5,
    type: "digital",
    title: "Harian Kompas Akhir Pekan + Kompas.id",
    startingPrice: true,
    price: 175000,
    image: "./assets/product-harian-kompas.jpeg",
  },
  {
    id: 6,
    type: "physical",
    title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026",
    price: 50000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 7,
    type: "physical",
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    price: 199000,
    image: "./assets/product-kaus-kompas.png",
  },
  {
    id: 8,
    type: "physical",
    title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian",
    price: 169000,
    image: "./assets/product-papa-francesco.jpeg",
  },
  {
    id: 9,
    type: "bundling",
    title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id",
    price: 95000,
    image: "./assets/product-demam-bola.jpg",
  },
  {
    id: 10,
    type: "bundling",
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 175000,
    oldPrice: 229000,
    image: "./assets/thumb-banner-utama.png",
    gallery: [
      "./assets/thumb-banner-utama.png",
      "./assets/BTO-Versi-e-com-1080-x-180-02.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-03.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-04.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-05.jpg",
    ],
  },
  {
    id: 11,
    type: "bundling",
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    price: 99000,
    oldPrice: 125000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 12,
    type: "bundling",
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/thumb-banner-utama.png",
    gallery: [
      "./assets/thumb-banner-utama.png",
      "./assets/BTO-Versi-e-com-1080-x-180-02.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-03.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-04.jpg",
      "./assets/BTO-Versi-e-com-1080-x-180-05.jpg",
    ],
  },
  {
    id: 13,
    type: "digital",
    title: "Harian Kompas Akhir Pekan + Kompas.id",
    startingPrice: true,
    price: 175000,
    image: "./assets/product-harian-kompas.jpeg",
  },
  {
    id: 14,
    type: "physical",
    title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026",
    price: 50000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 15,
    type: "physical",
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    price: 199000,
    image: "./assets/product-kaus-kompas.png",
  },
  {
    id: 16,
    type: "physical",
    title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian",
    price: 169000,
    image: "./assets/product-papa-francesco.jpeg",
  },
  {
    id: 17,
    type: "bundling",
    title: "Suroboyo10K Ultimate Bundle",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/SKU-Front-Runner-600x600.jpg",
    hideLabel: true,
  },
];

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function getProduct() {
  const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
  return detailProducts.find((product) => product.id === id) || detailProducts[0];
}

function priceMarkup(product) {
  const price = formatRupiah(product.price);
  const oldPrice = product.oldPrice ? `<span>${formatRupiah(product.oldPrice)}</span>` : "";
  const discount = product.oldPrice ? `<b>${Math.round((1 - product.price / product.oldPrice) * 100)}%</b>` : "";
  return `<strong>${price}</strong>${oldPrice}${discount}`;
}

function productTypeLabel(type) {
  return { bundling: "Bundling", digital: "Digital", physical: "Produk fisik" }[type] || "Produk";
}

function shortBreadcrumbTitle(title) {
  const words = title.trim().split(/\s+/);
  return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : title;
}

function relatedCard(product) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const oldPrice = product.oldPrice ? `<span class="old-price">${formatRupiah(product.oldPrice)}</span>` : "";
  return `
    <article class="product-card" tabindex="0" aria-label="Lihat detail ${product.title}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        ${discount ? `<span class="product-discount">${discount}%</span>` : ""}
        <button class="icon-button wishlist" type="button" aria-label="Tambahkan ke wishlist"><i class="ph ph-heart" aria-hidden="true"></i>
        </button>
      </div>
      <div class="product-body">
        <a class="product-detail-link product-info-link" href="./detail.html?id=${product.id}">
          <span class="product-tag product-tag--${product.type || "physical"}">${productTypeLabel(product.type)}</span>
          <p class="product-title">${product.title}</p>
          <div class="rating" aria-label="Rating 4.9 dari 5">
            <i class="ph-fill ph-star" aria-hidden="true"></i>
            <span>4.9 (120)</span>
          </div>
          <div class="price-row">
            ${product.startingPrice ? `<span class="price-prefix">Harga mulai</span>` : ""}
            <strong class="price">${formatRupiah(product.price)}</strong>
            ${oldPrice}
          </div>
        </a>
      </div>
    </article>
  `;
}

const product = getProduct();
const productType = product.type || "bundling";
const benefitCopyByProductId = {
  4: {
    product:
      "Bobo the Origin (Fisik): Komik novel grafis 112 halaman (art paper) dengan cover art karton yang menceritakan petualangan Bobo mencari jati diri di usia 7 tahun.",
    digital:
      "e-Magazine Bobo Reguler: Akses ke edisi terbaru majalah Bobo yang terbit reguler setiap minggunya, memastikan anak tetap mendapatkan bacaan edukatif yang segar. Kompas.id Premium: Akses penuh ke berita berkualitas dan kredibel untuk kebutuhan informasi orang tua.",
  },
};
document.body.classList.add(`product-type-${productType}`);
// Bundling and physical both use the rich product page layout
if (productType === "bundling" || productType === "physical") {
  document.body.classList.add("bundling-product-page");
}
if (product.hideLabel) document.body.classList.add("detail-no-label");
let quantity = 1;
const productVariants = document.querySelector("#productVariants");
const stickyProductImage = document.querySelector("#stickyProductImage");
const stickyProductTitle = document.querySelector("#stickyProductTitle");
const stickyTotalPrice = document.querySelector("#stickyTotalPrice");
const detailProductImage = document.querySelector("#detailProductImage");
const galleryDots = document.querySelector("#galleryDots");
const productGallery = product.gallery || Array.from({ length: 4 }, () => product.image);
let activeGalleryIndex = 0;

function unitPrice(product) {
  return product.price || 0;
}

function updateTotalPrice() {
  const total = unitPrice(product) * quantity;
  document.querySelector("#detailTotalPrice").textContent = formatRupiah(total).replace(/^Rp/, "");
  stickyTotalPrice.textContent = formatRupiah(total);
}

function applyBenefitCopyOverrides() {
  const benefitCopy = benefitCopyByProductId[product.id];
  if (!benefitCopy) return;

  const productBenefit = document.querySelector(".benefit-box .benefit-list article:first-child p");
  if (productBenefit && benefitCopy.product) {
    productBenefit.textContent = benefitCopy.product;
  }

  const digitalBenefit = document.querySelector(".benefit-box .benefit-list article:nth-child(2) p");
  if (digitalBenefit && benefitCopy.digital) {
    digitalBenefit.textContent = benefitCopy.digital;
  }
}

document.title = `${product.title} - Gerai Kompas`;
const breadcrumb = document.querySelector("#detailBreadcrumb");
if (breadcrumb) {
  breadcrumb.innerHTML = "Beranda / Produk / ";
  const currentProduct = document.createElement("strong");
  currentProduct.textContent = shortBreadcrumbTitle(product.title);
  breadcrumb.append(currentProduct);
}
document.querySelector("#detailProductTitle").textContent = product.title;
detailProductImage.src = productGallery[activeGalleryIndex];
detailProductImage.alt = product.title;
document.querySelector("#detailPriceBlock").innerHTML = priceMarkup(product);
stickyProductImage.src = product.image;
stickyProductImage.alt = product.title;
stickyProductTitle.textContent = product.title;
productVariants.hidden = productType !== "physical";
if (product.id === 3) {
  const stockText = document.querySelector(".stock-summary span");
  if (stockText) stockText.textContent = "Stok 23";
}
updateTotalPrice();
applyBenefitCopyOverrides();
// Render thumbs dynamically from gallery
(function renderThumbs() {
  const thumbsContainer = document.querySelector(".thumbs");
  if (!thumbsContainer) return;
  thumbsContainer.innerHTML = productGallery
    .map(
      (src, index) =>
        `<button class="thumb${index === 0 ? " active" : ""}" type="button" data-gallery-thumb="${index}"><img src="${src}" alt="${product.title} gambar ${index + 1}"></button>`
    )
    .join("");
  thumbsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-gallery-thumb]");
    if (!btn) return;
    const idx = Number(btn.dataset.galleryThumb);
    setGalleryImage(idx);
    thumbsContainer.querySelectorAll(".thumb").forEach((t, i) => t.classList.toggle("active", i === idx));
  });
})();

function renderGalleryDots() {
  if (!galleryDots || productGallery.length <= 1) return;
  galleryDots.innerHTML = productGallery
    .map(
      (_, index) =>
        `<button class="${index === activeGalleryIndex ? "active" : ""}" type="button" aria-label="Gambar ${index + 1}" data-gallery-dot="${index}"></button>`
    )
    .join("");
}

function setGalleryImage(index) {
  activeGalleryIndex = index;
  detailProductImage.src = productGallery[activeGalleryIndex];
  galleryDots?.querySelectorAll("button").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === activeGalleryIndex);
  });
}

galleryDots?.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-gallery-dot]");
  if (!dot) return;
  setGalleryImage(Number(dot.dataset.galleryDot) || 0);
});

renderGalleryDots();

const relatedSource = detailProducts.filter((item) => item.id !== product.id);
const relatedProducts = Array.from({ length: 8 }, (_, index) => relatedSource[index % relatedSource.length]);
document.querySelector("#relatedProducts").innerHTML = relatedProducts.map(relatedCard).join("");

document.querySelectorAll("[data-detail-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = tab.dataset.detailTab;
    document.querySelectorAll("[data-detail-tab]").forEach((item) => {
      item.classList.toggle("active", item === tab);
    });
    document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
      const isActive = panel.dataset.detailPanel === targetPanel;
      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });
  });
});

document.querySelectorAll(".swatches, .sizes").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !group.contains(button)) return;
    group.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const qtyButtons = document.querySelectorAll(".buy-row .qty button");
const qtyValue = document.querySelector(".buy-row .qty span");
function setDetailQuantity(nextQuantity) {
  quantity = Math.max(1, nextQuantity);
  qtyValue.textContent = quantity;
  updateTotalPrice();
}

qtyButtons[0].addEventListener("click", () => {
  setDetailQuantity(quantity - 1);
});
qtyButtons[1].addEventListener("click", () => {
  setDetailQuantity(quantity + 1);
});

const loginModal = document.querySelector("#loginModal");
const buyNowButton = document.querySelector(".cta-row .cart");
const addCartButton = document.querySelector(".cta-row .buy");
const loginInput = document.querySelector("#loginIdentity");
const loginPassword = document.querySelector("#loginPassword");
const identityStep = document.querySelector('[data-login-step="identity"]');
const passwordStep = document.querySelector('[data-login-step="password"]');
const identityPreview = document.querySelector("#loginIdentityPreview");
const continueIdentity = document.querySelector("#continueIdentity");
const continuePassword = document.querySelector("#continuePassword");
const changeIdentity = document.querySelector("#changeIdentity");
const togglePassword = document.querySelector("#togglePassword");
const stickyBuyNow = document.querySelector("#stickyBuyNow");
const stickyAddBag = document.querySelector("#stickyAddBag");
const detailHeaderLogin = document.querySelector("#detailHeaderLogin");
const detailMobileHeaderLogin = document.querySelector("#detailMobileHeaderLogin");
const detailAuthActions = document.querySelector("#detailAuthActions");
const detailAccountAvatar = document.querySelector("#detailAccountAvatar");
let loginIntent = "checkout";

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
    // Keep login interactions usable in file:// contexts that block storage.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    tabState[key] = value;
    window.name = JSON.stringify(tabState);
  } catch {
    window.name = JSON.stringify({ [key]: value });
  }
}

function getAccountKey(base) {
  let id = null;
  try { id = localStorage.getItem("geraiLoginIdentity"); } catch {}
  if (!id) {
    try { id = JSON.parse(window.name || "{}").geraiLoginIdentity || null; } catch {}
  }
  return id ? `${base}_${id}` : base;
}

function productCartVariant(product) {
  if (product.id === 7) return "Putih, Reguler";
  if ([1, 2, 3, 4, 6].includes(product.id)) return product.id === 2 || product.id === 4 ? "Buku & Digital" : "Digital, Bundle";
  return "Produk";
}

function getStoredCartItems() {
  try {
    return JSON.parse(getStoredValue(getAccountKey("geraiCartItems")) || "[]");
  } catch {
    return [];
  }
}

function saveCartItems(items) {
  setStoredValue(getAccountKey("geraiCartItems"), JSON.stringify(items));
}

function addCurrentProductToCart() {
  const cartItems = getStoredCartItems();
  const existingItem = cartItems.find((item) => Number(item.id) === Number(product.id));
  if (existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 1) + quantity;
  } else {
    cartItems.push({
      id: product.id,
      type: productType,
      title: product.title,
      variant: productCartVariant(product),
      image: product.image,
      alt: product.title,
      price: product.price || 0,
      oldPrice: product.oldPrice || 0,
      quantity,
    });
  }
  saveCartItems(cartItems);
}

function saveCurrentProductForCheckout() {
  setStoredValue(
    getAccountKey("geraiCheckoutItems"),
    JSON.stringify([
      {
        id: product.id,
        type: productType,
        title: product.title,
        variant: productCartVariant(product),
        image: product.image,
        alt: product.title,
        price: product.price || 0,
        oldPrice: product.oldPrice || 0,
        quantity,
      },
    ])
  );
}

function setLoggedIn(isLoggedIn) {
  detailAuthActions.classList.toggle("hidden", isLoggedIn);
  detailAccountAvatar.classList.toggle("hidden", !isLoggedIn);
  setStoredValue("geraiLoggedIn", isLoggedIn ? "true" : "false");
  window.syncGeraiAuthHeader?.();
}

function openLoginModal(intent = "checkout") {
  loginIntent = intent;
  loginModal.hidden = false;
  document.body.classList.add("modal-open");
  showIdentityStep();
  if (!window.matchMedia("(max-width: 767px)").matches) {
    loginInput.focus();
  }
}

function closeLoginModal() {
  loginModal.hidden = true;
  document.body.classList.remove("modal-open");
  buyNowButton.focus();
}

function showIdentityStep() {
  identityStep.hidden = false;
  passwordStep.hidden = true;
}

function showPasswordStep() {
  const identity = loginInput.value.trim() || "ikhwanardhi@gmail.com";
  identityPreview.textContent = identity;
  identityStep.hidden = true;
  passwordStep.hidden = false;
  loginPassword.focus();
}

function finishLogin() {
  const identity = identityPreview.textContent.trim() || loginInput.value.trim() || "ikhwanardhi@gmail.com";
  setStoredValue("geraiLoginIdentity", identity);
  setLoggedIn(true);
  if (loginIntent === "checkout") {
    window.location.href = "./checkout.html";
    return;
  }
  closeLoginModal();
}

function continueToCheckout() {
  saveCurrentProductForCheckout();
  if (getStoredValue("geraiLoggedIn") === "true") {
    window.location.href = "./checkout.html";
    return;
  }
  openLoginModal("checkout");
}

setLoggedIn(getStoredValue("geraiLoggedIn") === "true");

buyNowButton.addEventListener("click", continueToCheckout);
stickyBuyNow.addEventListener("click", continueToCheckout);
detailHeaderLogin.addEventListener("click", () => openLoginModal("header"));
detailMobileHeaderLogin?.addEventListener("click", () => openLoginModal("header"));
if (window.location.hash === "#login" && getStoredValue("geraiLoggedIn") !== "true") {
  openLoginModal("header");
}
addCartButton.addEventListener("click", () => {
  addCurrentProductToCart();
  window.location.href = "./cart.html";
});
stickyAddBag.addEventListener("click", () => {
  addCurrentProductToCart();
  window.location.href = "./cart.html";
});
continueIdentity.addEventListener("click", showPasswordStep);
loginInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showPasswordStep();
  }
});
changeIdentity.addEventListener("click", () => {
  showIdentityStep();
  loginInput.focus();
});
togglePassword.addEventListener("click", () => {
  const shouldShow = loginPassword.type === "password";
  loginPassword.type = shouldShow ? "text" : "password";
  togglePassword.setAttribute("aria-label", shouldShow ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});
continuePassword.addEventListener("click", finishLogin);
loginPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    finishLogin();
  }
});
loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeLoginModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !loginModal.hidden) {
    closeLoginModal();
  }
});

// Set product type label on mobile
const detailProductTypeLabel = document.querySelector("#detailProductTypeLabel");
if (detailProductTypeLabel) {
  detailProductTypeLabel.textContent = { bundling: "Bundling", digital: "Digital", physical: "Produk fisik" }[productType] || "Produk";
}

// Accordion toggle
document.querySelectorAll(".desc-accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const body = trigger.nextElementSibling;
    const isOpen = !body.hidden;
    body.hidden = isOpen;
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Desc expand button
const descExpandBtn = document.querySelector(".desc-expand-btn");
const descCollapseBtn = document.querySelector(".desc-collapse-btn");
if (descExpandBtn) {
  descExpandBtn.addEventListener("click", () => {
    const extra = descExpandBtn.nextElementSibling;
    if (extra) extra.hidden = false;
    descExpandBtn.style.display = "none";
  });
}
if (descCollapseBtn) {
  descCollapseBtn.addEventListener("click", () => {
    const extra = descCollapseBtn.closest(".desc-extra");
    if (extra) extra.hidden = true;
    if (descExpandBtn) descExpandBtn.style.display = "";
  });
}
