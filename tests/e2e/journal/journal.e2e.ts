import { loadFeature, defineFeature } from 'jest-cucumber';
import { MainPage } from "../../shared/pages/mainPage";
import { PuppeteerPageDriver } from "../../shared/driver/pupeteerPageDriver";
import { createJournalDto } from "../../../src/dto/createJournalDto";

const feature = loadFeature('tests/e2e/journal/journal.feature');

defineFeature(feature, (test) => {
  test('Adding a journal', ({ given, when, then }) => {
    let newJournalInput: createJournalDto;
    let pageDriver: PuppeteerPageDriver;
    let mainPage: MainPage;

    beforeAll(async () => {
      pageDriver = await PuppeteerPageDriver.create({ headless: true });
      mainPage = new MainPage(pageDriver);
    });

    afterAll(async () => {
      await pageDriver.close();
    });

    given('The app can be accessed', async () => {
      // Do a thing
      await mainPage.open();
    });

    when(/^The user adds a new journal called (.*)$/, async (journal) => {
      newJournalInput = {
        title: journal
      }

      await mainPage.addNewJournal(newJournalInput);
    });

    then(/^The user should be able to verify that (.*) is added to the list$/, async (journal) => {
      expect(await mainPage.journalTitleToBeInList(journal)).toBe(true);
    });
  });
});