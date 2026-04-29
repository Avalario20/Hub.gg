export function AccueilPage() {
  const div = document.createElement("div");
  div.className = "page accueil-page";
  div.innerHTML = `
    <h1>Accueil</h1>
    <p>Bienvenue sur notre application de gestion de tournois.</p>
    <section class="hero">
      <h2>Découvrez nos services</h2>
      <p>Nous proposons une plateforme complète pour organiser et gérer vos tournois sportifs.</p>
    </section>
    <section class="features">
      <div class="feature">
        <h3>Tournois</h3>
        <p>Consultez la liste complète de nos tournois en cours et à venir.</p>
      </div>
      <div class="feature">
        <h3>Réservations</h3>
        <p>Réservez facilement votre place pour les tournois qui vous intéressent.</p>
      </div>
      <div class="feature">
        <h3>Contact</h3>
        <p>Contactez-nous pour toute question ou demande particulière.</p>
      </div>
    </section>
  `;
  return div;
}
