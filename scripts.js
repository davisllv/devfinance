const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

const saveModal = document.getElementsByClassName("save")[0];

openModal.onclick = function () {
  modalOverlay.style.display = "block";
};

closeModal.onclick = (ev) => {
  ev.preventDefault();
  modalOverlay.style.display = "none";
};

window.onclick = (ev) => {
  if (ev.target === modalOverlay) {
    ev.preventDefault();
    modalOverlay.style.display = "none";
  }
};

// ============= SUBMIT FORM ===============

let totalAmount = 0;
let depositAmount = 0;
let whidrawAmount = 0;
const totalAmountCard =
  window.document.getElementsByClassName("totalAmount")[0];
const totalDepositCard =
  window.document.getElementsByClassName("depositAmount")[0];
const totalWhidrawAmountCard =
  window.document.getElementsByClassName("outcomeAmount")[0];

saveModal.onclick = (ev) => {
  ev.preventDefault();
  const data = Array.from(
    document.querySelectorAll("#transaction-form input")
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  const amount = Number(data.number);

  totalAmount += amount;

  if (amount < 0) {
    whidrawAmount += amount;
  } else {
    depositAmount += amount;
  }

  totalDepositCard.textContent = depositAmount.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  totalWhidrawAmountCard.textContent = whidrawAmount.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  totalAmountCard.textContent = totalAmount.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  modalOverlay.style.display = "none";
};
