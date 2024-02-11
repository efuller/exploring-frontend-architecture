import { CompositionRoot } from "../compositionRoot/compositionRoot.ts";
import { Journal } from "../../modules/journal/journal.ts";

export class ClientStorageFixture {
  constructor(private readonly compositionRoot: CompositionRoot) {}

  async setupClientStorageWithJournalEntry(journal: Journal) {
    const clientStorage = this.compositionRoot.getClientStorage();
    await clientStorage?.add(journal);
  }
}