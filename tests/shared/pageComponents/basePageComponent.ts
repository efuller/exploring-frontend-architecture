import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";

export type ComponentElementsConfig = {
  [key: string]: { selector: string };
};

export class BasePageComponent<T extends ComponentElementsConfig> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: T
  ) {}

  async isValid() {
    const errors: string[] = [];

    const promises = Object.keys(this.componentConfig).map(async (key) => {
      const component = this.componentConfig[key];
      return await this.pageDriver.page.waitForSelector(component.selector)
        .then(() => true)
        .catch(() => {
          errors.push(component.selector);
          return false;
        });
    });

    const result = await Promise.all(promises);

    if (result.includes(false)) {
      throw new Error(`These selectors are not valid for the ${this.constructor.name}: ${errors.join(', ')}`);
    }
    return true;
  }

  async $(key: keyof T) {
    if (!this.componentConfig?.[key]) {
      throw new Error(`Page component ${String(key)} does not exist`);
    }

      const result = await this.pageDriver.page.waitForSelector(this.componentConfig[key].selector);

      if (!result) {
        throw new Error(`There was a problem selecting the page component ${String(key)}`);
      }
      return result;
  }

  async waitAndType(key: keyof T, text: string) {
    const input = await this.$(key);
    await input.type(text);
  }

  async waitAndClick(key: keyof T) {
    const input = await this.$(key);
    await input.click();
  }
}
