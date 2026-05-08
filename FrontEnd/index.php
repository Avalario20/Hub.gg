<?php
session_start();
?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HUB.GG</title>
    <link rel="stylesheet" href="./css/styles.css" />
    <link rel="stylesheet" href="./css/homePage.css" />
    <link rel="stylesheet" href="./css/tournaments.css" />
    <script type="module" src="./js/app.js" defer></script>
  </head>
  <body>
    <header>
      <div class="logo">
        <img
          id="logo"
          src="./assets/images/HUB.GG Tournoi LAN nobg.png"
          alt="Logo"
        />
      </div>
      <nav>
        <a data-route="home" data-link>Accueil</a>
        <a data-route="tournois" data-link>Tournois</a>
        <a data-route="planning" data-link>Planning</a>
        <a data-route="contact" data-link>Contact</a>
        <a data-route="login" data-link>Connexion</a>
      </nav>
    </header>

    <main id="app"></main>

    <footer></footer>
  </body>
</html>
