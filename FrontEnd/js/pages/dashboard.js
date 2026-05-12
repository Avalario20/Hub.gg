import {
  getTournaments,
  updateTournament,
  deleteTournament,
} from "../services/tournamentService.js";
import { getCurrentUser } from "../services/authService.js";
import { BASE_URL } from "../config.js";
import { navigate } from "../router.js";

const currentUser = await getCurrentUser();

if (
  !currentUser ||
  (currentUser.role !== "admin" && currentUser.role !== "editor")
) {
  // navigate(`${BASE_URL}/`);
}

export async function DashboardPage() {
  let tournaments = await getTournaments();
  let selectedTournament = null;
  let isEditing = false;

  const div = document.createElement("div");
  div.className = "page dashboard-page";

  function renderTournaments() {
    return tournaments
      .map(
        (tournament) => `
        <tr data-id="${tournament.id}">
          <td>${tournament.title}</td>
          <td>${tournament.game}</td>
          <td>${tournament.location}</td>
          <td>
            <button class="btn-view" data-id="${tournament.id}">Voir</button>
            <button class="btn-edit" data-id="${tournament.id}">Modifier</button>
            <button class="btn-delete" data-id="${tournament.id}">Supprimer</button>
          </td>
        </tr>
      `,
      )
      .join("");
  }

  function renderModal() {
    if (!selectedTournament) return "";

    return `
      <div class="modal-overlay" id="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${isEditing ? "Modifier le tournoi" : "Détails du tournoi"}</h2>
          
          ${
            isEditing
              ? `
            <form id="edit-form">
              <div class="form-group">
                <label>Titre:</label>
                <input type="text" name="title" value="${selectedTournament.title}" required>
              </div>
              <div class="form-group">
                <label>Jeu:</label>
                <input type="text" name="game" value="${selectedTournament.game}" required>
              </div>
              <div class="form-group">
                <label>Description:</label>
                <textarea name="description" required>${selectedTournament.description}</textarea>
              </div>
              <div class="form-group">
                <label>Localisation:</label>
                <input type="text" name="location" value="${selectedTournament.location}" required>
              </div>
              <div class="form-group">
                <label>Image URL:</label>
                <input type="text" name="image" value="${selectedTournament.image}" required>
              </div>
              <button type="submit" class="btn-save">Enregistrer</button>
              <button type="button" class="btn-cancel">Annuler</button>
            </form>
          `
              : `
            <div class="tournament-details">
              <p><strong>Titre:</strong> ${selectedTournament.title}</p>
              <p><strong>Jeu:</strong> ${selectedTournament.game}</p>
              <p><strong>Description:</strong> ${selectedTournament.description}</p>
              <p><strong>Localisation:</strong> ${selectedTournament.location}</p>
              <img src="${selectedTournament.image}" alt="${selectedTournament.title}" style="max-width: 300px;">
            </div>
          `
          }
        </div>
      </div>
    `;
  }

  function updateDOM() {
    const tbody = div.querySelector("tbody");
    if (tbody) tbody.innerHTML = renderTournaments();

    const modalContainer = div.querySelector("#modal-container");
    if (modalContainer) modalContainer.innerHTML = renderModal();

    attachEventListeners();
  }

  function attachEventListeners() {
    // Voir les détails
    div.querySelectorAll(".btn-view").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        selectedTournament = tournaments.find((t) => t.id == id);
        isEditing = false;
        updateDOM();
      });
    });

    // Modifier
    div.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        selectedTournament = tournaments.find((t) => t.id == id);
        isEditing = true;
        updateDOM();
      });
    });

    // Supprimer
    div.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Êtes-vous sûr de vouloir supprimer ce tournoi ?")) {
          try {
            await deleteTournament(id);
            tournaments = tournaments.filter((t) => t.id != id);
            updateDOM();
          } catch (err) {
            alert("Erreur lors de la suppression");
          }
        }
      });
    });

    // Modal fermeture
    const modal = div.querySelector("#modal");
    if (modal) {
      modal.querySelector(".close").addEventListener("click", () => {
        selectedTournament = null;
        isEditing = false;
        updateDOM();
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          selectedTournament = null;
          isEditing = false;
          updateDOM();
        }
      });
    }

    // Form soumission
    const form = div.querySelector("#edit-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
          await updateTournament(selectedTournament.id, data);
          const idx = tournaments.findIndex(
            (t) => t.id == selectedTournament.id,
          );
          tournaments[idx] = { ...tournaments[idx], ...data };
          selectedTournament = null;
          isEditing = false;
          updateDOM();
        } catch (err) {
          alert("Erreur lors de la modification");
        }
      });

      form.querySelector(".btn-cancel").addEventListener("click", () => {
        selectedTournament = null;
        isEditing = false;
        updateDOM();
      });
    }
  }

  div.innerHTML = `
    <main class="dashboard-main">
      <h1>Gestion des Tournois</h1>
      <table class="tournaments-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Jeu</th>
            <th>Localisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${renderTournaments()}
        </tbody>
      </table>
      <div id="modal-container">
        ${renderModal()}
      </div>
    </main>
  `;

  attachEventListeners();
  return div;
}
