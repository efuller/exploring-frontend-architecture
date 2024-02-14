import { loadFeature, defineFeature } from 'jest-cucumber';
import { MainPage } from "../../shared/pages/mainPage";
import { PuppeteerPageDriver } from "../../shared/driver/pupeteerPageDriver";
import { CreateJournalDTO } from "../../../src/modules/journal/journal";
import { AddJournalFormComponent } from "../../shared/pageComponents/journal/addJournalForm";
import { JournalList } from "../../shared/pageComponents/journal/journalList";
import { WebApp } from "../../shared/webApp/webApp";

const feature = loadFeature('tests/e2e/journal/journal.feature');

defineFeature(feature, (test) => {
  test('Adding a journal', ({ given, when, then }) => {
    let newJournalInput: CreateJournalDTO;
    let webApp: WebApp;
    let pageDriver: PuppeteerPageDriver;
    let mainPage: MainPage;
    let addJournalForm: AddJournalFormComponent;
    let journalList: JournalList;

    beforeAll(async () => {
      pageDriver = await PuppeteerPageDriver.create({ headless: 'new' });
      webApp = await WebApp.create(pageDriver);
      mainPage = webApp.getPageObject('mainPage');
      addJournalForm = mainPage.$('addJournalForm');
      journalList = mainPage.$('journalList');
    });

    afterAll(async () => {
      await webApp.close();
    });

    given('The app can be accessed', async () => {
      await mainPage.navigate();
    });

    when(/^The user adds a new journal called (.*)$/, async (journal) => {
      newJournalInput = {
        title: journal
      }

      await addJournalForm.addAndSubmit(newJournalInput);
    });

    then(/^The user should be able to verify that (.*) is added to the list$/, async (journal) => {
      const firstJournal = await journalList.getFirstJournal();
      expect(firstJournal.title).toBe(journal);
    });
  });
});