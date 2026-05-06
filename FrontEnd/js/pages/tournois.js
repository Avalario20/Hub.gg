import { getTournaments } from "../services/tournamentService.js";

export async function TournamentsPage() {
  const tournaments = await getTournaments();

  const div = document.createElement("div");

  div.className = "page tournois-page";
  div.innerHTML = `
  <main class="tournois-main">
    <div class="tournois-container">
      ${tournaments
        .map(
          (tournament) => `
          <article class="glass-card">
            <img src="${tournament.image}" alt="${tournament.title}" style="max-width: 500px; height: auto;">
            <h2>${tournament.title}</h2>
            <p>${tournament.game}</p>
            <p>${tournament.tournament_date}</p>
            <p>${tournament.location}</p>
          </article>
        `,
        )
        .join("")}
    </div>
  </main>
  `;
  return div;
}
