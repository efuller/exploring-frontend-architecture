import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";
import { PageComponents } from "../pageComponents";
import { createFoodDto } from "../../../src/dto/createFoodDto";

export class MainPage {
  private components: PageComponents;

  public constructor(private pageDriver: PuppeteerPageDriver) {
    this.components = new PageComponents({
      driver: pageDriver,
      timeout: 3000,
      elements: {
        foodInput: {
          selector: '#food-input',
          type: 'input'
        },
        submitBtn: {
          selector: '#submit-btn',
          type: 'button'
        }
      }
    });
  }

  async addNewFood(newFood: createFoodDto) {
    await this.components.load();
    await this.components.get('foodInput').type(newFood.title);
    await this.components.get('submitBtn').click();
  }

  async foodTitleToBeInList(food: string) {
    const ul = await this.pageDriver.getPage().waitForSelector('#food-list', { timeout: 3000 });

    if (!ul) {
      return false;
    }

    const li = await ul.$$eval('li > p', (options) => {
      return options.map((option) => option.textContent);
    });

    if (li.includes(food)) {
      return true;
    }
    return false;
  }

  async open() {
    // let url = 'http://localhost:5173';

    // if (process.env.NODE_ENV === 'production') {
    const url = 'https://explore-frontend-architecture.onrender.com/';
    // }
    const page = this.pageDriver.getPage();
    // TODO: Make this configurable.
    await page.goto(url);
  }
}