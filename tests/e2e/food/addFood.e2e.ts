import { loadFeature, defineFeature } from 'jest-cucumber';
import { FoodModel } from "../../../src/models/foodModel";
import { MainPage } from "../../shared/pages/mainPage";
import { PuppeteerPageDriver } from "../../shared/driver/pupeteerPageDriver";

const feature = loadFeature('tests/e2e/food/addFood.feature');

defineFeature(feature, (test) => {
  test('Adding a food', ({ given, when, then }) => {
    let newFoodInput: FoodModel;
    let pageDriver: PuppeteerPageDriver;
    let mainPage: MainPage;

    beforeAll(async () => {
      pageDriver = await PuppeteerPageDriver.create({ headless: false });
      mainPage = new MainPage(pageDriver);
    });

    afterAll(async () => {
      await pageDriver.close();
    });

    given('The app can be accessed', async () => {
      // Do a thing
      await mainPage.open();
      await pageDriver.pause();
    });

    when('The user adds a new food called steak', async () => {
      await mainPage.addNewFood(newFoodInput);
    });

    then('The user should be able to verify that steak is added to the list', () => {
      expect(mainPage.isOnPage(newFoodInput)).toBe(true);
    });
  });
});