const form = document.querySelector(".form");
const loadingScreen = document.querySelector(".loading-screen");
const overlay = document.querySelector(".overlay");
const body = document.querySelector(".body");
const mainWrapper = document.querySelector(".main-wrapper");

function showLoadingScreen() {
  loadingScreen.style.display = "flex";
  setTimeout(() => {
    loadingScreen.style.display = "none";
    showOverlay();
  }, 2000);
}

// modals logic
function showOverlay() {
  mainWrapper.style.display = "none";
  overlay.style.display = "flex";
  body.style.overflow = "hidden";
}

const modalSecurity = document.querySelector(".overlay__modal-security");
const modalDownloadKey = document.querySelector(".overlay__modal-download-key");
const modalConfirmKey = document.querySelector(".overlay__modal-confirm-key");
const modalSuccess = document.querySelector(".overlay__modal-success");
const modals = document.querySelectorAll(".overlay__modal");

function openModal(modalId) {
  modals.forEach((modal) => {
    modal.style.display = "none";
  });

  if (modalId == "modal-security") {
    modalDownloadKey.style.display = "block";
  } else if (modalId == "modal-download-key") {
    modalConfirmKey.style.display = "block";
  } else if (modalId == "modal-confirm-key") {
    modalSuccess.style.display = "block";
  }
}

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("overlay__button") &&
      !e.target.classList.contains("overlay__modal-confirm-key__button")
    ) {
      openModal(modal.id);
    }
  });
});

// validation
const submitBtn = form.querySelector(".button_submit");
const input = form.querySelector(".input");
const errorMsgText = form.querySelector(".error-msg__text");
const errorMsg = form.querySelector(".error-msg");

errorMsg.style.display = "none";
input.setCustomValidity(" ");
input.addEventListener("keydown", (e) => {
  input.classList.remove("input_error");
  errorMsg.style.display = "none";
});

submitBtn.addEventListener("click", (e) => {
  if (input.value == "") {
    input.classList.add("input_error");
    errorMsg.style.display = "flex";
    errorMsgText.textContent = "Email is required to have a value.";
  } else if (input.validity.typeMismatch) {
    input.classList.add("input_error");
    errorMsg.style.display = "flex";
    errorMsgText.textContent = "Invalid email address";
  } else {
    showLoadingScreen();
  }
});

// code input logic
const securityKey = "";
const codeInputs = document.querySelectorAll(".overlay__code__input");
const confirmKeyButton = document.querySelector(
  ".overlay__modal-confirm-key__button"
);
const confirmKeyErrorMessage = document.querySelector(
  ".overlay__confirm-key-error-message"
);

for (let i = 0; i < 5; i++) {
  codeInputs[i].addEventListener("input", (e) => {
    if (e.target.value.length === 5 && i < 4) {
      codeInputs[i + 1].focus();
    }
    if (e.target.value.length === 0 && i > 0) {
      codeInputs[i - 1].focus();
    }
  });
}

confirmKeyButton.addEventListener("click", (e) => {
  let code = "";
  codeInputs.forEach((codeInput) => {
    code += codeInput.value;
  });
  showLoadingScreen();
  if (code.toUpperCase() == securityKey) {
    openModal("modal-confirm-key");
    confirmKeyErrorMessage.style.display = "none";
  } else {
    confirmKeyErrorMessage.style.display = "flex";
  }
  console.log(code.toUpperCase());
});
