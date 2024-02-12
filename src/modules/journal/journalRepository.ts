import Observable from "../../shared/observable/observable.ts";
import { Journal, JournalDTO } from "./journal.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";

export interface JournalState {
  journals: JournalDTO[];
  pendingDeletion: JournalDTO | null;
  showConfirmationModal: boolean;
}

export class JournalRepository {
  private readonly journalState: Observable<JournalState>;

  constructor(private readonly clientRepository: ClientStorageRepository) {
    this.journalState = new Observable<JournalState>({journals: [], pendingDeletion: null, showConfirmationModal: false});

    this.hydrateFromClientStorage();
  }

  async hydrateFromClientStorage() {
    // Hydrate journals from client storage on load
    const favorites = await this.clientRepository.getAll();
    if (favorites.length) {
      this.journalState.setValue({journals: favorites, pendingDeletion: null, showConfirmationModal: false});
    }
  }

  async add(journal: Journal) {
    this.journalState.setValue({
      journals: [...this.journalState.getValue().journals, journal.toPersistence()],
      pendingDeletion: null,
      showConfirmationModal: false,
    });
  }

  async loadJournals(presenterCb: (journals: JournalState) => void) {
    this.journalState.subscribe(presenterCb);
  }

  async delete(journal: Journal) {
    // If journal is not a favorite, just delete it
    if (!journal.getIsFavorite()) {
      const journalState = this.journalState.getValue();
      const newJournals = journalState.journals.filter(v => v.id !== journal.getId());
      this.journalState.setValue({...journalState, journals: newJournals});
      return;
    }

    const { pendingDeletion, journals } = this.journalState.getValue();
    if (pendingDeletion && pendingDeletion.id === journal.getId()) {
      const newJournals = journals.filter(v => v.id !== journal.getId());
      this.journalState.setValue({journals: newJournals, pendingDeletion: null, showConfirmationModal: false});
      await this.clientRepository.delete(journal.getId());
      this.journalState.setValue({...this.journalState.getValue(), pendingDeletion: null});
      return;
    }
    this.journalState.setValue({...this.journalState.getValue(), pendingDeletion: journal.toPersistence(), showConfirmationModal: true});
  }

  async setFavorite(journal: Journal) {
    const { journals } = this.journalState.getValue();
    const newJournals: JournalDTO[] = journals.map(f => {
      if (f.id === journal.getId()) {
        return {...journal.toPersistence(), isFavorite: !journal.getIsFavorite()};
      }
      return f;
    });
    await this.clientRepository.add(journal);
    this.journalState.setValue({journals: newJournals, pendingDeletion: null, showConfirmationModal: false});
  }

  resetPendingDeletion() {
    this.journalState.setValue({...this.journalState.getValue(), pendingDeletion: null, showConfirmationModal: false});
  }

  setConfirmationModal() {
    const state = this.journalState.getValue();
    this.journalState.setValue({...this.journalState.getValue(), showConfirmationModal: !state.showConfirmationModal});
  }

  hasJournals() {
    return this.journalState.getValue().journals.length > 0;
  }
}
