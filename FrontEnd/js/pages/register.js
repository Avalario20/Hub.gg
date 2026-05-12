import { API_URL, BASE_URL } from "../config.js";
import { navigate } from "../router.js";
import { register } from "../services/authService.js";

export function RegisterPage() {
  const div = document.createElement("div");
  div.className = "register-page";
  div.innerHTML = `
    <main class="register-main">
      <h1>Créer un compte</h1>
        <form class="register-form">
        <p id="login-message" class="login-message"></p>
            <input id="email" type="email" placeholder="Adresse e-mail" autocomplete="email" required>
            <input id="username" type="text" placeholder="Nom d'utilisateur" autocomplete="username" required>
            <input id="password" type="password" placeholder="Mot de passe" autocomplete="new-password" required>
            <input id="password-confirm" type="password" placeholder="Confirmer mot de passe" autocomplete="new-password" required>
            <button type="submit">S'inscrire</button>
            <p>Déjà inscrit ? <a href="${BASE_URL}/login" data-link>Se connecter</a></p>
        </form>
    </main>
    `;

  const form = div.querySelector(".register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const passwordConfirm = document.querySelector("#password-confirm").value;

    if (password !== passwordConfirm) {
      const messageElement = document.querySelector("#login-message");
      messageElement.textContent = "Les mots de passe ne correspondent pas";
      messageElement.style.color = "red";
      messageElement.className = "error-message";
      console.log("Erreur : Les mots de passe ne correspondent pas");
      return;
    }

    const data = await register(username, email, password);

    if (data.success) {
      console.log("Compte créé :", data.user);

      window.location.href = `${BASE_URL}/login`;
    } else {
      const messageElement = document.querySelector("#login-message");
      messageElement.textContent = data.message;
      messageElement.style.color = "red";
      messageElement.className = "error-message";
      console.log("Erreur :", data.message);
    }
  });

  return div;
}
