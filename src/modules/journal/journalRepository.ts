import Observable from "../../shared/observable/observable.ts";
import { Journal } from "./journal.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";

export class JournalRepository {
  private readonly journals: Observable<Journal[]>;
  private readonly pendingDeletion: Observable<Journal | null>;

  constructor(private readonly clientRepository: ClientStorageRepository) {
    this.journals = new Observable<Journal[]>([]);
    this.pendingDeletion = new Observable<Journal | null>(null);

    this.hydrateFromClientStorage();
  }

  async hydrateFromClientStorage() {
    // Hydrate journals from client storage on load
    const favorites = await this.clientRepository.getAll();
    if (favorites.length) {
      this.journals.setValue(favorites);
    }
  }

  async add(food: Journal) {
    this.journals.setValue([...this.journals.getValue(), food]);
  }

  async loadJournals(presenterCb: (journals: Journal[]) => void) {
    this.journals.subscribe(presenterCb);
  }

  async delete(journal: Journal) {
    // If journal is not a favorite, just delete it
    if (!journal.isFavorite) {
      const journals = this.journals.getValue();
      const newJournals = journals.filter(v => v.id !== journal.id);
      this.journals.setValue(newJournals);
      return;
    }

    const pending = this.pendingDeletion.getValue();
    if (pending && pending.id === journal.id) {
      const journals = this.journals.getValue();
      const newJournals = journals.filter(v => v.id !== journal.id);
      this.journals.setValue(newJournals);
      await this.clientRepository.delete(journal.id);
      this.pendingDeletion.setValue(null);
      return;
    }
    this.pendingDeletion.setValue(this.journals.getValue().find(v => v.id === journal.id) || null);
  }

  async setFavorite(journal: Journal) {
    const journals = this.journals.getValue();
    const newJournals = journals.map(f => {
      if (f.id === journal.id) {
        return {...journal, isFavorite: !journal.isFavorite};
      }
      return f;
    });
    await this.clientRepository.add(journal);
    this.journals.setValue(newJournals);
  }

  async getPendingDeletion(presenterCb: (journal: Journal | null) => void) {
    this.pendingDeletion.subscribe(presenterCb);
  }
}
