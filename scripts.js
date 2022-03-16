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
    data.id = transactions.length - 1;

    const amount = Number(data.number);

    totalAmount += amount;

    if (amount < 0) {
      whidrawAmount += amount;
    } else {
      depositAmount += amount;
    }

    Card.addAmountCard(depositAmount);
    Card.addWhidrawCard(whidrawAmount);
    Card.addTotalCard(totalAmount);

    modalOverlay.style.display = "none";

    Table.addTransaction(transactions[transactions.length - 1]);
  },
};

// ============= INSERT INTO CARD'S ===============
const totalAmountCard =
  window.document.getElementsByClassName("totalAmount")[0];

const totalDepositCard =
  window.document.getElementsByClassName("depositAmount")[0];

const totalWhidrawAmountCard =
  window.document.getElementsByClassName("outcomeAmount")[0];

const Card = {
  addAmountCard(depositAmount) {
    totalDepositCard.textContent = depositAmount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },

  addWhidrawCard(whidrawAmount) {
    totalWhidrawAmountCard.textContent = whidrawAmount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },

  addTotalCard(totalAmount) {
    totalAmountCard.textContent = totalAmount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  },
};

// ============= INSERT INTO TABLE ===============

const Table = {
  transactionsContainer: document.querySelector(".data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = this.innerHTMLTransaction(transaction);

    Table.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const html = `
    <td class='description'>${transaction.description}</td>
    <td class=${transaction.number > 0 ? "deposit" : "whitdraw"}>${Number(
      transaction.number
    ).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}</td>
    <td class='date'>${transaction.date}</td>
    <td>
      <img src='./assets/minus.svg' alt='Remover transação' onclick="Action.removeTransaction(${transaction})"/>
    </td>
    `;
    return html;
  },
};

// ============= REMOVE DATA ===============

const Action = {
  removeTransaction(transaction) {
    console.log(transaction);
    // Table.transactionsContainer.deleteRow(transaction);
  },
};
