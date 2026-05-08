import { API_URL } from "../config.js";

export async function getTournaments() {
  const response = await fetch(`${API_URL}/tournaments/getAll.php`);

  if (!response.ok) {
    throw new Error("Erreur récupération tournois");
  }

  const result = await response.json();

  return result.data;
}
