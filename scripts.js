const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

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
