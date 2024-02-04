import { Journal } from "./journal.ts";
import { JournalRepository } from "./journalRepository.ts";

export class JournalController {
  constructor(private readonly journalRepository: JournalRepository) {}

  async add(journal: Journal) {
    await this.journalRepository.add(journal);
  }
}