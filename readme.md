![Tests Passing](https://github.com/efuller/exploring-frontend-architecture/actions/workflows/pr.yaml/badge.svg)
# Exploring Frontend Architecture
This is a small frontend application that was built to explore different variations of frontend architecture.

You can check it out [﻿here](https://exploring-frontend-architecture.onrender.com/).

<img width="878" alt="Screenshot 2024-02-13 at 6 42 51 AM" src="https://github.com/efuller/exploring-frontend-architecture/assets/4174472/e89e0158-2974-4a64-883e-c8ea27cc2677">

## Concepts Explored
- Using **Puppeteer** for **E2E Acceptance Testing**
- Using a **Page Object Model** to make E2E tests less volatile and more declarative
- **Application Level Acceptance Testing**
- **Cucumber + Gherkins**
- **Composition Root Pattern**
- **Reactivity** using the **Observer Pattern**
- **Outgoing Contract Test** to ensure our in-memory client storage works as intended
- **Presenters** wire up the **UI Framework** to the application state
- **Controllers** perform A**pplication Use Cases**
- **Repositories** manage and act upon G**lobal Application State**
- **Dependency Inversion** is used to interface with a **Client Storage Interface**. This allows us to **Code to an Interface** and create a proper **Stub for Testing**
- **Github Actions**
    - Run **Application Acceptance Tests** and **Unit Tests** for PRs
    - Run **E2E Tests** after deploy
## Functionality
- A user can add a journal entry
- A user can delete a journal entry
- A user can favorite a journal entry
- Favorites are saved to local storage. State is hydrated from the favorites stored in local storage upload load.
- When a favorite is deleted, the user will have to confirm deletion
---

![General Architecture](/.eraser/f9Z5mwS6LKSmIUNbnTRi___YzvcTKoiYxfvjTVEmHkkLRz706J3___---figure---YN8ciuCREnVWFFfnKvETo---figure---CCUc806duYk9SsUSOQEUVA.png "General Architecture")








<!--- Eraser file: https://app.eraser.io/workspace/f9Z5mwS6LKSmIUNbnTRi --->
