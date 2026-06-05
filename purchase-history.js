const filterButtons = Array.from(document.querySelectorAll("[data-history-filter]"));
const historyList = document.querySelector("#historyList");
let historyCards = Array.from(document.querySelectorAll("[data-history-status]"));

const fallbackHistoryItems = [
  {
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    variant: "Tabloid Bola, akses Kompas Digital Premium",
    image: "./assets/product-pesta-bola.jpg",
    alt: "Bundling Pesta Bola",
    price: 99000,
    quantity: 1,
  },
];

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function getStoredValue(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // Storage can be unavailable on file://.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    return tabState[key] ?? null;
  } catch {
    return null;
  }
}

function getHistoryItems() {
  try {
    const storedItems = JSON.parse(getStoredValue("geraiLastPurchaseItems") || getStoredValue("geraiCheckoutItems") || "[]");
    if (Array.isArray(storedItems) && storedItems.length) return storedItems;
  } catch {
    // Use fallback below.
  }

  return fallbackHistoryItems;
}

function renderHistoryCards() {
  if (!historyList) return;

  const items = getHistoryItems();
  historyList.innerHTML = items
    .map((item, index) => {
      const quantity = Number(item.quantity) || 1;
      const lineTotal = (Number(item.price) || 0) * quantity;
      return `
        <article class="history-card" data-history-status="shipping">
          <div class="history-card-head">
            <div class="history-order-meta"><strong>GRI-20260528-${String(index + 1).padStart(3, "0")}</strong><span>|</span><span class="history-date">28 Mei 2026</span></div>
            <span class="status-pill">Diproses</span>
          </div>
          <div class="history-card-body">
            <img src="${item.image}" alt="${item.alt || item.title}">
            <div>
              <h2>${item.title}</h2>
              <p>${item.variant || "Produk Gerai Kompas"}</p>
              <p>${quantity} Barang x ${formatRupiah(Number(item.price) || 0)}</p>
            </div>
          </div>
          <div class="history-card-footer">
            <div class="history-total"><span>Total Belanja</span><strong>${formatRupiah(lineTotal)}</strong></div>
            <div class="history-card-actions">
              <a class="btn ghost" href="./purchase-detail.html?item=${index}">Detail</a>
              <button class="btn primary" type="button">Lacak Pesanan</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  historyCards = Array.from(document.querySelectorAll("[data-history-status]"));
}

function setHistoryFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.historyFilter === filter);
  });

  historyCards.forEach((card) => {
    const shouldShow = filter === "all" || card.dataset.historyStatus === filter;
    card.hidden = !shouldShow;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setHistoryFilter(button.dataset.historyFilter));
});

renderHistoryCards();
setHistoryFilter("all");
