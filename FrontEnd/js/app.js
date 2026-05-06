import { navigate, router } from "./router.js";

import { AccueilPage } from "./pages/accueil.js";
import { TournamentsPage } from "./pages/tournois.js";
import { ReservationPage } from "./pages/reservation.js";
import { ContactPage } from "./pages/contact.js";

document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-link")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  }
});

window.addEventListener("popstate", () => {
  router();
});

router();
