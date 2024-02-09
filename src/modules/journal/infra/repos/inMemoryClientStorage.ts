import { Journal } from "../../journal.ts";
import { ClientStorageRepository } from "../../clientStorageRepository.ts";

export class InMemoryClientStorage implements ClientStorageRepository {
  private journals: Journal[];

  constructor() {
    this.journals = [];
  }

  async add(journal: Journal) {
    this.journals.push(journal);
  }

  async delete(id: string) {
    this.journals = this.journals.filter((journal) => journal.id !== id);
  }

  async getAll() {
    return this.journals;
  }
}