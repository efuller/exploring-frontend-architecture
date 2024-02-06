import { RouteMap, Router } from "../router/router.ts";
import { JournalModule } from "../../modules/journal/journalModule.ts";
import { App } from "../app/app.ts";
import { JournalRepository } from "../../modules/journal/journalRepository.ts";
import { JournalController } from "../../modules/journal/journalController.ts";
import { JournalPresenter } from "../../modules/journal/journalPresenter.ts";
import { InMemoryClientStorage } from "../../modules/journal/infra/repos/inMemoryClientStorage.ts";

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
  private readonly app: App;
  private readonly router: Router;

  constructor() {
    this.router = new Router(routeMap);
    const journalModule = this.createJournalModule();
    this.app = new App({ journalModule }, this.router);
  }

  createJournalModule() {
    const inMemoryClientStorage = new InMemoryClientStorage();
    const foodRepository = new JournalRepository(inMemoryClientStorage);
    const foodController = new JournalController(foodRepository, inMemoryClientStorage);
    const foodPresenter = new JournalPresenter(foodRepository, inMemoryClientStorage);
    return new JournalModule(foodController, foodPresenter);
  }

  getApp() {
    return this.app;
  }
}

