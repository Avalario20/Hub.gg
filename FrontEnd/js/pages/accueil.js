import { getLastTournaments } from "../services/tournamentService.js";

export async function AccueilPage() {
  const lastTournaments = await getLastTournaments();

  const div = document.createElement("div");
  div.className = "page accueil-page";
  div.innerHTML = `
  <main class="accueil-main">
    <div class="accueil-container">
    </div>
    <div class="event-container">
      ${lastTournaments
        .map(
          (LastTournament) => `
          <article class="glass-card" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${LastTournament.image}') no-repeat center/cover;">
              <div class="info-tournament">
                <h2>${LastTournament.title}</h2>
                <p>${LastTournament.game}</p>
                <p>${LastTournament.description}</p>
                <p>${LastTournament.location}</p>
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
