import { JournalRepository } from "./journalRepository.ts";
import { Journal } from "./journal.ts";

export class JournalPresenter {
  private readonly journalRepo: JournalRepository;

  constructor(journalRepo: JournalRepository) {
    this.journalRepo = journalRepo;
  }

  async getJournals(componentCb: (journals: Journal[]) => void) {
    await this.journalRepo.loadJournals((journalsCache) => {
      // Map over the foodsCache and return a new view model.
      componentCb(journalsCache);
    });
  }
}
