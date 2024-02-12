import { useEffect, useRef, useState } from "react";

import { ConfirmationModal as ConfirmationModalComponent } from "./components/ConfirmationModal";

import { JournalPresenter } from "./modules/journal/journalPresenter";
import { JournalController } from "./modules/journal/journalController";
import { CreateJournalDTO, Journal } from "./modules/journal/journal";
import { JournalViewModel } from "./modules/journal/journalViewModel";
import { JournalForm } from "./components/journal";
import './App.css'

export type FormInput = {
  title: string;
};

// Simple version of classNames.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

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
          {
            presenter.hasJournals() ? (
              <ul id="journal-list">
                {
                  journalVm.getJournals().map((journal: CreateJournalDTO) => (
                    <li key={journal.id} className="flex mb-4 border p-2 text-left pl-6 items-center">
                      <p className="w-full text-grey-darkest">{journal.title}</p>
                      <button
                        className={classNames(
                          journal.isFavorite
                            ? 'flex-no-shrink p-2 ml-4 mr-2 border-2 bg-red-400 rounded hover:text-white text-green border-green hover:bg-green'
                            : 'flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green'
                        )}
                        disabled={journal.isFavorite}
                        onClick={() => controller.setFavorite(Journal.create(journal))}
                      >Favorite</button>
                      <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                        onClick={async () => {
                          await controller.delete(Journal.create(journal));
                        }}
                      >Delete</button>
                    </li>
                  ))
                }
              </ul>
            ) : null
          }
        </div>
      </div>
    </>
  );
}

export default App
