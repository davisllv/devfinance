const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

openModal.onclick = function () {
  modalOverlay.style.display = "block";
};
