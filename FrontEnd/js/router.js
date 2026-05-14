import { AccueilPage } from "./pages/accueil.js";
import { TournamentsPage } from "./pages/tournois.js";
import { CalendarPage } from "./pages/calendar.js";
import { ContactPage } from "./pages/contact.js";
import { LoginPage } from "./pages/login.js";
import { RegisterPage } from "./pages/register.js";
import { DashboardPage } from "./pages/dashboard.js";

import { getCurrentUser } from "./services/authService.js";
import { BASE_URL } from "./config.js";

const routes = {
  "/": AccueilPage,
  "/tournois": TournamentsPage,
  "/calendar": CalendarPage,
  "/contact": ContactPage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/dashboard": DashboardPage,
};

export async function router() {
  const app = document.querySelector("#app");

  let path = window.location.pathname.replace(BASE_URL, "");

  if (path === "") path = "/";

  const page = routes[path] || AccueilPage;

  app.innerHTML = "";
  app.appendChild(await page());
}

export function navigate(path) {
  history.pushState({}, "", path);
  router();
}
