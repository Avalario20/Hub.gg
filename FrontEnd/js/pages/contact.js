export function ContactPage() {
  const div = document.createElement("div");
  div.className = "page contact-page";

  // Title
  const title = document.createElement("h1");
  title.textContent = "Contact";
  div.appendChild(title);

  // Contact info section
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";
  contactInfo.innerHTML = `
    <section>
      <h2>Nous contacter</h2>
      <p><strong>Email:</strong> <a href="mailto:info@tournois.com">info@tournois.com</a></p>
      <p><strong>Téléphone:</strong> <a href="tel:+32123456789">+32 1 23 45 67 89</a></p>
      <p><strong>Adresse:</strong> Rue de la Sports, 123 - 1000 Bruxelles</p>
    </section>
  `;
  div.appendChild(contactInfo);

  // Contact form
  const form = document.createElement("form");
  form.className = "contact-form-group";
  form.innerHTML = `
    <h2>Envoyer un message</h2>
    <div class="form-group">
      <label for="contact-nom">Nom:</label>
      <input type="text" id="contact-nom" name="nom" required>
    </div>
    <div class="form-group">
      <label for="contact-email">Email:</label>
      <input type="email" id="contact-email" name="email" required>
    </div>
    <div class="form-group">
      <label for="sujet">Sujet:</label>
      <input type="text" id="sujet" name="sujet" required>
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn-submit">Envoyer</button>
    <div id="contact-message" class="form-message"></div>
  `;

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      nom: form.querySelector("#contact-nom").value,
      email: form.querySelector("#contact-email").value,
      sujet: form.querySelector("#sujet").value,
      message: form.querySelector("#message").value,
    };

    const messageDiv = form.querySelector("#contact-message");
    messageDiv.textContent = "Envoi du message...";
    messageDiv.className = "form-message loading";

    setTimeout(() => {
      messageDiv.textContent =
        "Votre message a été envoyé avec succès! Nous vous recontacterons dans les 24 heures.";
      messageDiv.className = "form-message success";
      form.reset();
    }, 1000);
  });

  div.appendChild(form);
  return div;
}
