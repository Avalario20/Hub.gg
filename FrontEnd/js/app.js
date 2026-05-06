import { navigate, router } from "./router.js";
import { BASE_URL } from "./config.js";

// Génère automatiquement les href de la navbar HTML
document.querySelectorAll("[data-route]").forEach((link) => {
  const route = link.dataset.route;

  if (route === "home") {
    link.href = `${BASE_URL}/`;
  } else {
    link.href = `${BASE_URL}/${route}`;
  }
});

// Intercepte les clics SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");

  if (!link) return;

  e.preventDefault();

  const href = link.getAttribute("href");
  navigate(href);
});

// Bouton retour / précédent du navigateur
window.addEventListener("popstate", () => {
  router();
});

// Premier chargement
router();
