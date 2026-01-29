## Overview
Simple 3-layer architecture:
- **Tests** (`tests/trello.ui.spec.ts`): orchestrate UI, API, and hybrid flows.
- **Core Web** (`core/web`): page objects (Home, Login, Board) on top of `BasePage` to keep selectors and actions encapsulated.
- **Core API** (`core/api`): lightweight client (`ApiManager`) and typed requests (`BaseRequest`, `BoardRequest`) that reuse the same credentials as the UI.

Tests consume these layers to create boards via UI or API, and in the hybrid flow they seed data with the API and validate it through the UI.

## What it exercises
- UI login and board creation in Trello.
- Pure API board creation.
- Hybrid flow: create a board by API, verify its presence via UI.

## Project layout
- `tests/trello.ui.spec.ts` – three specs (UI-only, API-only, API+UI).
- `core/web` – page objects (`TrelloPage`, `LoginPage`, `BoardPage`, `BasePage`).
- `core/api` – API client + request helpers (`BaseRequest`, `BoardRequest`, `ApiManager`).
- `core/manage_data/credentials.json` – credentials used by both channels.
- `playwright.config.ts` – base settings, points to `https://trello.com`.

## Prerequisites
- Node.js 18+ and npm.
- Trello account (email + password).
- Trello API key and token (https://trello.com/app-key).

## Setup
```bash
npm install
```
Fill `core/manage_data/credentials.json`:
- `defaultUser.password`: your Trello password (used for UI login).
- `api.apiKey` and `api.token`: Trello API credentials (used for API and hybrid tests).

## Running the suite
- All tests (UI, API, hybrid):
  ```bash
  npx playwright test
  ```
- UI-only spec:
  ```bash
  npx playwright test -g "is New Board displayed"
  ```
- API-only spec:
  ```bash
  npx playwright test -g "is New Board displayed by API"
  ```
- Hybrid API setup + UI verification:
  ```bash
  npx playwright test -g "is New Board by API and verify by UI"
  ```

## Reports
Playwright HTML report:
```bash
npx playwright show-report
```

## Notes
- Tests run headless by default; add `--headed` to watch the UI.
- `credentials.json` is plain text; avoid committing real secrets.
