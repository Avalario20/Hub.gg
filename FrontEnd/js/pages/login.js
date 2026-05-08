import { API_URL, BASE_URL } from "../config.js";
import { navigate } from "../router.js";
import { login } from "../services/loginService.js";

export function LoginPage() {
  const div = document.createElement("div");
  div.className = "page Login-page";
  div.innerHTML = `
    <main class="login-main">
      <h1>Connexion</h1>
        <form class="login-form">
            <input id="username" type="text" placeholder="Nom d'utilisateur" autocomplete="username" required>
            <input id="password" type="password" placeholder="Mot de passe" autocomplete="current-password" required>
            <button type="submit">Se connecter</button>
            <a href="${BASE_URL}/register" data-link>S'inscrire</a>
        </form>
    </main>
    `;

  const form = div.querySelector(".login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const data = await login(username, password);

    if (data.success) {
      switch (data.user.role) {
        case "admin":
          navigate(`${BASE_URL}/dashboard`);
          break;
        case "editor":
          navigate(`${BASE_URL}/dashboard`);
          break;
        default:
          navigate(`${BASE_URL}/`);
      }
      console.log("Connecté :", data.user);
    } else {
      console.log("Erreur :", data.message);
    }
  });

  return div;
}
