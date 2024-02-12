import { JournalState } from "./journalRepository.ts";

export class JournalViewModel {
  constructor(private props: JournalState) {}

  getJournals() {
    return this.props.journals;
  }

  getPendingDeletion() {
    return this.props.pendingDeletion;
  }
}

