const form = document.querySelector(".form");
const loadingScreen = document.querySelector(".loading-screen");
const overlay = document.querySelector(".overlay");
const body = document.querySelector(".body");
const mainWrapper = document.querySelector(".main-wrapper");

function showLoadingScreen() {
  loadingScreen.style.display = "flex";
  setTimeout(() => {
    loadingScreen.classList.add("loading-screen_opacity-1");
  }, 10);

  setTimeout(() => {
    showOverlay();
    loadingScreen.classList.remove("loading-screen_opacity-1");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1000);
  }, 3000);
}

// modals logic
function showOverlay() {
  mainWrapper.style.display = "none";
  overlay.style.display = "flex";
  // overlay.style.opacity = "1";
  body.style.overflow = "hidden";
}

const modalSecurity = document.querySelector(".overlay__modal-security");
const modalDownloadKey = document.querySelector(".overlay__modal-download-key");
const modalConfirmKey = document.querySelector(".overlay__modal-confirm-key");
const modalSuccess = document.querySelector(".overlay__modal-success");
const modals = document.querySelectorAll(".overlay__modal");

function openModal(modalId) {
  modals.forEach((modal) => {
    if (modal.classList.contains("overlay__modal-opacity-1")) {
      modal.classList.remove("overlay__modal-opacity-1");
      setTimeout(() => {
        modal.style.display = "none";
      }, 1000);
    }
  });

  setTimeout(() => {
    if (modalId == "modal-security") {
      modalDownloadKey.style.display = "block";
      setTimeout(() => {
        modalDownloadKey.classList.add("overlay__modal-opacity-1");
      }, 10);
    } else if (modalId == "modal-download-key") {
      modalConfirmKey.style.display = "block";
      setTimeout(() => {
        modalConfirmKey.classList.add("overlay__modal-opacity-1");
      }, 10);
    } else if (modalId == "modal-confirm-key") {
      modalSuccess.style.display = "block";
      setTimeout(() => {
        modalSuccess.classList.add("overlay__modal-opacity-1");
      }, 10);
    }
  }, 1000);
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
    setTimeout(() => {
      confirmKeyErrorMessage.style.display = "none";
    }, 1000);
  } else {
    setTimeout(() => {
      confirmKeyErrorMessage.style.display = "flex";
    }, 1000);
  }
  console.log(code.toUpperCase());
});

// laguage list logic
const languageList = document.querySelector(".footer__laguage-list-wrapper");
const languageButton = document.querySelector(".footer__link-janguage");
const currientLanguage = document.querySelector(".footer__currient-language");
const languageItems = document.querySelectorAll(".footer__laguage-item");

languageItems.forEach((languageItem) => {
  languageItem.addEventListener("click", (e) => {
    languageItems.forEach((languageItem) => {
      languageItem.classList.remove("footer__laguage-item_currient");
    });
    currientLanguage.textContent = e.target.textContent;
    languageItem.classList.add("footer__laguage-item_currient");
  });
});

languageButton.addEventListener("click", (e) => {
  languageList.style.display = "block";

  function closeLanguageList() {
    if (e.target !== languageList) {
      languageList.style.display = "none";
    }
    body.removeEventListener("click", closeLanguageList);
  }

  setTimeout(() => {
    body.addEventListener("click", closeLanguageList);
  }, 10);
});
