# HiQ Movies Search

[![Netlify Status](https://api.netlify.com/api/v1/badges/818e0607-fbf9-4360-8229-12fb8b3fd447/deploy-status)](https://app.netlify.com/sites/hiq-movies-search/deploys)

A Vue 3 single-page application for searching movies from the
[OMDB API](https://www.omdbapi.com/). Search by title, browse paginated
results, open a details page for any movie, and bookmark favourites for the
current session.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [High-level overview](#high-level-overview)
  - [Data flow](#data-flow)
  - [Project structure](#project-structure)
- [Architectural Decisions](#architectural-decisions)
- [Continuous Integration & Deployment](#continuous-integration--deployment)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available scripts](#available-scripts)
- [Live Preview](#live-preview)

---

## Features

- **Movie search** — query the OMDB API by title from the home or search view.
- **Paginated results** — "Show more" appends the next page of results.
- **Movie details** — a dedicated route renders full details (plot, cast,
  runtime, rating) for a single movie.
- **Bookmarks** — mark movies as bookmarked and review them on a dedicated page
  (held in Vuex state for the session).
- **Material UI** — built with [Vuetify 3](https://vuetifyjs.com/) components and
  Material Design Icons.

---

## Tech Stack

| Concern       | Choice                                                  |
| ------------- | ------------------------------------------------------- |
| Framework     | [Vue 3](https://vuejs.org/)                             |
| Build tool    | [Vite 4](https://vitejs.dev/)                           |
| Routing       | [Vue Router 4](https://router.vuejs.org/)               |
| State         | [Vuex 4](https://vuex.vuejs.org/)                       |
| UI library    | [Vuetify 3](https://vuetifyjs.com/) + `@mdi/font`       |
| Data source   | [OMDB API](https://www.omdbapi.com/)                    |
| Linting       | ESLint + Prettier (`@vue/eslint-config-prettier`)       |
| Hosting       | [Netlify](https://www.netlify.com/)                     |

---

## Architecture

A client-rendered SPA with no backend of its own. Vite builds static assets that
Netlify serves; the app talks directly to the OMDB REST API from the browser.

### High-level overview

```
                       ┌────────────────────────────────────────────┐
                       │                Browser (SPA)                │
                       │                                             │
  User ──────────────▶ │  Views (Home / Search / Single / Bookmarks) │
                       │     │                    ▲                   │
                       │     │ dispatch           │ state            │
                       │     ▼                    │                  │
                       │  Vuex store  ──mutations──┘                 │
                       │     │            (searchResults, bookmarks, │
                       │     │             details, status, query)   │
                       │     │ fetch()                               │
                       └─────┼───────────────────────────────────────┘
                             │ HTTPS
                             ▼
                  ┌────────────────────────┐
                  │   OMDB API (omdbapi)    │
                  │  ?s= search  ?i= by id  │
                  └────────────────────────┘
```

- **Views** (`src/views`) are route-level pages. They read state directly from
  the Vuex store and dispatch actions on user interaction.
- **Component** (`src/components/MovieCard.vue`) is the single reusable
  presentation unit, rendering both the compact (grid) and `detailed` layouts.
- **Router** (`src/router`) defines four routes, lazy-loading everything except
  the home view.
- **Store** (`src/store/movies.js`) is the single source of truth: it holds the
  query, search results, pagination, bookmarks, request status, and the fetched
  movie details, and owns all OMDB network calls inside its actions.

### Data flow

1. A view binds an input to `store.state.query` (`v-model`) and dispatches
   `fetchMovies` on submit.
2. The `fetchMovies` action calls the OMDB API (`?s=<query>`) via `fetch`,
   toggling `status` through `PENDING → SUCCESS | ERROR` so views can render
   spinners and error messages.
3. Results are normalized (each movie gets a `bookmarked` flag) and committed to
   `searchResults`; `foundResults` drives the "Show more" pagination.
4. `bookmarkMovie` / `removeBookmarkMovie` actions toggle a movie's bookmark and
   maintain the `bookmarks` array.
5. The details route dispatches `fetchMovieSingle` (`?i=<imdbID>`) and renders
   `MovieCard` in `detailed` mode.

### Project structure

```
hiq-movies-search/
├─ .github/workflows/        # CI pipeline (lint + build)
├─ public/                   # Static assets served as-is (images, favicon)
├─ src/
│  ├─ assets/                # Global CSS (base, main)
│  ├─ components/
│  │  └─ MovieCard.vue       # Reusable movie card (compact + detailed modes)
│  ├─ router/index.js        # Route definitions (lazy-loaded views)
│  ├─ store/movies.js        # Vuex store: state, mutations, OMDB actions
│  ├─ views/
│  │  ├─ HomeView.vue        # Landing + search entry point
│  │  ├─ SearchView.vue      # Results grid + pagination
│  │  ├─ SingleMovieView.vue # Movie details page
│  │  └─ BookmarksView.vue   # Bookmarked movies
│  ├─ App.vue                # Root: nav + <RouterView>
│  └─ main.js                # Bootstrap (Vue + Router + Vuex + Vuetify)
├─ index.html                # Vite HTML entry
└─ vite.config.js            # Vite config + `@` → `src` alias
```

---

## Architectural Decisions

- **Centralized Vuex store as the single source of truth.** All application
  state — the search query, results, pagination, bookmarks, request status, and
  fetched details — lives in one store, and all OMDB network calls are made
  inside its actions. Views stay thin and declarative, reading state and
  dispatching actions rather than owning data or fetch logic.
- **`fetch` in store actions instead of a separate service layer.** The API
  surface is small (search, paginate, get-by-id), so calls live directly in the
  actions rather than behind an abstraction, keeping the data layer in one file.
- **Explicit request `status` string.** Actions drive a `status`
  (`PENDING` / `PENDING_MORE` / `SUCCESS` / `ERROR`) that views observe to render
  loading spinners, "Show more" loading states, and error messages — a simple,
  centralized substitute for per-request loading flags.
- **Lazy-loaded routes.** Every route except the home view is dynamically
  imported in the router, so each page is code-split into its own chunk and the
  initial bundle stays small.
- **Vuetify for UI.** Material components (`v-card`, `v-img`, `v-btn`,
  `v-progress-circular`, `v-rating`, …) provide a consistent, responsive design
  system out of the box, so the app carries almost no custom component CSS.
- **`MovieCard` with a `detailed` prop.** A single component renders both the
  compact grid card and the full details layout, toggled by a boolean prop,
  avoiding a near-duplicate second component.
- **`@` path alias.** `@` maps to `src/` (Vite) to avoid brittle relative
  imports.
- **Static hosting on Netlify.** As a pure SPA with no server code, the app is
  built by Vite and deployed to Netlify's CDN.

> **Note on the OMDB API key:** the key currently lives in `src/store/movies.js`.
> Because this is a client-only app the key is always shipped to the browser;
> moving it to an environment variable (`import.meta.env.VITE_OMDB_API_KEY`)
> would at least keep it out of source control.

---

## Continuous Integration & Deployment

**CI** is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and
runs on every push and pull request to `main` (Node 18, npm caching, superseded
runs auto-cancelled):

| Job       | What it does                                                            |
| --------- | ---------------------------------------------------------------------- |
| **Lint**  | `eslint` in check-only mode (no `--fix`) so violations fail the build. |
| **Build** | `vite build`; uploads the `dist/` bundle as an artifact.               |

**Deployment** is handled by **Netlify**, which builds from the repository and
publishes to its CDN on merge. The badge at the top of this README reflects the
latest deploy status.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- [Git](https://git-scm.com)
- [Node.js & npm](https://nodejs.org/en) (Node 18+ recommended)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/RedJanvier/HiQ-movies-search.git
   ```

2. Install dependencies and start the dev server:

   ```sh
   cd HiQ-movies-search
   npm install
   npm run dev
   ```

### Available scripts

| Script            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot-reload.        |
| `npm run build`   | Build the production bundle into `dist/`.         |
| `npm run preview` | Preview the production build locally.             |
| `npm run lint`    | Lint and auto-fix with ESLint.                    |

---

## Live Preview

Visit the app [deployed on Netlify](https://hiq-movies-search.netlify.app).

> **Note:** the hosted link may be out of date; run the app locally (above) to
> exercise the current code.
