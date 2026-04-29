export function ReservationPage() {
  const div = document.createElement("div");
  div.className = "page reservation-page";

  // Create form element
  const form = document.createElement("form");
  form.className = "reservation-form";
  form.innerHTML = `
    <h1>Réservation</h1>
    <div class="form-group">
      <label for="nom">Nom complet:</label>
      <input type="text" id="nom" name="nom" required>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="telephone">Téléphone:</label>
      <input type="tel" id="telephone" name="telephone">
    </div>
    <div class="form-group">
      <label for="tournoi">Sélectionnez un tournoi:</label>
      <select id="tournoi" name="tournoi" required>
        <option value="">-- Choisir un tournoi --</option>
        <option value="football">Tournoi de Football</option>
        <option value="tennis">Tournoi de Tennis</option>
        <option value="badminton">Tournoi de Badminton</option>
      </select>
    </div>
    <div class="form-group">
      <label for="participants">Nombre de participants:</label>
      <input type="number" id="participants" name="participants" min="1" max="10" value="1">
    </div>
    <div class="form-group">
      <label for="message">Message (optionnel):</label>
      <textarea id="message" name="message" rows="4"></textarea>
    </div>
    <button type="submit" class="btn-submit">Soumettre la réservation</button>
    <div id="form-message" class="form-message"></div>
  `;

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      nom: form.querySelector("#nom").value,
      email: form.querySelector("#email").value,
      telephone: form.querySelector("#telephone").value,
      tournoi: form.querySelector("#tournoi").value,
      participants: form.querySelector("#participants").value,
      message: form.querySelector("#message").value,
    };

    // Simulate form submission
    const messageDiv = form.querySelector("#form-message");
    messageDiv.textContent = "Réservation en cours...";
    messageDiv.className = "form-message loading";

    // Simulate API call
    setTimeout(() => {
      messageDiv.textContent = `Merci ${formData.nom}! Votre réservation a été enregistrée. Un email de confirmation sera envoyé à ${formData.email}.`;
      messageDiv.className = "form-message success";
      form.reset();
    }, 1000);
  });

  div.appendChild(form);
  return div;
}
