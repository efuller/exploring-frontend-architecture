import { JournalPresenter } from "./journalPresenter.ts";
import { JournalController } from "./journalController.ts";
import { ConfirmationModal } from "../../components/ConfirmationModal/confirmationModal.ts";

export class JournalModule {
  private readonly journalController: JournalController;
  private readonly journalPresenter: JournalPresenter;
  private readonly confirmationModal: ConfirmationModal;

  constructor(
    journalController: JournalController,
    journalPresenter: JournalPresenter,
    confirmationModal: ConfirmationModal
  ) {
    this.journalController = journalController;
    this.journalPresenter = journalPresenter;
    this.confirmationModal = confirmationModal;
  }

  getJournalController() {
    return this.journalController;
  }

  getJournalPresenter() {
    return this.journalPresenter;
  }

  getConfirmModal() {
    return this.confirmationModal;
  }
}
