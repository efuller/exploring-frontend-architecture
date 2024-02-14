import { JournalList } from '../pageComponents/journal/journalList';
import { AddJournalFormComponent } from '../pageComponents/journal/addJournalForm';
import { BasePage } from './basePage';
import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";

type HomepageComponents = {
  addJournalForm: AddJournalFormComponent;
  journalList: JournalList;
};

export class MainPage extends BasePage<HomepageComponents> {
  protected constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected url: string,
  ) {
    super(pageDriver, url);
  }

  static async create(pageDriver: PuppeteerPageDriver, url: string) {
    const page = new MainPage(pageDriver, url);
    page.pageComponents = await page.generatePageComponents();
    return page;
  }

  async generatePageComponents() {
    const addJournalForm = new AddJournalFormComponent(this.pageDriver, {
      titleInput: { selector: '#journal-input' },
      submitBtn: { selector: '#submit-btn' },
    });

    const journalList = new JournalList(this.pageDriver, {
      journalList: { selector: '#journal-list' },
      journalEntries: { selector: '.journal-entry' },
      journalTitle: { selector: '.journal-title' },
    });

    return { addJournalForm, journalList };
  }
}