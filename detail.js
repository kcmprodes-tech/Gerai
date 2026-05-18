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
  return `
    <article>
      <button type="button" aria-label="Tambah ke wishlist">♡</button>
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <strong>${product.priceText || formatRupiah(product.price)}</strong>
      <p>Produk pilihan Gerai Kompas</p>
      <span>★★★★★ <em>(121)</em></span>
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

const relatedProducts = detailProducts.filter((item) => item.id !== product.id).slice(0, 4);
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
