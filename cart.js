function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

const cartRows = Array.from(document.querySelectorAll(".cart-row"));
const cartSummaryTotal = document.querySelector("#cartSummaryTotal");
const cartAuthActions = document.querySelector("#cartAuthActions");
const cartAccountAvatar = document.querySelector("#cartAccountAvatar");

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

function setHeaderLoginState() {
  const isLoggedIn = getStoredValue("geraiLoggedIn") === "true";
  if (!cartAuthActions || !cartAccountAvatar) return;
  cartAuthActions.classList.toggle("hidden", isLoggedIn);
  cartAccountAvatar.classList.toggle("hidden", !isLoggedIn);
}

function getQuantity(row) {
  return Number(row.querySelector("[data-qty-value]").textContent) || 1;
}

function setQuantity(row, quantity) {
  row.querySelector("[data-qty-value]").textContent = quantity;
}

function updateCartTotals() {
  let total = 0;

  cartRows.forEach((row) => {
    const quantity = getQuantity(row);
    const price = Number(row.dataset.price) || 0;
    const oldPrice = Number(row.dataset.oldPrice) || 0;
    const linePrice = price * quantity;
    const lineOldPrice = oldPrice * quantity;

    total += linePrice;
    row.querySelector("[data-line-price]").textContent = formatRupiah(linePrice);

    const oldPriceElement = row.querySelector("[data-line-old-price]");
    if (oldPriceElement) {
      oldPriceElement.textContent = formatRupiah(lineOldPrice);
    }
  });

  cartSummaryTotal.textContent = formatRupiah(total);
}

document.querySelector(".cart-list").addEventListener("click", (event) => {
  const increment = event.target.closest("[data-qty-inc]");
  const decrement = event.target.closest("[data-qty-dec]");
  if (!increment && !decrement) return;

  const row = event.target.closest(".cart-row");
  const currentQuantity = getQuantity(row);
  const nextQuantity = increment ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

  setQuantity(row, nextQuantity);
  updateCartTotals();
});

updateCartTotals();
setHeaderLoginState();
