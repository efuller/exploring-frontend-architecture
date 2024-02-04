import { RouteMap, Router } from "../router/router.ts";
import { JournalModule } from "../../modules/journal/journalModule.ts";
import { App } from "../app/app.ts";
import { JournalRepository } from "../../modules/journal/journalRepository.ts";
import { JournalController } from "../../modules/journal/journalController.ts";
import { JournalPresenter } from "../../modules/journal/journalPresenter.ts";

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
    const foodRepository = new JournalRepository();
    const foodController = new JournalController(foodRepository);
    const foodPresenter = new JournalPresenter(foodRepository);
    return new JournalModule(foodController, foodPresenter);
  }

  getApp() {
    return this.app;
  }
}
