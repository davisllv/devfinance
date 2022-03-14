const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const Modal = {
  ModalOpen() {
    modalOverlay.style.display = "block";
  },

  ModalClose(ev) {
    ev.preventDefault();
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

const Transaction = {
  SaveTransaction(ev) {
    ev.preventDefault();

    const data = Array.from(
      document.querySelectorAll("#transaction-form input")
    ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

    if (!data.description || !data.number || !data.date) {
      alert(`Set all the data`);
      return;
    }

    transactions.push(data);

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
  },
};
