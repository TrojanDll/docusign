const forms = document.querySelectorAll(".form");
const emailInputs = document.querySelectorAll(".input_email");

forms.forEach((form) => {
  const submitBtn = form.querySelector(".button_submit");
  const inputs = form.querySelectorAll(".input");
  const errorMsgText = form.querySelector(".error-msg__text");
  const errorMsg = form.querySelector(".error-msg");
  errorMsg.style.display = "none";
  inputs.forEach((input) => {
    input.setCustomValidity(" ");
    input.addEventListener("keydown", (e) => {
      input.classList.remove("input_error");
      errorMsg.style.display = "none";
    });
  });

  submitBtn.addEventListener("click", (e) => {
    inputs.forEach((input) => {
      if (input.value == "") {
        input.classList.add("input_error");
        errorMsg.style.display = "flex";
        errorMsgText.textContent = "Email is required to have a value.";
      }
      if (input.validity.typeMismatch) {
        input.classList.add("input_error");
        errorMsg.style.display = "flex";
        errorMsgText.textContent = "Invalid email address";
      }
    });
  });
});
