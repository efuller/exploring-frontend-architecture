import { JournalRepository, JournalState } from "./journalRepository.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";

export class JournalViewModel {
  constructor(private props: JournalState) {}

  getJournals() {
    return this.props.journals;
  }
}

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
    await this.journalRepo.loadJournals((journalsCache) => {
      this.buildViewModel(journalsCache);
      // Map over the journalState and return a new view model.
      componentCb(this.vm);
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

  private buildViewModel(journalState: JournalState) {
    this.vm = new JournalViewModel(journalState);
  }
}
