import { getCurrentUser } from "../services/authService.js";

export async function renderHeader() {
  const header = document.createElement("div");
  const user = await getCurrentUser();

  header.className = "header-container";
  header.innerHTML = `
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
      ${
        user?.user?.id
          ? `
        <a data-route="${user.user.role === "admin" || user.user.role === "editor" ? "dashboard" : "profile"}" data-link>${user.user.role === "admin" || user.user.role === "editor" ? "Dashboard" : "Profil"}</a>
        <button id="logout-btn" class="logout-btn">Déconnexion</button>
      `
          : `
        <a data-route="login" data-link>Connexion</a>
      `
      }
    </nav>
  `;

  return header;
}
