const addressData = {
  "DKI Jakarta": {
    "Menteng": {
      "Gondangdia": ["10350"],
      "Cikini": ["10330"],
    },
    "Kebayoran Baru": {
      "Senayan": ["12190"],
      "Melawai": ["12160"],
    },
  },
  "Jawa Barat": {
    "Bandung Wetan": {
      "Tamansari": ["40116"],
      "Cihapit": ["40114"],
    },
    "Bogor Tengah": {
      "Pabaton": ["16121"],
      "Paledang": ["16122"],
    },
  },
};

const addressModal = document.querySelector("#addressModal");
const openAddressModal = document.querySelector("#openAddressModal");
const addressForm = document.querySelector("#addressForm");
const contactStep = document.querySelector('[data-address-step="contact"]');
const detailStep = document.querySelector('[data-address-step="detail"]');
const addressNext = document.querySelector(".address-next");
const addressSubmit = document.querySelector(".address-submit");
const shippingAddressText = document.querySelector("#shippingAddressText");
const shippingAddressCard = document.querySelector("#shippingAddressCard");
const shippingMethodCard = document.querySelector("#shippingMethodCard");
const shippingCostSummary = document.querySelector("#shippingCostSummary");
const checkoutGrandTotal = document.querySelector("#checkoutGrandTotal");
const checkoutProducts = document.querySelector("#checkoutProducts");
const checkoutSummaryItems = document.querySelector("#checkoutSummaryItems");
const checkoutSubtotal = document.querySelector("#checkoutSubtotal");
const payButton = document.querySelector(".pay-button");
const paymentHelperText = document.querySelector("#paymentHelperText");
const paymentModal = document.querySelector("#paymentModal");
const successModal = document.querySelector("#successModal");
const creditCardForm = document.querySelector("#creditCardForm");
const cardPaymentTotal = document.querySelector("#cardPaymentTotal");
const cardPayButton = document.querySelector(".card-pay-button");
const cardRequiredFields = Array.from(document.querySelectorAll("[data-card-required]"));
const contactInputs = Array.from(addressForm.querySelectorAll("[data-contact-required]"));
const detailRequiredFields = Array.from(addressForm.querySelectorAll("[data-detail-required]"));
const provinceSelect = document.querySelector("#provinceSelect");
const districtSelect = document.querySelector("#districtSelect");
const villageSelect = document.querySelector("#villageSelect");
const postalSelect = document.querySelector("#postalSelect");
const fallbackCheckoutItems = [
  {
    title: "Bundling Pesta Bola: Tabloid Bola by Kompas Edisi Pesta Bola Amerika 2026 + Akses Kompas Digital Premium",
    variant: "Digital, Bundle",
    image: "./assets/product-pesta-bola.jpg",
    alt: "Bundling Pesta Bola",
    price: 99000,
    oldPrice: 125000,
    quantity: 1,
  },
  {
    title: "Kaus Halaman Depan Kompas - Pilih Tanggal Koran Sesukamu",
    variant: "Putih, Reguler",
    image: "./assets/product-kaus-kompas.png",
    alt: "Kaus Halaman Depan Kompas",
    price: 199000,
    oldPrice: 0,
    quantity: 1,
  },
  {
    title: "Paket Bundling Eksklusif: Bobo the Origin x Kompas.id & e-Magazine Bobo Reguler",
    variant: "Buku & Digital",
    image: "./assets/product-bobo-origin.jpg",
    alt: "Paket Bundling Bobo the Origin",
    price: 175000,
    oldPrice: 229000,
    quantity: 1,
  },
];
let checkoutItems = getCheckoutItems();
let baseTotal = getCheckoutBaseTotal();
let hasShippingAddress = false;
let currentGrandTotal = baseTotal;

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function getStoredValue(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // Storage can be blocked on file:// in some browsers.
  }

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
    // Keep the prototype flow working without persistent storage.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    tabState[key] = value;
    window.name = JSON.stringify(tabState);
  } catch {
    window.name = JSON.stringify({ [key]: value });
  }
}

