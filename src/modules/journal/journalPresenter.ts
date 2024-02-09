import { JournalRepository, JournalState } from "./journalRepository.ts";
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

  async getJournals(componentCb: (journalState: JournalState) => void) {
    await this.journalRepo.loadJournals((journalsCache) => {
      // Map over the journalState and return a new view model.
      componentCb(journalsCache);
    });
  }

  hasJournals() {
    return this.journalRepo.hasJournals();
  }

  getPendingDeletion() {
    return this.journalRepo.getPendingDeletion();
  }

  async loadFavoriteJournals() {
    return await this.clientRepo.getAll();
  }
}
