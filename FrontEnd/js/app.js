// Import Router
import { navigate, router } from "./router.js";

// Import pages
import { AccueilPage } from "./pages/accueil.js";
import { TournoisPage } from "./pages/tournois.js";
import { ReservationPage } from "./pages/reservation.js";
import { ContactPage } from "./pages/contact.js";

// Handle navigation links
document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-link")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  }
});

// Handle browser back/forward
window.addEventListener("popstate", () => {
  router();
});

// Initial navigation
router();
