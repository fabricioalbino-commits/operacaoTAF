const contestsSection = document.querySelector("#concursos");
const contestCards = contestsSection.querySelectorAll(".card");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const searchLabel = document.createElement("label");
searchLabel.className = "contest-search-label";
searchLabel.htmlFor = "busca-concurso";
searchLabel.textContent = "Buscar concurso por nome";

const searchInput = document.createElement("input");
searchInput.className = "contest-search-input";
searchInput.id = "busca-concurso";
searchInput.type = "search";
searchInput.placeholder = "Ex.: Polícia Militar";
searchInput.autocomplete = "off";

const emptyMessage = document.createElement("p");
emptyMessage.className = "contest-search-empty";
emptyMessage.textContent = "Nenhum concurso encontrado.";
emptyMessage.hidden = true;

searchLabel.append(searchInput);
contestsSection.insertBefore(searchLabel, contestCards[0]);
contestsSection.append(emptyMessage);

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

searchInput.addEventListener("input", () => {
  const searchTerm = normalizeText(searchInput.value.trim());
  let visibleCards = 0;

  contestCards.forEach((card) => {
    const contestName = card.querySelector("h3").textContent;
    const matches = normalizeText(contestName).includes(searchTerm);

    card.hidden = !matches;
    visibleCards += Number(matches);
  });

  emptyMessage.hidden = visibleCards > 0;
});
