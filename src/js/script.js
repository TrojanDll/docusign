const form = document.querySelector(".form");
const loadingScreen = document.querySelector(".loading-screen");
const overlay = document.querySelector(".overlay");
const body = document.querySelector(".body");
const mainWrapper = document.querySelector(".main-wrapper");

function toggleMainContent(action) {
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");

  header.style.display = action;
  main.style.display = action;
  footer.style.display = action;
}

function showLoadingScreen() {
  loadingScreen.style.display = "flex";
  setTimeout(() => {
    mainWrapper.style.display = "none";
    loadingScreen.style.display = "none";
    overlay.style.display = "flex";
    body.style.overflow = "hidden";
  }, 2000);
}

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

// validation
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
