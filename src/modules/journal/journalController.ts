import { CreateJournalDTO, Journal } from "./journal.ts";
import { JournalRepository } from "./journalRepository.ts";

export class JournalController {
  constructor(
    private readonly journalRepository: JournalRepository,
  ) {}

  async add(journal: Journal) {
    await this.journalRepository.add(journal);
  }

  async delete(journal: Journal | null) {
    if (!journal) {
      return;
    }
    // If the journal is not a favorite, just delete it.
    if (!journal.getIsFavorite()) {
      await this.journalRepository.delete(journal);
      return;
    }
    // If the journal is a favorite, open the confirmation window and set it to pending deletion.
    await this.journalRepository.delete(journal);
  }

  async setFavorite(journal: Journal) {
    if (journal.getIsFavorite()) {
      return;
    }

    await this.journalRepository.setFavorite(journal);
  }

  async addFromFormSubmit(createJournalInput: CreateJournalDTO) {
    const newJournal = Journal.create(createJournalInput);

    await this.add(newJournal);
  }

  resetPendingDeletion() {
    this.journalRepository.resetPendingDeletion();
  }

  setConfirmationModal() {
    this.journalRepository.setConfirmationModal();
  }
}