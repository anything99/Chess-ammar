# Chess Academy

A chess learning app in plain HTML, CSS and JavaScript. No build step.

## Status: Phase 1 of 7

Done: design system, responsive shell (sidebar on desktop, bottom bar on mobile), home dashboard, all ten screens, real saved progress (XP, level, streak, daily challenge by date, achievements), player name, reduced-motion, reset with confirmation.

Not built yet (screens show this honestly): chess rules and board (Phase 2), lessons (3), puzzles (4), AI and openings (5), endgames and analysis (6), offline service worker, Arabic/RTL, sound (7).

## Run
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000   # then visit http://localhost:8000

## Deploy on GitHub Pages
1. Push the `chess-academy` folder contents to a GitHub repository.
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Open the URL GitHub shows after a minute.

## Structure
`index.html`, `css/` (style, animations, responsive), `js/` (content, storage, progress, navigation, app), `manifest.json`.
Progress is stored in `localStorage` under `chessAcademy.v1`.
