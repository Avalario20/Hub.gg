import { getTournaments } from "../services/tournamentService.js";

export async function CalendarPage() {
  const tournaments = await getTournaments();

  const div = document.createElement("div");
  div.className = "page calendar-page";

  // Créer le calendrier
  const calendar = createCalendar(tournaments);
  div.appendChild(calendar);

  return div;
}

function createCalendar(tournaments) {
  const container = document.createElement("div");
  container.className = "calendar-container";

  let currentDate = new Date();

  const header = document.createElement("div");
  header.className = "calendar-header";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "❮";
  prevBtn.className = "calendar-btn";

  const monthYear = document.createElement("h2");
  monthYear.className = "month-year";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "❯";
  nextBtn.className = "calendar-btn";

  header.appendChild(prevBtn);
  header.appendChild(monthYear);
  header.appendChild(nextBtn);
  container.appendChild(header);

  const calendarGrid = document.createElement("div");
  calendarGrid.className = "calendar-grid";
  container.appendChild(calendarGrid);

  const tournamentsList = document.createElement("div");
  tournamentsList.className = "tournaments-list";
  container.appendChild(tournamentsList);

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Mise à jour du titre
    monthYear.textContent = currentDate.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });

    // Effacer la grille
    calendarGrid.innerHTML = "";

    // Ajouter les en-têtes des jours
    const dayNames = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
    dayNames.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "day-header";
      dayHeader.textContent = day;
      calendarGrid.appendChild(dayHeader);
    });

    // Obtenir le premier jour du mois
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Commencer lundi

    // Remplir la grille
    for (let i = 0; i < 42; i++) {
      const dayCell = document.createElement("div");
      dayCell.className = "day-cell";

      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      if (date.getMonth() !== month) {
        dayCell.classList.add("other-month");
      }

      const dayNumber = document.createElement("div");
      dayNumber.className = "day-number";
      dayNumber.textContent = date.getDate();
      dayCell.appendChild(dayNumber);

      // Chercher les tournois de ce jour
      const dayTournaments = tournaments.filter((t) => {
        const dateStr = t.tournament_date.split(" ")[0]; // Récupère seulement YYYY-MM-DD
        const tournamentDate = new Date(dateStr + "T00:00:00");
        return (
          tournamentDate.getDate() === date.getDate() &&
          tournamentDate.getMonth() === date.getMonth() &&
          tournamentDate.getFullYear() === date.getFullYear()
        );
      });

      if (dayTournaments.length > 0) {
        if (dayTournaments.length > 0) {
          dayCell.classList.add("has-tournament");

          const eventsWrapper = document.createElement("div");
          eventsWrapper.className = "day-events";

          dayTournaments.forEach((tournament) => {
            const eventItem = document.createElement("div");
            eventItem.className = "day-event";

            eventItem.innerHTML = `
              <span class="day-event-title">${tournament.title}</span>
              <span class="day-event-game">${tournament.game}</span>
            `;

            eventsWrapper.appendChild(eventItem);
          });

          dayCell.appendChild(eventsWrapper);

          dayCell.addEventListener("click", () => {
            displayTournaments(dayTournaments, tournamentsList);
          });
        }
      }

      calendarGrid.appendChild(dayCell);
    }
  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();

  // Afficher les tournois du mois courant par défaut
  const today = new Date();
  const currentMonthTournaments = tournaments.filter((t) => {
    const dateStr = t.tournament_date.split(" ")[0];
    const tournamentDate = new Date(dateStr + "T00:00:00");
    return (
      tournamentDate.getMonth() === today.getMonth() &&
      tournamentDate.getFullYear() === today.getFullYear()
    );
  });
  if (currentMonthTournaments.length > 0) {
    displayTournaments(currentMonthTournaments, tournamentsList);
  }

  return container;
}

function displayTournaments(tournamentsList, container) {
  container.innerHTML = "";

  if (tournamentsList.length === 0) {
    container.innerHTML = "<p>Aucun tournoi pour cette date.</p>";
    return;
  }

  const title = document.createElement("h3");
  title.textContent = `${tournamentsList.length} Tournoi(s) trouvé(s)`;
  container.appendChild(title);

  tournamentsList.forEach((tournament) => {
    const card = document.createElement("div");
    card.className = "tournament-card";
    const dateStr = tournament.tournament_date.split(" ")[0];
    const tournamentDate = new Date(dateStr + "T00:00:00");
    card.innerHTML = `
      <div class="tournament-info">
        <h4>${tournament.title}</h4>
        <p><strong>Jeu:</strong> ${tournament.game}</p>
        <p><strong>Date:</strong> ${tournamentDate.toLocaleDateString("fr-FR")}</p>
        <p><strong>Lieu:</strong> ${tournament.location}</p>
        <p><strong>Description:</strong> ${tournament.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}
