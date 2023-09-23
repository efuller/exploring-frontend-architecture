import { PuppeteerPageDriver } from "./driver/pupeteerPageDriver";
import { ElementHandle } from "puppeteer";

type ElementType = 'div' | 'input';

interface ElementsConfig {
  selector: string,
  type: ElementType
}

interface Config {
  elements: Record<string, ElementsConfig>
  driver: PuppeteerPageDriver,
  timeout: number
}

interface LoadedElementsConfig extends ElementsConfig {
  element: ElementHandle<Element>
}

interface LoadedPageComponents {
  [key: string]: LoadedElementsConfig
}

export class PageComponents {
  private readonly loadedPageComponents: LoadedPageComponents;

  public constructor(private config: Config) {
    this.loadedPageComponents = {};
  }

  async load() {
    // Get the page
    const page = this.config.driver.getPage();

    // Load the elements
    for (const key in this.config.elements) {
      const elementConfig = this.config.elements[key];
      const element = await page.$(elementConfig.selector);

      console.log('element', element);

      if (!element) {
        throw new Error(`Could not find element with selector ${elementConfig.selector}`);
      }

      this.loadedPageComponents[key] = {
        ...elementConfig,
        element
      }
    }
  }

  get(key: string) {
    return this.loadedPageComponents[key];
  }
}

