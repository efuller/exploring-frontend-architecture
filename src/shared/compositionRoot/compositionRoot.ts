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
  private clientStorage: ClientStorageRepository | undefined;
  private journalRepository: JournalRepository | undefined;

  constructor(context: Context = "dev") {
    this.context = context;
    const journalModule = this.createJournalModule();
    this.app = new App({ journalModule });
  }

  createJournalModule() {
    if (this.context === "test") {
      this.clientStorage = new InMemoryClientStorage();
    } else {
      this.clientStorage = new LocalStorageClient();
    }

    this.journalRepository = new JournalRepository(this.clientStorage);
    const journalController = new JournalController(this.journalRepository);
    const journalPresenter = new JournalPresenter(this.journalRepository, this.clientStorage);
    return new JournalModule(
      journalController,
      journalPresenter,
    );
  }

  getApp() {
    return this.app;
  }

  getClientStorage() {
    return this.clientStorage;
  }

  getJournalRepository() {
    return this.journalRepository;
  }
}

