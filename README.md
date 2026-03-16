  # BrickVault

  Application web de gestion de collections LEGO. Permet de suivre son inventaire de sets, les organiser en collections
  personnalisées et gérer sa wishlist.

  ## Fonctionnalités

  - Authentification complète (inscription, connexion, réinitialisation de mot de passe)
  - Inventaire de sets LEGO avec recherche et ajout via la base Rebrickable
  - Collections personnalisées avec couleurs et ajout/retrait de sets
  - Tableau de bord avec statistiques (nombre de sets, valeur totale, collections)
  - Traductions multilingues des noms de sets et thèmes (FR/EN)
  - Interface responsive

  ## Stack technique

  **Backend**
  - PHP 8.2 / Laravel 12
  - MySQL 8.0
  - Redis 7 (cache, sessions, queue)
  - Laravel Passport (authentification API)
  - PHPUnit (tests) / Pint (formatage)

  **Frontend**
  - React 19 / TypeScript
  - Vite
  - Tailwind CSS v4
  - React Router v7
  - React Query (TanStack)
  - i18next (traductions)

  **Infrastructure**
  - Docker / Docker Compose

  ## Installation

  ### Prérequis

  - Docker et Docker Compose

  ### Démarrage

  ```bash
  # Cloner les repos
  git clone git@github.com:dedickerbenoit/brickvault_backend.git backend
  git clone git@github.com:dedickerbenoit/brickvault_frontend.git frontend

  # Configurer le backend
  cp backend/.env.example backend/.env

  # Lancer les containers
  docker compose up -d

  # Installer les dépendances backend
  docker exec brickvault-backend composer install
  docker exec brickvault-backend php artisan key:generate
  docker exec brickvault-backend php artisan migrate
  docker exec brickvault-backend php artisan passport:install

  # Installer les dépendances frontend
  docker exec brickvault-frontend npm install

  Accès
  ┌────────────┬───────────────────────┐
  │  Service   │          URL          │
  ├────────────┼───────────────────────┤
  │ Frontend   │ http://localhost:5173 │
  ├────────────┼───────────────────────┤
  │ API        │ http://localhost:8000 │
  ├────────────┼───────────────────────┤
  │ phpMyAdmin │ http://localhost:8081 │
  ├────────────┼───────────────────────┤
  │ Mailpit    │ http://localhost:8025 │
  └────────────┴───────────────────────┘
  Tests

  # Backend
  docker exec brickvault-backend php artisan test

  # Formatage
  docker exec brickvault-backend ./vendor/bin/pint
