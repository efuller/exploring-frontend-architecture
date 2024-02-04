import { defineFeature, loadFeature } from "jest-cucumber";
import { CompositionRoot } from "../../../src/shared/compositionRoot/compositionRoot";
import { App } from "../../../src/shared/app/app";

const feature = loadFeature('tests/app/journal/journal.app.feature');

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let app: App;

  beforeEach(() => {
    compositionRoot = new CompositionRoot();
    app = compositionRoot.getApp();
  });

  test('I can create a new journal entry', ({given, when, then}) => {
    given('I am on the homepage page', () => {
      expect(app.getCurrentRouteId()).toBe('home');
    });

    when(/^I add a new journal called "(.*)"$/, (entry) => {
      console.log('entry', entry);
    });

    then(/^I should see the journal "(.*)" in the list of journal entries$/, (entry) => {
      console.log('entry', entry);
    });
  });
});