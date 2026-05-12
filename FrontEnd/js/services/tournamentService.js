import { API_URL } from "../config.js";

export async function getTournaments() {
  const response = await fetch(`${API_URL}/tournaments/getAll.php`);

  if (!response.ok) {
    throw new Error("Erreur récupération tournois");
  }

  const result = await response.json();

  return result.data;
}

export async function getLastTournaments() {
  const response = await fetch(`${API_URL}/tournaments/getLast.php`);

  if (!response.ok) {
    throw new Error("Erreur récupération derniers tournois");
  }

  const result = await response.json();

  return result.data;
}

export async function getTournamentById(id) {
  const response = await fetch(`${API_URL}/tournaments/getById.php?id=${id}`);
  if (!response.ok) throw new Error("Erreur récupération tournoi");
  return await response.json();
}

export async function updateTournament(id, data) {
  const response = await fetch(`${API_URL}/tournaments/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  if (!response.ok) throw new Error("Erreur mise à jour tournoi");
  return await response.json();
}

export async function deleteTournament(id) {
  const response = await fetch(`${API_URL}/tournaments/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Erreur suppression tournoi");
  return await response.json();
}
