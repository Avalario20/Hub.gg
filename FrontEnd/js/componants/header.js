import { API_URL } from "../config.js";

export async function renderHeader() {
  const div = document.createElement("div");
  div.className = "page accueil-page";
  div.innerHTML = `
  <div class="logo">
        <img
          id="logo"
          src="./assets/images/HUB.GG Tournoi LAN nobg.png"
          alt="Logo"
        />
    </div>
    <nav>
      <a data-route="home" data-link>Accueil</a>
      <a data-route="tournois" data-link>Tournois</a>
      <a data-route="planning" data-link>Planning</a>
      <a data-route="contact" data-link>Contact</a>
      <?php if (isset($_SESSION["user"])): ?>
        <a data-route="profile" data-link>Profil</a>
        <button id="logout-btn" class="logout-btn">Déconnexion</button>
      <?php else: ?>
        <a data-route="login" data-link>Connexion</a>
      <?php endif; ?>
    </nav>
  `;
  return div;
}
