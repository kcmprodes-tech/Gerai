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
const cartLoginModal = document.querySelector("#cartLoginModal");
const cartLoginIdentity = document.querySelector("#cartLoginIdentity");
const cartLoginPassword = document.querySelector("#cartLoginPassword");
const cartIdentityStep = document.querySelector('[data-cart-login-step="identity"]');
const cartPasswordStep = document.querySelector('[data-cart-login-step="password"]');
const cartLoginIdentityPreview = document.querySelector("#cartLoginIdentityPreview");
const cartContinueIdentity = document.querySelector("#cartContinueIdentity");
const cartContinuePassword = document.querySelector("#cartContinuePassword");
const cartChangeIdentity = document.querySelector("#cartChangeIdentity");
const cartTogglePassword = document.querySelector("#cartTogglePassword");

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

function setHeaderLoginState() {
  const isLoggedIn = getStoredValue("geraiLoggedIn") === "true";
  if (!cartAuthActions || !cartAccountAvatar) return;
  cartAuthActions.classList.toggle("hidden", isLoggedIn);
  cartAccountAvatar.classList.toggle("hidden", !isLoggedIn);
}

function showCartIdentityStep() {
  cartIdentityStep.hidden = false;
  cartPasswordStep.hidden = true;
}

function showCartPasswordStep() {
  const identity = cartLoginIdentity.value.trim() || "ikhwanardhi@gmail.com";
  cartLoginIdentityPreview.textContent = identity;
  cartIdentityStep.hidden = true;
  cartPasswordStep.hidden = false;
  cartLoginPassword.focus();
}

function openCartLogin() {
  cartLoginModal.hidden = false;
  document.body.classList.add("modal-open");
  showCartIdentityStep();
  requestAnimationFrame(() => cartLoginIdentity.focus());
}

function closeCartLogin() {
  cartLoginModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function finishCartLogin() {
  setStoredValue("geraiLoggedIn", "true");
  setHeaderLoginState();
  closeCartLogin();
  window.location.href = "./checkout.html";
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
  if (getStoredValue("geraiLoggedIn") !== "true") {
    openCartLogin();
    return;
  }
  window.location.href = "./checkout.html";
});

cartLoginModal?.addEventListener("click", (event) => {
  if (event.target === cartLoginModal) closeCartLogin();
});

cartContinueIdentity?.addEventListener("click", showCartPasswordStep);
cartLoginIdentity?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") showCartPasswordStep();
});
cartChangeIdentity?.addEventListener("click", () => {
  showCartIdentityStep();
  cartLoginIdentity.focus();
});
cartTogglePassword?.addEventListener("click", () => {
  const shouldShow = cartLoginPassword.type === "password";
  cartLoginPassword.type = shouldShow ? "text" : "password";
  cartTogglePassword.setAttribute("aria-label", shouldShow ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});
cartContinuePassword?.addEventListener("click", finishCartLogin);
cartLoginPassword?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") finishCartLogin();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartLoginModal && !cartLoginModal.hidden) closeCartLogin();
});

updateCartTotals();
setHeaderLoginState();
