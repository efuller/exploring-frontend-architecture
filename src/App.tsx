import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useConfirmationModal } from "./components/ConfirmationModal/useConfirmationModal.ts";
import { ConfirmationModal as ConfirmationModalComponent } from "./components/ConfirmationModal";

import './App.css'
import { JournalPresenter } from "./modules/journal/journalPresenter.ts";
import { JournalController } from "./modules/journal/journalController.ts";
import { CreateJournalDTO, Journal } from "./modules/journal/journal.ts";
import { JournalViewModel } from "./modules/journal/journalViewModel.ts";

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
    pendingDeletion: null
  }));

  const {
    showModal,
    setShowModal,
    cancelButtonRef,
  } = useConfirmationModal();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    await controller.addFromFormSubmit(data);

    // Reset form.
    reset();
  };

  useEffect(() => {
    presenter.getJournals((journalVm: JournalViewModel) => {
      setJournalVm(journalVm);
    });
  }, [presenter, setJournalVm]);

  useEffect(() => {
    if (journalVm.getPendingDeletion()) {
      setShowModal(true);
    }
  }, [journalVm, setShowModal]);

  if (showModal) {
    return (
      <ConfirmationModalComponent
        cancelButtonRef={cancelButtonRef}
        showModal={showModal}
        setShowModal={setShowModal}
        onCancel={() => {
          controller.resetPendingDeletion();
          setShowModal(false);
        }}
        onConfirm={async () => {
          const pending = journalVm.getPendingDeletion();
          if (!pending) {
            setShowModal(false);
            return;
          }
          await controller.delete(Journal.create(pending));
          setShowModal(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mt-4">
                <input {...register('title', {required: true})} required
                       className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                       id="journal-input" placeholder="Add Journal"/>
                <button id="submit-btn" type="submit"
                        className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add
                </button>
              </div>
            </form>
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
