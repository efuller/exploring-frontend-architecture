import { JournalRepository, JournalState } from "./journalRepository.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";
import { JournalViewModel } from "./journalViewModel.ts";

export class JournalPresenter {
  private vm: JournalViewModel;
  private readonly journalRepo: JournalRepository;
  private readonly clientRepo: ClientStorageRepository;

  constructor(
    journalRepo: JournalRepository,
    clientRepo: ClientStorageRepository
  ) {
    this.journalRepo = journalRepo;
    this.clientRepo = clientRepo;
    this.vm = new JournalViewModel({ journals: [], pendingDeletion: null });
  }

  async getJournals(componentCb: (vm: JournalViewModel) => void) {
    await this.journalRepo.loadJournals((journalState) => {
      this.buildViewModel(journalState);
      // Map over the journalState and return a new view model.
      componentCb(this.vm);
    });
  }

  hasJournals() {
    return this.journalRepo.hasJournals();
  }

  async loadFavoriteJournals() {
    return await this.clientRepo.getAll();
  }

  private buildViewModel(journalState: JournalState) {
    this.vm = new JournalViewModel(journalState);
  }
}
