import { defineFeature, loadFeature } from "jest-cucumber";
import { CompositionRoot } from "../../../src/shared/compositionRoot/compositionRoot";
import { App } from "../../../src/shared/app/app";
import { Journal } from "../../../src/modules/journal/journal";

const feature = loadFeature('tests/app/journal/journal.app.feature');

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let app: App;
  let vm: Journal[];

  beforeEach(() => {
    compositionRoot = new CompositionRoot();
    app = compositionRoot.getApp();
  });

  test('I can create a new journal entry', ({given, when, then}) => {
    given('I am on the homepage page', () => {
      expect(app.getCurrentRouteId()).toBe('home');
    });

    when(/^I add a new journal called "(.*)"$/, (entry) => {
      const controller = app.getJournalModule().getJournalController();
      controller.add(entry);
    });

    then(/^I should see the journal "(.*)" in the list of journal entries$/, async (entry) => {
      const presenter = app.getJournalModule().getJournalPresenter();
      await presenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm[0]).toEqual(entry);
    });
  });
});