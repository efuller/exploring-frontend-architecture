import { loadFeature, defineFeature } from 'jest-cucumber';
import { MainPage } from "../../shared/pages/mainPage";
import { PuppeteerPageDriver } from "../../shared/driver/pupeteerPageDriver";
import { createFoodDto } from "../../../src/dto/createFoodDto";

const feature = loadFeature('tests/e2e/food/addFood.feature');

defineFeature(feature, (test) => {
  test('Adding a food', ({ given, when, then }) => {
    let newFoodInput: createFoodDto;
    let pageDriver: PuppeteerPageDriver;
    let mainPage: MainPage;

    beforeAll(async () => {
      pageDriver = await PuppeteerPageDriver.create({ headless: true });
      mainPage = new MainPage(pageDriver);
    });

    afterAll(async () => {
      await pageDriver.close();
    });

    given('The app can be accessed', async () => {
      // Do a thing
      await mainPage.open();
    });

    when('The user adds a new food called steak', async () => {
      newFoodInput = {
        title: 'steak'
      }

      await mainPage.addNewFood(newFoodInput);
    });

    then('The user should be able to verify that steak is added to the list', async () => {
      expect(await mainPage.foodTitleToBeInList(newFoodInput.title)).toBe(true);
    });
  });
});