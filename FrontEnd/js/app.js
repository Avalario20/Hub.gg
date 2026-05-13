import { router } from "./router.js";
import { BASE_URL } from "./config.js";
import { logout } from "./services/authService.js";
import { renderHeader } from "./componants/header.js";
import { renderFooter } from "./componants/footer.js";

// Fonction pour mettre à jour les éléments dynamiques
export async function updateDynamicElements() {
  const headerContainer = document.querySelector("#header");
  const footerContainer = document.querySelector("#footer");

  if (headerContainer) {
    headerContainer.innerHTML = "";
    headerContainer.appendChild(await renderHeader());
  }

  if (footerContainer) {
    footerContainer.innerHTML = "";
    footerContainer.appendChild(await renderFooter());
  }

  updateNavigation();
}

// Rend la fonction accessible globalement
window.updateDynamicElements = updateDynamicElements;

// Fonction de navigation personnalisée
async function navigate(path) {
  history.pushState({}, "", path);
  await router();
  await updateDynamicElements();
}

// Met à jour les hrefs des liens
function updateNavigation() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.dataset.route;

    if (route === "home") {
      link.href = `${BASE_URL}/`;
    } else {
      link.href = `${BASE_URL}/${route}`;
    }
  });
}

// Gère les clics sur les liens et le logout
document.addEventListener("click", async (e) => {
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    await navigate(href);
    return;
  }

  if (e.target.id === "logout-btn") {
    e.preventDefault();
    const data = await logout();
    if (data.success) {
      await navigate(`${BASE_URL}/`);
      location.reload();
    }
  }
});

// Bouton retour / précédent du navigateur
window.addEventListener("popstate", async () => {
  await router();
  await updateDynamicElements();
});

// Premier chargement
(async () => {
  await updateDynamicElements();
  await router();
})();
