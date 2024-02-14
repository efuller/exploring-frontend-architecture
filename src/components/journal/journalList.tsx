import { CreateJournalDTO, Journal } from "../../modules/journal/journal.ts";
import { JournalController } from "../../modules/journal/journalController.ts";
import { JournalViewModel } from "../../modules/journal/journalViewModel.ts";

// Simple version of classNames.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface JournalListProps {
  vm: JournalViewModel;
  controller: JournalController;
}

export const JournalList = ({ vm, controller }: JournalListProps) => {
  if (!vm.hasJournals()) {
    return null;
  }

  return (
    <ul id="journal-list">
      {
        vm.getJournals().map((journal: CreateJournalDTO) => (
          <li key={journal.id} className="flex mb-4 border p-2 text-left pl-6 items-center journal-entry">
            <p className="w-full text-grey-darkest journal-title">{journal.title}</p>
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
  )
}