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

saveModal.onclick = () => {
  const data = Array.from(
    document.querySelectorAll("#transaction-form input")
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  console.log(data);
};
