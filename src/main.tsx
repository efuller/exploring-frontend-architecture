import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import { setupBrowserMocks } from "./mocks/handlers.ts";
import './index.css'
import { CompositionRoot } from "./shared/compositionRoot/compositionRoot.ts";

// setupBrowserMocks();

const appRoot = new CompositionRoot();
const journalModule = appRoot.getApp().getJournalModule();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      presenter={journalModule.getJournalPresenter()}
      controller={journalModule.getJournalController()}
      confirmationModal={journalModule.getConfirmModal()}
    />
  </React.StrictMode>,
)
