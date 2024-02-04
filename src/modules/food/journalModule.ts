import { JournalPresenter } from "./journalPresenter.ts";
import { JournalController } from "./journalController.ts";

export class JournalModule {
  private readonly journalController: JournalController;
  private readonly journalPresenter: JournalPresenter;

  constructor(journalController: JournalController, journalPresenter: JournalPresenter) {
    this.journalController = journalController;
    this.journalPresenter = journalPresenter;
  }

  getJournalController() {
    return this.journalController;
  }

  getJournalPresenter() {
    return this.journalPresenter;
  }
}
