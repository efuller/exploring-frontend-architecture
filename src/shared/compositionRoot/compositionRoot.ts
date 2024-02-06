import { RouteMap, Router } from "../router/router.ts";
import { JournalModule } from "../../modules/journal/journalModule.ts";
import { App } from "../app/app.ts";
import { JournalRepository } from "../../modules/journal/journalRepository.ts";
import { JournalController } from "../../modules/journal/journalController.ts";
import { JournalPresenter } from "../../modules/journal/journalPresenter.ts";
import { InMemoryClientStorage } from "../../modules/journal/infra/repos/inMemoryClientStorage.ts";
import { LocalStorageClient } from "../../modules/journal/infra/repos/localStorageClient.ts";
import { ClientStorageRepository } from "../../modules/journal/clientStorageRepository.ts";

type Context = "test" | "dev" | "prod";

export const routeMap: RouteMap = {
  home: {
    active: true,
    id: 'home',
    path: '/',
  },
  food: {
    active: false,
    id: 'food',
    path: '/journal',
  },
};

export class CompositionRoot {
  private readonly context: Context;
  private readonly app: App;
  private readonly router: Router;

  constructor(context: Context = "dev") {
    this.context = context;
    this.router = new Router(routeMap);
    const journalModule = this.createJournalModule();
    this.app = new App({ journalModule }, this.router);
  }

  createJournalModule() {
    let clientStorage: ClientStorageRepository;

    if (this.context === "test") {
      clientStorage = new InMemoryClientStorage();
    } else {
      clientStorage = new LocalStorageClient();
    }
    const foodRepository = new JournalRepository(clientStorage);
    const foodController = new JournalController(foodRepository);
    const foodPresenter = new JournalPresenter(foodRepository, clientStorage);
    return new JournalModule(foodController, foodPresenter);
  }

  getApp() {
    return this.app;
  }
}

