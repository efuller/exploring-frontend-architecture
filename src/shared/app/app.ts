import { JournalModule } from "../../modules/journal/journalModule.ts";

type AppModules = {
  journalModule: JournalModule;
};

export class App {
  private readonly modules: AppModules;

  constructor(modules: AppModules) {
    this.modules = modules;
  }

  getJournalModule() {
    return this.modules.journalModule;
  }
}
