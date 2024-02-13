import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CompositionRoot } from "./shared/compositionRoot/compositionRoot.ts";

const appRoot = new CompositionRoot();
const journalModule = appRoot.getApp().getJournalModule();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      presenter={journalModule.getJournalPresenter()}
      controller={journalModule.getJournalController()}
    />
  </React.StrictMode>,
)
