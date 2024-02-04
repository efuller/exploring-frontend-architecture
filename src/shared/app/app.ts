import { Router } from "../router/router.ts";
import { JournalModule } from "../../modules/food/journalModule.ts";

type AppModules = {
  journalModule: JournalModule;
};

export class App {
  private readonly modules: AppModules;
  private readonly router: Router;

  constructor(modules: AppModules, router: Router) {
    this.modules = modules;
    this.router = router;
  }

  getJournalModule() {
    return this.modules.journalModule;
  }

  getCurrentRouteId() {
    return this.router.getCurrentRouteId();
  }
}
