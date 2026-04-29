import { AccueilPage } from "./pages/accueil.js";
import { TournoisPage } from "./pages/tournois.js";
import { ReservationPage } from "./pages/reservation.js";
import { ContactPage } from "./pages/contact.js";

const routes = {
  "/": AccueilPage,
  "/tournois": TournoisPage,
  "/reservation": ReservationPage,
  "/contact": ContactPage,
};

export function navigate(path) {
  history.pushState({}, "", path);
  router();
}

export function router() {
  const path = window.location.pathname;
  const page = routes[path] || AccueilPage;

  const app = document.querySelector("#app");
  app.innerHTML = "";
  app.appendChild(page());
}
