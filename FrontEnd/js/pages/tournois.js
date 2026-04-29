export function TournoisPage() {
  const div = document.createElement("div");
  div.className = "page tournois-page";
  div.innerHTML = `
    <h1>Tournois</h1>
    <div class="tournaments-list">
      <article class="tournament-card">
        <h3>Tournoi de Football</h3>
        <p><strong>Date:</strong> 15 Mai 2026</p>
        <p><strong>Lieu:</strong> Stade Municipal</p>
        <p><strong>Catégorie:</strong> Adultes</p>
        <button class="btn-details">Voir détails</button>
      </article>
      <article class="tournament-card">
        <h3>Tournoi de Tennis</h3>
        <p><strong>Date:</strong> 22 Mai 2026</p>
        <p><strong>Lieu:</strong> Courts de Tennis</p>
        <p><strong>Catégorie:</strong> Junior</p>
        <button class="btn-details">Voir détails</button>
      </article>
      <article class="tournament-card">
        <h3>Tournoi de Badminton</h3>
        <p><strong>Date:</strong> 29 Mai 2026</p>
        <p><strong>Lieu:</strong> Gymnase Couvert</p>
        <p><strong>Catégorie:</strong> Mixte</p>
        <button class="btn-details">Voir détails</button>
      </article>
    </div>
  `;
  return div;
}
