import { API_URL, BASE_URL } from "../config.js";
import { navigate } from "../router.js";
import { register } from "../services/registerService.js";

export function RegisterPage() {
  const div = document.createElement("div");
  div.className = "page Register-page";
  div.innerHTML = `
    <main class="register-main">
      <h1>Créer un compte</h1>
        <form class="register-form">
            <input id="email" type="email" placeholder="Adresse e-mail" autocomplete="email" required>
            <input id="username" type="text" placeholder="Nom d'utilisateur" autocomplete="username" required>
            <input id="password" type="password" placeholder="Mot de passe" autocomplete="new-password" required>
            <input id="password-confirm" type="password" placeholder="Confirmer mot de passe" autocomplete="new-password" required>
            <button type="submit">S'inscrire</button>
            <a href="${BASE_URL}/login" data-link>Déjà inscrit ? Se connecter</a>
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

    // Vérifier que les mots de passe correspondent
    if (password !== passwordConfirm) {
      console.log("Erreur : Les mots de passe ne correspondent pas");
      return;
    }

    const data = await register(username, email, password);

    if (data.success) {
      console.log("Compte créé :", data.user);
      // Rediriger vers la page de connexion
      window.location.href = `${BASE_URL}/login`;
    } else {
      console.log("Erreur :", data.message);
    }
  });

  return div;
}
