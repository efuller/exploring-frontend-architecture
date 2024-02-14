import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";

export abstract class BasePage<T> {
  public pageComponents: T | undefined;

  protected constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected url: string
  ) {
  }

  $<K extends keyof T>(key: K): T[K] {
    if (!this.pageComponents?.[key]) {
      throw new Error(`Page component ${String(key)} does not exist`);
    }
    return this.pageComponents[key];
  }

  abstract generatePageComponents(): Promise<T>;

  async navigate() {
    await this.pageDriver.page.goto(this.url);
  }
}