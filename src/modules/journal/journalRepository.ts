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
}
