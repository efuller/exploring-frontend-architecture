import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';

export class PuppeteerPageDriver {
  private constructor(private instance: Browser, private page: Page) {}

  /**
   * Creates a new instance of PuppeteerPageDriver
   * @param opts
   */
  public static async create(opts: PuppeteerLaunchOptions) {
    const instance = await puppeteer.launch(opts);
    const page = await instance.newPage();
    return new PuppeteerPageDriver(instance, page);
  }

  /**
   * Closes the instance of PuppeteerPageDriver
   */
  public async close() {
    await this.instance.close();
  }

  /**
   * Get the page.
   */
  public getPage() {
    return this.page;
  }

  /**
   * Pause the test for 3 seconds.
   */
  async pause() {
    await new Promise(r => setTimeout(r, 3000))
  }
}