import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import { useJournals } from "./hooks/useJournals";
import { useFavorites } from "./hooks/useFavorites";
import { Journal } from "./modules/journal/journal.ts";
import { useConfirmationModal } from "./components/ConfirmationModal/useConfirmationModal.ts";
import { ConfirmationModal } from "./components/ConfirmationModal";

import './App.css'
import { JournalPresenter } from "./modules/journal/journalPresenter.ts";
import { JournalController } from "./modules/journal/journalController.ts";

type FormInput = {
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

function App({ presenter, controller }: AppProps) {
  const {
    open,
    setOpen,
    cancelButtonRef,
    setConfirmed,
    confirmed,
  } = useConfirmationModal();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormInput>();
  const {
    journals,
    setJournals,
    pendingDelete,
    setPendingDelete,
  } = useJournals();
  const {
    isFavorite,
    saveJournalToLocalStorage
  } = useFavorites();

  const handleConfirmation = async (journal: Journal) => {
    if (isFavorite(journal)) {
      setOpen(true);
      setPendingDelete(journal);
      return;
    }

    await controller.delete(journal);
  }

  const handleFavorite = (journal: Journal) => {
    if (isFavorite(journal)) {
      return;
    }

    saveJournalToLocalStorage(journal);
  }

  const onSubmit = async (data: FormInput) => {

    const newJournal: Journal = {
      ...data,
      id: uuidv4(),
      isFavorite: false,
    };

    // await createJournal(newJournal);
    await controller.add(newJournal);

    // Reset form.
    reset();
  };

  useEffect(() => {
    presenter.getPendingDeletion((journal) => {
      setPendingDelete(journal);
    })
  }, []);

  useEffect(() => {
    presenter.getJournals((journals: Journal[]) => {
      setJournals(journals);
    });
  }, [presenter, setJournals]);

  useEffect(() => {
    if (confirmed && pendingDelete) {
      controller.delete(pendingDelete);
      setOpen(false);
    }
  }, [confirmed, pendingDelete]);

  if (open) {
    return (
      <ConfirmationModal
        isOpen={open}
        setConfirmed={setConfirmed}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
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
                <input {...register('title', { required: true })} required className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" id="journal-input" placeholder="Add Journal" />
                <button id="submit-btn" type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
              </div>
            </form>
          </div>
          {
            journals.length > 0 ? (
              <ul id="journal-list">
                {
                  journals.map((journal) => (
                    <li key={journal.id} className="flex mb-4 border p-2 text-left pl-6 items-center">
                      <p className="w-full text-grey-darkest">{journal.title}</p>
                      <button
                        className={classNames(
                          isFavorite(journal)
                            ? 'flex-no-shrink p-2 ml-4 mr-2 border-2 bg-red-400 rounded hover:text-white text-green border-green hover:bg-green'
                            : 'flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green'
                        )}
                        disabled={isFavorite(journal)}
                        onClick={() => handleFavorite(journal)}
                      >Favorite</button>
                      <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                        onClick={() => handleConfirmation(journal)}
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
