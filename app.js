const searchInput = document.querySelector("#busca-concurso");
const contestsSection = document.querySelector("#concursos");
const contestCards = contestsSection?.querySelectorAll(".card") ?? [];
const emptyMessage = document.querySelector("#busca-sem-resultados");
const currentYear = document.querySelector("#current-year");
const registrationForm = document.querySelector("#formInscricao");
const registrationMessage = document.querySelector("#mensagemInscricao");
const contestSelect = registrationForm?.querySelector('[name="concurso"]');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (contestSelect) {
  const requestedContest = new URLSearchParams(window.location.search).get("concurso");
  const availableContest = Array.from(contestSelect.options).some(
    (option) => option.value === requestedContest,
  );

  if (availableContest) {
    contestSelect.value = requestedContest;
  }
}

const showBackendUnavailable = (form, message, text) => {
  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = text;
  });
};

showBackendUnavailable(
  document.querySelector("#formCadastro"),
  document.querySelector("#mensagemCadastro"),
  "O cadastro ainda não está disponível: o sistema precisa ser conectado a um servidor seguro. Nenhum dado foi enviado ou salvo.",
);

showBackendUnavailable(
  document.querySelector("#formLogin"),
  document.querySelector("#mensagemLogin"),
  "O login ainda não está disponível: o sistema precisa ser conectado a um servidor seguro.",
);

showBackendUnavailable(
  registrationForm,
  registrationMessage,
  "O formulário foi validado, mas a inscrição não foi enviada nem salva. O sistema ainda precisa de um servidor seguro.",
);

contestCards.forEach((card) => {
  const registrationButton = card.querySelector("button");

  registrationButton?.addEventListener("click", () => {
    const contestName = card.querySelector("h3")?.textContent?.trim();

    if (!contestName) {
      return;
    }

    window.location.href = `inscricao.html?concurso=${encodeURIComponent(contestName)}`;
  });
});

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

if (searchInput && emptyMessage) {
  searchInput.addEventListener("input", () => {
    const searchTerm = normalizeText(searchInput.value.trim());
    let visibleCards = 0;

    contestCards.forEach((card) => {
      const contestName = card.querySelector("h3")?.textContent ?? "";
      const matches = normalizeText(contestName).includes(searchTerm);

      card.hidden = !matches;
      visibleCards += Number(matches);
    });

    emptyMessage.hidden = visibleCards > 0;
  });
}
