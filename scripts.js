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
  form: document.querySelectorAll("#transaction-form input"),

  ValidateFields(data) {
    const { description, number, date } = data;
    if (description.trim() === "" || !number || !date) {
      throw new Error("Por favor, preencha todos os dados");
    }
  },

  getValues() {
    const data = Array.from(this.form).reduce(
      (acc, input) => ({ ...acc, [input.id]: input.value }),
      {}
    );

    return data;
  },

  makeCalculation(amount) {
    totalAmount += amount;

    if (amount < 0) {
      whidrawAmount += amount;
    } else {
      depositAmount += amount;
    }

    Card.addAmountCard(depositAmount);
    Card.addWhidrawCard(whidrawAmount);
    Card.addTotalCard(totalAmount);
  },

  SaveTransaction(ev) {
    ev.preventDefault();
    try {
      const data = this.getValues();

      this.ValidateFields(data);

      const formatedDate = data.date.split(`-`);
      data.date = `${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`;

      this.makeCalculation(Number(data.number));

      Modal.ModalClose(ev);

      transactions.push(data);

      App.reload();
    } catch (error) {
      alert(error.message);
    }
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
    tr.innerHTML = this.innerHTMLTransaction(transaction, index);

    Table.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const html = `
  <td class='description'>${transaction.description}</td>
  <td class=${transaction.number > 0 ? "deposit" : "whitdraw"}>${Number(
      transaction.number
    ).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</td>
  <td class='date'>${transaction.date}</td>
  <td>
    <img src='./assets/minus.svg' alt='Remover transação' onclick="Action.removeTransaction(${index})"/>
  </td>
  `;
    return html;
  },

  clearTransaction() {
    Table.transactionsContainer.innerHTML = "";
  },
};

// ============= REMOVE DATA ===============
const Action = {
  removeTransaction(index) {
    console.log(index);
    const amount = Number(transactions[index].number);
    transactions.splice(Number(index), 1);

    if (amount < 0) {
      whidrawAmount += -amount;
    } else {
      depositAmount -= amount;
    }

    totalAmount -= amount;

    Card.addAmountCard(depositAmount);
    Card.addWhidrawCard(whidrawAmount);
    Card.addTotalCard(totalAmount);

    Table.transactionsContainer.deleteRow(index);
  },
};

const Utils = {
  FormatDate(date) {},
};

const App = {
  init() {
    transactions.forEach((item, index) => {
      Table.addTransaction(item, index);
    });
  },

  reload() {
    Table.clearTransaction();
    App.init();
  },
};

App.init();
