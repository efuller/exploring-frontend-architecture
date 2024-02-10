import { defineFeature, loadFeature } from "jest-cucumber";
import { CompositionRoot } from "../../../src/shared/compositionRoot/compositionRoot";
import { App } from "../../../src/shared/app/app";
import { Journal } from "../../../src/modules/journal/journal";
import { JournalState } from "../../../src/modules/journal/journalRepository";
import { JournalController } from "../../../src/modules/journal/journalController";
import { JournalPresenter } from "../../../src/modules/journal/journalPresenter";

const feature = loadFeature('tests/app/journal/journal.app.feature');

defineFeature(feature, (test) => {
  let compositionRoot: CompositionRoot;
  let app: App;
  let vm: JournalState;
  // let pendingDeletion: Journal | null;
  let journalController: JournalController;
  let journalPresenter: JournalPresenter;
  let journal: Journal;

  beforeEach(() => {
    compositionRoot = new CompositionRoot("test");
    app = compositionRoot.getApp();
    journal = Journal.create({ title: "The weather is great" });
    journalController = app.getJournalModule().getJournalController();
    journalPresenter = app.getJournalModule().getJournalPresenter();
    vm = { journals: [], pendingDeletion: null };
    // pendingDeletion = null;
  });

  test('I can create a new journal entry', ({given, when, then}) => {
    given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
      await journalController.add(journal);

      await journalPresenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm.journals[0].title).toEqual(entry);
    });

    when(/^I add a new journal called "(.*)"$/, (entry) => {
      const newJournal = Journal.create({ title: entry });
      journalController.add(newJournal);
    });

    then(/^I should see the journal "(.*)" in the list of journal entries$/, async (entry) => {
      await journalPresenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm.journals[1].title).toEqual(entry);
    });
  });

  test('A journal can be deleted from the list', ({ given, when, then }) => {
    given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
      await journalController.add(journal);

      await journalPresenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm.journals[0].title).toEqual(entry);
    });

    when('I delete the journal item from the list', async () => {
      await journalController.delete(Journal.create(vm.journals[0])); // Could probably just pass an id here.
    });

    then(/^The journal item "(.*)" should no longer be in the list$/, async () => {
      await journalPresenter.getJournals((journals) => {
        vm = journals;
      });
      expect(vm.journals.length).toBe(0);
    });
  });

//   test('A journal can be set as a favorite', ({ given, when, then, and }) => {
//     given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
//       const newJournal: Journal = {
//         id: IdGenerator.generateId(),
//         title: entry,
//         isFavorite: false
//       };
//       await journalController.add(newJournal);
//
//       await journalPresenter.getJournals((journals) => {
//         vm = journals;
//       });
//       expect(vm.journals[0].title).toEqual(entry);
//       expect(vm.journals[0].isFavorite).toBe(false);
//     });
//
//     when('The journal entry is set as a favorite', async () => {
//       await journalController.setFavorite(vm.journals[0]);
//     });
//
//     then(/^The journal entry "(.*)" should be marked as a favorite$/, async (entry) => {
//       await journalPresenter.getJournals((journals) => {
//         vm = journals;
//       });
//       expect(vm.journals[0].title).toEqual(entry);
//       expect(vm.journals[0].isFavorite).toBe(true);
//     });
//
//     and(/^The favorite journal "(.*)" should be saved to the client storage repository$/, async (entry) => {
//       const favorites = await journalPresenter.loadFavoriteJournals();
//       expect(favorites.length).toBe(1);
//       expect(favorites[0].title).toEqual(entry);
//     });
//   });
//
//   test('Delete a journal that is marked as a favorite', ({ given, and, when, then }) => {
//     given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
//       const newJournal: Journal = {
//         id: IdGenerator.generateId(),
//         title: entry,
//         isFavorite: false
//       };
//       await journalController.add(newJournal);
//
//       await journalPresenter.getJournals((journals) => {
//         vm = journals;
//       });
//       expect(vm.journals[0].title).toEqual(entry);
//     });
//
//     and('The journal entry is set as a favorite', async () => {
//       await journalController.setFavorite(vm.journals[0]);
//       expect(vm.journals[0].isFavorite).toBe(true);
//     });
//
//     when('I delete the journal item from the list', async () => {
//       await journalController.delete(vm.journals[0]);
//     });
//
//     and('It is set for pending deletion', () => {
//       expect(vm.pendingDeletion?.id).toEqual(vm.journals[0].id)
//     });
//
//     and('I confirm the deletion', async () => {
//       const journalController = app.getJournalModule().getJournalController();
//       await journalController.delete(vm.journals[0]);
//       expect(pendingDeletion).toBeNull();
//     });
//
//     then(/^The journal item "(.*)" should no longer be in the list$/, (entry) => {
//       expect(vm.journals.length).toEqual(0);
//       expect(vm.journals.filter((f) => f.title === entry).length).toEqual(0);
//     });
//
//     and(/^The favorite journal "(.*)" should be removed from the client storage repository$/, async (entry) => {
//       const journalPresenter = app.getJournalModule().getJournalPresenter();
//       const favorites = await journalPresenter.loadFavoriteJournals();
//       expect(favorites.length).toBe(0);
//       expect(vm.journals.filter((f) => f.title === entry).length).toEqual(0);
//     });
//   });
//
//   test('A journal pending delete can be cancelled', ({ given, and, when, then }) => {
//     given(/^There is a journal named "(.*)" in the journal list$/, async (entry) => {
//       const newJournal: Journal = {
//         id: IdGenerator.generateId(),
//         title: entry,
//         isFavorite: false
//       };
//       await journalController.add(newJournal);
//
//       await journalPresenter.getJournals((journals) => {
//         vm = journals;
//       });
//       expect(vm.journals[0].title).toEqual(entry);
//     });
//
//     and('The journal entry is set as a favorite', async () => {
//       await journalController.setFavorite(vm.journals[0]);
//       expect(vm.journals[0].isFavorite).toBe(true);
//     });
//
//     when('I delete the journal item from the list', async () => {
//       await journalController.delete(vm.journals[0]);
//     });
//
//     and('It is set for pending deletion', () => {
//       expect(vm.pendingDeletion?.id).toEqual(vm.journals[0].id)
//     });
//
//     when('I cancel the deletion', () => {
//       journalController.resetPendingDeletion();
//     });
//
//     then(/^The journal item "(.*)" should still be in the list$/, (entry) => {
//       expect(vm.journals[0].title).toEqual(entry);
//     });
//
//     and('The pending deletion should be removed', () => {
//       expect(vm.pendingDeletion).toBeNull();
//     });
//   });
//
});