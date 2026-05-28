const paymentTotal = document.querySelector("#paymentTotal");
const payFullTotal = document.querySelector("#payFullTotal");
const form = document.querySelector("#ccPaymentForm");
const submitButton = document.querySelector("#ccSubmitButton");
const requiredFields = Array.from(document.querySelectorAll("[data-required]"));
const cardNumberInput = document.querySelector("#ccNumber");
const monthInput = document.querySelector("#ccMonth");
const yearInput = document.querySelector("#ccYear");
const cvvInput = document.querySelector("#ccCvv");
const successOverlay = document.querySelector("#ccSuccessOverlay");

function formatRupiah(value, withSpace = false) {
  const prefix = withSpace ? "Rp " : "Rp";
  return `${prefix}${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function getStoredTotal() {
  const queryTotal = Number(new URLSearchParams(window.location.search).get("total"));
  if (queryTotal > 0) return queryTotal;

  try {
    const sessionTotal = Number(sessionStorage.getItem("geraiPaymentTotal"));
    if (sessionTotal > 0) return sessionTotal;
  } catch (error) {
    const tabState = JSON.parse(window.name || "{}");
    const tabTotal = Number(tabState.geraiPaymentTotal);
    if (tabTotal > 0) return tabTotal;
  }

  return 99000;
}

function onlyDigits(value, maxLength) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function formatCardNumber(value) {
  return onlyDigits(value, 16).replace(/(.{4})/g, "$1 ").trim();
}

function isFormComplete() {
  const cardDigits = cardNumberInput.value.replace(/\D/g, "");
  return requiredFields.every((field) => field.value.trim()) && cardDigits.length === 16;
}

function updateFieldStates() {
  requiredFields.forEach((field) => {
    field.classList.toggle("is-filled", Boolean(field.value.trim()));
  });

  const complete = isFormComplete();
  submitButton.disabled = !complete;
  submitButton.classList.toggle("is-active", complete);
}

function handleInput(event) {
  if (event.target === cardNumberInput) {
    event.target.value = formatCardNumber(event.target.value);
  }

  if (event.target === monthInput) {
    const value = onlyDigits(event.target.value, 2);
    event.target.value = value.length === 2 ? String(Math.min(Math.max(Number(value), 1), 12)).padStart(2, "0") : value;
  }

  if (event.target === yearInput) {
    event.target.value = onlyDigits(event.target.value, 4);
  }

  if (event.target === cvvInput) {
    event.target.value = onlyDigits(event.target.value, 4);
  }

  updateFieldStates();
}

function showSuccess() {
  window.location.href = "./order-success.html";
}

const total = getStoredTotal();
paymentTotal.textContent = formatRupiah(total, true);
payFullTotal.textContent = formatRupiah(total);
updateFieldStates();

form.addEventListener("input", handleInput);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitButton.disabled) return;
  showSuccess();
});

successOverlay.addEventListener("click", (event) => {
  if (event.target === successOverlay) {
    successOverlay.hidden = true;
    document.body.classList.remove("modal-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !successOverlay.hidden) {
    successOverlay.hidden = true;
    document.body.classList.remove("modal-open");
  }
});
