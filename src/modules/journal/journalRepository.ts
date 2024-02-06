import Observable from "../../shared/observable/observable.ts";
import { Journal } from "./journal.ts";

export class JournalRepository {
  private readonly journals: Observable<Journal[]>;
  private readonly pendingDeletion: Observable<Journal | null>;

  constructor() {
    this.journals = new Observable<Journal[]>([]);
    this.pendingDeletion = new Observable<Journal | null>(null);
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
    this.journals.setValue(newJournals);
  }

  async getPendingDeletion(presenterCb: (journal: Journal | null) => void) {
    this.pendingDeletion.subscribe(presenterCb);
  }
}
