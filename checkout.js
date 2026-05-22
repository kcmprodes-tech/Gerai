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
const baseTotal = 99000;
let hasShippingAddress = false;
let currentGrandTotal = baseTotal;

function formatRupiah(value) {
  return `Rp${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
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

function updateCardFormState() {
  cardPayButton.disabled = !cardRequiredFields.every((field) => field.value.trim());
}

function openPaymentModal() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (payButton.disabled || selectedPayment?.value !== "credit-card") return;
  paymentModal.hidden = false;
  document.body.classList.add("modal-open");
  cardPaymentTotal.textContent = formatRupiah(currentGrandTotal);
  updateCardFormState();
  document.querySelector("#cardNumber").focus();
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
  const phone = document.querySelector("#recipientPhone").value.trim();
  const fullAddress = document.querySelector("#fullAddress").value.trim();
  const address = `${fullAddress}, ${villageSelect.value}, ${districtSelect.value}, ${provinceSelect.value} ${postalSelect.value}`;
  shippingAddressText.innerHTML = `<span class="filled-address"><strong>${name}</strong><p>${address}<br>${phone}</p></span>`;
  shippingAddressCard.classList.add("is-filled");
  openAddressModal.textContent = "Ganti";
  shippingMethodCard.hidden = false;
  hasShippingAddress = true;
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
updateContactState();
updateDetailState();
updateCheckoutState();
updateCardFormState();
