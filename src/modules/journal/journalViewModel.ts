import { JournalState } from "./journalRepository.ts";

export class JournalViewModel {
  constructor(private props: JournalState) {}

  getJournals() {
    return this.props.journals;
  }

  getPendingDeletion() {
    return this.props.pendingDeletion;
  }

  showConfirmationModal() {
    return this.props.showConfirmationModal && this.props.pendingDeletion !== null;
  }

  hasJournals() {
    return this.props.journals.length > 0;
  }
}
