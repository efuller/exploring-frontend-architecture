<p><a target="_blank" href="https://app.eraser.io/workspace/f9Z5mwS6LKSmIUNbnTRi" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Exploring Frontend Architecture
This is a small frontend application that was built to explore different variations of frontend architecture.

You can check it out [﻿here](https://exploring-frontend-architecture.onrender.com/).

![Screenshot 2023-06-26 at 7 31 00 PM](https://github.com/efuller/exploring-frontend-architecture/assets/4174472/86f45d92-1357-4942-9ef2-daf61a664037 "")

## Concepts Explored
- Using Puppeteer for E2E acceptance testing
- Using a Page Object Model to make E2E less volatile and more declarative
- Application level acceptance testing
- Cucumber + Gherkins
- Composition Root Pattern
- Reactivity via a custom observer
- Outgoing contract test to ensure our inMemory client storage stub works as intended
- Use Presenters to wire up the UI Framework to the application state
- Use Controllers to perform application use cases
- Use the concept of a Repository to manage and act upon global application state
- Utilize Dependency Inversion to interface with a Client Storage Repository. This allows us to create a proper stub for testing
## Functionality
- A user can add a journal entry
- A user can delete a journal entry
- A user can favorite a journal entry
- Favorites are saved to local storage. State is hydrated from the favorites stored in local storage upload load.
- When a favorite is deleted, the user will have to confirm deletion
---

![General Architecture](/.eraser/f9Z5mwS6LKSmIUNbnTRi___YzvcTKoiYxfvjTVEmHkkLRz706J3___---figure---PZ3OXDYgO4BBS8F9VbmPC---figure---CCUc806duYk9SsUSOQEUVA.png "General Architecture")








<!--- Eraser file: https://app.eraser.io/workspace/f9Z5mwS6LKSmIUNbnTRi --->