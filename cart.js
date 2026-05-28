function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

let cartRows = Array.from(document.querySelectorAll(".cart-row"));
const cartSummaryTotal = document.querySelector("#cartSummaryTotal");
const cartSummarySubtotal = document.querySelector("#cartSummarySubtotal");
const cartSummaryDiscount = document.querySelector("#cartSummaryDiscount");
const cartSummaryItems = document.querySelector("#cartSummaryItems");
const cartAuthActions = document.querySelector("#cartAuthActions");
const cartAccountAvatar = document.querySelector("#cartAccountAvatar");
const selectAllCart = document.querySelector("#selectAllCart");
const removeSelectedCart = document.querySelector("#removeSelectedCart");
const cartBuyButton = document.querySelector(".cart-buy-button");

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
  let subtotal = 0;
  let selectedItems = 0;

  cartRows.forEach((row) => {
    const quantity = getQuantity(row);
    const price = Number(row.dataset.price) || 0;
    const oldPrice = Number(row.dataset.oldPrice) || 0;
    const linePrice = price * quantity;
    const lineOldPrice = oldPrice * quantity;
    const isChecked = row.querySelector("[data-cart-check]")?.checked ?? true;

    row.querySelector("[data-line-price]").textContent = formatRupiah(linePrice);

    const oldPriceElement = row.querySelector("[data-line-old-price]");
    if (oldPriceElement) {
      oldPriceElement.textContent = formatRupiah(lineOldPrice);
    }

    if (isChecked) {
      selectedItems += quantity;
      total += linePrice;
      subtotal += (oldPrice || price) * quantity;
    }
  });

  const discount = Math.max(0, subtotal - total);
  cartSummarySubtotal.textContent = formatRupiah(subtotal);
  cartSummaryDiscount.textContent = `-${formatRupiah(discount)}`;
  cartSummaryTotal.textContent = formatRupiah(total);
  cartSummaryItems.textContent = `Total Harga (${selectedItems} Barang)`;

  const selectedChecks = cartRows.map((row) => row.querySelector("[data-cart-check]")).filter(Boolean);
  if (selectAllCart) {
    selectAllCart.checked = selectedChecks.length > 0 && selectedChecks.every((input) => input.checked);
    selectAllCart.indeterminate = selectedChecks.some((input) => input.checked) && !selectAllCart.checked;
  }
}

document.querySelector(".cart-list").addEventListener("click", (event) => {
  const increment = event.target.closest("[data-qty-inc]");
  const decrement = event.target.closest("[data-qty-dec]");
  const remove = event.target.closest("[data-remove-item]");

  if (remove) {
    remove.closest(".cart-row").remove();
    cartRows = Array.from(document.querySelectorAll(".cart-row"));
    updateCartTotals();
    return;
  }

  if (!increment && !decrement) return;

  const row = event.target.closest(".cart-row");
  const currentQuantity = getQuantity(row);
  const nextQuantity = increment ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

  setQuantity(row, nextQuantity);
  updateCartTotals();
});

document.querySelector(".cart-list").addEventListener("change", (event) => {
  if (event.target.matches("[data-cart-check]")) updateCartTotals();
});

selectAllCart?.addEventListener("change", () => {
  document.querySelectorAll("[data-cart-check]").forEach((input) => {
    input.checked = selectAllCart.checked;
  });
  updateCartTotals();
});

removeSelectedCart?.addEventListener("click", () => {
  document.querySelectorAll("[data-cart-check]:checked").forEach((input) => {
    input.closest(".cart-row").remove();
  });
  cartRows = Array.from(document.querySelectorAll(".cart-row"));
  updateCartTotals();
});

cartBuyButton?.addEventListener("click", () => {
  window.location.href = "./checkout.html";
});

updateCartTotals();
setHeaderLoginState();
