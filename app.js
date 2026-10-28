const signupForm = document.querySelector("#signup-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent =
    "O formulário está pronto para integração, mas o envio ainda não foi configurado. Seus dados não foram enviados.";
});
