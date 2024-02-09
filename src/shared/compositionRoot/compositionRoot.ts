import { JournalModule } from "../../modules/journal/journalModule.ts";
import { App } from "../app/app.ts";
import { JournalRepository } from "../../modules/journal/journalRepository.ts";
import { JournalController } from "../../modules/journal/journalController.ts";
import { JournalPresenter } from "../../modules/journal/journalPresenter.ts";
import { InMemoryClientStorage } from "../../modules/journal/infra/repos/inMemoryClientStorage.ts";
import { LocalStorageClient } from "../../modules/journal/infra/repos/localStorageClient.ts";
import { ClientStorageRepository } from "../../modules/journal/clientStorageRepository.ts";

type Context = "test" | "dev" | "prod";

export class CompositionRoot {
  private readonly context: Context;
  private readonly app: App;

  constructor(context: Context = "dev") {
    this.context = context;
    const journalModule = this.createJournalModule();
    this.app = new App({ journalModule });
  }

  createJournalModule() {
    let clientStorage: ClientStorageRepository;

    if (this.context === "test") {
      clientStorage = new InMemoryClientStorage();
    } else {
      clientStorage = new LocalStorageClient();
    }
    const journalRepository = new JournalRepository(clientStorage);
    const journalController = new JournalController(journalRepository);
    const journalPresenter = new JournalPresenter(journalRepository, clientStorage);
    return new JournalModule(
      journalController,
      journalPresenter,
    );
  }

  getApp() {
    return this.app;
  }
}

