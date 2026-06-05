const fallbackPurchaseItem = {
  title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
  variant: "Digital, Bundle",
  image: "./assets/product-pesta-bola.jpg",
  alt: "Bundling Pesta Bola",
  price: 99000,
  quantity: 1,
};

function getStoredValue(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // Keep file:// flows usable when localStorage is unavailable.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    return tabState[key] ?? null;
  } catch {
    return null;
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

function getPurchaseItems() {
  try {
    const storedItems = JSON.parse(getStoredValue(getAccountKey("geraiLastPurchaseItems")) || getStoredValue(getAccountKey("geraiCheckoutItems")) || "[]");
    if (Array.isArray(storedItems) && storedItems.length) return storedItems;
  } catch {
    // Use fallback below.
  }

  return [fallbackPurchaseItem];
}

function getSelectedPurchaseItem() {
  const itemIndex = Number(new URLSearchParams(window.location.search).get("item"));
  const items = getPurchaseItems();
  return items[Number.isInteger(itemIndex) && itemIndex >= 0 ? itemIndex : 0] || items[0] || fallbackPurchaseItem;
}

function getLoginEmail() {
  // Priority: email used at checkout > login identity > fallback
  return getStoredValue("geraiSubscriptionEmail")
    || getStoredValue("geraiLoginIdentity")
    || "ardi.suhanda@gmail.com";
}

function syncPurchaseDetail() {
  const item = getSelectedPurchaseItem();
  const image = document.querySelector("[data-purchase-image]");
  const title = document.querySelector("[data-purchase-title]");
  const variant = document.querySelector("[data-purchase-variant]");
  const email = document.querySelector("[data-purchase-email]");

  if (image) {
    image.src = item.image || fallbackPurchaseItem.image;
    image.alt = item.alt || item.title || fallbackPurchaseItem.alt;
  }

  if (title) title.textContent = item.title || fallbackPurchaseItem.title;
  if (variant) variant.textContent = item.variant || "Digital, Bundle";
  if (email) email.textContent = getLoginEmail();
}

function setupReceiptCopy() {
  const button = document.querySelector("#copyReceipt");
  const receipt = document.querySelector("#receiptNumber");
  if (!button || !receipt) return;

  button.addEventListener("click", async () => {
    const value = receipt.textContent.trim();
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Tersalin";
      setTimeout(() => {
        button.innerHTML = '<i class="ph ph-copy" aria-hidden="true"></i>Salin';
      }, 1200);
    } catch {
      button.textContent = value;
    }
  });
}

function syncAutoRenewalPill() {
  const pill = document.querySelector("#autoRenewalPill");
  if (!pill) return;
  const mode = getStoredValue("geraiPaymentMode") || "auto";
  pill.hidden = mode !== "auto";
}

syncPurchaseDetail();
syncAutoRenewalPill();
setupReceiptCopy();
