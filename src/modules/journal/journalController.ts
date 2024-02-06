import { Journal } from "./journal.ts";
import { JournalRepository } from "./journalRepository.ts";
import { ClientStorageRepository } from "./clientStorageRepository.ts";

export class JournalController {
  constructor(
    private readonly journalRepository: JournalRepository,
    private readonly clientRepository: ClientStorageRepository
  ) {}

  async add(journal: Journal) {
    await this.journalRepository.add(journal);
  }

  async delete(journal: Journal) {
    await this.journalRepository.delete(journal);
    await this.clientRepository.delete(journal.id);
  }

  async setFavorite(journal: Journal) {
    await this.journalRepository.setFavorite(journal);
    await this.clientRepository.add(journal);
  }
}