function getCheckoutItems() {
  try {
    const storedItems = JSON.parse(getStoredValue("geraiCheckoutItems") || "[]");
    if (Array.isArray(storedItems) && storedItems.length) return storedItems;
  } catch {
    // Use fallback below.
  }

  return fallbackCheckoutItems;
}

function getCheckoutBaseTotal() {
  return checkoutItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
}

function getCheckoutItemCount() {
  return checkoutItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

function renderCheckoutProducts() {
  if (!checkoutProducts) return;

  checkoutProducts.innerHTML = checkoutItems
    .map((item) => {
      const quantity = Number(item.quantity) || 1;
      const lineTotal = (Number(item.price) || 0) * quantity;
      const oldPrice = Number(item.oldPrice) ? `<span>${formatRupiah(Number(item.oldPrice))}</span>` : "";
      return `
        <article class="checkout-card product-checkout-card">
          <img class="checkout-product-thumb" src="${item.image}" alt="${item.alt || item.title}">
          <div class="checkout-product-info">
            <h2>${item.title}</h2>
            <p>Varian: ${item.variant || "Digital, Bundle"}</p>
            <div class="checkout-product-foot">
              <div class="checkout-product-price">
                <strong>${formatRupiah(lineTotal)}</strong>
                ${oldPrice}
              </div>
              <span class="checkout-product-qty">x${quantity}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (checkoutSummaryItems) checkoutSummaryItems.textContent = `Total Harga (${getCheckoutItemCount()} Barang)`;
  if (checkoutSubtotal) checkoutSubtotal.textContent = formatRupiah(baseTotal);
  setStoredValue("geraiLastPurchaseItems", JSON.stringify(checkoutItems));
}

function fillSelect(select, placeholder, options) {
  select.innerHTML = [`<option value="">${placeholder}</option>`, ...options.map((option) => `<option value="${option}">${option}</option>`)].join("");
}

function updateClearButtons() {
  addressForm.querySelectorAll("input").forEach((input) => {
    const field = input.closest(".address-field");
    if (field) field.classList.toggle("has-value", Boolean(input.value.trim()));
  });
}

function updateContactState() {
  addressNext.disabled = !contactInputs.every((input) => input.value.trim());
  updateClearButtons();
}

function updateDetailState() {
  addressSubmit.disabled = !detailRequiredFields.every((field) => field.value.trim());
}

function updateCheckoutState() {
  const selectedShipping = document.querySelector('input[name="shipping"]:checked');
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  const shippingCost = Number(selectedShipping?.value || 0);

  shippingCostSummary.textContent = formatRupiah(shippingCost);
  currentGrandTotal = baseTotal + shippingCost;
  checkoutGrandTotal.textContent = formatRupiah(currentGrandTotal);
  cardPaymentTotal.textContent = formatRupiah(currentGrandTotal);
  payButton.disabled = !(hasShippingAddress && selectedShipping && selectedPayment);
  paymentHelperText.textContent = payButton.disabled
    ? "Lengkapi alamat pengiriman dan pilih metode pembayaran untuk melanjutkan."
    : "Dengan melanjutkan pembayaran, kamu menyetujui S&K Asuransi Pengiriman & Proteksi.";
}

function getShippingAddressData() {
  return {
    name: document.querySelector("#recipientName").value.trim(),
    phone: document.querySelector("#recipientPhone").value.trim(),
    email: document.querySelector("#recipientEmail").value.trim(),
    fullAddress: document.querySelector("#fullAddress").value.trim(),
    province: provinceSelect.value,
    district: districtSelect.value,
    village: villageSelect.value,
    postal: postalSelect.value,
    note: document.querySelector("#addressNote")?.value.trim() || "",
  };
}

function getAddressLine(addressDataItem) {
  return `${addressDataItem.fullAddress}, ${addressDataItem.village}, ${addressDataItem.district}, ${addressDataItem.province} ${addressDataItem.postal}`;
}

function applyShippingAddress(addressDataItem) {
  if (!addressDataItem) return;

  shippingAddressText.innerHTML = `<span class="filled-address"><strong>${addressDataItem.name}</strong><p>${getAddressLine(addressDataItem)}<br>${addressDataItem.phone}</p></span>`;
  shippingAddressCard.classList.add("is-filled");
  openAddressModal.textContent = "Ganti";
  shippingMethodCard.hidden = false;
  hasShippingAddress = true;
}

function fillAddressForm(addressDataItem) {
  if (!addressDataItem) return;

  document.querySelector("#recipientName").value = addressDataItem.name || "";
  document.querySelector("#recipientPhone").value = addressDataItem.phone || "";
  document.querySelector("#recipientEmail").value = addressDataItem.email || "";
  document.querySelector("#fullAddress").value = addressDataItem.fullAddress || "";
  if (document.querySelector("#addressNote")) document.querySelector("#addressNote").value = addressDataItem.note || "";

  provinceSelect.value = addressDataItem.province || "";
  resetLocationAfter("province");
  if (provinceSelect.value) {
    fillSelect(districtSelect, "Pilih kecamatan", Object.keys(addressData[provinceSelect.value] || {}));
    districtSelect.disabled = false;
    districtSelect.value = addressDataItem.district || "";
  }

  resetLocationAfter("district");
  if (districtSelect.value) {
    fillSelect(villageSelect, "Pilih kelurahan", Object.keys(addressData[provinceSelect.value]?.[districtSelect.value] || {}));
    villageSelect.disabled = false;
    villageSelect.value = addressDataItem.village || "";
  }

  resetLocationAfter("village");
  if (villageSelect.value) {
    fillSelect(postalSelect, "Pilih kode pos", addressData[provinceSelect.value]?.[districtSelect.value]?.[villageSelect.value] || []);
    postalSelect.disabled = false;
    postalSelect.value = addressDataItem.postal || "";
  }

  updateContactState();
  updateDetailState();
}

function restoreShippingAddress() {
  try {
    const savedAddress = JSON.parse(getStoredValue("geraiShippingAddress") || "null");
    if (!savedAddress) return;
    applyShippingAddress(savedAddress);
    fillAddressForm(savedAddress);
  } catch {
    // Ignore invalid saved address data.
  }
}

function updateCardFormState() {
  cardPayButton.disabled = !cardRequiredFields.every((field) => field.value.trim());
}

function openPaymentModal() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (payButton.disabled || selectedPayment?.value !== "credit-card") return;
  try {
    sessionStorage.setItem("geraiPaymentTotal", String(currentGrandTotal));
  } catch (error) {
    window.name = JSON.stringify({ geraiPaymentTotal: String(currentGrandTotal) });
  }
  window.location.href = `./payment-cc.html?total=${currentGrandTotal}`;
}

function closePaymentModal() {
  paymentModal.hidden = true;
  document.body.classList.remove("modal-open");
  payButton.focus();
}

function showSuccessModal() {
  paymentModal.hidden = true;
  successModal.hidden = false;
}

function resetLocationAfter(level) {
  if (level === "province") {
    fillSelect(districtSelect, "Pilih kecamatan", []);
    fillSelect(villageSelect, "Pilih kelurahan", []);
    fillSelect(postalSelect, "Pilih kode pos", []);
    districtSelect.disabled = true;
    villageSelect.disabled = true;
    postalSelect.disabled = true;
  }

  if (level === "district") {
    fillSelect(villageSelect, "Pilih kelurahan", []);
    fillSelect(postalSelect, "Pilih kode pos", []);
    villageSelect.disabled = true;
    postalSelect.disabled = true;
  }

  if (level === "village") {
    fillSelect(postalSelect, "Pilih kode pos", []);
    postalSelect.disabled = true;
  }
}

function showContactStep() {
  contactStep.hidden = false;
  detailStep.hidden = true;
}

function showDetailStep() {
  contactStep.hidden = true;
  detailStep.hidden = false;
  document.querySelector("#fullAddress").focus();
  updateDetailState();
}

function openModal() {
  addressModal.hidden = false;
  document.body.classList.add("modal-open");
  try {
    fillAddressForm(JSON.parse(getStoredValue("geraiShippingAddress") || "null"));
  } catch {
    // Keep the current form state.
  }
  showContactStep();
  updateContactState();
  document.querySelector("#recipientName").focus();
}

function closeModal() {
  addressModal.hidden = true;
  document.body.classList.remove("modal-open");
  openAddressModal.focus();
}

openAddressModal.addEventListener("click", openModal);

addressModal.addEventListener("click", (event) => {
  if (event.target === addressModal) {
    closeModal();
  }
});

addressForm.addEventListener("input", () => {
  updateContactState();
  updateDetailState();
});

addressNext.addEventListener("click", () => {
  if (!addressNext.disabled) showDetailStep();
});

addressForm.addEventListener("click", (event) => {
  const clearButton = event.target.closest("[data-clear-field]");
  if (!clearButton) return;

  const field = document.querySelector(`#${clearButton.dataset.clearField}`);
  field.value = "";
  field.focus();
  updateContactState();
});

provinceSelect.addEventListener("change", () => {
  resetLocationAfter("province");
  const districts = Object.keys(addressData[provinceSelect.value] || {});
  if (districts.length) {
    fillSelect(districtSelect, "Pilih kecamatan", districts);
    districtSelect.disabled = false;
  }
  updateDetailState();
});

districtSelect.addEventListener("change", () => {
  resetLocationAfter("district");
  const villages = Object.keys(addressData[provinceSelect.value]?.[districtSelect.value] || {});
  if (villages.length) {
    fillSelect(villageSelect, "Pilih kelurahan", villages);
    villageSelect.disabled = false;
  }
  updateDetailState();
});

villageSelect.addEventListener("change", () => {
  resetLocationAfter("village");
  const postalCodes = addressData[provinceSelect.value]?.[districtSelect.value]?.[villageSelect.value] || [];
  if (postalCodes.length) {
    fillSelect(postalSelect, "Pilih kode pos", postalCodes);
    postalSelect.disabled = false;
  }
  updateDetailState();
});

postalSelect.addEventListener("change", updateDetailState);

addressForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (addressSubmit.disabled) return;

  const name = document.querySelector("#recipientName").value.trim();
  const savedAddress = getShippingAddressData();
  savedAddress.name = name;
  setStoredValue("geraiShippingAddress", JSON.stringify(savedAddress));
  applyShippingAddress(savedAddress);
  updateCheckoutState();
  closeModal();
});

document.querySelector(".checkout-left").addEventListener("change", (event) => {
  if (event.target.matches('input[name="shipping"], input[name="payment"]')) {
    updateCheckoutState();
  }
});

payButton.addEventListener("click", openPaymentModal);

paymentModal.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    closePaymentModal();
  }
});

creditCardForm.addEventListener("input", (event) => {
  if (event.target.id === "cardNumber") {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  if (event.target.id === "cardExpiry") {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
  }

  if (event.target.id === "cardCvv") {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
  }

  updateCardFormState();
});

creditCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cardPayButton.disabled) return;
  showSuccessModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!addressModal.hidden) closeModal();
  if (!paymentModal.hidden) closePaymentModal();
  if (!successModal.hidden) {
    successModal.hidden = true;
    document.body.classList.remove("modal-open");
  }
});

resetLocationAfter("province");
renderCheckoutProducts();
restoreShippingAddress();
updateContactState();
updateDetailState();
updateCheckoutState();
updateCardFormState();
