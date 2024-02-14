import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';

export class PuppeteerPageDriver {
  private constructor(public browser: Browser, public page: Page) {}

  static async create(driverProps: PuppeteerLaunchOptions) {
    const browser = await puppeteer.launch(driverProps);
    const page = await browser.newPage();
    return new PuppeteerPageDriver(browser, page);
  }
}