const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const saveModal = document.getElementsByClassName("save")[0];

const Modal = {
  ModalOpen() {
    modalOverlay.style.display = "block";
  },

  ModalClose() {
    modalOverlay.style.display = "none";
  },
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

const transactions = [];

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
  data.id = Math.round(Math.random() * 100 + 1);
  data.image = "./assets/minus.svg";

  transactions.push(data);

  let tbody = document.getElementById("tbody");
  transactions.forEach((item, index) => {
    let tr = tbody.insertRow(index);

    let td_description = tr.insertCell();
    let td_amount = tr.insertCell();
    let td_date = tr.insertCell();
    let td_actions = tr.insertCell();

    if (item.number < 0) {
      td_amount.classList.add("whitdraw");
      td_amount.innerText = Number(item.number).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }
  });
};
