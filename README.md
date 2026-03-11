# Portfolio artistique bilingue

Site portfolio one-page avec filtres par catégorie, navigation latérale sur desktop et navigation en haut sur mobile.

## Fonctionnalités

- Bilingue français / anglais avec bouton de changement de langue global.
- Page d'accueil: tous les projets les uns après les autres.
- Chaque projet affiche 3 images: 1 grande à gauche, 2 empilées à droite.
- Boutons/catégories menant vers une page dédiée (`category.html`) pour un type de projet.
- CMS éditable en ligne via **Decap CMS** (`/admin`).

## CMS simple et sécuritaire

Le site utilise Decap CMS avec `git-gateway`.

1. Déployez sur Netlify.
2. Activez **Identity** + **Git Gateway**.
3. Désactivez les inscriptions publiques (invite only).
4. Ajoutez uniquement vos utilisateurs autorisés.

Ainsi, personne d'autre ne peut modifier vos contenus.

## Contenu éditable

- `content/site.json`
  - Textes UI bilingues
  - Catégories (slug + nom FR/EN)
- `content/projects.json`
  - Liste des projets, textes FR/EN, catégorie, 3 images

Le front lit directement ces fichiers JSON, donc chaque modification CMS est reflétée après publication.
