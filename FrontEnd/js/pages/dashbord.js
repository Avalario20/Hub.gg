export function DashboardPage() {
  const div = document.createElement("div");
  div.className = "page dashboard-page";
  div.innerHTML = `
  <main class="dashboard-main">
    <div class="dashboard-container">
    </div>
  </main>
  `;
  return div;
}
