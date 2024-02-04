import Observable from "../../shared/observable/observable.ts";
import { Journal } from "./journal.ts";

export class JournalRepository {
  private readonly journals: Observable<Journal[]>;

  constructor() {
    this.journals = new Observable<Journal[]>([]);
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
  }
}
