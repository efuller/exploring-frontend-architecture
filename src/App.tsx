import { useEffect, useRef, useState } from "react";

import { ConfirmationModal as ConfirmationModalComponent } from "./components/ConfirmationModal";

import { JournalPresenter } from "./modules/journal/journalPresenter";
import { JournalController } from "./modules/journal/journalController";
import { Journal } from "./modules/journal/journal";
import { JournalViewModel } from "./modules/journal/journalViewModel";
import { JournalForm, JournalList } from "./components/journal";
import './App.css'

export type FormInput = {
  title: string;
};

interface AppProps {
  presenter: JournalPresenter;
  controller: JournalController;
}

function App({presenter, controller}: AppProps) {
  const [journalVm, setJournalVm] = useState<JournalViewModel>(new JournalViewModel({
    journals: [],
    pendingDeletion: null,
    showConfirmationModal: false,
  }));
  const cancelButtonRef = useRef(null)

  const onSubmit = async (data: FormInput) => {
    await controller.addFromFormSubmit(data);
  };

  useEffect(() => {
    presenter.getJournals((journalVm: JournalViewModel) => {
      setJournalVm(journalVm);
    });
  }, [presenter, setJournalVm]);

  if (journalVm.showConfirmationModal() ) {
    return (
      <ConfirmationModalComponent
        cancelButtonRef={cancelButtonRef}
        show={journalVm.showConfirmationModal()}
        onCancel={() => {
          controller.resetPendingDeletion();
        }}
        onClose={() => {
          controller.setConfirmationModal();
        }}
        onConfirm={async () => {
          const pending = journalVm.getPendingDeletion();
          if (!pending) {
            return;
          }
          await controller.delete(Journal.create(pending));
        }}
      />
    )
  }

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-blue-400 font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-8">
            <h1 className="text-grey-darkest">Favorite Journals</h1>
            <JournalForm onSubmit={onSubmit} />
          </div>
          <JournalList
            vm={journalVm}
            controller={controller}
          />
        </div>
      </div>
    </>
  );
}

export default App
