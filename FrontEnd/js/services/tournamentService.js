export async function getTournaments() {
  const response = await fetch("/BackEnd/api/tournaments/getAll.php");

  if (!response.ok) {
    throw new Error("Erreur récupération tournois");
  }

  const result = await response.json();

  return result.data;
}
