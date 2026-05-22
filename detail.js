const detailProducts = [
  {
    id: 1,
    title: "Bundling #DemamBola Tabloid Soccer dan Kompas.id",
    price: 95000,
    image: "./assets/product-demam-bola.jpg",
  },
  {
    id: 2,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 175000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 3,
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    price: 99000,
    oldPrice: 125000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 4,
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    price: 149000,
    oldPrice: 229000,
    image: "./assets/product-bobo-origin.jpg",
  },
  {
    id: 5,
    title: "Harian Kompas Akhir Pekan + Kompas.id",
    priceText: "Rp160.000 - Rp400.000",
    price: 160000,
    image: "./assets/product-harian-kompas.jpeg",
  },
  {
    id: 6,
    title: "Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026",
    price: 50000,
    image: "./assets/product-pesta-bola.jpg",
  },
  {
    id: 7,
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    price: 199000,
    image: "./assets/product-kaus-kompas.png",
  },
  {
    id: 8,
    title: "Benvenuto Papa Francesco Sang Reformer Pesan dan Kesaksian",
    price: 169000,
    image: "./assets/product-papa-francesco.jpeg",
  },
];

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function getProduct() {
  const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
  return detailProducts.find((product) => product.id === ((id - 1) % 8) + 1) || detailProducts[0];
}

function priceMarkup(product) {
  const price = product.priceText || formatRupiah(product.price);
  const oldPrice = product.oldPrice ? `<span>${formatRupiah(product.oldPrice)}</span>` : "";
  const discount = product.oldPrice ? `<b>${Math.round((1 - product.price / product.oldPrice) * 100)}%</b>` : "";
  return `<strong>${price}</strong>${oldPrice}${discount}`;
}

function relatedCard(product) {
  const oldPrice = product.oldPrice ? `<span class="old-price">${formatRupiah(product.oldPrice)}</span>` : "";
  const price = product.priceText || formatRupiah(product.price);
  return `
    <article class="product-card" tabindex="0" aria-label="Lihat detail ${product.title}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <button class="icon-button wishlist" type="button" aria-label="Tambahkan ke wishlist">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20.35 10.55 19C5.4 14.2 2 11.04 2 7.15 2 4 4.42 1.55 7.5 1.55c1.74 0 3.41.81 4.5 2.09a5.93 5.93 0 0 1 4.5-2.09C19.58 1.55 22 4 22 7.15c0 3.89-3.4 7.05-8.55 11.86L12 20.35Z"/></svg>
        </button>
      </div>
      <div class="product-body">
        <p class="product-title">${product.title}</p>
        <div class="rating" aria-label="Rating 4.8 dari 5">
          ★★★★★
          <span>(121)</span>
        </div>
        <div class="price-row">
          ${oldPrice}
          <strong class="price">${price}</strong>
        </div>
      </div>
    </article>
  `;
}

const product = getProduct();
let quantity = 1;

function unitPrice(product) {
  return product.price || 0;
}

function updateTotalPrice() {
  const total = unitPrice(product) * quantity;
  document.querySelector("#detailTotalPrice").textContent = formatRupiah(total).replace(/^Rp/, "");
}

document.title = `${product.title} - Gerai Kompas`;
document.querySelector("#detailProductTitle").textContent = product.title;
document.querySelector("#detailProductImage").src = product.image;
document.querySelector("#detailProductImage").alt = product.title;
document.querySelector("#detailPriceBlock").innerHTML = priceMarkup(product);
updateTotalPrice();
document.querySelectorAll(".thumb img").forEach((image) => {
  image.src = product.image;
  image.alt = product.title;
});

const relatedSource = detailProducts.filter((item) => item.id !== product.id);
const relatedProducts = Array.from({ length: 12 }, (_, index) => relatedSource[index % relatedSource.length]);
document.querySelector("#relatedProducts").innerHTML = relatedProducts.map(relatedCard).join("");

document.querySelectorAll(".swatches, .sizes").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !group.contains(button)) return;
    group.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const qtyButtons = document.querySelectorAll(".qty button");
const qtyValue = document.querySelector(".qty span");
qtyButtons[0].addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  qtyValue.textContent = quantity;
  updateTotalPrice();
});
qtyButtons[1].addEventListener("click", () => {
  quantity += 1;
  qtyValue.textContent = quantity;
  updateTotalPrice();
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
const changeIdentity = document.querySelector("#changeIdentity");
const togglePassword = document.querySelector("#togglePassword");

function openLoginModal() {
  loginModal.hidden = false;
  document.body.classList.add("modal-open");
  showIdentityStep();
  loginInput.focus();
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

buyNowButton.addEventListener("click", openLoginModal);
addCartButton.addEventListener("click", () => {
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
