export async function renderFooter() {
  const footer = document.createElement("div");

  footer.className = "footer-container";
  footer.innerHTML = `
    <nav>
      <a data-route="home" data-link>Accueil</a>
      <a data-route="tournois" data-link>Tournois</a>
      <a data-route="planning" data-link>Planning</a>
      <a data-route="contact" data-link>Contact</a>
    </nav>
    <div class="logo">
      <img
        id="logo"
        src="./assets/images/HUB.GG Tournoi LAN nobg.png"
        alt="Logo"
      />
    </div>
  `;

  return footer;
}
