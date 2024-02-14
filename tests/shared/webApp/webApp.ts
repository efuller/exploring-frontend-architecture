import { PuppeteerPageDriver } from "../driver/pupeteerPageDriver";
import { MainPage } from "../pages/mainPage";

type Pages = {
  'mainPage': MainPage;
};

export class WebApp {
  pageDriver: PuppeteerPageDriver;
  baseUrl: string | null = null;
  pages: Pages | undefined;

  private constructor(driver: PuppeteerPageDriver, baseUrl: string) {
    this.pageDriver = driver;
    this.baseUrl = baseUrl;
  }

  static async create(driver: PuppeteerPageDriver, baseUrl = 'http://localhost:5173/') {
    if (process.env.NODE_ENV !== 'test') {
      baseUrl = 'https://explore-frontend-architecture.onrender.com/';
    }

    const app = new WebApp(driver, baseUrl);
    app.pageDriver.page.setDefaultTimeout(10000);
    await app.generatePages();
    return app;
  }

  async generatePages() {
    if (!this.baseUrl) {
      throw new Error('Base url has not been set');
    }
    const mainPage = await MainPage.create(this.pageDriver, this.baseUrl);
    this.pages = { mainPage };
  }

  async close() {
    await this.pageDriver.browser.close();
  }

  async pause() {
    await new Promise((r) => setTimeout(r, 3000));
  }

  getPageObject<T extends keyof Pages>(pageName: T): Pages[T] {
    if (!this.pages) {
      throw new Error('Pages have not been generated');
    }
    return this.pages[pageName];
  }
}