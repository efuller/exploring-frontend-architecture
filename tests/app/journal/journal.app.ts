import { defineFeature, loadFeature } from "jest-cucumber";
import { CompositionRoot } from "../../../src/shared/compositionRoot/compositionRoot";
import { App } from "../../../src/shared/app/app";
import { Journal } from "../../../src/modules/journal/journal";

const feature = loadFeature('tests/app/journal/journal.app.feature');

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let app: App;
  let vm: Journal[];
  let pendingDeletion: Journal | null;

  beforeEach(() => {
    compositionRoot = new CompositionRoot();
    app = compositionRoot.getApp();
    vm = [];
    pendingDeletion = null;
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

  test('A journal can be set as a favorite', ({ given, when, then, and }) => {
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
      expect(vm[0].isFavorite).toBe(false);
    });

    when('The journal entry is set as a favorite', async () => {
      const controller = app.getJournalModule().getJournalController();
      await controller.setFavorite(vm[0]);
    });

    then(/^The journal entry "(.*)" should be marked as a favorite$/, async (entry) => {
      const presenter = app.getJournalModule().getJournalPresenter();
      await presenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm[0].title).toEqual(entry);
      expect(vm[0].isFavorite).toBe(true);
    });

    and(/^The favorite journal "(.*)" should be saved to the client storage repository$/, async (entry) => {
      const presenter = app.getJournalModule().getJournalPresenter();
      const favorites = await presenter.loadFavoriteJournals();
      expect(favorites.length).toBe(1);
      expect(favorites[0].title).toEqual(entry);
    });
  });

  test('Delete a journal that is marked as a favorite', ({ given, and, when, then }) => {
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

    and('The journal entry is set as a favorite', async () => {
      const controller = app.getJournalModule().getJournalController();
      await controller.setFavorite(vm[0]);
      expect(vm[0].isFavorite).toBe(true);
    });

    when('I delete the journal item from the list', async () => {
      const controller = app.getJournalModule().getJournalController();
      await controller.delete(vm[0]);
    });

    and('It is set for pending deletion', () => {
      const journalPresenter = app.getJournalModule().getJournalPresenter();
      journalPresenter.getPendingDeletion((pending: Journal | null) => {
        pendingDeletion = pending;
      });
      expect(pendingDeletion?.id).toEqual(vm[0].id)
    });

    and('I confirm the deletion', async () => {
      const journalController = app.getJournalModule().getJournalController();
      await journalController.delete(vm[0]);
      expect(pendingDeletion).toBeNull();
    });

    then(/^The journal item "(.*)" should no longer be in the list$/, (entry) => {
      expect(vm.length).toEqual(0);
      expect(vm.filter((f) => f.title === entry).length).toEqual(0);
    });

    and(/^The favorite journal "(.*)" should be removed from the client storage repository$/, async (entry) => {
      const journalPresenter = app.getJournalModule().getJournalPresenter();
      const favorites = await journalPresenter.loadFavoriteJournals();
      expect(favorites.length).toBe(0);
      expect(vm.filter((f) => f.title === entry).length).toEqual(0);
    });
  });
});