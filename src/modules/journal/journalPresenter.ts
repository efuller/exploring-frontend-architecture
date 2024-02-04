import { JournalRepository } from "./journalRepository.ts";

export class JournalPresenter {
  private readonly journalRepo: JournalRepository;

  constructor(journalRepo: JournalRepository) {
    this.journalRepo = journalRepo;
  }

  async getFoods() {
    return await this.journalRepo.loadFoods();
  }
}
