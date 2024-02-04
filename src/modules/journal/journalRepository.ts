import Observable from "../../shared/observable/observable.ts";
import { Journal } from "./journal.ts";

export class JournalRepository {
  private readonly foods: Observable<Journal[]>;
  constructor() {
    this.foods = new Observable<Journal[]>([]);
  }

  async add(food: Journal) {
    this.foods.setValue([...this.foods.getValue(), food]);
  }

  async loadFoods(presenterCb: (journals: Journal[]) => void) {
    this.foods.subscribe(presenterCb);
  }
}
