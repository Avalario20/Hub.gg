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
          <article class="glass-card" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${tournament.image}') no-repeat center/cover;">
              <div class="info-tournament">
                <h2>${tournament.title}</h2>
                <p>${tournament.game}</p>
                <p>${tournament.description}</p>
                <p>${tournament.location}</p>
              </div>
          </article>
        `,
        )
        .join("")}
    </div>
  </main>
  `;
  return div;
}
