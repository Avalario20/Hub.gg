import { router } from "./router.js";
import { BASE_URL } from "./config.js";
import { logout } from "./services/authService.js";
import { renderHeader } from "./componants/header.js";
import { renderFooter } from "./componants/footer.js";

// Màj les hrefs des liens
function updateNavigation() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.dataset.route;

    link.href = route === "home" ? `${BASE_URL}/` : `${BASE_URL}/${route}`;
  });
}

// Màj le header et le footer
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

window.updateDynamicElements = updateDynamicElements;

// Navigation SPA sans rechargement complet
async function navigate(path) {
  history.pushState({}, "", path);

  await router();

  // Màj les liens après changement de page
  updateNavigation();
}

// Gestion des clics de navigation
document.addEventListener("click", async (e) => {
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();

    const href = link.href;
    await navigate(href);

    return;
  }

  if (e.target.id === "logout-btn") {
    e.preventDefault();

    const data = await logout();

    if (data.success) {
      await navigate(`${BASE_URL}/`);

      // On met à jour le header après déconnexion
      await updateDynamicElements();
    }
  }
});

// Bouton précédent/suivant du navigateur
window.addEventListener("popstate", async () => {
  await router();
  updateNavigation();
});

// Premier chargement
(async () => {
  await updateDynamicElements();
  await router();
})();
