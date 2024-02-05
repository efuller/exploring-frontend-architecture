import { JournalRepository } from "./journalRepository.ts";
import { Journal } from "./journal.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";

export class JournalPresenter {
  private readonly journalRepo: JournalRepository;
  private readonly clientRepo: ClientStorageRepository;

  constructor(
    journalRepo: JournalRepository,
    clientRepo: ClientStorageRepository
  ) {
    this.journalRepo = journalRepo;
    this.clientRepo = clientRepo;
  }

  async getJournals(componentCb: (journals: Journal[]) => void) {
    await this.journalRepo.loadJournals((journalsCache) => {
      // Map over the foodsCache and return a new view model.
      componentCb(journalsCache);
    });
  }

  async loadFavoriteJournals() {
    return await this.clientRepo.getAll();
  }
}
