const stateFilter = document.querySelector("#estado");
const contestCards = document.querySelectorAll(".contest-card");
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();

stateFilter.addEventListener("change", () => {
  const selectedState = stateFilter.value;

  contestCards.forEach((card) => {
    card.hidden = selectedState !== "" && card.dataset.state !== selectedState;
  });
});
