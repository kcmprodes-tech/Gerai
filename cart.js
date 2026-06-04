function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

const cartStore = document.querySelector(".cart-store");
const cartSummaryTotal = document.querySelector("#cartSummaryTotal");
const cartSummarySubtotal = document.querySelector("#cartSummarySubtotal");
const cartSummaryDiscount = document.querySelector("#cartSummaryDiscount");
const cartSummaryItems = document.querySelector("#cartSummaryItems");
const cartBottomTotal = document.querySelector("#cartBottomTotal");
const cartAuthActions = document.querySelector("#cartAuthActions");
const cartAccountAvatar = document.querySelector("#cartAccountAvatar");
const selectAllCart = document.querySelector("#selectAllCart");
const removeSelectedCart = document.querySelector("#removeSelectedCart");
const cartBuyButtons = document.querySelectorAll(".cart-buy-button");
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
let cartRows = [];

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

function getStoredCartItems() {
  try {
    return JSON.parse(getStoredValue("geraiCartItems") || "[]");
  } catch {
    return [];
  }
}

function saveCartItems(items) {
  setStoredValue("geraiCartItems", JSON.stringify(items));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cartRowMarkup(item) {
  const quantity = Math.max(1, Number(item.quantity) || 1);
  const price = Number(item.price) || 0;
  const oldPrice = Number(item.oldPrice) || 0;
  const oldPriceMarkup = oldPrice ? `<span data-line-old-price>${formatRupiah(oldPrice * quantity)}</span>` : "";

  return `
    <div class="cart-row" data-id="${escapeHtml(item.id)}" data-price="${price}"${oldPrice ? ` data-old-price="${oldPrice}"` : ""}>
      <label class="cart-check item-select" aria-label="Pilih produk">
        <input type="checkbox" checked data-cart-check>
        <span aria-hidden="true"></span>
      </label>
      <img class="cart-thumb" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}">
      <div class="cart-info">
        <h2 class="cart-name">${escapeHtml(item.title)}</h2>
        <p class="cart-variant">Varian: ${escapeHtml(item.variant || "Produk")}</p>
        <div class="cart-row-foot">
          <div class="cart-price-area">
            <strong data-line-price>${formatRupiah(price * quantity)}</strong>
            ${oldPriceMarkup}
          </div>
          <div class="cart-qty">
            <button data-qty-dec type="button" aria-label="Kurangi">−</button>
            <span data-qty-value>${quantity}</span>
            <button data-qty-inc type="button" aria-label="Tambah">+</button>
          </div>
        </div>
      </div>
      <button class="cart-icon-action" data-remove-item type="button" aria-label="Hapus item"><i class="ph ph-trash" aria-hidden="true"></i></button>
    </div>
  `;
}

function renderCartItems() {
  const items = getStoredCartItems();
  if (!cartStore) return;

  if (items.length === 0) {
    cartStore.innerHTML = '<p class="cart-empty-state">Keranjang masih kosong.</p>';
  } else {
    cartStore.innerHTML = items.map(cartRowMarkup).join("");
  }

  cartRows = Array.from(document.querySelectorAll(".cart-row"));
}

function persistCartRows() {
  const items = cartRows.map((row) => {
    const quantity = getQuantity(row);
    return {
      id: row.dataset.id || "",
      title: row.querySelector(".cart-name")?.textContent.trim() || "",
      variant: row.querySelector(".cart-variant")?.textContent.replace(/^Varian:\s*/i, "").trim() || "",
      image: row.querySelector(".cart-thumb")?.getAttribute("src") || "",
      alt: row.querySelector(".cart-thumb")?.getAttribute("alt") || "",
      price: Number(row.dataset.price) || 0,
      oldPrice: Number(row.dataset.oldPrice) || 0,
      quantity,
    };
  });
  saveCartItems(items);
}

function setHeaderLoginState() {
  const isLoggedIn = getStoredValue("geraiLoggedIn") === "true";
  if (!cartAuthActions || !cartAccountAvatar) return;
  cartAuthActions.classList.toggle("hidden", isLoggedIn);
  cartAccountAvatar.classList.toggle("hidden", !isLoggedIn);
  window.syncGeraiAuthHeader?.();
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
  const identity = cartLoginIdentityPreview.textContent.trim() || cartLoginIdentity.value.trim() || "ikhwanardhi@gmail.com";
  setStoredValue("geraiLoginIdentity", identity);
  setStoredValue("geraiLoggedIn", "true");
  setHeaderLoginState();
  window.syncGeraiAuthHeader?.();
  closeCartLogin();
  window.location.href = "./checkout.html";
}

function getQuantity(row) {
  return Number(row.querySelector("[data-qty-value]").textContent) || 1;
}

function updateQuantityButton(row) {
  const quantity = getQuantity(row);
  const decrementButton = row.querySelector("[data-qty-dec]");
  if (!decrementButton) return;

  if (quantity <= 1) {
    decrementButton.innerHTML = '<i class="ph ph-trash" aria-hidden="true"></i>';
    decrementButton.setAttribute("aria-label", "Hapus item");
    decrementButton.dataset.qtyMode = "remove";
    return;
  }

  decrementButton.textContent = "−";
  decrementButton.setAttribute("aria-label", "Kurangi");
  decrementButton.dataset.qtyMode = "decrement";
}

function setQuantity(row, quantity) {
  row.querySelector("[data-qty-value]").textContent = quantity;
  updateQuantityButton(row);
  persistCartRows();
}

function removeCartRow(row) {
  row.remove();
  cartRows = Array.from(document.querySelectorAll(".cart-row"));
  persistCartRows();
  if (cartRows.length === 0 && cartStore) {
    cartStore.innerHTML = '<p class="cart-empty-state">Keranjang masih kosong.</p>';
  }
}

function getSelectedCartItems() {
  return cartRows
    .filter((row) => row.querySelector("[data-cart-check]")?.checked)
    .map((row) => {
      const quantity = getQuantity(row);
      const price = Number(row.dataset.price) || 0;
      const oldPrice = Number(row.dataset.oldPrice) || 0;
      return {
        title: row.querySelector(".cart-name")?.textContent.trim() || "",
        variant: row.querySelector(".cart-variant")?.textContent.replace(/^Varian:\s*/i, "").trim() || "",
        image: row.querySelector(".cart-thumb")?.getAttribute("src") || "",
        alt: row.querySelector(".cart-thumb")?.getAttribute("alt") || "",
        price,
        oldPrice,
        quantity,
      };
    });
}

function saveCheckoutItems() {
  setStoredValue("geraiCheckoutItems", JSON.stringify(getSelectedCartItems()));
}

function updateCartTotals() {
  let total = 0;
  let subtotal = 0;
  let selectedItems = 0;

  cartRows.forEach((row) => {
    updateQuantityButton(row);

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
  if (cartSummarySubtotal) cartSummarySubtotal.textContent = formatRupiah(subtotal);
  if (cartSummaryDiscount) cartSummaryDiscount.textContent = `-${formatRupiah(discount)}`;
  if (cartSummaryTotal) cartSummaryTotal.textContent = formatRupiah(total);
  if (cartSummaryItems) cartSummaryItems.textContent = `Total Harga (${selectedItems} Barang)`;
  if (cartBottomTotal) cartBottomTotal.textContent = formatRupiah(total);

  cartBuyButtons.forEach((btn) => {
    if (btn.classList.contains("cart-bottom-btn")) {
      btn.textContent = `Beli (${selectedItems})`;
    } else {
      btn.textContent = selectedItems > 0 ? `Beli (${selectedItems})` : "Beli";
    }
    btn.disabled = selectedItems === 0;
    btn.setAttribute("aria-disabled", String(selectedItems === 0));
  });

  const selectedChecks = cartRows.map((row) => row.querySelector("[data-cart-check]")).filter(Boolean);
  const selectedChecksCount = selectedChecks.filter((input) => input.checked).length;
  if (selectAllCart) {
    selectAllCart.disabled = selectedChecks.length === 0;
    selectAllCart.checked = selectedChecks.length > 0 && selectedChecks.every((input) => input.checked);
    selectAllCart.indeterminate = selectedChecks.some((input) => input.checked) && !selectAllCart.checked;
  }

  if (removeSelectedCart) {
    removeSelectedCart.disabled = selectedChecksCount === 0;
  }
}

renderCartItems();

document.querySelector(".cart-list").addEventListener("click", (event) => {
  const increment = event.target.closest("[data-qty-inc]");
  const decrement = event.target.closest("[data-qty-dec]");
  const remove = event.target.closest("[data-remove-item]");

  if (remove) {
    removeCartRow(remove.closest(".cart-row"));
    updateCartTotals();
    return;
  }

  if (!increment && !decrement) return;

  const row = event.target.closest(".cart-row");
  const currentQuantity = getQuantity(row);
  if (decrement && currentQuantity <= 1) {
    removeCartRow(row);
    updateCartTotals();
    return;
  }

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
  if (removeSelectedCart.disabled) return;
  document.querySelectorAll("[data-cart-check]:checked").forEach((input) => {
    removeCartRow(input.closest(".cart-row"));
  });
  updateCartTotals();
});

cartBuyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    saveCheckoutItems();
    if (getStoredValue("geraiLoggedIn") !== "true") {
      openCartLogin();
      return;
    }
    window.location.href = "./checkout.html";
  });
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
