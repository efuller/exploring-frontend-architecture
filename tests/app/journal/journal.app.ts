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
    vm = [];
  });

  test('I can create a new journal entry', ({given, when, then}) => {
    given('I am on the homepage page', () => {
      expect(app.getCurrentRouteId()).toBe('home');
    });

    when(/^I add a new journal called "(.*)"$/, (entry) => {
      const controller = app.getJournalModule().getJournalController();
      const newJournal: Journal = {
        id: '1',
        title: entry,
        isFavorite: false
      };
      controller.add(newJournal);
    });

    then(/^I should see the journal "(.*)" in the list of journal entries$/, async (entry) => {
      const presenter = app.getJournalModule().getJournalPresenter();
      await presenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm[0].title).toEqual(entry);
    });
  });

  test('A journal can be deleted from the list', ({ given, when, then }) => {
    given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
      const controller = app.getJournalModule().getJournalController();
      const newJournal: Journal = {
        id: '1',
        title: entry,
        isFavorite: false
      };
      await controller.add(newJournal);

      const presenter = app.getJournalModule().getJournalPresenter();
      await presenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm[0].title).toEqual(entry);
    });

    when('I delete the journal item from the list', async () => {
      const controller = app.getJournalModule().getJournalController();
      await controller.delete(vm[0]);
    });

    then(/^The journal item "(.*)" should no longer be in the list$/, async () => {
      const presenter = app.getJournalModule().getJournalPresenter();
      await presenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm.length).toBe(0);
    });
  });

});