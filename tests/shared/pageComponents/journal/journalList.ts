import { BasePageComponent } from '../basePageComponent';
import { PuppeteerPageDriver } from "../../driver/pupeteerPageDriver";

type JournalListFormElements = {
  journalList: { selector: string };
  journalEntries: { selector: string };
  journalTitle: { selector: string };
};

export class JournalList extends BasePageComponent<JournalListFormElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: JournalListFormElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async getFirstJournal() {
    const journalList = await this.$('journalList');

    if (!journalList) {
      throw new Error('Add journal form is not visible');
    }

    const journalEntries = await journalList.$$(this.componentConfig.journalEntries.selector);

    if (journalEntries.length < 1) {
      throw new Error('Journal entries are not visible');
    }

    const [firstJournal] = journalEntries;

    const title = await firstJournal.$eval(this.componentConfig.journalTitle.selector, (el) => el.textContent);

    return {
      title,
    };
  }
}