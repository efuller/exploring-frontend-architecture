import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";
import { PageComponents } from "../pageComponents";
import { createJournalDto } from "../../../src/dto/createJournalDto";

export class MainPage {
  private components: PageComponents;

  public constructor(private pageDriver: PuppeteerPageDriver) {
    this.components = new PageComponents({
      driver: pageDriver,
      timeout: 3000,
      elements: {
        journalInput: {
          selector: '#journal-input',
          type: 'input'
        },
        submitBtn: {
          selector: '#submit-btn',
          type: 'button'
        }
      }
    });
  }

  async addNewJournal(newJournal: createJournalDto) {
    await this.components.load();
    await this.components.get('journalInput').type(newJournal.title);
    await this.components.get('submitBtn').click();
  }

  async journalTitleToBeInList(journal: string) {
    const ul = await this.pageDriver.getPage().waitForSelector('#journal-list', { timeout: 3000 });

    if (!ul) {
      return false;
    }

    const li = await ul.$$eval('li > p', (options) => {
      return options.map((option) => option.textContent);
    });

    if (li.includes(journal)) {
      return true;
    }
    return false;
  }

  async open() {
    console.log('ENV', process.env.NODE_ENV);
    let url = 'https://explore-frontend-architecture.onrender.com/';

    if (process.env.NODE_ENV === 'test') {
      url = 'http://localhost:5173';
    }
    const page = this.pageDriver.getPage();
    // TODO: Make this configurable.
    await page.goto(url);
  }
}