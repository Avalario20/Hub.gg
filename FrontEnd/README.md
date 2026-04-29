# SPA - Gestion de Tournois

Une **Single Page Application (SPA)** en JavaScript natif pour gérer les tournois sportifs.

## 📁 Structure du Projet

```
FrontEnd/
├── index.html           # Page HTML principale
├── css/
│   └── styles.css       # Styles complets de l'application
└── js/
    ├── app.js          # Application principale avec routeur
    └── pages/
        ├── accueil.js      # Page d'accueil
        ├── tournois.js     # Page des tournois
        ├── reservation.js  # Page de réservation
        └── contact.js      # Page de contact
```

## ✨ Fonctionnalités

### 🏠 Accueil

- Présentation générale de l'application
- Mise en avant des services offerts

### ⚽ Tournois

- Liste des tournois disponibles
- Affichage des détails (date, lieu, catégorie)

### 📋 Réservation

- Formulaire de réservation avec validation
- Génération d'une confirmation
- Stockage des données en localStorage

### 📞 Contact

- Coordonnées de contact
- Formulaire de message direct
- Confirmation d'envoi

## 🚀 Fonctionnalités Techniques

### Routeur SPA

- Navigation sans rechargement de page
- Gestion de l'historique du navigateur (boutons back/forward)
- Routes dynamiques

### Design Responsive

- Adaptation optimale sur mobile et desktop
- Grille flexible (CSS Grid)
- Media queries

### Animations Fluides

- Transition de pages
- Hover effects
- Feedback utilisateur

## 📋 Comment Utiliser

1. **Ouvrir l'application**
   - Placer les fichiers dans un serveur web local (WAMP, XAMPP, etc.)
   - Accéder via `http://localhost/Ifapme/TFE/FrontEnd/`

2. **Naviguer entre les pages**
   - Cliquer sur les liens du menu
   - Utiliser les boutons back/forward du navigateur
   - Les URL changent automatiquement

3. **Soumettre des formulaires**
   - Remplir les champs requis
   - Les données sont traitées avec confirmation

## 🎨 Personnalisation

### Modifier les couleurs

Éditer les variables CSS dans [styles.css](css/styles.css) :

```css
:root {
  --primary-color: #3498db; /* Bleu principal */
  --secondary-color: #2ecc71; /* Vert secondaire */
  --danger-color: #e74c3c; /* Rouge */
  --text-color: #333; /* Texte */
}
```

### Ajouter une nouvelle page

1. Créer `js/pages/nouvelle-page.js` avec une fonction `export`
2. Importer dans `app.js`
3. Enregistrer la route avec `router.register()`
4. Ajouter le lien dans le menu HTML

## 💾 Stockage des Données

Actuellement, les formulaires affichent une confirmation. Pour persister les données :

```javascript
// Exemple d'ajout de stockage localStorage
localStorage.setItem("reservation", JSON.stringify(formData));
```

## 🔧 Technologie Utilisée

- **JavaScript natif** (ES6 Modules)
- **HTML5**
- **CSS3** (Grid, Flexbox, Variables CSS)
- **Aucune dépendance externe**

## 📱 Navigateurs Supportés

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

---

**Version:** 1.0  
**Dernière mise à jour:** 29 Avril 2026
