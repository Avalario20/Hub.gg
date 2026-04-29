export function AccueilPage() {
  const div = document.createElement("div");
  div.className = "page accueil-page";
  div.innerHTML = `
  <main class="accueil-main">
    <div class="accueil-container">
    </div>
    <div class="event-container">
    
    </div>
  </main>
  `;
  return div;
}
