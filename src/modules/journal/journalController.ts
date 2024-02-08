import { Journal } from "./journal.ts";
import { JournalRepository } from "./journalRepository.ts";
import { ConfirmationModal } from "../../shared/confirmationModal/confirmationModal.ts";
import { FormInput } from "../../App.tsx";
import { v4 as uuidv4 } from "uuid";

export class JournalController {
  constructor(
    private readonly journalRepository: JournalRepository,
    public confirmationModal: ConfirmationModal
  ) {}

  async add(journal: Journal) {
    await this.journalRepository.add(journal);
  }

  async delete(journal: Journal | null) {
    if (!journal) {
      return;
    }
    // If the journal si not a favorite, just delete it.
    if (!journal.isFavorite) {
      await this.journalRepository.delete(journal);
      return;
    }
    // If the journal is a favorite, open the confirmation window and set it to pending deletion.
    this.confirmationModal.openModal();
    await this.journalRepository.delete(journal);
  }

  async setFavorite(journal: Journal) {
    if (journal.isFavorite) {
      return;
    }

    await this.journalRepository.setFavorite(journal);
  }

  async addFromFormSubmit(createJournalInput: FormInput) {
    const newJournal: Journal = {
      ...createJournalInput,
      id: uuidv4(),
      isFavorite: false,
    };

    await this.add(newJournal);
  }

  resetPendingDeletion() {
    this.journalRepository.resetPendingDeletion();
  }
}