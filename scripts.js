const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

const saveModal = document.getElementsByClassName("save")[0];

openModal.onclick = function () {
  modalOverlay.style.display = "block";
};

closeModal.onclick = () => {
  modalOverlay.style.display = "none";
};

window.onclick = (ev) => {
  if (ev.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
};

// ============= SUBMIT FORM ===============

let totalAmount = 0;
let depositAmount = 0;
let whitdrawAmount = 0;

saveModal.onclick = (ev) => {
  ev.preventDefault();
  const data = Array.from(
    document.querySelectorAll("#transaction-form input")
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  const amount = Number(data.number);

  totalAmount += amount;

  if (amount < 0) {
    whitdrawAmount += amount;
  } else {
    depositAmount += amount;
  }

  console.log(totalAmount, depositAmount, whitdrawAmount);
};
