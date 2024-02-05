import { Journal } from "../../journal.ts";
import { ClientStorageRepository } from "../../clientStorageRepository.ts";

export class InMemoryClientStorage implements ClientStorageRepository {
  private foods: Journal[];

  constructor() {
    this.foods = [];
  }

  async add(food: Journal) {
    this.foods.push(food);
  }

  async delete(id: string) {
    this.foods = this.foods.filter((food) => food.id !== id);
  }

  async getAll() {
    return this.foods;
  }
}