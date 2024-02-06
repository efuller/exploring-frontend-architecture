import { ClientStorageRepository } from "../../clientStorageRepository.ts";
import { Journal } from "../../journal.ts";

export class LocalStorageClient implements ClientStorageRepository {
  private readonly LOCAL_STORAGE_KEY = "journal";

  async add(journal: Journal) {
    // check if foodId is already in localStorage
    const journals = await this.getAll();
    const exists = journals.find(item => item.id === journal.id);
    if (exists) {
      return;
    }
    const newJournal = { ...journal, isFavorite: true };
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify([...journals, newJournal]));
  }

  async delete(id: string) {
    // Check if foodId is in localStorage
    const journals = await this.getAll();
    const exists = journals.find(journal => journal.id === id);
    if (!exists) {
      return;
    }

    const newJournals = journals.filter(journal => journal.id !== id);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(newJournals));
  }

  async getAll(): Promise<Journal[]> {
    const journals = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) {
        continue;
      }
      const foodId = localStorage.getItem(key);
      if (foodId) {
        const food = JSON.parse(foodId);
        journals.push(...food);
      }
    }
    return journals;
  }
}